//import  prisma  from "../prisma/prisma.config";
import { prisma } from '../prisma/prisma'
import { hashPassword } from "./hash";

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
console.log("DATABASE_URL:", process.env.DATABASE_URL);

// Check if environment variables exist
if (!adminEmail || !adminPassword) {
  console.error("ADMIN_EMAIL or ADMIN_PASSWORD is not set in .env");
  process.exit(1);
}
console.log(prisma);
const main = async ()=> {


    const existing = await prisma.admin.findUnique({
            where: {email : adminEmail}
        });
    if (existing) return console.log("Admin already exists!");

    const hashed = await hashPassword(adminPassword);
    await prisma.admin.create({
        data: {
            email: adminEmail,
            password: hashed,
        },
    });
    console.log("Admin created successful");
};

main()
    .catch(console.error)
    .finally(()=> process.exit(0));