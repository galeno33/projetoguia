<?php
require 'acesso.php';

/*function parseToXML($htmlStr){
$xmlStr=str_replace('<','&lt;',$htmlStr);
$xmlStr=str_replace('>','&gt;',$xmlStr);
$xmlStr=str_replace('"','&quot;',$xmlStr);
$xmlStr=str_replace("'",'&#39;',$xmlStr);
$xmlStr=str_replace("&",'&amp;',$xmlStr);
return $xmlStr;
}*/

// Selecionar o banco de dados GUIA DA ILHA
$result = "SELECT * FROM `guia` ORDER BY `guia`.`latitude`,`longitude`;";
$resultado = mysqli_query($dbnome, $result);


//header("Content-type: text/xml");


//abrindo o arquivo de conexo
//echo '<guia>';
//gerando uma conexao com o banco de dados
while ($row = mysqli_fetch_assoc($resultado)){

     '<marker';
     //'codigo="' .$row['codigo'] . '"';
     $latitude[] = $row['latitude'];
     $longitude[]= $row['longitude'];
     $coordenadas [] = 'new google.map.LatLng('.$row['latitude'] .','.$row['longitude'] .'),';
     echo $coordenadas[0];
     //'acessibilidade="' .$row['acessibilidade'] . '"';
     //'localizacao="' .$row['localizacao'] .'"';
     //'latitude="' .$row['latitude'] . '"';
     //'longitude=' .$row['longitude'] . '"';
    '/>';

}
  //fechando o arquivo de conexao
 // echo '</guia>';

?> 