import { Router } from "express";
import { createAppointment, deleteAppointment, getAppointmentById, getAppointments, getUserAppointments, updateAppointment } from "../controllers/appointment.controller.js";


const appointmentRouter = new Router()

appointmentRouter.get("/user-appointments/:ownerId", getUserAppointments);

appointmentRouter.get("/", getAppointments);

appointmentRouter.get("/get-appointment/:id", getAppointmentById);

appointmentRouter.post("/createAppointment", createAppointment);

appointmentRouter.patch("/update-appointment/:id", updateAppointment);

appointmentRouter.delete("/delete-appointment/:id", deleteAppointment);

export default appointmentRouter;