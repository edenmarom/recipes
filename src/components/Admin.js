import "../css/Admin.css";
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import http from "../utils/http-communication.js";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Graph from "../graph/graph.js";

export default function Admin() {

  const [connectedUsers, setConnectedUsers] = useState(0);
  const queryClient = new QueryClient();
  const serverSocketAdress = "http://localhost:8080";

  useEffect(() => {
    // number of users:
    //client:
    // const socket = io(serverSocketAdress);
    // socket.on("counter", (counter) => {
    //   setConnectedUsers(counter);
    // });
    // return () => {
    //   socket.disconnect();
    // };
    // <script src="/socket.io/socket.io.js"></script>
    // <script>
    //   const socket = io("http://localhost:8080");
    //   socket.on("counter", (counter) => {
    //     console.log("got counter", counter);
    //     document.getElementById(
    //       "counter"
    //     ).innerText = `קונים מחוברים ${counter}`;
    //   });
    // </script>
    // TODO: TELL PELEG TO ADD THIS:
    // SERRVER -
    // import http from "http";
    // import { app } from "./http-server.js";
    // import { Server } from "socket.io";
    // const server = http.createServer(app);
    // const io = new Server(server, { cors: { origins: "*:*" } });
    // let userCounter = 0;
    // io.on("connection", (socket) => {
    //   userCounter++;
    //   io.emit("counter", userCounter);
    //   socket.on("disconnect", () => {
    //     userCounter--;
    //     io.emit("counter", userCounter);
    //   });
    // });
    // const port = 8080;
    // server.listen(port, () => {
    //   console.log(`listening on ${port}`);
    //   console.log("http://localhost:8080/html/");
    // });
  }, []);

  return (
    <div className="admin-container">
      <div className="connected-users-container">
        <h2 className="connected-users-title">Connected Users:</h2>
        <p className="connected-users-number">{connectedUsers}</p>
      </div>
      <div className="chart-container">
        <Graph></Graph>
      </div>
      {/* <QueryClientProvider client={queryClient}>
        <Example />
      </QueryClientProvider> */}
    </div>
  );
}

function Example() {
  const { isLoading, error, data, isFetching } = useQuery(["repoData"], () =>
    http
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.data)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{"query example"}</h1>
      <p>{"id: " + data[9].id}</p>
      <p>{data[9].title}</p>
    </div>
  );
}
