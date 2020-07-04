var customLabel = {
    cadeirante: {
        label: 'C'
    },
    deficiente_visual: {
        label: 'D'
    }
};

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(-2.488291, -44.292780),
        zoom: 13

        //-2.488291, -44.292780 --> lat e lng da praça do pescador
    });

    var infoWindow = new google.maps.InfoWindow;

    //gerar a posiçao atual do usuario
    //confirmado na linha 93 deste arquivo
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        
            infoWindow.setPosition(pos);
            infoWindow.setContent('Sua Localizaçao.');
            infoWindow.open(map);
            map.setCenter(pos);
            }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
            }


    

    downloadUrl('banco.php', function(data) {
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName('marker');

        Array.prototype.forEach.call(markers, function(markerElem) {
            var id = markerElem.getAttribute('id');
            var endereco = markerElem.getAttribute('endereco'); //local
            var tipo = markerElem.getAttribute('tipo'); //tipo de acessibilidade

            var point = new google.maps.LatLng(
                parseFloat(markerElem.getAttribute('lat')), //buscar a latitude do banco.php
                parseFloat(markerElem.getAttribute('lng'))); //buscar a longitude do banco.php

            //nomear o marcador dando o tipo = cadeirante ou visual
            var infowincontent = document.createElement('div');
            var strong = document.createElement('strong');
            strong.textContent = tipo
            infowincontent.appendChild(strong);
            infowincontent.appendChild(document.createElement('br'));
                        

            //apresentar o endereço do marcador
            var text = document.createElement('text');
            text.textContent = endereco
            infowincontent.appendChild(text);
            var icon = customLabel[tipo] || {};

            //adicionar marcador
            var marker = new google.maps.Marker({
                map: map,
                position: point,
                label: icon.label
            });
            marker.addListener('click', function() {
                infoWindow.setContent(infowincontent);
                infoWindow.open(map, marker); //marker
            });
        });
                
    });
    
}
   /* //codigo para adicionar aplicaçao de voz para deficiente auditivos
    var msg = new SpeechSynthesisUtterance();
    msg.text = endereco;
    window.speechSynthesis.speak(msg);
    */

//funçao sobre localizaçao atual do usuario
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

function downloadUrl(Url, callback) {
    var request = window.ActiveXObject ?
        new ActiveXObject('Microsoft.XMLHTTP') :
        new XMLHttpRequest;

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
        }
    };

    request.open('GET', Url, true);
    request.send(null);
}

function doNothing() {}

//funcao para leitura de codigo de texto para voz
function textVoice(){
    if ('speechSynthesis' in window) {
      speechSynthesis.onvoiceschanged = function() {
        var $voicelist = $('#voices');
  
        if($voicelist.find('option').length == 0) {
          speechSynthesis.getVoices().forEach(function(voice, index) {
            var $option = $('<option>')
            .val(index)
            .html(voice.name + (voice.default ? ' (default)' :''));
  
            $voicelist.append($option);
          });
  
          $voicelist.material_select();
        }
      }
      //um speak = id="speak" 
      $('#speak').click(function(){
        var text = $('#endereco').val();//direcionar o que vai ser falado pelo aplicativo
        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[$('#voices').val()];
       //msg.rate = $('#rate').val() / 10;
        //msg.pitch = $('#pitch').val();
        //msg.text = text;
  
        msg.onend = function(e) {
          console.log('Finished in ' + event.elapsedTime + ' seconds.');
        };
  
        speechSynthesis.speak(msg);
      })
    } else {
      $('#modal1').openModal();
    }
  };