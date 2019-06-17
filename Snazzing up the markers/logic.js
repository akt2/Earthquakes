var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';

d3.json(url, function(d) {createFeatures(d.features);});



function createFeatures(eqd) {
//   function circles(coord,c,s) {return new L.CircleMarker(
//     coord, {color: c, fillColor: c, fillOpacity: 0.75, radius: s},
//       function coord(feature) {L.latlng(feature.geometry.longitude,
//         feature.geometry.latitude)},
//       function coloring(feature) {return c = feature.properties.alert},
//       function sizing(feature) {return s = feature.properties.mag*10000});}

      // SURPRISE!! it didn't work BUT progress because my
      // additions no longer ruin everything.

  // function onEachFeature(feature, layer) {
  //   layer.bindPopup('<h2>'+feature.properties.place+'</h2><hr><p>'
  //   +new Date(feature.properties.time).toDateString()+'</p><hr><p>Magnitude: '
  //   +feature.properties.mag+'</p>');} 

  // a greater diversity of blunders...
  // commenting out the onEachFeature block removes the popups and doesn't affect the markers in the slightest
  // which means my circle debacle is in the wrong place.

  // var quakes = L.geoJSON(eqd, {
  //   onEachFeature: function onEachFeature(feature, layer) {
  //     layer.bindPopup('<h2>'+feature.properties.place+'</h2><hr><p>'
  //     +new Date(feature.properties.time).toDateString()+'</p><hr><p>Magnitude: '
  //     +feature.properties.mag+'</p>')},
  //   pointToLayer: function circles(coord,c,s) {return new L.CircleMarker(
  //     coord, {color: c, fillColor: c, fillOpacity: 0.75, radius: s},
  //       function coord(feature) {L.latlng(feature.geometry.longitude,
  //         feature.geometry.latitude)},
  //       function coloring(feature) {return c = feature.properties.alert},
  //       function sizing(feature) {return s = feature.properties.mag*10000});}})
   // function circles(coord,c,s) {return new L.CircleMarker(
  //         coord, {color: c, fillColor: c, fillOpacity: 0.75, radius: s},
  //           function coord(feature) {L.latlng(feature.geometry.longitude,
  //             feature.geometry.latitude)},
  //           function coloring(feature) {return c = feature.properties.alert},
  //           function sizing(feature) {return s = feature.properties.mag*10000});}

        // AHA!!! I have found the right place. but everything is broken and very unhappy. Map's still there though! :D
  var circles = {
    radius: 20,
    // radius: function(feature) {return feature.properties.mag*5000},
    // I MADE A CIRCLE!!!! 10000 is way too big.
    color: '#e32636',
    fillColor: '#ff6961',
    opacity: 0.8,
    fillOpacity: 0.5
  };

  // var latlng = function(feature) {L.latlng(feature.geometry.longitude, feature.geometry.latitude);};
//  redefining latlng isn't necessary apparently.

  var quakes = L.geoJSON(eqd, {
    pointToLayer: function (feature, latlng) {return new L.CircleMarker(latlng,circles)},
    onEachFeature: function onEachFeature(feature, layer) {
      layer.bindPopup('<h2>'+feature.properties.place+'</h2><hr><p>'
      +new Date(feature.properties.time).toDateString()+'</p><hr><p>Magnitude: '
      +feature.properties.mag+'</p>')}});
        
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
