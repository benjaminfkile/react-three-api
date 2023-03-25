"use strict";
const fs = require("fs");
const JSONHelperService = {
    getShows() {
        const json = JSON.parse(fs.readFileSync("src/json/showslist.json", "utf8"));
        return JSONHelperService.scaffold(0, json.showlist);
    },
    getShow(x) {
        const list = JSONHelperService.getShows();
        return list[x];
    },
    getPlaylists() {
        const json = JSON.parse(fs.readFileSync("src/json/playlists.json", "utf8"));
        return JSONHelperService.scaffold(1, json.playlists);
    },
    getPlaylist(x) {
        const list = JSONHelperService.getPlaylists();
        const playlist = list[x];
        return playlist;
    },
    scaffold(type, arr) {
        let merged = [];
        for (let i = 0; i < arr.length; i++) {
            merged.push(arr[i]);
            //@ts-ignore
            merged[i]["type"] = type;
            //@ts-ignore
            merged[i]["playstate"] = 0;
        }
        return merged;
    }
};
module.exports = JSONHelperService;
