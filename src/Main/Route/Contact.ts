import AddContactController from "@/Presentation/Api/Controller/Contact/AddContactController"
import { Router } from "express"
import { adaptExpressRoute } from "@/Main/Adapter/ExpressRouter"
import UpdateContactController from "@/Presentation/Api/Controller/Contact/UpdateContactController"

export const contactRouter = Router()
const addController = new AddContactController()
const updateController = new UpdateContactController()

contactRouter.post("/add/contact", adaptExpressRoute(addController))
contactRouter.put("/edit/:contactId", adaptExpressRoute(updateController))
