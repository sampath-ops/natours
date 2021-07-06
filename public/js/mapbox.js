export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic2FtcGF0aDA0IiwiYSI6ImNrcTNkNjJsejA0NjMycW50cWlkd29laTMifQ.b1-zGv3daR0_GT3zEyOqjg';

  // create map using mapboxgl object
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/sampath04/ckq3lw9cy1vhc17mnoafp3gxd',
    scrollZoom: false,
  });

  // area we want in the map to show
  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //CREATE A MARKER FOR A LOCATION
    const el = document.createElement('div');
    el.className = 'marker';
    // ADD THE MARKER IN THE Map
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    // ADD THE POP UP
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // extend the bounds to include current location in map
    bounds.extend(loc.coordinates);
  });

  // fit the bound to fit the location visible
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
