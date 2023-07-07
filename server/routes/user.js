import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();
const prisma = new PrismaClient();

router.route("/:email").get(async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(404).json({ message: "Email is required " });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },

    include: {
      vacations: true,
    },
  });

  return res.status(200).json(user);
});

router.route("/register").post(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user || !user.hashedPassword) {
      throw new Error("Invalid Credentials");
    }

    const isCorrentPassword = await bcrypt.compare(
      password,
      user?.hashedPassword,
    );

    if (!isCorrentPassword) {
      throw new Error("Password mismatch");
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
});

export default router;
