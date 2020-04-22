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
        center: new google.maps.LatLng('-2.488291', '-44.292780'),
        zoom: 13
            //-2.488291, -44.292780 --> lat e lng da praça do pescador
    });
    var infoWindow = new google.maps.InfoWindow;

    // Change this depending on the name of your PHP or XML file
    downloadUrl('banco.php', function(data) {
        var xml = data.responseXML;

        //
        var guia = xml.documentElement.getElementsByTagName('marker');
        Array.prototype.forEach.call(guia, function(markerElem) {
            var codigo = markerElem.getAttribute('codigo');
            var localizacao = markerElem.getAttribute('localizacao'); //local
            var acessibilidade = markerElem.getAttribute('acessibilidade'); //endereço

            var point = new google.maps.LatLng(
                parseFloat(markerElem.getAttribute('latitude')),
                parseFloat(markerElem.getAttribute('longitude')));

            var infowincontent = document.createElement('div');
            var strong = document.createElement('strong');
            strong.textContent = localizacao
            infowincontent.appendChild(strong);
            infowincontent.appendChild(document.createElement('br'));

            var text = document.createElement('text');
            text.textContent = acessibilidade
            infowincontent.appendChild(text);
            var icon = customLabel[type] || {};
            var marker = new google.maps.Marker({
                map: map,
                position: point,
                label: icon.label
            });
            marker.addListener('click', function() {
                infoWindow.setContent(infowincontent);
                infoWindow.open(map, marker);
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