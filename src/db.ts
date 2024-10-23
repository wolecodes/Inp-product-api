import { PrismaClient } from "@prisma/client";

//  This allows using PrismaClient in other files as a single cached instance.
const prisma = new PrismaClient();

export default prisma;
