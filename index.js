const express = require("express");
const fs = require("fs");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.text({limit: "10mb"}));

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
