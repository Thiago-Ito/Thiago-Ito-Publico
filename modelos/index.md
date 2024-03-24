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
       
    console.log(encodedData)
    
</script>

    </body>
</html>
