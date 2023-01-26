
interface JwtAuth {
    user_id?: number;
    clearance?: number;
    comment?: string;
}

declare namespace Express {
    interface Request {
        jwtAuth?: JwtAuth;
    }
}