import express from "express";
import controller from "../controller/demo";
import verify from "../middleware/auth";

const router = express.Router();

// @route  POST demo/generate
// @desc   Generate demo all the demo data.
// @access Private
router.post("/generate", verify, controller.generateDemoData);

// @route  PUT demo/update_dates
// @desc   Update the demo data dates on tickets, etc.
// @access Private
router.put("/update_dates", controller.updateDemoDataDates);

export = router;
