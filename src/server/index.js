import fs from "fs";
import debug from "debug";
import * as databaseInstance from "./db";
import * as eventTypes from "./eventTypes";

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

const initEngine = io => {
  io.on("connection", function(socket) {
    loginfo("Socket connected: " + socket.id);

    socket.on(eventTypes.REGISTER, action => {
      action.id = socket.id;
      databaseInstance.createUser(action).then(result => {
        socket.emit(eventTypes.REGISTER_RESULT, {
          type: eventTypes.REGISTER_RESULT,
          result
        });
      });
    });

    socket.on(eventTypes.LOGIN, action => {
      action.id = socket.id;
      databaseInstance.loginUser(action).then(result => {
        socket.emit(eventTypes.LOGIN_RESULT, {
          type: eventTypes.LOGIN_RESULT,
          result
        });
      });
    });

    socket.on(eventTypes.CREATE_ROOM, action => {
      // TODO: register
      socket.emit(eventTypes.JOIN_ROOM_RESULT, { type: "pong" });
    });

    socket.on(eventTypes.JOIN_ROOM, action => {
      // TODO: login
      socket.emit(eventTypes.JOIN_ROOM_RESULT, { type: "pong" });
    });
    socket.on(eventTypes.LOCK_ROOM, action => {
      // TODO: register
      socket.emit(eventTypes.UPDATE_STATE, { type: "pong" });
    });

    socket.on(eventTypes.MOVE_UNIT, action => {
      // TODO: login
      socket.emit(eventTypes.UPDATE_STATE, { type: "pong" });
    });

    socket.on(eventTypes.REQUEST_STATS, action => {
      // TODO: register
      socket.emit(eventTypes.UPDATE_STATS, { type: "pong" });
    });

    socket.on(eventTypes.END_GAME, action => {
      // TODO: login
      socket.emit(eventTypes.UPDATE_STATE, { type: "pong" });
      socket.emit(eventTypes.UPDATE_STATS, { type: "pong" });
    });
  });
};

export function create(params) {
  const promise = new Promise((resolve, reject) => {
    const app = require("http").createServer(function(req, res) {
      res.writeHead(200, { "Content-Type": "text/html" });

      let url = req.url;
      let body = "";
      let response = "";

      req
        .on("data", function(chunk) {
          body += chunk;
        })
        .on("end", async () => {
          if (url === "/user") {
            switch (req.method) {
              case "GET":
                response = await databaseInstance.loginUser(JSON.parse(body));
                break;
              case "POST":
                response = await databaseInstance.createUser(body);
                break;
              case "PUT":
                res = databaseInstance.updateUser(req, res);
                break;
              case "DELETE":
                res = databaseInstance.deleteUser(req, res);
                break;
              default:
                break;
            }
          } else if (url === "/room") {
            switch (req.method) {
              case "GET":
                res = databaseInstance.getRoom(req, res);
                break;
              case "POST":
                res = databaseInstance.createRoom(req, res);
                break;
              case "PUT":
                res = databaseInstance.updateRoom(req, res);
                break;
              case "DELETE":
                res = databaseInstance.deleteRoom(req, res);
                break;
              default:
                break;
            }

            // res.end();
          } else {
            res.write("<h1>Hello World!<h1>");
            res.end();
          }
          console.log(response);
          res.end(response);
        });
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
