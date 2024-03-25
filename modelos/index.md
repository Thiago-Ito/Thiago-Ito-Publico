<html>  
    <head>
        <meta http-equiv="Content-Security-Policy connect-src 'self'">
        <meta http-equiv="Permissions-Policy" content="interest-cohort=()">
    </head>
    <body>
        <script>
           fetch("modbus.json", {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'}})
          .then(function(response){
              return response.json();
              })
            .then(function(json){
                console.log(json);
                });
        </script>
    </body>
</html>
