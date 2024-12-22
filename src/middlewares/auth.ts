
import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

import httpStatus from "http-status";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../modules/utils/catchAsync";
import AppError from "../app/errors/AppError";
import config from "../app/config";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const fullAuthorizationToken = req.headers.authorization;

            // Get the and removed the Bearer word
            const token = fullAuthorizationToken?.split("Bearer ")[1];

            // if token is can not get
            if (!token) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    "You are not authorized !"
                );
            }

            // if  token is valid
            jwt.verify(
                token,
                config.access_token as string,
                function (err, decoded) {
                    if (err) {
                        throw new AppError(
                            httpStatus.UNAUTHORIZED,
                            "You are not authorized"
                        );
                    }
                    // if the role in token 
                    const role = (decoded as JwtPayload).role;

                    // does the token role match with our desired role.
                    // ex, token  is 'student' but our required role is 'admin'
                    if (requiredRoles && !requiredRoles.includes(role)) {
                        throw new AppError(
                            httpStatus.UNAUTHORIZED,
                            "You are not authorized!"
                        );
                    }

                    req.user = decoded as JwtPayload;

                    next();
                }
            );
        }
    );
};

export default auth;