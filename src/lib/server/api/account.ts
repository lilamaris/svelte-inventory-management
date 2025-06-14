import { AccountType } from '$generated/prisma/enums';

import prisma from '$lib/prisma';
import { hashPassword } from '$lib/server/api/password';

export interface Account {
    type: AccountType;
    userId: string;
    providerId: string | null;
}

export async function createAccount({
    userId,
    type,
    providerId,
    password
}: {
    userId: string;
    type: AccountType;
    providerId?: string;
    password?: string;
}): Promise<Account> {
    if (type === AccountType.Credentials && !password) {
        throw new Error('Must provide password for Credentials account');
    }

    const accountPasswordHash = password ? await hashPassword(password) : undefined;

    const account = await prisma.account.create({
        data: {
            type,
            userId,
            providerId,
            passwordHash: accountPasswordHash
        }
    });

    return {
        type: account.type,
        userId: account.userId,
        providerId: account.providerId
    };
}

export async function getAccountWithProviderId(
    providerId: string,
    type: AccountType
): Promise<Account | null> {
    const account = await prisma.account.findUnique({
        where: {
            providerId_type: {
                providerId,
                type
            }
        }
    });

    return account;
}

export async function getAccountPasswordHash(userId: string): Promise<string | null> {
    const account = await prisma.account.findFirst({
        where: {
            userId,
            type: AccountType.Credentials
        },
        select: {
            passwordHash: true
        }
    });
    if (!account || !account.passwordHash) return null;
    return account.passwordHash;
}

export async function checkUserHasAccountType(userId: string, type: AccountType): Promise<boolean> {
    const account = await prisma.account.count({
        where: {
            userId: userId,
            type: type
        }
    });

    return account > 0;
}
