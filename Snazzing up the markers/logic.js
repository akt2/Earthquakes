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
  
  // var latlng = function(feature) {L.latlng(feature.geometry.longitude, feature.geometry.latitude);};
  //  redefining latlng isn't necessary apparently.
  
  // function coloringAlert(a) {
  //   switch (a) {
  //     case 'green': return '#50e292';
  //     case 'yellow': return '#f6e683';
  //     case 'orange': return '#f19f41';
  //     case 'red': return '#f4391f';
  //     default: return '#1fa9f4';
  //   }
  // }
  // function coloringMagcat(m) {
  //   switch (m) {
  //     case m<=1: return '#8dff1a';
  //     case 1<m<=2: return '#e4ff4d';
  //     case 2<m<=3: return '#fffe42';
  //     case 3<m<=4: return '#ffd14d';
  //     case 4<m<=5: return '#ff9c1a';
  //     case 5<m<=6: return '#ff794d';
  //     case 6<m<=7: return '#ff4242';
  //     default: return '#ff4242';
  //   }
  // } // well that didn't work.
  function coloringMagchlor(m) {
    return m > 6 ? '#ff4242':
           m > 5 ? '#ff794d':
           m > 4 ? '#ff9c1a':
           m > 3 ? '#ffd14d':
           m > 2 ? '#fffe42':
           m > 1 ? '#e4ff4d':
           '#ff1fa9f4';
  } // DID IT!!! 
  function sizing(s) {
    return s*5
  }
  
  // var circles = {
  //   radius: 20,
  //   // radius: function(feature) {return feature.properties.mag*5000},
  //   // I MADE A CIRCLE!!!! 10000 is way too big.
  //   color: '#e32636',
  //   fillColor: coloring(feature.properties.alert),
  //   opacity: 0.8,
  //   fillOpacity: 0.5}

// NOW i need to figure out how to render the circle properties from the geojson.
// I GOT SIZING TO WORK!!!!
// Sizing currently reflects the alert, not the actually magnitude. It's categorical instead of continuous.
// I could still grade the magnitude into categories.

  var quakes = L.geoJSON(eqd, {
    pointToLayer: function (feature, latlng) {return new L.CircleMarker(latlng,{
      radius: sizing(feature.properties.mag),
      fillOpacity: 0.7,
      color: coloringMagchlor(feature.properties.mag)
    });},
    onEachFeature: function onEachFeature(feature, layer) {
      layer.bindPopup('<h2>'+feature.properties.place+'</h2><hr><p>'
      +new Date(feature.properties.time).toDateString()+'</p><hr><p>Magnitude: '
      +feature.properties.mag+'</p>')}});

      // Putting this variable here instead of above does weird things. Probably punctuation related.

  // var circles = {
  //   radius: 20,
  //   // radius: function(feature) {return feature.properties.mag*5000},
  //   // I MADE A CIRCLE!!!! 10000 is way too big.
  //   color: '#e32636',
  //   fillColor: '#ff6961',
  //   opacity: 0.8,
  //   fillOpacity: 0.5
  // }
       
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
