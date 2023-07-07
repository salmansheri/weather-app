import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import express from "express";

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    const body = req.body;
    const { place, date, userEmail } = body;
    const vacation = await prisma.vacation.create({
      data: {
        place,
        date,
        userEmail,
      },
    });

    res.status(200).json(vacation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    prisma.$disconnect();
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: "Not Found" });
    }
    const deletedVacation = await prisma.vacation.delete({
      where: {
        id: id,
      },
    });
    console.log("success");

    return res.status(200).json(deletedVacation);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  } finally {
    prisma.$disconnect();
  }
});

export default router;
