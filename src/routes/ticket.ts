import express from "express";
import controller from "../controller/ticket";
import verify from "../middleware/auth";

const router = express.Router();

// @route  GET tickets/:project_id
// @desc   Get tickets overview collection of the project.
// @access Private
router.get("/:project_id", verify, controller.getTicketsByProjectId);

// @route  POST tickets/create
// @desc   Create a new ticket of the project.
// @access Private
router.post("/create", verify, controller.createTicket);

// @route  DELETE tickets/:ticketId/
// @desc   Delete a ticket of the id
// @access Public
router.delete("/:ticketId", verify, controller.deleteTicket);

// @route  POST tickets/update
// @desc   Update an existing ticket of the project.
// @access Private
router.post("/update/:id", verify, controller.updateTicket);

export = router;
