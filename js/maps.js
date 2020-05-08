let target = document.getElementById('map');

let tempPosition = null; //posição temporária

let markers = [];

let arrayPoi = [];

document.addEventListener('DOMContentLoaded', function (e) { //executa o código somente após carregar o DOM da página

    let optionsMap = {// variável optionsMap, que recebe um objeto
        center: [-21.511263, -51.434978],
        zoom: 15
    };

    //criando o mapa
    let map = new L.map(target, optionsMap);
    map.doubleClickZoom.disable();

    //adicionar uma camada de bloco do OpenStreetMap
    let basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    }); basemap.addTo(map);

    //Delete
    function setMapOnAll(map) {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    function clearMarker() {
        setMapOnAll(null);
    }

    function deleteMarkers() {
        clearMarker();
        markers = [];
        console.log(markers);
    }

    //Percorrer array

    function percorreArray() {
        deleteMarkers();

        for (let i = 0; i < arrayPoi.length; i++) {
            console.log(arrayPoi[i].nome);
            console.log(arrayPoi[i].id);
            console.log(arrayPoi[i].controlador);
            console.log(arrayPoi[i].anel);
            console.log(arrayPoi[i].fases);
            console.log(arrayPoi[i].lat);
            console.log(arrayPoi[i].lng);

            let strControlador = "";
            if (arrayPoi[i].controlador == null) {
                strControlador = '<p class="fa fa-cog"></p><a href ="/cruzamentos/' + arrayPoi[i].id + '">' + "<b> Configurar Controlador</b></a></p>"
            } else {
                strControlador = '<p><b>Controlador: </b>' + arrayPoi[i].controlador +
                    '<p><b>Fases: </b>' + arrayPoi[i].fases +
                    '<p><b>Anel: </b>' + arrayPoi[i].anel +
                    '<a href ="/cruzamentos/' + arrayPoi[i].id + '">' + "Ver Detalhes</a>"
            } 
            
            let contentString = '<div class = "poi-info-window gm-style" id="iw-container">' +
                '<div id="content">' +
                '<div id="info">' +
                '</div>' +
                '<header class="iw-title"><h4 id="firstHeading" class="firstHeading">' + arrayPoi[i].nome + '</h4>' +
                '</header>' + strControlador +
                '<div id="bodyContent">' +
                '<p><b>ID: </b>' + arrayPoi[i].id +
                '<p><b>Latitude: </b>' + arrayPoi[i].lat.toFixed(3) +
                '<p><b>Longitude: </b>' + arrayPoi[i].lng.toFixed(3) +
                '</div>';

            let marker = L.marker(tempPosition,
                );//{title: arrayPoi[i].nome}
            marker.bindPopup(contentString);
            marker.addTo(map);
        }
    };

    L.DomEvent.on(map, 'click', function (e) {
        tempPosition = e.latlng;
        console.log(tempPosition);
    });

    function cliqueTela(e) {
        let poi = {
            nome: "",
            id: "",
            controlador: null,
            anel: null,
            fases: null,
            lat: "",
            lng: ""
        };

        let nome = prompt('Digite o seu cruzamento: ');
        if (nome != null) {

            poi.nome = nome;
            poi.id = geraID();
            poi.lat = tempPosition.lat;
            poi.lng = tempPosition.lng;

            arrayPoi.push(poi);
            percorreArray();
            console.log(poi);

        }
    };

    function geraID() {
        return 'xxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    map.on('dblclick', function () {
        cliqueTela();
    });
});