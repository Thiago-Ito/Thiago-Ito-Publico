<html>  
    <head>
        
    </head>
    <body>           
<script>
   const modbus = [{
    "marca": "Khomp",
    "modelo": "IED302",
    "Tipo": "conversor",
    "Aplicação": "Sistemas solares",
    "Cliente": "TRT da 4 Região"
}]

    const encodeData = encodeURIComponent(JSON.stringify(modbus))
    string url = "https://thiago-ito.github.io/Thiago-Ito-Publico/modelos/"
    
    fetch(url + '${encodedData}')
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => console.error(err))
</script>

    </body>
</html>
