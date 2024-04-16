var mqtt = require("mqtt");

var options = {
    host: 'broker.hivemq.com',
    port: 1883,
    protocol: 'tcp',
    username: 'scadatrt4',
    password: 'Scada@trt4',
    //clientId: 'remota211521',
    //connectTimeout: 1000, 
    //reconnectPeriod: 1000
}

// initialize the MQTT client
var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Conectado ao broker ', options.protocol, "://", options.host, ":", options.port, " => ID do Cliente: ", options.clientId), "...";
});

client.off('disconnect', function(){
    console.log("Desconectado do broker...");
});

client.on('error', function (error) {
    console.log(error);
});

// subscribe to topic 'my/test/topic'
client.subscribe('remota/211521/modbus_response', function (){
    console.log("Subscribed to ", 'remota/211521/modbus_response', "...");
});

client.on('message', function (topic, message, packet) {    
    //called each time a message is received
    var mqtt_msg_recebida = JSON.parse(message.toString());
    //console.log("a mensagem é: ", JSON.stringify(mqtt_msg_recebida, '', 2));
    //console.log("o topico é :", topic);    
    var value_Name = Object.values(mqtt_msg_recebida)[0];
    var value_Timestamp = Object.values(mqtt_msg_recebida)[1];
    var value_ID = Object.values(mqtt_msg_recebida)[2];
    var value_Registers = JSON.stringify(Object.values(mqtt_msg_recebida)[3]);
    var value_Registros = "";

    //separando os equipamentos modbus....
    if(JSON.stringify(value_Name).includes("R4DIF08")) //trata-se de um modulo R4DIF08
    {
        const index = value_Registers.lastIndexOf("\"reg\":");
        var dados_IO = value_Registers.substring(index+7, value_Registers.length-3); //captura os dados das entradas digitais do R4DIF08
        if(dados_IO.length > 1) //a placa retornou os valores de todas as entradas
        {
            var dados_IO_tratados = dados_IO.replaceAll(" ", ""); //retira os espaços entre 0000 0001 000.....
            value_Registros = dados_IO_tratados.charAt(3) + dados_IO_tratados.charAt(7) + dados_IO_tratados.charAt(11) + dados_IO_tratados.charAt(15) + dados_IO_tratados.charAt(19) + dados_IO_tratados.charAt(23) + dados_IO_tratados.charAt(27) + dados_IO_tratados.charAt(31);
        }
        else //dados nao fornecidos
        {
            value_Registros = "null";
        }
    }
       
    var array_values = [value_Name, value_Timestamp, value_ID, value_Registros];
    console.log(array_values);
});

// publish message 'Hello' to topic 'my/test/topic'
//client.publish('remota/211521/modbus_response', 'Teste de publicacao em broker.hivemq.com.....');