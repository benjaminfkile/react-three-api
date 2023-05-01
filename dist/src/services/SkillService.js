"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service = {
    getSkills(knex) {
        return knex.from("skills")
            .select("*")
            .then((rows) => {
            return rows;
        });
    },
    postSkill(knex, skill) {
        const { created, icon_source, title, text, order } = skill;
        return knex("skills")
            .insert({ created: created, icon_source: icon_source, title: title, text: text, order: order })
            .returning("*")
            .then((rows) => {
            return rows[0];
        });
    },
    updateSkill(knex, skill) {
        const { id, deleted, icon_source, title, text } = skill;
        return knex("skills")
            .where({ id: id })
            .update({ deleted: deleted, icon_source: icon_source, title: title, text: text })
            .returning("*")
            .then((rows) => {
            return rows[0];
        });
    }
};
module.exports = service;
