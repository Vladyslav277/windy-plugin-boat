W.define('plugin', function () {
    return {
        name: 'Boat Visual Aid',
        version: '1.0',
        author: 'Your Name',
        onload: function () {
            const map = W.map;
            let overlay = null;

            function createOverlay() {
                if (overlay) return;

                overlay = document.createElement('div');
                overlay.style.position = 'absolute';
                overlay.style.right = '10px';
                overlay.style.bottom = '10px';
                overlay.style.background = 'rgba(255,255,255,0.95)';
                overlay.style.padding = '10px';
                overlay.style.fontFamily = 'Arial';
                overlay.style.fontSize = '12px';
                overlay.style.border = '1px solid #ccc';
                overlay.style.zIndex = 9999;
                overlay.innerHTML = 'Loading marine data...';
                document.body.appendChild(overlay);
            }

            function updateData(lat, lon) {
                const wind = W.interpolator.get('wind', lat, lon);
                const waves = W.interpolator.get('waves', lat, lon);
                const swell = W.interpolator.get('swell1', lat, lon);
                const swellPeriod = W.interpolator.get('swell_period', lat, lon);
                const current = W.interpolator.get('currents', lat, lon);

                let html = `<strong>Coordinates:</strong> ${lat.toFixed(2)}, ${lon.toFixed(2)}<br><br>`;
                if (wind) html += `<strong>Wind:</strong> ${wind.speed.toFixed(1)} m/s, ${wind.direction.toFixed(0)}°<br>`;
                if (waves) html += `<strong>Waves:</strong> ${waves.height.toFixed(1)} m, ${waves.direction.toFixed(0)}°<br>`;
                if (swell) html += `<strong>Swell:</strong> ${swell.height.toFixed(1)} m, ${swell.direction.toFixed(0)}°<br>`;
                if (swellPeriod) html += `<strong>Swell Period:</strong> ${swellPeriod.toFixed(1)} s<br>`;
                if (current) html += `<strong>Current:</strong> ${current.speed.toFixed(1)} m/s, ${current.direction.toFixed(0)}°<br>`;

                overlay.innerHTML = html;
            }

            createOverlay();

            setInterval(() => {
                const pos = W && W.route && W.route.currentPosition;
                if (pos && pos.lat && pos.lon) {
                    updateData(pos.lat, pos.lon);
                }
            }, 3000);
        }
    };
});
