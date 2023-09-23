import express from "express";
import pageController from "../controllers/pageController";

let router = express.Router();

let initPublicWebRoutes = (app) => {
    
    router.get("/", pageController.renderHomepage);

    router.get("/hello", );


    return app.use("/", router);
}

module.exports = initPublicWebRoutes;