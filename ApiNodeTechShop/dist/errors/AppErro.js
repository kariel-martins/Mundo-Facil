"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    message;
    statusCode;
    context;
    constructor(message, statusCode = 500, context) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.context = context;
    }
}
exports.AppError = AppError;
