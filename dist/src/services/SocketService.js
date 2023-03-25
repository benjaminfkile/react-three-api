"use strict";
// const adminService = require("./AdminService")
// const encryptionService = require("./EncryptionService")
const credentialsService = require("./CredentialsService");
const aboutServive = require("./AboutService");
const { v4: uuidv4 } = require("uuid");
const socketService = {
    intit: (io, db) => {
        io.on("connection", (socket) => {
            const id = socket.conn.id;
            //???----------------------------------------not protected------------------------------------------
            socket.on("send-startup-data", () => {
                let startUpData = {};
                aboutServive.getAbout(db).then((about) => {
                    startUpData = Object.assign(Object.assign({}, startUpData), { about: about });
                    io.to(id).emit("receive-startup-data", startUpData);
                });
            });
            //???------------------------------------------protected--------------------------------------------
            // socket.on("send-create-admin", (newAdmin: NewAdminTypes) => {
            //     console.log(newAdmin)
            //     encryptionService.generateHash(newAdmin.secret).then((hash: string) => {
            //         adminService.insertAdmin(db, newAdmin, hash).then((newAdmin: AdminTypes) => {
            //             console.log(newAdmin)
            //         })
            //     })
            // })
            //current theme
            // socket.on("set-something-sensitive", (args: { token: string, id: number }) => {
            //     credentialsService.checkCredentials(args.token).then((result: CheckCredentialsReturnTypes) => {
            //         if (result.authenticated) {
            //             //do something
            //         } else {
            //             io.to(id).emit("emit-auth-status", "forbidden")
            //         }
            //     })
            // })
        });
    }
};
module.exports = socketService;
