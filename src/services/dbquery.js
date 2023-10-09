const fs = require("file-system");


let load_projects = (req, res, next) => {
    req.pool.getConnection((err, connection) => {
        if (err) {
            console.log("here");
            res.sendStatus(500);
            return;
        }
        let query = "SELECT * FROM projects;";
        connection.query(query, (eror, result, field)=>{
            connection.release();
            if (eror) {
                console.log("this");
                res.sendStatus(500);
                return
            }
            return res.json(result);
        })
    });
}

let returnDescription = (req, res, next) => {
    req.pool.getConnection((err, connection) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        let query = "SELECT description FROM projects WHERE id = ?;";
        connection.query(query, [req.query.id], (eror, result, field) =>{
            connection.release();
            if (eror) {
                res.sendStatus(500);
                return;
            }
            let file = result[0]["description"];
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) {
                  console.error('Error reading the file:', err);
                  return;
                }
                res.json(data);
                return
              });
        })
    });
}

let load_contact = (req, res, next) => {
    req.pool.getConnection((err, connection) => {
        if (err) {
            return res.sendStatus(500);
        }
        let query = "SELECT * FROM mydata;"
        connection.query(query, (eror, result, field) => {
            connection.release();
            if (eror) {
                return res.sendStatus(500);
            }
            res.json(result);
        });
    });
}

module.exports = {
    load_projects: load_projects,
    returnDescription: returnDescription,
    load_contact: load_contact,

}