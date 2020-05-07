<?php
require ("acesso.php");

  function parseToXML($htmlStr)
  {
      $xmlStr=str_replace('<','&lt;',$htmlStr);
      $xmlStr=str_replace('>','&gt;',$xmlStr);
      $xmlStr=str_replace('"','&quot;',$xmlStr);
      $xmlStr=str_replace("'",'&#39;',$xmlStr);
      $xmlStr=str_replace("&",'&amp;',$xmlStr);
      return $xmlStr;
  }

// Selecionar o banco de dados GUIA DA ILHA
$query = "SELECT * FROM markers";
$resultado = mysqli_query($conn, $query);


header("Content-type: text/xml");

/*echo "<? xml version='1.0 ?>";*/
//abrindo o arquivo de conexo
echo '<markers>';

//$ind=0;
//gera um xml
  while ($row = mysqli_fetch_assoc($resultado)){

    echo '<marker ';
    echo 'endereco="' .parseToXML($row['endereco']) . '" ';
    echo 'lat="' .$row['lat'] . '" ';
    echo 'lng="' .$row['lng'] . '" ';
    echo 'tipo="' .$row['tipo'] . '" ';
    echo '/>';
    //$ind = $ind + 1;
  }
  //fechando o arquivo de XML
  echo '</markers>';

?> 