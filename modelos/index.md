<html>
    
  <head>
      <h1>PÁGINA INICIAL</h1>
  </head>

    <body>
        <h2>Isto é um teste Khomp IED302 Monitoramento Modbus!</h2>

    <script>
        fetch('./modelos.json)
        .then(res => res.json())
        .then(data => {
        console.log(data);
        }        
    </script>


    </body>

</html>
