const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 25565;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var DB = { // desafio: final do modulo criar db com sequelize

    games: [
        {
            id: 23,
            title: "Call of Duty",
            year: 2019,
            price: 60
        },
        {
            id: 50,
            title: "Minecraft",
            year: 2011,
            price: 80
        },
        {
            id: 23,
            title: "Overcooked 2",
            year: 2018,
            price: 50
        }
        
    ]

}

app.get("/games", (req,res) => { // get em rest é pra PEGAR DADOS
    res.statusCode = 200;
    res.json(DB.games);
})
app.get("/game/:id",(req,res) => {
    var id = req.params.id;
    if(isNaN(id)) {
        res.sendStatus(400);
    }
    else {
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);
        if(game != undefined) {
            res.statusCode = 200;
            res.json(game);
        }
        else {
            res.sendStatus(404);
        }
    }
});

app.post("/game",(req,res) => {
    var {title,price,year} = req.body;
    if(title != undefined) {
        if(isNaN(price) || (isNaN(year))) {
            res.sendStatus(400);
        }
        else {
            DB.games.push({
                id: 2323,
                title,
                price,
                year
            });
            res.sendStatus(200);
        }
    }
    else {
        res.sendStatus(404);
    }
})
app.delete("/game/:id", (req,res) => {
    var id = req.params.id;
    if(isNaN(id)) {
        res.sendStatus(400);
    }
    else {
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);
        if(index == -1) {
            res.sendStatus(404);
        }
        else {
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }
})
app.put("/game/:id",(req,res) => {
    var id = req.params.id;
    if(isNaN(id)) {
        res.sendStatus(404);
    }
    else {
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);
        if(game != undefined) {
            var {title,price,year} = req.body;
            if(title != undefined) {
                game.title = title;
            }

            if(price != undefined) {
                game.price = price;
            }
            if(year != undefined) {
                game.year = year;
            }
            res.sendStatus(200);
            
        }
        else {
            res.sendStatus(404);
        }
    }
})
app.listen(port,(error) => {
    (error) ? console.log(`Error! ${error}`) 
    :
    console.log("Api iniciada!");
})