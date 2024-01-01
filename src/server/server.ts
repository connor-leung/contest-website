import express from 'express';
import os from "node:os";

import config from "./config";
import router from "./api-router"
import serverRender from './render';

const server = express();

//middleware
server.use(express.static("dist"));

server.set("view engine", "ejs");

server.use("/api", router)

server.get(["/", "/contest/:contestId"], async (req, res) => {
    const { initialMarkup, initialData } = await serverRender(req)
    res.render("index", {
        initialMarkup,
        initialData,
    })
})



server.listen(config.PORT, config.HOST, () => {
    console.info(
        `Express server is listening at ${config.SERVER_URL}`,
        `Free Mem: ${os.freemem() / 1024 / 1024}`,
    );
}); 