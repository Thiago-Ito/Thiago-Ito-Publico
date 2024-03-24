<html>  
    <head>
        <meta http-equiv="Content-Security-Policy connect-src 'self'">
        <meta http-equiv="Permissions-Policy" content="interest-cohort=()">
    </head>
    <body>
      fetch("modbus.json")
        .then(response => response.json())
        .then(data => console.log(data.sentence))
    </body>
</html>
