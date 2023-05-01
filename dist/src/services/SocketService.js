"use strict";
const socketService = {
    intit(io) {
        io.on("connection", (socket) => {
            // const id = socket.conn.id
            // socket.on("send-page-data", (keys: string[]) => {
            //     io.emit("receive-page-data", this.getPageData(io, db))
            // })
        });
    },
};
module.exports = socketService;
