import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 
import express from 'express'; 

const router = express.Router(); 

router.route("/").post(async (req, res) => {
    try {
        const body = req.body; 
        const {
            place, 
            date, 
            userEmail, 

        } = body; 
        const vacation = await prisma.vacation.create({
            data: {
                place, 
                date, 
                userEmail, 

            }
        }); 

        res.status(200).json(vacation); 

    }catch(error) {
        console.log(error); 
        res.status(500).json({message: "Internal Server Error"}); 

    }finally {
        prisma.$disconnect(); 
    }
})

export default router; 