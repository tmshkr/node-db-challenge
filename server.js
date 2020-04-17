const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

const router = require("./api");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api", router);

module.exports = server;
