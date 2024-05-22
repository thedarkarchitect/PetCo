import { Router } from "express";
import { createAppointment, deleteAppointment, getAppointmentById, getAppointments, getUserAppointments, updateAppointment } from "../controllers/appointment.controller.js";
import { verifyToken } from "../utils/token-handler.js";
import { isAdmin, isUser } from "../utils/middleware.js";

const appointmentRouter = new Router()

appointmentRouter.get("/user-appointments/:ownerId", [verifyToken, isUser], getUserAppointments);
appointmentRouter.get("/", [verifyToken, isAdmin], getAppointments);
appointmentRouter.get("/get-appointment/:id", [verifyToken, isAdmin], getAppointmentById);

appointmentRouter.post("/createAppointment", [verifyToken, isUser], createAppointment);

appointmentRouter.patch("/update-appointment/:id", updateAppointment);
appointmentRouter.delete("/delete-appointment/:id", [verifyToken, isAdmin], deleteAppointment);

export default appointmentRouter;