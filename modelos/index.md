<html>  
    <body>      

<script>
    fetch('https://industrial-devices.app.khomp.com/modelos')
        .then(res => res.json())
        .then((out) => {
               console.log('Output: ', out);
        }).catch(err => console.error(err));
</script>
    
    </body>
</html>
