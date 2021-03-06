import { User } from "./user";
import { db } from "../inftastructure/db";
import { match, isEqualTo } from "type-dynamo";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { hash } from 'bcrypt';

const UsersInstance = db.define(User, {
    tableName: 'users',
    partitionKey: 'username',
}).getInstance();

export const getAllUsers = async () => {
    const { data: todos } = await UsersInstance.find().allResults().execute();
    return todos.sort((a, b) => a.createdAt <= b.createdAt ? -1 : 1);
};

export const registerUser = async (user: User) => {
    const { data: found } = await UsersInstance
    .find()
    .filter(match('username', isEqualTo(user.username)))
    .allResults()
    .execute();

    if (found.length)
        throw new ConflictException('Username already exists');

    const password = await hash(user.password, 8);

    await UsersInstance
    .save({ username: user.username, password })
    .execute();
};

export const getUser = async(username: string) => {
    try {
        const { data: found } = await UsersInstance
            .find({ 'username': username })
            .execute();
        return found;
    } catch (error) {
        console.log(error);
        throw new NotFoundException();
    }
}