import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const USER = prisma.users
const POINTS = prisma.points
const CRITERIAS = prisma.criterias
const ROLES = prisma.roles

export { USER, POINTS, CRITERIAS, ROLES }
