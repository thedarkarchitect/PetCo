import { Router } from "express";
import { createAppointment, deleteAppointment, getAppointmentById, getAppointments, updateAppointment } from "../controllers/appointment.controller.js";

const appointmentRouter = new Router()

appointmentRouter.get("/:ownerId", getAppointments);
appointmentRouter.get("/:id", getAppointmentById);

appointmentRouter.post("/createAppointment", createAppointment);

appointmentRouter.patch("/:id", updateAppointment);
appointmentRouter.delete("/:id", deleteAppointment);

export default appointmentRouter;