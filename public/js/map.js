(() => {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    const mapToken = mapElement.dataset.mapToken;
    const titleElement = document.querySelector("h2");
    const locationInput = document.getElementById("location");
    const countryInput = document.getElementById("country");
    const statusElement = document.getElementById("mapStatus");
    const isPreview = mapElement.dataset.previewMode === "true";

    let map = null;
    let marker = null;
    let geocodeTimer = null;
    let requestNumber = 0;

    const getLocation = () => locationInput ? locationInput.value.trim() : (mapElement.dataset.location || "").trim();
    const getCountry = () => countryInput ? countryInput.value.trim() : (mapElement.dataset.country || "").trim();
    const getTitle = () => {
        const titleInput = document.getElementById("title");
        return titleInput ? titleInput.value.trim() : (mapElement.dataset.title || "Listing");
    };

    const setStatus = (message) => {
        if (statusElement) statusElement.textContent = message;
    };

    const validCoordinates = (coordinates) =>
        Array.isArray(coordinates) &&
        coordinates.length === 2 &&
        Number.isFinite(Number(coordinates[0])) &&
        Number.isFinite(Number(coordinates[1])) &&
        Number(coordinates[0]) >= -180 && Number(coordinates[0]) <= 180 &&
        Number(coordinates[1]) >= -90 && Number(coordinates[1]) <= 90;

    const showPlaceholder = (message) => {
        if (map) {
            map.remove();
            map = null;
            marker = null;
        }
        mapElement.innerHTML = "";
        const placeholder = document.createElement("div");
        placeholder.className = "map-placeholder";
        placeholder.textContent = message;
        mapElement.appendChild(placeholder);
    };

    const drawMap = (coordinates, placeName, countryName) => {
        if (typeof mapboxgl === "undefined") {
            showPlaceholder("Map library did not load. Check the Mapbox GL JS script in boilerplate.ejs.");
            setStatus("Map could not load because Mapbox GL JS is unavailable.");
            return;
        }

        if (map) {
            map.remove();
            map = null;
            marker = null;
        }

        mapElement.innerHTML = "";
        mapboxgl.accessToken = mapToken;
        map = new mapboxgl.Map({
            container: mapElement,
            style: "mapbox://styles/mapbox/streets-v12",
            center: coordinates,
            zoom: 10,
            attributionControl: true
        });

        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        map.addControl(new mapboxgl.FullscreenControl(), "top-right");

        const popupContent = document.createElement("div");
        const popupTitle = document.createElement("strong");
        popupTitle.textContent = getTitle() || "Listing";
        const popupLocation = document.createElement("p");
        popupLocation.className = "mb-0";
        popupLocation.textContent = [placeName, countryName].filter(Boolean).join(", ");
        popupContent.append(popupTitle, popupLocation);

        const popup = new mapboxgl.Popup({ offset: 25, closeButton: true }).setDOMContent(popupContent);
        marker = new mapboxgl.Marker({ color: "#dc3545" }).setLngLat(coordinates).setPopup(popup).addTo(map);

        map.on("load", () => map.resize());
        setStatus(`Map location: ${[placeName, countryName].filter(Boolean).join(", ")}`);
    };

    const geocodeLocation = async () => {
        const location = getLocation();
        const country = getCountry();
        const query = [location, country].filter(Boolean).join(", ");
        const currentRequest = ++requestNumber;

        if (!mapToken) {
            showPlaceholder("Mapbox token is missing.");
            setStatus("Set MAPBOX_TOKEN in your .env file and expose it to the page.");
            return;
        }

        if (!location || !country) {
            showPlaceholder("Enter both a location and country to preview the map.");
            setStatus("Enter a location and country to preview the map.");
            return;
        }

        setStatus("Finding the location…");

        try {
            const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?limit=1&access_token=${encodeURIComponent(mapToken)}`;
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error(`Geocoding request failed (${response.status}).`);
            const result = await response.json();

            if (currentRequest !== requestNumber) return;

            const feature = result.features && result.features[0];
            const coordinates = feature && feature.center;

            if (!validCoordinates(coordinates)) {
                showPlaceholder("No matching location found. Try a more specific city or address.");
                setStatus("No matching location found. Check the location and country.");
                return;
            }

            drawMap(coordinates.map(Number), location, country);
        } catch (error) {
            if (currentRequest !== requestNumber) return;
            showPlaceholder("The map location could not be loaded.");
            setStatus(`${error.message} Check your Mapbox token and network connection.`);
        }
    };

    if (!mapToken) {
        showPlaceholder("Mapbox token is missing.");
        setStatus("Set MAPBOX_TOKEN in your .env file and expose it to the page.");
        return;
    }

    if (locationInput && countryInput) {
        const scheduleGeocode = () => {
            clearTimeout(geocodeTimer);
            geocodeTimer = setTimeout(geocodeLocation, 600);
        };
        locationInput.addEventListener("input", scheduleGeocode);
        countryInput.addEventListener("input", scheduleGeocode);
        const titleInput = document.getElementById("title");
        if (titleInput) {
            titleInput.addEventListener("input", () => {
                const popupTitle = mapElement.querySelector(".mapboxgl-popup-content strong");
                if (popupTitle) popupTitle.textContent = titleInput.value.trim() || "Listing";
            });
        }
    }

    if (isPreview) {
        geocodeLocation();
        return;
    }

    let savedCoordinates = [];
    try {
        savedCoordinates = JSON.parse(mapElement.dataset.coordinates || "[]");
    } catch (error) {
        savedCoordinates = [];
    }

    // Check if coordinates are the static New Delhi fallback placeholder [77.209, 28.6139]
    const isDelhiFallback = (coords) => {
        if (!validCoordinates(coords)) return true;
        const [lng, lat] = coords.map(Number);
        const isDelhiCoords = Math.abs(lng - 77.209) < 0.05 && Math.abs(lat - 28.6139) < 0.05;
        const placeString = (getLocation() + " " + getCountry()).toLowerCase();
        const actuallyInDelhi = placeString.includes("delhi");
        return isDelhiCoords && !actuallyInDelhi;
    };

    if (validCoordinates(savedCoordinates) && !isDelhiFallback(savedCoordinates)) {
        drawMap(savedCoordinates.map(Number), getLocation(), getCountry());
    } else {
        geocodeLocation();
    }
})();
