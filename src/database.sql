DROP DATABASE IF EXISTS myportfolio;

CREATE DATABASE IF NOT EXISTS myportfolio;

USE myportfolio;

CREATE TABLE projects (
    id INT AUTO_INCREMENT,
    name VARCHAR(50),
    description VARCHAR(100),
    githubRepo VARCHAR(100),
    image VARCHAR(100),
    url VARCHAR(100),
    PRIMARY KEY (id)
);

INSERT INTO projects (name, description, githubRepo, image, url) 
VALUES ("MY PORTFOLIO", "./src/public/projectdescription/MyPortfolio.txt", "https://github.com/DangHoanNguyen/my-portfolio", "/image/MyPortfolio.png", "/"),
("CLUB FINDER'S", "./src/public/projectdescription/Clubfinders.txt", "https://github.com/DangHoanNguyen/ClubFinder", "/image/Clubfinder.jpg", "https://clubfinders.onrender.com/"),
("OLD BOOKS MARKET PLACE", "./src/public/projectdescription/SellingOldBook.txt","https://github.com/DangHoanNguyen/SellingOldBook", "#", "#"),
("A WEBSITE TO MAKE APPOINTMENT WITH A HOSITAL", "./src/public/projectdescription/HospitalAppointment.txt", "https://github.com/DangHoanNguyen/Login_logout_WebProject-Guided-", "/image/HostpitalAppointment.png", "#"),
("THE PHO RESTAURANT", "./src/public/projectdescription/ThePhoRestaurant.txt", "https://github.com/DangHoanNguyen/ThePhoRestaurant", "/image/ThePhoRestaurant.png", "#"),
("PERSONAL FINANCE MANAGEMENT", "./src/public/projectdescription/FinanceManagement.txt", "https://github.com/DangHoanNguyen/FinanceControl", "/image/FinanceManagement.png", "#");



-- This table store my personal information and login information
CREATE TABLE mydata (
    username VARCHAR(20),
    password VARCHAR(100),
    github VARCHAR(100),
    linkedin VARCHAR(100),
    upwork VARCHAR(100),
    phoneNO VARCHAR(20)
);

INSERT INTO mydata (github, linkedin, upwork, phoneNO)
VALUES ("https://github.com/DangHoanNguyen", "https://www.linkedin.com/in/dang-hoan-nguyen/", "https://www.upwork.com/freelancers/~01565312e9dfd52e5e", "xxx xxx xxx");

