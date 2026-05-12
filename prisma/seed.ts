import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  await prisma.user.deleteMany({
    where: { email: { in: ['john@test.com', 'admin@test.com'] } }
  });

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@test.com',
      password: hashedPassword,
      role: 'user',
      isVerified: true,
    }
  });

  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@test.com',
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
    }
  });

  console.log('Seed completed:', { user, admin });
}

main().finally(() => prisma.$disconnect());