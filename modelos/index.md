<html>  
    <head>
        <meta http-equiv="Content-Security-Policy connect-src 'self'">
        <meta http-equiv="Permissions-Policy" content="interest-cohort=()">
    </head>
    <body>
        <script>
           fetch("modbus.json", {headers("Content-Type": "multipart/form-data", "Accept": "application/json"}))
           .then(response => response.json())     
           .then(data => console.log(data))
        </script>
    </body>
</html>
