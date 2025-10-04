export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode: number = 500,
        public context?: string,
    ) {
        super(message);
    }
}