<html>  
    <body>      

<script>
    fetch('https://industrial-devices.app.khomp.com/modelos')
        .then(function(response){
            return response.json();
        })
    .then(function(data){
         console.log(data);
    }).catch(function(error){
             console.error('Algo deu errado!!!!');
             console.error(error);
    });        
</script>
    
    </body>
</html>
