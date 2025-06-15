import { PrismaClient } from '../src/generated/prisma';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    const categoryNames = [
        'Electronics',
        'Books',
        'Clothing',
        'Home & Kitchen',
        'Sports & Outdoors',
        'Toys & Games',
        'Health & Beauty',
        'Automotive',
        'Other'
    ];

    const categories = await Promise.all(
        categoryNames.map((name) =>
            prisma.category.create({
                data: {
                    name,
                    description: faker.commerce.department()
                }
            })
        )
    );

    for (const category of categories) {
        const itemData = Array.from({ length: 50 }).map(() => ({
            name: faker.commerce.productName(),
            sku: faker.string.alphanumeric(10),
            description: faker.commerce.productDescription(),
            quantity: faker.number.int({ min: 1, max: 100 }),
            price: faker.number.int({ min: 100, max: 10000 }),
            categoryId: category.id
        }));

        await prisma.item.createMany({
            data: itemData,
            skipDuplicates: true
        });
        console.log(`Created ${itemData.length} items in ${category.name}`);
    }
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
