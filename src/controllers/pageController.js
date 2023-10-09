

let renderHomepage = (req, res, next) => {
    return res.render("homepage.ejs");
}

let renderLoginPage = (req, res, next) => {
    return res.render("loginpage.ejs")
}

let renderHomepageReact = (req, res, next) => {
    return res.render("homepagereact.ejs")
}



module.exports = {
    renderHomepage: renderHomepage,
    renderLoginPage: renderLoginPage,
    renderHomepageReact: renderHomepageReact,
}