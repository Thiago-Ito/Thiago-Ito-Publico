<html>  
    <body>      

<script>
    fetch('https://github.com/Thiago-Ito/Thiago-Ito-Publico/blob/fbc82feadccae7e3bdd1a98455174def8e103743/modelos')
        .then(res => res.json())
        .then((out) => {
               console.log('Output: ', out);
        }).catch(err => console.error(err));
</script>
    
    </body>
</html>
