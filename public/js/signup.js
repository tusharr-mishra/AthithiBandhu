
document.addEventListener("DOMContentLoaded", () => {
    const countrySelect = document.getElementById("country");
    const citySelect = document.getElementById("city");
    const dateOfBirth = document.getElementById("dateOfBirth");
    const form = document.querySelector(".needs-validation");

    // Prevent selecting a future date of birth
    if (dateOfBirth) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        dateOfBirth.max = `${year}-${month}-${day}`;
    }

    if (form) {
        form.addEventListener("submit", (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add("was-validated");
        });
    }

    const API_URL = "https://countriesnow.space/api/v0.1";

    function setPlaceholder(select, text) {
        select.replaceChildren(new Option(text, ""));
    }

    async function loadCountries() {
        setPlaceholder(countrySelect, "Loading countries...");
        countrySelect.disabled = true;

        try {
            const response = await fetch(`${API_URL}/countries/iso`);
            if (!response.ok) {
                throw new Error("Could not fetch countries.");
            }

            const result = await response.json();

            if (result.error || !Array.isArray(result.data)) {
                throw new Error("Invalid country data received.");
            }

            setPlaceholder(countrySelect, "Select your country");

            result.data
                .map(item => item.name || item.country)
                .filter(Boolean)
                .sort((a, b) => a.localeCompare(b))
                .forEach(name => {
                    countrySelect.add(new Option(name, name));
                });

            countrySelect.disabled = false;
        } catch (error) {
            console.error("Country loading error:", error);
            setPlaceholder(countrySelect, "Unable to load countries");
        }
    }

    async function loadCities(country) {
        setPlaceholder(citySelect, "Loading cities...");
        citySelect.disabled = true;

        try {
            const response = await fetch(`${API_URL}/countries/cities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ country })
            });

            if (!response.ok) {
                throw new Error("Could not fetch cities.");
            }

            const result = await response.json();

            if (result.error || !Array.isArray(result.data)) {
                throw new Error("Invalid city data received.");
            }

            setPlaceholder(citySelect, "Select your city");

            result.data
                .filter(Boolean)
                .sort((a, b) => a.localeCompare(b))
                .forEach(city => {
                    citySelect.add(new Option(city, city));
                });

            citySelect.disabled = false;
        } catch (error) {
            console.error("City loading error:", error);
            setPlaceholder(citySelect, "Unable to load cities");
        }
    }

    countrySelect.addEventListener("change", () => {
        const country = countrySelect.value;

        setPlaceholder(citySelect, "Select a country first");
        citySelect.disabled = true;

        if (country) {
            loadCities(country);
        }
    });

    loadCountries();
});
