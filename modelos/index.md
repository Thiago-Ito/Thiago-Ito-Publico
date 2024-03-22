<html>  
    <body>      

<script>
    fetch('/modelos/modbus.json')
        .then(res => res.json())
        .then((out) => {
               console.log('Output: ', out);
        }).catch(err => console.error(err));
</script>
    
    </body>
</html>
