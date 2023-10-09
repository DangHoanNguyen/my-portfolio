import express from "express";
import pageController from "../controllers/pageController";
import dbquery from "../services/dbquery";

let router = express.Router();

let initPublicWebRoutes = (app) => {
    
    router.get("/", pageController.renderHomepage);

    router.get("/load_projects", dbquery.load_projects);

    router.get("/load_description", dbquery.returnDescription);

    router.get("/load_contact", dbquery.load_contact);

    router.get("/homepagereact", pageController.renderHomepageReact);

    return app.use("/", router);
}

module.exports = initPublicWebRoutes;