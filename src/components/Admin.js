import "../css/Admin.css";
import React, {useState, useEffect} from "react";
import io from "socket.io-client";
import {serverSocketAddress} from "../utils/http-communication.js";
import {useSelector} from "react-redux";
import Graph from "../graph/graph.js";
import CommentsGraph from "../graph/commentsGraph";

export default function Admin(connectedUsers) {
    const AdminId = "DY6e4W8aHFMfSMBcDbv3FDBgdEm2";
    const currentUserID = useSelector((state) => state.user.id);


    return (
        <div>
            {currentUserID === AdminId ? (
                <div className="admin-container">
                    <div className="connected-users-container">
                        <h2 className="connected-users-title">Connected Users:</h2>
                        <p className="connected-users-number">{connectedUsers.connectedUsers}</p>
                    </div>
                    <div className="chart-container">
                        <Graph></Graph>
                        <CommentsGraph></CommentsGraph>
                    </div>
                    <div>
                    </div>
                </div>
            ) : (
                <div className="restricted-message">
                    You do not have access to this page...
                </div>
            )}
        </div>
    );
}


