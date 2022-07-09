import express from "express";
import "express-async-errors";
import cors from "cors";
import router from "../routes/routes.js";
import errorHandlingMiddleware from "../middlewares/errorHandlingMiddleware.js";
import notFoundRouteHandlingMiddleware from "../middlewares/notFoundRouteHandlingMiddleware.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", router);

app.use(errorHandlingMiddleware);
app.use(notFoundRouteHandlingMiddleware);

export default app;
