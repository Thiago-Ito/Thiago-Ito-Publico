<html>  
    <head>
        <meta http-equiv="Content-Security-Policy connect-src 'self'">
        <meta http-equiv="Permissions-Policy" content="interest-cohort=()">
    </head>
    <body>
        <script>
           var a = fetch("modbus.json", {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'}})
           
           var c = JSON.parse(a);
           console.log(c);
          //.then(function(response){
          //    return JSON.parse(response);
          //    })
            //.then(function(json){
            //    console.log(json);
            //    });
        </script>
    </body>
</html>
