
import config from "../../app/config";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { TLogInUser } from "./auth.interface";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const registerUser = async (payload: TUser) => {
    const result = await UserModel.create(payload)

    return result;
}

const logIn = async (payload: TLogInUser) => {
    const user = await UserModel.findOne({ email: payload?.email })

    if (!user) {
        throw new Error('User not found.')
    }
    console.log(user.isBlocked);
    if (user.isBlocked === true) {
        throw new Error('User is blocked.')
    }

    const isPasswordMatched = await bcrypt.compare(payload?.password, user?.password)
    if (!isPasswordMatched) {
        throw new Error('Invalid credentials')
    }

    const jwtPayload = {
        email: user?.email,
        role: user?.role,
    };

    const accessToken = jwt.sign(jwtPayload, config.access_token as string, { expiresIn: '30d' })

    // const { password, ...remaining } = user

    return { accessToken }
}


export const authService = {
    registerUser,
    logIn
}