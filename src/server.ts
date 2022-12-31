import express from "express";
import config from "./config/config.json";
import Logger from "./utils/Logger";
import createDatabase from "./Database/DB";
import cors from "cors";

// endpoints
import register from "./api/Auth/register";
import login from "./api/Auth/login";
import create from "./api/Friend/create";
import pending from "./api/Friend/pending";
import about from "./api/User/About";
import conversations from "./api/Conversations/Base";
import avatar from "./api/User/Avatar";
import status from "./api/User/Status";
import UID from "./api/User/UID";

const app = express();
const port = process.env.PORT || config.port;
app.use(cors());

app.use(register);
app.use(login);
app.use(create);
app.use(pending);
app.use(about);
app.use(avatar);
app.use(conversations);
app.use(status);
app.use(UID);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

createDatabase();

require("./socket/WebSocket");

app.listen(port, () => {
  Logger.INFO(`Iris:Server running on port [${port}]`);
});