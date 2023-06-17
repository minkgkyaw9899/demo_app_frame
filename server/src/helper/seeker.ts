import {PrismaClient} from '@prisma/client'
import {posts} from './mockData'

const seeker = async () => {
  const prisma = new PrismaClient()

  await prisma.post.createMany({data: posts})

  return console.log('posts created')
}

seeker().then(r => r)
