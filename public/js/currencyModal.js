/**
 * AthithiBandhu - Language & Currency Modal Client Logic (currencyModal.js)
 * Manages user's global language preference and real-time currency conversion.
 */
(() => {
    "use strict";

    const STORAGE_CURRENCY_KEY = "athithibandhu_currency";
    const STORAGE_LANG_KEY = "athithibandhu_language";

    const CURRENCY_CONFIG = {
        ORIGINAL: { name: "Original Regional", symbol: "", rate: 1, locale: "en-US" },
        USD: { name: "United States Dollar", symbol: "$", rate: 1, locale: "en-US" },
        INR: { name: "Indian Rupee", symbol: "₹", rate: 86, locale: "en-IN" },
        EUR: { name: "Euro", symbol: "€", rate: 0.92, locale: "de-DE" },
        GBP: { name: "British Pound", symbol: "£", rate: 0.78, locale: "en-GB" },
        CHF: { name: "Swiss Franc", symbol: "CHF", rate: 0.90, locale: "de-CH" },
        JPY: { name: "Japanese Yen", symbol: "¥", rate: 152, locale: "ja-JP" },
        AED: { name: "Emirati Dirham", symbol: "AED", rate: 3.67, locale: "en-AE" },
        CAD: { name: "Canadian Dollar", symbol: "CA$", rate: 1.36, locale: "en-CA" },
        AUD: { name: "Australian Dollar", symbol: "AU$", rate: 1.52, locale: "en-AU" }
    };

    const langItems = document.querySelectorAll(".lang-item");
    const currencyItems = document.querySelectorAll(".currency-item");
    const statusText = document.getElementById("preferenceStatus");

    function getSavedCurrency() {
        return localStorage.getItem(STORAGE_CURRENCY_KEY) || "ORIGINAL";
    }

    function getSavedLanguage() {
        return localStorage.getItem(STORAGE_LANG_KEY) || "en-US";
    }

    function formatNumber(amount, locale) {
        return new Intl.NumberFormat(locale, {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        }).format(Math.round(amount));
    }

    // Convert or restore listing prices on the page
    function applyCurrencyPreference(currencyCode) {
        const config = CURRENCY_CONFIG[currencyCode] || CURRENCY_CONFIG.ORIGINAL;
        const taxSwitch = document.getElementById("taxSwitch");
        const includeTaxes = taxSwitch ? taxSwitch.checked : false;
        const priceElements = document.querySelectorAll(".listing-price");

        priceElements.forEach(priceEl => {
            const basePrice = Number(priceEl.dataset.basePrice);
            if (!Number.isFinite(basePrice)) return;

            const nativeSymbol = priceEl.dataset.currencySymbol || "$";
            const nativeLocale = priceEl.dataset.locale || "en-US";
            const taxRate = Number(priceEl.dataset.taxRate) || 0.14;

            let finalSymbol;
            let finalLocale;
            let finalAmount;

            if (currencyCode === "ORIGINAL") {
                finalSymbol = nativeSymbol;
                finalLocale = nativeLocale;
                finalAmount = includeTaxes ? Math.round(basePrice * (1 + taxRate)) : basePrice;
            } else {
                finalSymbol = config.symbol;
                finalLocale = config.locale;
                
                // Approximate standard normalization: basePrice scaled by target rate
                let usdEstimate = basePrice;
                if (nativeSymbol === "₹") usdEstimate = basePrice / 86;
                else if (nativeSymbol === "€") usdEstimate = basePrice / 0.92;
                else if (nativeSymbol === "£") usdEstimate = basePrice / 0.78;
                else if (nativeSymbol === "¥") usdEstimate = basePrice / 152;
                else if (nativeSymbol.includes("AED")) usdEstimate = basePrice / 3.67;
                else if (nativeSymbol.includes("Rp")) usdEstimate = basePrice / 15800;
                else if (nativeSymbol.includes("MX")) usdEstimate = basePrice / 20;

                const converted = usdEstimate * config.rate;
                finalAmount = includeTaxes ? Math.round(converted * (1 + taxRate)) : Math.round(converted);
            }

            const prefix = finalSymbol ? (finalSymbol.endsWith(" ") ? finalSymbol : finalSymbol + " ") : "$ ";
            priceEl.textContent = prefix + formatNumber(finalAmount, finalLocale);
        });

        // Update active UI item in modal
        currencyItems.forEach(item => {
            const matches = item.dataset.currency === currencyCode;
            item.classList.toggle("active", matches);
        });

        if (statusText) {
            statusText.textContent = `Display currency: ${config.name} (${currencyCode === "ORIGINAL" ? "Native" : config.symbol})`;
        }
    }

    // Attach click listeners to currency options
    currencyItems.forEach(item => {
        item.addEventListener("click", () => {
            const code = item.dataset.currency;
            localStorage.setItem(STORAGE_CURRENCY_KEY, code);
            applyCurrencyPreference(code);
        });
    });

    // Attach click listeners to language options
    langItems.forEach(item => {
        item.addEventListener("click", () => {
            const langCode = item.dataset.lang;
            const langName = item.dataset.langName;
            localStorage.setItem(STORAGE_LANG_KEY, langCode);

            langItems.forEach(btn => btn.classList.toggle("active", btn === item));

            if (statusText) {
                statusText.textContent = `Language preference set to: ${langName}`;
            }
        });
    });

    // Initialize saved preferences
    document.addEventListener("DOMContentLoaded", () => {
        const savedLang = getSavedLanguage();
        langItems.forEach(item => {
            item.classList.toggle("active", item.dataset.lang === savedLang);
        });

        const savedCurrency = getSavedCurrency();
        if (savedCurrency !== "ORIGINAL") {
            applyCurrencyPreference(savedCurrency);
        }
    });
})();
