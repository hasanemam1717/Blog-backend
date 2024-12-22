/* eslint-disable @typescript-eslint/no-this-alias */

import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt'
import config from '../../app/config';

const UserSchema = new Schema<TUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isBlocked: { type: Boolean, default: false },
},
    {
        timestamps: true
    }
);

UserSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.BYCRYPT_SALT_ROUND))
    next()
})

UserSchema.post('save', async function (doc, next) {
    doc.password = '';
    next()
})

export const UserModel = model<TUser>('User', UserSchema);
