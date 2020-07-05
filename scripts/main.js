// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoiZm9vZGNyaXRpY25sIiwiYSI6ImNrYzM4NmxzcDA3YmgydHF1dmVjOWd2MXMifQ.ZzIgDo6sPpNVozhPQ_nMdg';

// Initialate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [4.313340, 52.079840],
  zoom: 15
});

// Voeg location search
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  }),
  'bottom-left'
);

map.on('style.load', function (e) {
    map.addSource('markers', {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [4.313340, 52.079840]
                },
                "properties": {
                    "title": "Mapbox DC",
                    "marker-symbol": "default_marker"
                }
            }, 

            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-122.414, 37.776]
                },
                "properties": {
                    "title": "Mapbox SF",
                    "marker-color": "#ff00ff",
                    "marker-symbol": "secondary_marker"
                }
            }

            


            ]
        }
    });

    map.addLayer({
        "id": "markers",
        "source": "markers",
        "type": "circle",
        "paint": {
            "circle-radius": 10,
            "circle-color": "#007cbf"
        }
    });
    let popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });
    map.on("mouseenter", "markers", e => {
      map.getCanvas().style.cursor = "pointer";
      popup
          .setLngLat(map.unproject(e.point))
          .setHTML("<h3>" + e.features[0].properties.title + "</h3>")
          .addTo(map);
    });
    map.on("mouseleave", "markers", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
    });
});