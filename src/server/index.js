import fs from "fs";
import debug from "debug";
import * as databaseInstance from "./db";
import * as eventTypes from "./eventTypes";
import Player from "./models/Player";
import Piece from "./models/Piece";
import Board from "./models/Board";
import Game from "./models/Game";

let idInterval;
export let io;

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
      console.log("createRoom = ", result);
      if (result.result === "ok") {
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
      console.log("lock room: ", result);
      if (result.result === "ok") {
        io.sockets.in(result.room.name).emit(eventTypes.LOCK_ROOM_RESULT, {
          type: eventTypes.LOCK_ROOM_RESULT,
          result
        });
        let gameObj = new Game(result.room.name);

        gameObj.initGame();

        gameObj.startGame();
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
      io = require("socket.io")(app);
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
