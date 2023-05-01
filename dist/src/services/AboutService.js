"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service = {
    getAbout(knex) {
        return knex.from("about")
            .select("*")
            .then((rows) => {
            return rows[0];
        });
    },
    updateAbout(knex, about) {
        const { id, text, modified } = about;
        return knex("about")
            .where({ id: id })
            .update({ text: text, modified: modified })
            .returning("*")
            .then((rows) => {
            return rows[0];
        });
    }
};
module.exports = service;
