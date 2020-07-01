// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoiZm9vZGNyaXRpY25sIiwiYSI6ImNrYzM4NmxzcDA3YmgydHF1dmVjOWd2MXMifQ.ZzIgDo6sPpNVozhPQ_nMdg';

// Initialate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [4.322840, 52.067101],
  zoom: 11.15
});

// Voeg location search
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  }),
  'bottom-left'
);