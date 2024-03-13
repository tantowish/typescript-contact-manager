import express from "express"
import { authMiddleware } from "../middleware/auth-middleware"
import { UserController } from "../controller/user-controller"
import { ContactController } from "../controller/contact-controller"
import { AddressController } from "../controller/address-controller"

export const apiRouter = express.Router()
apiRouter.use(authMiddleware)

// User API
apiRouter.get("/api/users/current", UserController.get)
apiRouter.patch("/api/users/current", UserController.update)
apiRouter.delete("/api/users/logout", UserController.logout)

// Contact API
apiRouter.post("/api/contacts/", ContactController.create)
apiRouter.get("/api/contacts/:id", ContactController.get)
apiRouter.put("/api/contacts/:id", ContactController.update)
apiRouter.delete("/api/contacts/:id", ContactController.delete)
apiRouter.get("/api/contacts", ContactController.search)

// Address API
apiRouter.post("/api/contacts/:contactId/addresses", AddressController.create)
apiRouter.get("/api/contacts/:contactId/addresses/:addressId", AddressController.get)
apiRouter.put("/api/contacts/:contactId/addresses/:addressId", AddressController.update)