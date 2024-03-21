$(document).ready(function(){

    $.getJSON("modbus.json", function(data){
    console.log(data)
        $('.marca').html(data.marca);
        $('.modelo').html(data.modelo);
        $('.tipo').html(data.tipo);
    }).fail(function(){
        console.log("Verifique o seu código")
    })
})
