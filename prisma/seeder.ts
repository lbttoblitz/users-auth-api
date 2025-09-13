/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable prettier/prettier*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PrismaClient } from '@prisma/client';
import { User, Organization } from 'generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  const [john, jane, organization] = await prisma.$transaction(
    async (prisma):Promise<[User, User, Organization]> => {
      const john: User = await prisma.user.create({
        data: {
          email: 'john.doe@mail.com',
          firstName: 'John',
          lastName: 'Doe',
          password: 'qwerty',
          role: 'USER',
          telephone: '123456789',
        },
      });

      const jane:User= await prisma.user.create({
        data: {
          email: 'jane.doe@mail.com',
          firstName: 'Jane',
          lastName: 'Doe',
          password: 'qwerty',
          role: 'USER',
          telephone: '123456789',
        },
      });

      const organization: Organization = await prisma.organization.create({
        data: {
          name: 'Test Org',
          memberships: {
            create: [{ userId: john.id }, { userId: jane.id }],
          },
        },
      });

      return [john, jane, organization];
    },
  );
  console.log([john, jane, organization]);
  
 }

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
     prisma.$disconnect();
  });