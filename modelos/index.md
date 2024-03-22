<html>  
    <body>      

<script>
    fetch('https://github.com/Thiago-Ito/Thiago-Ito-Publico/tree/main/modelos')
        .then(res => res.json())
        .then((out) => {
               console.log('Output: ', out);
        }).catch(err => console.error(err));
</script>
    
    </body>
</html>
