<html>  
    <head>
        
    </head>
    <body>           
       const modbus = [
         {
           "marca": "Khomp Eletronicos",
           "modelo": "IED302",
           "Tipo": "conversor",
           "Aplicação": "Sistemas solares",
           "Cliente": "TRT da 4 Região"
         }
        ]

        const encodedData = encodeURIComponent(JSON.stringify(modbus))
        console.log(encodedData)
        //fetch('https://thiago-ito.github.io/Thiago-Ito-Publico/modelos?modbus=${encodedData}')
        //.then(res => res.text())
        //.then(res => console.log(res))
        //.catch(err => console.error(err))

    </body>
</html>
