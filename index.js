const express = require("express");
const fs = require("fs");
const http = require("http");
const https = require("https");
const cors = require("cors");

const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.text({limit: "10mb"}));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send({msg: "Serviço online............."}));

var mbus = require('./modbus.json');
app.get('/modelos/', (req,res) => {res.send(mbus)});

// Carrega o certificado e a key necessários para a configuração.
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt")   
};

const port = process.env.PORT || 3000; // opta pela porta oferecida pelo serv web ou pela porta 3000

var servidor = https.createServer(options, app);
servidor.listen(port);
console.log(`Servidor rodando na porta ${port}` + "................................................");

///////// MAPA DE VARIÁVEIS (INÍCIO)/////////
const mapa = ["{\"name\":\"GROWATT\", \"id\": 00, \"total_packets\":2} {\"addr\":3004, \"func\":4, \"n_reg\":2} {\"addr\":3200, \"func\":3, \"n_reg\":1}",
              "{\"name\":\"FRONIUS\", \"id\": 00, \"total_packets\":5} {\"addr\":3004, \"func\":4, \"n_reg\":2} {\"addr\":4405, \"func\":3, \"n_reg\":1} {\"addr\":3025, \"func\":4, \"n_reg\":1} {\"addr\":4069, \"func\":3, \"n_reg\":10} {\"addr\":3604, \"func\":4, \"n_reg\":2}",
              "{\"name\":\"GOODWE\", \"id\": 00, \"total_packets\":2} {\"addr\":3004, \"func\":4, \"n_reg\":2} {\"addr\":3200, \"func\":3, \"n_reg\":1}",
              "{\"name\":\"A_R4DIF08_01P_01R\", \"id\": 00, \"total_packets\":1} {\"addr\":129, \"func\":3, \"n_reg\":1}",
              "{\"name\":\"A_R4DIF08_01P_08R\", \"id\": 00, \"total_packets\":1} {\"addr\":129, \"func\":3, \"n_reg\":8}",
              "{\"name\":\"A_R4DIF08_02P_04R\", \"id\": 00, \"total_packets\":2} {\"addr\":129, \"func\":3, \"n_reg\":4}{\"addr\":133, \"func\":3, \"n_reg\":4}",
              "{\"name\":\"B_R4DIF08_01P_01R\", \"id\": 00, \"total_packets\":1} {\"addr\":129, \"func\":3, \"n_reg\":1}",
              "{\"name\":\"B_R4DIF08_01P_08R\", \"id\": 00, \"total_packets\":1} {\"addr\":129, \"func\":3, \"n_reg\":8}",
              "{\"name\":\"B_R4DIF08_02P_04R\", \"id\": 00, \"total_packets\":2} {\"addr\":129, \"func\":3, \"n_reg\":4}{\"addr\":133, \"func\":3, \"n_reg\":4}",
              "{\"name\":\"GROWATT XXXXXXXXX\", \"id\": 00, \"total_packets\":0} {}" 
             ]
///////// MAPA DE VARIÁVEIS (FIM)///////// 

const mapa_var = require('./mapa_variaveis.json');

    app.post('/resposta/', (req,res) => {           

        var slaveid = 0; //reset da variável para ler os sucessivos equipamentos
        var requisicao = JSON.parse(req.body); 
        var n_requisicoes = requisicao.length; //qtdade de equipamentos a serem atualizados enviados na requisicao POST    
        var qtde_equipamentos = mapa.length; //qtde de equipamentos no mapa de variaveis     
        var mapa_completo = "\""; //apenas o inicio do mapeamento 
        var map = "";       

        //faremos um loop nas requisicoes POST enviadas para o servidor...

        for(var k=0; k<n_requisicoes; k++) //para cada um dos equipamentos enviados na requisicao do IED302
        {            
            //cada requisicao pode ser separada em requisicao.modelo e requisicao.id
            //agora, para cada requisicao, vamos procurar o modelo enviado no POST no mapa de variaveis....
            
             const modelo_req = "\"" + requisicao[k].modelo.toString()+"\"";             

           for(var j=0; j<qtde_equipamentos; j++) //pesquisa nos dados do mapa de registradores coicidências com as requisições POST
           {   
            if(mapa[j].search(modelo_req) > 0) //se algum dos equipamentos do mapa de variaveis coincide com o modelo do equipamento que veio na requisicao
               {
                  //para pegar o Slave ID atual (com 2 digitos) do equipamento requisitado....
                  var index_slave_id = mapa[j].lastIndexOf("\"id\": ");                  
                  var IP_atual = mapa[j].substring(index_slave_id+6, index_slave_id+8);
                  var IP_novo = requisicao[k].id.toString();
                  //console.log("IP atual do ", modelo_req, " é ", IP_atual, ". O novo IP será ", IP_novo, ".");

                  //verificar se houve alteração de slaveID para o modelo consultado...
                  if(IP_novo == IP_atual)
                  {
                    //console.log("nao ha necessidade de atualizacao do SlaveID para o equipamento ", modelo_req, ".");
                  }
                  else
                  {
                    //console.log("o slaveID do ", modelo_req, " deve ser alterado de ", IP_atual, " para ", IP_novo, ". (item ", j.toString(), " do mapa variaveis).");
                    map = mapa[j].replace(IP_atual, IP_novo);  
                    //console.log("ACRESCENTAR: ", map);
                    mapa_completo += map; //atualizacao do mapa completo                                                    
                  }

                  break;
               } //funcao if(fim)                            

           } // fim da funcao for no mapa de variaveis (j)
        }// fim da funcao for nos itens da requisicao POST(k)         
        
        mapa_completo += "\"";
        //console.log("MAPA FINAL: ", mapa_completo);   
        //console.log(mapa.length.toString(), "........", mapa_completo.length.toString());      
        
        res.send(mapa_completo);
        console.log("Resposta ao POST enviada!");
    });

    app.post('/liga_disjuntor/', (req,res) => {                        
             console.log("Comando de ligar enviado ao disjuntor.....req_body: ", req.body);  
             client.publish('remota/211521/commands/modbus_single_request','{"cmd":"modbus_single_response", "name": "contator", "id": 248, "addr": 40002, "func": 6, "n_reg": 1, "register": [1, 0]}');              
             setTimeout(() => {
             client.publish('remota/211521/commands/modbus_single_request','{"cmd":"modbus_single_response", "name": "contator", "id": 248, "addr": 40002, "func": 6, "n_reg": 1, "register": [0, 0]}');
             }, 2000);
        });

        app.post('/liga_contator/', (req,res) => {              
            console.log("Comando de ligar enviado ao contator.....req_body: ", req.body);           
       });                    
             
                       
        
       
    //BLOCO MQTT/MYSQL (INICIO)

var mqtt = require("mqtt");
var mysql = require("mysql");
var con;

var config = {
    host: 'broker.hivemq.com',
    port: 8883,
    protocol: 'ssl',
    username: 'scadatrt4',
    password: 'Scada@trt4',
    //clientId: 'trt4_remota211521',
    connectTimeout: 5000, 
    reconnectPeriod: 3000
}

// initialize the MQTT client
var client = mqtt.connect(config);

// setup the callbacks
client.on('connect', function () {
    console.log('Conectado ao broker ', config.protocol, "://", config.host, ":", config.port, " => ID do Cliente: ", config.clientId), "...";
});

client.off('disconnect', function(){
    console.log("Desconectado do broker...");
});

client.on('error', function (error) {
    console.log(error);
});

// subscribe to topic 'my/test/topic'
client.subscribe('remota/211521/modbus_response', function (){
    console.log("  => Subscribed to ", 'remota/211521/modbus_response', "...");
});

client.subscribe('remota/211521/commands/modbus_single_request', function (){
    console.log("  => Subscribed to ", 'remota/211521/commands/modbus_single_request', "...");
});

//conexao ao BD MySql
    con = mysql.createConnection({
    host: "localhost",
    user:"TRT4",
    password:"Scada@trt4",
    database: "dbtrt4"
});

con.connect(function(err){
    if(err)throw err;
    console.log("Conectado ao banco MySql...");
})

 //BLOCO WEBSOCKET (INICIO)
 const WebSocket = require("ws");
 const server = new WebSocket.Server({port:8080});
 server.on("connection", (ws) => {
 console.log("WebSocket habilitado!");
 ws.send("bom dia cliente, seja muito bem vindo a este novo websocket!!!!!");
     //ws.on("message", (message) => {
     //   ws.send(`o cliente diz: ${message}`);
     //})
});
//BLOCO WEBSOCKET (FIM)

client.on('message', function (topic, message, packet) {    
    //called each time a message is received              
    var salvar_no_BD = false;
    var mqtt_msg_recebida = JSON.parse(message.toString());
    //console.log("a mensagem é: ", JSON.stringify(mqtt_msg_recebida, '', 2).substring(0,50), "....");
    //console.log("    o topico é :", topic);    
    var value_Name = Object.values(mqtt_msg_recebida)[0];
    var value_Timestamp = Object.values(mqtt_msg_recebida)[1];
    var value_ID = Object.values(mqtt_msg_recebida)[2];
    var value_Registers = JSON.stringify(Object.values(mqtt_msg_recebida)[3]);
    var value_Registros_Digitais = "";

    //separando os equipamentos modbus....
    if(JSON.stringify(value_Name).includes("R4DIF08")) //trata-se de um modulo R4DIF08
    {
        const index = value_Registers.lastIndexOf("\"reg\":");
        var dados_IO = value_Registers.substring(index+7, value_Registers.length-3); //captura os dados das entradas digitais do R4DIF08
        
        if(dados_IO.length > 1) //a placa retornou os valores de todas as entradas
        {
            var dados_IO_tratados = dados_IO.replaceAll(" ", ""); //retira os espaços entre 0000 0001 000.....
            value_Registros_Digitais = dados_IO_tratados.charAt(3) + dados_IO_tratados.charAt(7) + dados_IO_tratados.charAt(11) + dados_IO_tratados.charAt(15) + dados_IO_tratados.charAt(19) + dados_IO_tratados.charAt(23) + dados_IO_tratados.charAt(27) + dados_IO_tratados.charAt(31);
        }
        else //dados nao fornecidos
        {           
            value_Registros_Digitais = "null";            
        }

        salvar_no_BD = true;

    } //if(JSON.stringify(value_Name).includes("R4DIF08"))       
    
    if(salvar_no_BD == true){
        var array_values = [value_Name, value_Timestamp, value_ID, value_Registros_Digitais];
    //inserir os dados no BD mysql
        var inserir_no_mysql = "INSERT INTO monitoramento (dispositivo, timestamp_mqtt, slaveID, entradas_digitais) VALUES('" + array_values[0] + "','" + array_values[1] + "','" + array_values[2] + "','" + array_values[3] + "')";
        con.query(inserir_no_mysql, function(err, result){
        if(err) throw err;
        //console.log("Registro inserido com sucesso no banco de dados...");)

    })
   } //if(salvar no BD == true)    

}); //client on message

//BLOCO MQTT/MYSQL (FIM)