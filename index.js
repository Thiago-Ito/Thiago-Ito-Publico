const express = require("express");
const fs = require("fs");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
//const routes = require("./routes/routes");

app.use(cors());
app.use(express.text({limit: "10mb"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(routes);

app.get("/", (req, res) => res.send({msg: "Serviço online............."}));

var mbus = require('./modbus.json');
app.get('/modelos/', (req,res) => {res.send(mbus)});

const port = process.env.PORT || 3000; // opta pela porta oferecida pelo serv web ou pela porta 3000

// Carrega o certificado e a key necessários para a configuração.
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt")
};

http.createServer(options, app).listen(port);
console.log(`Servidor rodando na porta ${port}` + "................................................");

//app.listen(port, function(err)
//{
//    if(err)console.log(err)
//    console.log("Servidor escutando na porta", port + ".......................");
//});
    
    var example_map = "\"{\"name\":\"MODELO 01\", \"id\": INPUT_ID}, \"total_packets\":5} {\"addr\":3004, \"func\":4, \"n_reg\":2} {\"addr\":4405, \"func\":3, \"n_reg\":1} {\"addr\":3025, \"func\":4, \"n_reg\":1} {\"addr\":4069, \"func\":3, \"n_reg\":1} {\"addr\":3604, \"func\":4, \"n_reg\":2}\"";
    var mapa = require('./mapa_variaveis.json');

    app.post("/resposta", (req, res) => {
        const reqcliente = req.body;
        console.log(reqcliente);
        res.send(example_map[1].replace("INPUT_ID", "39"));
    });
    
    app.get('/resposta/', (req,res) => {res.send(mapa)});

    //const result = JSON.parse(req.body);    
    //res.send(variaveis.replace("SLAVE_ID", result[0].id)); 
    //})     

