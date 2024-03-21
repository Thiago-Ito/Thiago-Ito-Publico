$(document).ready(function(){

    $.getJSON("modbus.json", function(data){
    console.log(data)
        $('.marca').html(data.marca);
        
    })
})
