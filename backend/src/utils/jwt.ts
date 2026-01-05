import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const EXPIRE_IN = "8h";

export const signJwt = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: EXPIRE_IN});
}

export const verifyJwt = (payload:object): any => {
    return jwt.verify(token, JWT_SECRET);
}