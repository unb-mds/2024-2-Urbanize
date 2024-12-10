import { projetosController } from "@/container/container";
import { Router } from "express";

const router = Router()

router.get('/projeto-investimento', projetosController.index)
router.get('/projeto-investimento/:id', projetosController.show)

export { router }