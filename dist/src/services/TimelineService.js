"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service = {
    getTimelineItems(knex) {
        return knex.from("timeline")
            .select("*")
            .where({ deleted: null })
            .then((rows) => {
            return rows;
        });
    },
    updateTimelineItem(knex, timelineItem) {
        const { id, deleted, icon_source, title, text, date } = timelineItem;
        return knex("timeline")
            .where({ id: id })
            .update({ deleted: deleted, icon_source: icon_source, title: title, text: text, date: date })
            .returning("*")
            .then((rows) => {
            return rows[0];
        });
    },
    postTimelineItem(knex, timelineItem) {
        return knex
            .insert(timelineItem)
            .into("timeline")
            .returning("*")
            .then(rows => {
            return rows[0];
        });
    }
};
module.exports = service;
