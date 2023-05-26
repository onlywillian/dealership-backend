import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/adms/find", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const adm = await prisma.administrador.findFirst({
    where: {
      email: email,
    },
  });

  if (!adm) return res.send({ Error: "ADM don't exists" }).status(401);

  return res.send({ Adm: adm }).status(200);
});

router.post("/adms/new", async (req: Request, res: Response) => {
  const adm = await prisma.administrador.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (adm) return res.send({ Error: "ADM alreads exists" }).status(401);

  const newAdm = await prisma.administrador.create({
    data: req.body,
  });

  if (!newAdm) return res.send({ Error: "ADM is not created" }).status(201);

  return res.send({ Adm: newAdm }).status(200);
});

export default router;
