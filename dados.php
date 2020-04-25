<?php
require ("acesso.php");

// Iniciar arquivo XML, criar nó pai
$doc = domxml_new_doc ("1.0");
$node = $doc -> create_element ("guia");
$parnode = $doc -> append_child ($node);

// Abre uma conexão com um servidor MySQL
/*$ Connection = mysql_connect ( 'localhost' , $ Nome de usu á rio , $ Senha );
if (! $ conex ã o ) {  
  die ( 'Não conectado:' . mysql_error ()); 
}*/

// Definir banco de dados MySQL ativo

/*if (! $ db_selected ) {  
  die ( 'Não é possível usar db:' . mysql_error ()); 
}*/

// Selecione todas as linhas na tabela de marcadores
$query = "SELECT * FROM `guia`;"; 
$result = mysql_query ($query, $dbnome, $conn);


header ("Tipo de conteúdo: texto / xml");

// Repete como linhas, adicionando nós XML para cada
while ($row = @mysql_fetch_assoc($result)) {    
  // Adicionar ao nó do documento XML
  $node = $doc -> create_element("marker");
  $newnode = $parnode -> append_child ($node);

  //$newnode->set_attribute("codigo", $row['codigo']);
  $newnode->set_attribute("acessibilidade", $row['acessibilidade']);
  //$newnode->set_attribute("endereço", $row['endereço']);
  $newnode->set_attribute("latitude", $row['latitude']);
  $newnode->set_attribute("longitude", $row['longitude']);
  //$newnode->set_attribute("tipo", $row['type']);
}

$xmlfile = $doc->dump_mem();
echo $xmlfile;

?>