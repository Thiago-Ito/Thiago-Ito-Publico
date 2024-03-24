<html>  
    <head>
        <meta http-equiv="Content-Security-Policy connect-src 'self'">
        <meta http-equiv="Permissions-Policy" content="interest-cohort=()">
    </head>
    <body>
       <script>
         fetch('./modbus.json')
        .then(res => res.text())
        .then(res => console.log(res))
        .catch(err => console.error(err))
       </script>
    </body>
</html>
