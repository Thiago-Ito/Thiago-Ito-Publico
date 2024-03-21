$(document).ready(function(){

    $.getJSON("modbus.json", function(data){
        
    console.log(data)   
        
    }).fail(function(){
        console.log("Verifique o seu código")
    })
})
