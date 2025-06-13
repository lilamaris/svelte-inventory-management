import prisma from '$lib/prisma';
import { hashPassword } from '$lib/server/api/password';

export interface User {
    id: string;
    username: string;
    email: string;
}

export async function createUser(email: string, username: string, password: string): Promise<User> {
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
        data: {
            username,
            email,
            passwordHash,
            roles: {
                create: {
                    role: 'Viewer'
                }
            }
        }
    });

    return {
        id: user.id,
        username: user.username,
        email: user.email
    };
}

export async function updateUserPassword(userId: string, password: string): Promise<void> {
    const passwordHash = await hashPassword(password);
    await prisma.user.update({
        where: { id: userId },
        data: { passwordHash }
    });
}

export async function updateUserEmail(userId: string, email: string): Promise<void> {
    await prisma.user.update({
        where: { id: userId },
        data: { email }
    });
}

export async function updateUserUsername(userId: string, username: string): Promise<void> {
    await prisma.user.update({
        where: { id: userId },
        data: { username }
    });
}

export async function getUserPasswordHash(userId: string): Promise<string> {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        throw new Error('Invalid user Id');
    }

    return user.passwordHash;
}

export async function getUserFromEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            username: true,
            email: true
        }
    });

    return user;
}
