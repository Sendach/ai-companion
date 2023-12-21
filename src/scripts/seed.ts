const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

const main = async () => {
  try {
    await db.category.createMany({
      data: [
        { name: 'Famous People'},
        { name: 'Movies & TV'},
        { name: 'Musicians'},
        { name: 'Games'},
        { name: 'Animals'},
        { name: 'Philosophy'},
        { name: 'Scientists'},
      ]
    })
  } catch (error) {
    console.error('Error seeding defautl categories', error);
  } finally {
    await db.$disconnect();
  }
}

main();