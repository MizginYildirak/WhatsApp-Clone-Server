import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid"; // Correct package for server-side

const server = new WebSocketServer({ port: 3000 });

server.on("connection", (socket) => {
  console.log("A new client has connected.");

  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString()); // Parse the incoming message
  
    server.clients.forEach((client) => {
      if (client.readyState === 1) {

        client.send(
          JSON.stringify({
            _id: uuidv4(), 
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
