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


///////// MAPA DE VARIÁVEIS (INÍCIO)/////////
const mapa = ["{\"name\":\"growatt\", \"id\": 00, \"total_packets\":2} {\"addr\":3004, \"func\":4, \"n_reg\":2} {\"addr\":3200, \"func\":3, \"n_reg\":1}",
              "{\"name\":\"fronius\", \"id\": 00, \"total_packets\":5} {\"addr\":3004, \"func\":4, \"n_reg\":2} {\"addr\":4405, \"func\":3, \"n_reg\":1} {\"addr\":3025, \"func\":4, \"n_reg\":1} {\"addr\":4069, \"func\":3, \"n_reg\":10} {\"addr\":3604, \"func\":4, \"n_reg\":2}",
              "{\"name\":\"goodwe\", \"id\": 00, \"total_packets\":2} {\"addr\":3004, \"func\":4, \"n_reg\":2} {\"addr\":3200, \"func\":3, \"n_reg\":1}"
]
///////// MAPA DE VARIÁVEIS (FIM)///////// 

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