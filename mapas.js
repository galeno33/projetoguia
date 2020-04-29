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


    downloadUrl('proj22-04-2020/banco.php', function(data) {
        var xml = data.responseXML;

        //
        var markers = xml.documentElement.getElementsByTagName('marker');
        Array.prototype.forEach.call(markers, function(markerElem) {
            var localizacao = markerElem.getAttribute('localizacao'); //local
            var acessibilidade = markerElem.getAttribute('acessibilidade'); //tipo de acessibilidade

            var point = new google.maps.LatLng(
                parseFloat(markerElem.getAttribute('latitude')), //buscar a latitude do banco.php
                parseFloat(markerElem.getAttribute('longitude'))); //buscar a longitude do banco.php

            var infowincontent = document.createElement('div');
            var strong = document.createElement('strong');
            strong.textContent = localizacao
            infowincontent.appendChild(strong);
            infowincontent.appendChild(document.createElement('br'));

            var text = document.createElement('text');
            text.textContent = acessibilidade
            infowincontent.appendChild(text);
            var icon = customLabel[type] || {};

            //adicionar marcador
            var marker = new google.maps.Marker({
                map: map,
                position: point,
                label: icon.label,
                icon: '<img src="../// Change this depending on the name of your PHP or XML fileimg/marcador.png"/>'

            });
            marker.addListener('click', function() {
                infoWindow.setContent(infowincontent);
                infoWindow.open(map, marker); //marker
            });
        });
    });
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