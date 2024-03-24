<html>  
    <head>
        
    </head>
    <body>           
<script>
   const modbus = {
    "marca": "Khomp",
    "modelo": "IED302",
    "Tipo": "conversor",
    "Aplicação": "Sistemas solares",
    "Cliente": "TRT da 4 Região"
}

    const encodedData = encodeURIComponent(JSON.stringify(modbus))
    alert('https://thiago-ito.github.io/Thiago-Ito-Publico/modelos/=' + encodedData)
       
    fetch('https://thiago-ito.github.io/Thiago-Ito-Publico/modelos${encodedData}')
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => console.error(err))
</script>

    </body>
</html>
