import {Router} from "express";

const router = Router();

// home page
router.get("/", (req: any, res: any) => {
    res.render("index");
});

// about page
router.get("/about", (req: any, res: any) => {
    res.render("about");
});

export default router;