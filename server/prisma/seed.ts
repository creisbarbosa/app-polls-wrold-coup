import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe_@gmail.com',
      avatarUrl: 'http://github.com/creisbarbosa.png',
  }
})
  const pool = await prisma.pool.create({
    data: {
      title: 'Pool Example 1',
      code: '1B2O3L',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        }
      }
    }
  })


  await prisma.game.create({
    data: {
      date: '2022-12-03T18:59:10.183Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-12-05T18:59:10.183Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    },
  })
}

main()
