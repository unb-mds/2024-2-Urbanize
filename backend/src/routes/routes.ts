import { projetosController } from "@/container/container";
import { Router } from "express";

const router = Router()

router.get('/projects', projetosController.index)
router.get('/projects/:id', projetosController.show)

export { router }