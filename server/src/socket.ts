import { Server, Socket } from "socket.io";

interface CustomSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {
  console.log("f");
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    if (!room) {
      console.log("no room");
      return next(new Error("Invalid room!!"));
    }
    socket.room = room;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    // join the room
    socket.join(socket.room!);
    console.log("The socket connected..", socket.id);

    socket.on("message", (data) => {
      console.log("Server side message", data);
      // socket.broadcast.emit("message", data);
      io.to(socket.room!).emit("message", data)
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
    });
  });
}
