const express = require("express");
const fs = require("fs");
const https = require("https");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.text({limit: "10mb"}));

app.get("/", (req, res) => res.send({msg: "Serviço online......."}));

var mbus = require('./modbus.json');
app.get('/modelos/', (req,res) => {res.send({mbus});})

const port = process.env.port || 3000; // opta pela porta oferecida pelo serv web ou pela porta 3000

// Carrega o certificado e a key necessários para a configuração.
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt")
};

https.createServer(options, app).listen(port);
console.log(`Server running in port ${port}` + "................................................");

//app.listen(port, function(err)
//{
//    if(err)console.log(err)
//    console.log("Servidor escutando na porta", port + ".......................");
//});
