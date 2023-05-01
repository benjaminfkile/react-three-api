"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service = {
    getPortfolioItems(knex) {
        return knex.from("portfolio")
            .select("*")
            .then((rows) => {
            return rows;
        });
    },
    postPortfolioItem(knex, item) {
        const { created, img_url, title, text, order } = item;
        return knex("portfolio")
            .insert({ created: created, img_url: img_url, title: title, text: text, order: order })
            .returning("*")
            .then((rows) => {
            return rows[0];
        });
    },
    updatePortfolioItem(knex, item) {
        const { id, deleted, img_url, title, text, order } = item;
        return knex("portfolio")
            .where({ id: id })
            .update({ deleted: deleted, img_url: img_url, title: title, text: text, order })
            .returning("*")
            .then((rows) => {
            return rows[0];
        });
    }
};
module.exports = service;
