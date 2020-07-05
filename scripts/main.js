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


//make blacklisted markers red



                    map.on('load', function() {
map.addSource('places', {
'type': 'geojson',
'data': {
'type': 'FeatureCollection',
'features': [
{
'type': 'Feature',
'properties': {
'description':
'<strong>Takumi Ramen</strong><p><a href="https://www.instagram.com/p/B8bpx5JDxos/" target="_blank">Read review on Instagram</a><br><br>#blacklisted <br></p>',
'icon': 'theatre'
},
'geometry': {
'type': 'Point',
'coordinates': [4.318463, 52.080713]
}
},
{
'type': 'Feature',
'properties': {
'description':
'<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
'icon': 'theatre'
},
'geometry': {
'type': 'Point',
'coordinates': [-77.003168, 38.894651]
}
}
]
}
});

    // Add a layer showing the places.
map.addLayer({
'id': 'places',
'type': 'symbol',
'source': 'places',
'layout': {
'icon-image': '{icon}-15',
'icon-allow-overlap': true
}
});
 
// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', 'places', function(e) {
var coordinates = e.features[0].geometry.coordinates.slice();
var description = e.features[0].properties.description;
 
// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}
 
new mapboxgl.Popup()
.setLngLat(coordinates)
.setHTML(description)
.addTo(map);
});
 
// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'places', function() {
map.getCanvas().style.cursor = 'pointer';
});
 
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'places', function() {
map.getCanvas().style.cursor = '';
});
});