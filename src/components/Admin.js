import "../css/Admin.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { serverSocketAddress } from "../utils/http-communication.js";
import { useSelector } from "react-redux";
import Graph from "../graph/graph.js";

export default function Admin() {
  const [connectedUsers, setConnectedUsers] = useState(0);
  //TODO Eden: change to a real user id from firebase
  const AdminId = "4444";
  const currentUserID = useSelector((state) => state.user.id);

  useEffect(() => {
    socketInitializtion(setConnectedUsers);
  }, []);

  return (
    <div>
      {currentUserID === AdminId ? (
        <div className="admin-container">
          <div className="connected-users-container">
            <h2 className="connected-users-title">Connected Users:</h2>
            <p className="connected-users-number">{connectedUsers}</p>
          </div>
          <div className="chart-container">
            <Graph></Graph>
          </div>
          <script src="/socket.io/socket.io.js"></script>
        </div>
      ) : (
        <div className="restricted-message">
          You do not have access to this page...
        </div>
      )}
    </div>
  );
}
function socketInitializtion(setConnectedUsers) {
  const socket = io(serverSocketAddress);
  socket.on("counter", (counter) => {
    setConnectedUsers(counter);
  });
  socket.on("connect_error", (error) => {
    setConnectedUsers("Error");
    console.log("WS Error: Cannot connect to server");
  });
  return () => {
    socket.disconnect();
  };
}

