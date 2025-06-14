import prisma from '$lib/prisma';

export interface User {
    id: string;
    username: string;
    email: string;
    roles: string[];
}

export async function createUser(
    email: string,
    username: string,
    avatarUrl?: string
): Promise<User> {
    const user = await prisma.user.create({
        data: {
            username,
            email,
            avatarUrl
        }
    });

    await prisma.userRole.create({
        data: {
            role: 'Viewer',
            userId: user.id
        }
    });

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: ['Viewer']
    };
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

export async function updateUserAvatarUrl(userId: string, avatarUrl: string): Promise<void> {
    await prisma.user.update({
        where: { id: userId },
        data: { avatarUrl }
    });
}

export async function getUserFromEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            username: true,
            email: true,
            roles: {
                select: {
                    role: true
                }
            }
        }
    });

    if (!user) {
        return null;
    }

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles.map((role) => role.role)
    };
}

export async function checkEmailAvailability(email: string): Promise<boolean> {
    const count = await prisma.user.count({
        where: { email }
    });

    return count === 0;
}
