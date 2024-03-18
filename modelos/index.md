<html>
    
   <head>
      <h1>PÁGINA INICIAL</h1>
   </head>

    <body>
        <h2>Isto é um teste Khomp IED302 Monitoramento Modbus!</h2> 

  <button onclick="myFunction()">Clique</button>

<script>
function myFunction() {
  alert("Você clicou no botão!");
}
</script>

<script>
const dbParam = JSON.stringify({table:"customers",limit:20});
const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function() {
  const myObj = JSON.parse(this.responseText);
  let text = "<table border='1'>"
  for (let x in myObj) {
    text += "<tr><td>" + myObj[x].name + "</td></tr>";
  }
  text += "</table>"    
  document.getElementById("demo").innerHTML = text;
}
xmlhttp.open("POST", "json_demo_html_table.php");
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send("x=" + dbParam);
</script>
        
    </body>

</html>
