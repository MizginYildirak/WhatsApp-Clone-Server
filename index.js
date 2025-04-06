import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid"; // Correct package for server-side

const server = new WebSocketServer({ port: 3000 });

// when a new client is connected, connection starts working
server.on("connection", (socket) => {
  console.log("A new client has connected.");

  // when a client sends a message, message event is triggered
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString()); // Parse the incoming message

    console.log("parsedMessage:", parsedMessage)

    // sending all the clients
    server.clients.forEach((client) => {
      // this means the connection is open and a data can be sent
      if (client.readyState === 1) {
        client.send(
          JSON.stringify({
            _id: uuidv4(),
            messageImg: parsedMessage.messageUri || null,
            text: parsedMessage.text,
            user: parsedMessage.user,
          })
        );
      }
    });
  });

  socket.on("close", () => {
    console.log("A client closed the connection.");
  });
});

console.log("WebSocket server is connected on port 3000...");
