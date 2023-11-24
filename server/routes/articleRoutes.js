import express from "express"
import { saveData,getData,deleteData,updateData,getSpecificData } from "../controllers/articleController.js";

const router = express.Router();

router.post("/saveData",saveData);
router.get("/getData",getData);
router.get("/getData/:id",getSpecificData);

router.delete(`/deleteData/:id`,deleteData);
router.put("/updateData/:id",updateData);

export default router