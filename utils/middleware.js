import { StatusCodes } from "http-status-codes";

const isAdmin = (req, res, next) => {
	if (req.tokenData.role === "ADMIN") {
		next();
	} else {
		res.status(StatusCodes.FORBIDDEN).json({ error: "Access Denied" });
	}
};

const isUser = (req, res, next) => {
	if (req.tokenData.role === "USER") {
		next();
	} else {
		res.status(StatusCodes.FORBIDDEN).json({ error: "Access Denied" });
	}
};

export { isAdmin, isUser };
