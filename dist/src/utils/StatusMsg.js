"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const statusMessage = (success, data, message) => {
    return {
        success: success,
        data: data,
        message: message
    };
};
exports.default = statusMessage;
