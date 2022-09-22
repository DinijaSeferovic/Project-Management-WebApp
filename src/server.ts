import cors from "cors";
import express, { Application } from "express";
import config from "./config/config";
import connectDB from "./config/db";
import demoRouter from "./routes/demo";
import organizationRouter from "./routes/organization";
import projectRouter from "./routes/project";
import ticketRouter from "./routes/ticket";
import userRouter from "./routes/user";

const app: Application = express();
const port = config.server.port;
//Middleware
app.use(cors());
app.use(express.json());

//Connect to DB
connectDB();

//Route Middleware
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/tickets", ticketRouter);
app.use("/api/organizations", organizationRouter);
app.use("/api/demo", demoRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
