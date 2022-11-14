import AddContactController from "@/Presentation/Api/Controller/AddContactController"
import { Router } from "express"

export const contactRouter = Router()
const controller = new AddContactController()

contactRouter.post("/add/contact", (req, res) => controller.handle(req, res))
