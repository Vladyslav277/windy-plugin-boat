// Registering the plugin
W.definePlugin('boat-navigation', function () {
    
    const map = W.require('map'); // Accessing the map
    const picker = W.require('picker'); // Tool for weather data selection

    let boatMarker = null;
    let route = [];
    let speed = 10; // Ship speed in knots
    
    function loadGPX(gpxData) {
        // Loading GPX file and creating a route
        route = parseGPX(gpxData);
        updateBoatPosition();
    }
    
    function parseGPX(gpxData) {
        // Simplified GPX parsing (should be replaced with real GPX parser)
        return [
            { lat: 40.0, lon: -50.0, time: '2025-03-06T12:00:00Z' },
            { lat: 41.0, lon: -51.0, time: '2025-03-06T14:00:00Z' }
        ];
    }

    function updateBoatPosition() {
        if (!route.length) return;

        if (boatMarker) map.removeLayer(boatMarker);
        
        let pos = route[0]; // First route point
        boatMarker = L.marker([pos.lat, pos.lon]).addTo(map);
    }

    function showWeatherData() {
        picker.open({ lat: route[0].lat, lon: route[0].lon });
    }

    return {
        loadGPX,
        showWeatherData
    };
});

// Auto-loading the plugin
W.plugins['boat-navigation'].loadGPX('<GPX-DATA>');