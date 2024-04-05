const express = require("express");
const fs = require("fs");
const https = require("https");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.text({ limit: "10mb" }));

const example_map = "\"{\"name\":\"Inversor XYZ2000\", \"id\": INPUT_ID}, \"total_packets\":5} {\"addr\":3004, \"func\":4, \"n_reg\":2} {\"addr\":4405, \"func\":3, \"n_reg\":1} {\"addr\":3025, \"func\":4, \"n_reg\":1} {\"addr\":4069, \"func\":3, \"n_reg\":1} {\"addr\":3604, \"func\":4, \"n_reg\":2}\"";

app.get("/", (req, res) => res.send({ msg: "online" }));

app.get("/modelos", (req, res) => res.send([{ "modelo": "Inversor XYZ2000", "marca": "2", "tipo": "1" }]));

app.post("/resposta", (req, res) => {
    const result = JSON.parse(req.body);
    res.send(example_map.replace("INPUT_ID", result[0].id));
});

// Carrega o certificado e a key necessários para a configuração.
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt")
};

const port = 3456;
// app.listen(port);
https.createServer(options, app).listen(port);
console.log(`Server running in port ${port}`);
