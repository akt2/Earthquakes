var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';

d3.json(url, function(d) {createFeatures(d.features);});

function createFeatures(eqd) {
  function onEachFeature(feature, layer) {
    layer.bindPopup('<h2>'+feature.properties.place+'</h2><hr><p>'
    +new Date(feature.properties.time).toDateString()+'</p><hr><p>Magnitude: '
    +feature.properties.mag+'</p>')}
  var quakes = L.geoJSON(eqd, {onEachFeature: onEachFeature});
  createMap(quakes);}

function createMap(quakes) {
  var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: api});
  var outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: api});
  var streetmaps = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: api});
  var baseMaps = {
    "Satellite Imagery": satellite,
    "Topographic Imagery": outdoors,
    "Infrastructure": streetmaps};
  var overlayMaps = {
    Earthquakes: quakes};
  var myMap = L.map("map", {
    center: [-21.16, 166.28],
    zoom: 7.5,
    layers: [satellite, quakes]});
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false}).addTo(myMap);}

d3.json(url, function(r) {
  var drops = L.markerClusterGroup();
  for (var x = 0; x < r.length; x++) {
    var loc = r[x].place;
    if (loc) {
      drops.addLayer(L.marker([loc.coordinates[1], loc.coordinates[0]])
        .bindPopup(r[x].descriptor));
    }
  }
  myMap.addLayer(drops);

  
});