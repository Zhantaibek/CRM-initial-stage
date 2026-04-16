import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  const hashedPassword = await bcrypt.hash('123456', 10);

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@test.com',
      password: hashedPassword,
      role: 'user'
    }
  });

  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@test.com',
      password: hashedPassword,
      role: 'admin'
    }
  });

  const product1 = await prisma.product.create({
    data: {
      name: 'Laptop',
      price: 1200
    }
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Phone',
      price: 800
    }
  });

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      products: {
        create: [
          { productId: product1.id },
          { productId: product2.id }
        ]
      }
    },
    include: {
      products: true
    }
  });

  console.log('Seed completed:', { user, admin, product1, product2, order });
}

main()
  .finally(() => prisma.$disconnect());