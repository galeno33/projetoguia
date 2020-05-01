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
//$db_selected = mysqli_select_db($dbnome);

// Selecionar o banco de dados GUIA DA ILHA
$result = "SELECT * FROM markers;";
$resultado = mysqli_query($result, $conn);


header("Content-tipo: text/xml");

echo "<? xml version='1.0 ?>";
//abrindo o arquivo de conexo
echo '<markers>';
//$ind=0;
//gerando uma conexao com o banco de dados
while ($row = mysqli_fetch_assoc($resultado)){

  echo '<marker ';
  echo 'id="' .$row['id'] . '" ';
  echo 'endereço="' .parseToXML($row['endereço']) . '" ';
  echo 'lat="' .$row['lat'] . '" ';
  echo 'lng="' .$row['lng'] . '" ';
  echo 'tipo="' .$row['tipo'] . '" ';
  echo '/>';
  //$ind = $ind + 1;
}
  //fechando o arquivo de XML
  echo '</markers>';

?> 