<?php
require 'acesso.php';

function parseToXML($htmlStr){
$xmlStr=str_replace('<','&lt;',$htmlStr);
$xmlStr=str_replace('>','&gt;',$xmlStr);
$xmlStr=str_replace('"','&quot;',$xmlStr);
$xmlStr=str_replace("'",'&#39;',$xmlStr);
$xmlStr=str_replace("&",'&amp;',$xmlStr);
return $xmlStr;
}
//selecionar o banco de dados 
$db_selected = mysqli_select_db($dbnome, $conn);

// Selecionar o banco de dados GUIA DA ILHA
$result = "SELECT * FROM guia;";
$resultado = mysqli_query($db_selected, $result);


header("Content-type: text/xml");


//abrindo o arquivo de conexo
echo '<guia>';
//gerando uma conexao com o banco de dados
while ($row = mysqli_fetch_assoc($resultado)){

    echo '<marker';
    echo 'codigo="' .parseToXML($row['codigo']) . '"';
    echo 'acessibilidade="' .parseToXML($row['acessibilidade']) . '"';
    echo 'localizacao="' .parseToXML($row['localizacao']) .'"';
    echo 'latitude="' .$row['latitude'] . '"';
    echo 'longitude=' .$row['longitude'] . '"';
    echo '/>';

}
  //fechando o arquivo de conexao
  echo '</guia>';

?> 