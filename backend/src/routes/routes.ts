import { projetosController } from "@/container/container";
import { Router } from "express";

const router = Router()

router.get('/projects', projetosController.index)

export { router }