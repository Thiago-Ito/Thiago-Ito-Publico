<html>  
    <body>      

<script>
    fetch('modbus.json')
        .then(function(response){
            return response.json();
        })
    .then(function(data){
         console.log(data);
    });
</script>
    
    </body>
</html>
