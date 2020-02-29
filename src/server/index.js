import fs from "fs";
import debug from "debug";
import * as databaseInstance from "./db";
import * as eventTypes from "./eventTypes";
import Player from "./models/Player";
import Piece from "./models/Piece";
import Board from "./models/Board";

let idInterval;

const logerror = debug("tetris:error"),
  loginfo = debug("tetris:info");

const initApp = (app, params, cb) => {
  const { host, port } = params;
  const handler = (req, res) => {
    const file =
      req.url === "/bundle.js" ? "/../../build/bundle.js" : "/../../index.html";
    fs.readFile(__dirname + file, (err, data) => {
      if (err) {
        logerror(err);
        res.writeHead(500);
        return res.end("Error loading index.html");
      }
      res.writeHead(200);
      res.end(data);
    });
  };

  app.on("request", handler);

  app.listen({ host, port }, () => {
    loginfo(`tetris listen on ${params.url}`);
    cb();
  });
};

const initEngine = async io => {
  io.on("connection", function(socket) {
    loginfo("Socket connected: " + socket.id);

    socket.on(eventTypes.REGISTER, async action => {
      action.socketId = socket.id;
      const result = await databaseInstance.createUser(action);
      socket.emit(eventTypes.REGISTER_RESULT, {
        type: eventTypes.REGISTER_RESULT,
        result
      });
    });

    socket.on(eventTypes.LOGIN, async action => {
      const result = await databaseInstance.loginUser(action);
      socket.emit(eventTypes.LOGIN_RESULT, {
        type: eventTypes.LOGIN_RESULT,
        result
      });
    });

    socket.on(eventTypes.CREATE_ROOM, async action => {
      const result = await databaseInstance.createRoom(action);
      if (result === "ok") {
        socket.join(result.room.name);
        io.sockets.in(result.room.name).emit(eventTypes.CREATE_ROOM_RESULT, {
          type: eventTypes.CREATE_ROOM_RESULT,
          result
        });
      } else
        io.sockets.in(result.room.name).emit(eventTypes.CREATE_ROOM_RESULT, {
          type: eventTypes.CREATE_ROOM_RESULT,
          result
        });
    });

    socket.on(eventTypes.JOIN_ROOM, async action => {
      const result = Player.joinRoom(action);
      socket.join(result.room.name);
      io.sockets.in(result.room.name).emit(eventTypes.JOIN_ROOM_RESULT, {
        type: eventTypes.JOIN_ROOM_RESULT,
        result
      });
    });

    socket.on(eventTypes.LOCK_ROOM, async action => {
      const result = await databaseInstance.lockRoom(action);
      if (result.result === "ok") {
        io.sockets.in(result.room.name).emit(eventTypes.LOCK_ROOM_RESULT, {
          type: eventTypes.LOCK_ROOM_RESULT,
          result
        });

        const newPieces = [new Piece(), new Piece(), new Piece()];
        const boardObj = new Board();
        const playersBoard = await databaseInstance.getUsersBoard(result.room);
        const playersId = await databaseInstance.getPlayersId(result.room);

        idInterval = setInterval(function() {
          let board = JSON.parse(JSON.stringify(playersBoard[0]));
          let moveResult = boardObj.moveBottom(board, newPieces[0], 20);

          if (moveResult.gameOver === true) {
            io.sockets.in(result.room.name).emit(eventTypes.END_GAME, {
              type: eventTypes.END_GAME
            });
            console.log("GAME OVER");
            clearInterval(idInterval);
          }

          if (moveResult.neadNewPiece === false)
            playersBoard[0] = moveResult.board;
          else {
            newPieces.splice(0, 1);
            newPieces.push(new Piece());
            socket.broadcast.to(playersId[0]).emit(eventTypes.UPDATE_STATE, {
              type: eventTypes.UPDATE_STATE,
              board: playersBoard[0]
            });
          }
        }, 500);
      } else
        socket.emit(eventTypes.LOCK_ROOM_RESULT, {
          type: eventTypes.LOCK_ROOM_RESULT,
          result
        });
    });

    socket.on(eventTypes.MOVE_UNIT_LEFT, action => {
      socket.emit(eventTypes.UPDATE_STATE, {
        type: eventTypes.UPDATE_STATE,
        board
      });
    });
    socket.on(eventTypes.MOVE_UNIT_RIGHT, action => {
      socket.emit(eventTypes.UPDATE_STATE, {
        type: eventTypes.UPDATE_STATE,
        board
      });
    });
  });
};

export function create(params) {
  const promise = new Promise((resolve, reject) => {
    const app = require("http").createServer(function(req, res) {
      res.writeHead(200, { "Content-Type": "text/html" });
    });
    initApp(app, params, () => {
      const io = require("socket.io")(app);
      const stop = cb => {
        io.close();
        app.close(() => {
          app.unref();
        });
        loginfo("Engine stopped.");
        cb();
      };

      initEngine(io);
      resolve({ stop });
    });
  });
  return promise;
}
