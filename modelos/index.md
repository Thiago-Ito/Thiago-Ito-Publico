<html>  
    <head>
        <meta http-equiv="Content-Security-Policy connect-src 'self'">
    </head>
    <body>
       <script>
          fetch('./modbus.json')
          .then(results => results.json())
          .then(console.log);
       </script>
    </body>
</html>
