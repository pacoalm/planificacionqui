require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(logger("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

var corsOptions = {
    origin: "*",
    optionSuccessStatus: 200,
};

var ActiveDirectory = require("activedirectory");
var config = {
    url: process.env.URL,
    baseDN: process.env.BASEDN,
    username: process.env.USER,
    password: process.env.PASS,
};

let usuarioAD = "";
let gruposAD = "";

app.get("/hola", cors(corsOptions), function (req, res, next) {
    res.send("Saludos desde Express");
});

function authenticateDN(userName, password) {
    var ad = new ActiveDirectory(config);

    return new Promise((resolve, reject) => {
        ad.authenticate(userName, password, function (err, auth) {
            if (err) {
                console.log("ERROR: " + JSON.stringify(err));
                resolve(false);
            }
            if (auth) {
                console.log("Authenticated!");
                resolve(true);
            } else {
                console.log("Authentication failed!");
                resolve(false);
            }
        });
    });
}

function getGroups(userName) {
    var ad = new ActiveDirectory(config);

    return new Promise((resolve, reject) => {
        ad.getGroupMembershipForUser(userName, function (err, groups) {
            if (err) {
                console.log("Error:" + JSON.stringify(err));
                resolve(false);
            }
            if (!groups) {
                console.log("No se encontraron grupos");
                resolve(true);
            } else {
                gruposAD = groups;
                resolve(true);
            }
        });
    });
}

function findUser(userName) {
    var ad = new ActiveDirectory(config);

    return new Promise((resolve, reject) => {
        ad.findUser(userName, function (err, user) {
            if (err) {
                console.log("ERROR: " + JSON.stringify(err));
                resolve(false);
            }
            if (!user) {
                console.log("User: " + userName + " not found.");
                resolve(false);
            } else {
                usuarioAD = user;
                console.log(JSON.stringify(user));
                resolve(true);
            }
        });
    });
}

app.post("/validate", cors(corsOptions), function (req, res, next) {
    let resultado = false;
    let respuesta = {
        error: false,
        codigo: 200,
        mensaje: "",
        grupos: [],
    };

    async function validar() {
        resultado = await authenticateDN(
            req.body.username + "@betica.sjd.es",
            req.body.password
        );

        if (resultado) {
            mensajeout = await findUser(req.body.username);
            mensajeout = await getGroups(req.body.username);
            respuesta = {
                error: false,
                codigo: 200,
                usuario: usuarioAD,
                grupos: gruposAD,
            };
        } else {
            respuesta = {
                error: true,
                codigo: 400,
                mensaje: "No se pudo validar el usuario",
                grupos: [],
            };
        }
        res.send(respuesta);
    }

    validar();
});

app.listen(process.env.PORT, () => {
    console.log("Servidor escuchando el puerto: " + process.env.PORT);
});

//authenticateDN("frodrigue53m@betica.sjd.es", "******");
//findUser("frodrigue53m");
//getGroups("frodrigue53m");
