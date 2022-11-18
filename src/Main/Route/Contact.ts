import AddContactController from "@/Presentation/Api/Controller/Contact/AddContactController"
import { Router } from "express"
import { adaptExpressRoute } from "@/Main/Adapter/ExpressRouter"

export const contactRouter = Router()
const controller = new AddContactController()

contactRouter.post("/add/contact", adaptExpressRoute(controller))
