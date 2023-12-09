import express from "express";
import pageController from "../controllers/pageController";

let router = express.Router();

let initPublicAdminRoutes = (app) => {
    
    router.get("/admin/login", pageController.renderLoginPage);

}

module.exports = initPublicAdminRoutes;