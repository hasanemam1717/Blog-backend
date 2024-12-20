import { NextFunction, Request, Response } from "express"
import catchAsync from "../modules/utils/catchAsync"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../app/config"
import { UserModel } from "../modules/user/user.model"
import { TUserRole } from "../modules/user/user.interface"

const auth = (...requiredRole: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req?.headers?.authorization

        if (!token) {
            throw new Error('You are not authorized!')
        }

        const decode = jwt.verify(token, config.access_token as string) as JwtPayload;
        // console.log(decode);

        const { email, role } = decode;
        // console.log(decode, role);

        const user = await UserModel.findOne({ email })

        // console.log(user?.role, requiredRole);
        // console.log("Required roll", requiredRole, "user rl", user?.role, "decode", role, "...", decode);

        if (!user) {
            throw new Error('User not found!')
        }

        if (requiredRole && !requiredRole.includes(role)) {
            throw new Error('You are not authorized  !',);
        }


        // if (requiredRole !== user?.role) {
        //     throw new Error('You are not user')
        // }

        req.user = decode as JwtPayload


        next()

    })
}


export default auth;