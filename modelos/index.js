     const meJSON = '{"Fabricante":"Khomp", "Modelo":"IED-302", "Aplicação":"Monitoramento"}'
     const me = JSON.parse(meJSON);
     console.log(me);    
     Response.json(me);
