/**
 * AthithiBandhu - Currency & Regional Tax Engine (utils/currency.js)
 * Automatically determines national currency, symbol, formatting locale,
 * and regional hospitality/lodging tax structure based on listing country.
 */

const COUNTRY_CURRENCY_MAP = {
    // North America
    "united states": { code: "USD", symbol: "$", locale: "en-US", taxRate: 0.14, taxLabel: "14% Lodging Tax & Fees" },
    "usa": { code: "USD", symbol: "$", locale: "en-US", taxRate: 0.14, taxLabel: "14% Lodging Tax & Fees" },
    "canada": { code: "CAD", symbol: "CA$ ", locale: "en-CA", taxRate: 0.13, taxLabel: "13% HST/GST" },
    "mexico": { code: "MXN", symbol: "MX$ ", locale: "es-MX", taxRate: 0.16, taxLabel: "16% IVA & Lodging Tax" },
    "costa rica": { code: "USD", symbol: "$", locale: "en-US", taxRate: 0.13, taxLabel: "13% IVA & Tourism Tax" },

    // Europe
    "united kingdom": { code: "GBP", symbol: "£", locale: "en-GB", taxRate: 0.20, taxLabel: "20% VAT & Hospitality Tax" },
    "uk": { code: "GBP", symbol: "£", locale: "en-GB", taxRate: 0.20, taxLabel: "20% VAT & Hospitality Tax" },
    "italy": { code: "EUR", symbol: "€", locale: "it-IT", taxRate: 0.12, taxLabel: "12% City & Tourist Tax" },
    "france": { code: "EUR", symbol: "€", locale: "fr-FR", taxRate: 0.12, taxLabel: "12% Tourist Tax & VAT" },
    "germany": { code: "EUR", symbol: "€", locale: "de-DE", taxRate: 0.12, taxLabel: "12% City Lodging Tax" },
    "spain": { code: "EUR", symbol: "€", locale: "es-ES", taxRate: 0.10, taxLabel: "10% Tourism Tax" },
    "greece": { code: "EUR", symbol: "€", locale: "el-GR", taxRate: 0.13, taxLabel: "13% Climate Crisis & VAT" },
    "netherlands": { code: "EUR", symbol: "€", locale: "nl-NL", taxRate: 0.125, taxLabel: "12.5% City Tourist Tax" },
    "ireland": { code: "EUR", symbol: "€", locale: "en-IE", taxRate: 0.135, taxLabel: "13.5% Tourism VAT" },
    "finland": { code: "EUR", symbol: "€", locale: "fi-FI", taxRate: 0.14, taxLabel: "14% Accommodation VAT" },
    "portugal": { code: "EUR", symbol: "€", locale: "pt-PT", taxRate: 0.13, taxLabel: "13% Tourism Tax & VAT" },
    "austria": { code: "EUR", symbol: "€", locale: "de-AT", taxRate: 0.10, taxLabel: "10% Lodging Tax" },
    "switzerland": { code: "CHF", symbol: "CHF ", locale: "de-CH", taxRate: 0.10, taxLabel: "10% Swiss Resort Tax" },
    "norway": { code: "NOK", symbol: "kr ", locale: "no-NO", taxRate: 0.12, taxLabel: "12% MVA" },
    "czech republic": { code: "CZK", symbol: "Kč ", locale: "cs-CZ", taxRate: 0.10, taxLabel: "10% City Tax" },

    // Asia & Pacific
    "india": { code: "INR", symbol: "₹", locale: "en-IN", taxRate: 0.18, taxLabel: "18% GST" },
    "japan": { code: "JPY", symbol: "¥", locale: "ja-JP", taxRate: 0.10, taxLabel: "10% Consumption Tax" },
    "united arab emirates": { code: "AED", symbol: "AED ", locale: "en-AE", taxRate: 0.10, taxLabel: "10% Tourism Fee & VAT" },
    "uae": { code: "AED", symbol: "AED ", locale: "en-AE", taxRate: 0.10, taxLabel: "10% Tourism Fee & VAT" },
    "singapore": { code: "SGD", symbol: "SG$ ", locale: "en-SG", taxRate: 0.09, taxLabel: "9% GST" },
    "thailand": { code: "THB", symbol: "฿", locale: "th-TH", taxRate: 0.07, taxLabel: "7% VAT" },
    "indonesia": { code: "IDR", symbol: "Rp ", locale: "id-ID", taxRate: 0.11, taxLabel: "11% PB1 Hospitality Tax" },
    "maldives": { code: "USD", symbol: "$", locale: "en-US", taxRate: 0.16, taxLabel: "16% TGST & Green Tax" },
    "fiji": { code: "FJD", symbol: "FJ$ ", locale: "en-FJ", taxRate: 0.15, taxLabel: "15% VAT & ECAL" },
    "french polynesia": { code: "USD", symbol: "$", locale: "en-US", taxRate: 0.14, taxLabel: "14% Resort Tax & VAT" },
    "new zealand": { code: "NZD", symbol: "NZ$ ", locale: "en-NZ", taxRate: 0.15, taxLabel: "15% GST" },
    "australia": { code: "AUD", symbol: "AU$ ", locale: "en-AU", taxRate: 0.10, taxLabel: "10% GST" },

    // Africa & Middle East
    "tanzania": { code: "USD", symbol: "$", locale: "en-US", taxRate: 0.18, taxLabel: "18% Safari VAT & Levy" },
    "kenya": { code: "USD", symbol: "$", locale: "en-US", taxRate: 0.16, taxLabel: "16% Tourism Levy & VAT" },
    "morocco": { code: "MAD", symbol: "MAD ", locale: "fr-MA", taxRate: 0.10, taxLabel: "10% City Tax & VAT" },
    "turkey": { code: "TRY", symbol: "₺", locale: "tr-TR", taxRate: 0.12, taxLabel: "12% Accommodation Tax" },
    "south africa": { code: "ZAR", symbol: "R ", locale: "en-ZA", taxRate: 0.15, taxLabel: "15% VAT" },
    "brazil": { code: "BRL", symbol: "R$ ", locale: "pt-BR", taxRate: 0.12, taxLabel: "12% ISS & Tax" }
};

const DEFAULT_CURRENCY = {
    code: "USD",
    symbol: "$",
    locale: "en-US",
    taxRate: 0.14,
    taxLabel: "14% Lodging Tax & Fees"
};

/**
 * Returns currency & tax details based on country string.
 * Supports exact match as well as substring match for cities/provinces.
 */
function getCurrencyInfo(country) {
    if (!country || typeof country !== "string") {
        return DEFAULT_CURRENCY;
    }

    const normalized = country.trim().toLowerCase();

    // 1. Direct exact lookup
    if (COUNTRY_CURRENCY_MAP[normalized]) {
        return COUNTRY_CURRENCY_MAP[normalized];
    }

    // 2. Substring matching for flexible detection
    if (normalized.includes("united states") || normalized === "us" || normalized === "usa") {
        return COUNTRY_CURRENCY_MAP["united states"];
    }
    if (normalized.includes("united kingdom") || normalized === "uk" || normalized.includes("britain") || normalized.includes("england") || normalized.includes("scotland")) {
        return COUNTRY_CURRENCY_MAP["united kingdom"];
    }
    if (normalized.includes("emirates") || normalized === "uae" || normalized.includes("dubai") || normalized.includes("abu dhabi")) {
        return COUNTRY_CURRENCY_MAP["united arab emirates"];
    }
    if (normalized.includes("italy")) return COUNTRY_CURRENCY_MAP["italy"];
    if (normalized.includes("france")) return COUNTRY_CURRENCY_MAP["france"];
    if (normalized.includes("germany")) return COUNTRY_CURRENCY_MAP["germany"];
    if (normalized.includes("spain")) return COUNTRY_CURRENCY_MAP["spain"];
    if (normalized.includes("greece")) return COUNTRY_CURRENCY_MAP["greece"];
    if (normalized.includes("netherlands") || normalized.includes("holland")) return COUNTRY_CURRENCY_MAP["netherlands"];
    if (normalized.includes("switzerland")) return COUNTRY_CURRENCY_MAP["switzerland"];
    if (normalized.includes("india")) return COUNTRY_CURRENCY_MAP["india"];
    if (normalized.includes("japan")) return COUNTRY_CURRENCY_MAP["japan"];
    if (normalized.includes("canada")) return COUNTRY_CURRENCY_MAP["canada"];
    if (normalized.includes("australia")) return COUNTRY_CURRENCY_MAP["australia"];
    if (normalized.includes("new zealand")) return COUNTRY_CURRENCY_MAP["new zealand"];
    if (normalized.includes("mexico")) return COUNTRY_CURRENCY_MAP["mexico"];
    if (normalized.includes("thailand")) return COUNTRY_CURRENCY_MAP["thailand"];
    if (normalized.includes("indonesia") || normalized.includes("bali")) return COUNTRY_CURRENCY_MAP["indonesia"];
    if (normalized.includes("maldives")) return COUNTRY_CURRENCY_MAP["maldives"];
    if (normalized.includes("tanzania")) return COUNTRY_CURRENCY_MAP["tanzania"];
    if (normalized.includes("kenya")) return COUNTRY_CURRENCY_MAP["kenya"];
    if (normalized.includes("costa rica")) return COUNTRY_CURRENCY_MAP["costa rica"];
    if (normalized.includes("fiji")) return COUNTRY_CURRENCY_MAP["fiji"];
    if (normalized.includes("morocco")) return COUNTRY_CURRENCY_MAP["morocco"];
    if (normalized.includes("turkey")) return COUNTRY_CURRENCY_MAP["turkey"];
    if (normalized.includes("norway")) return COUNTRY_CURRENCY_MAP["norway"];
    if (normalized.includes("czech")) return COUNTRY_CURRENCY_MAP["czech republic"];
    if (normalized.includes("ireland")) return COUNTRY_CURRENCY_MAP["ireland"];
    if (normalized.includes("finland")) return COUNTRY_CURRENCY_MAP["finland"];
    if (normalized.includes("polynesia") || normalized.includes("tahiti") || normalized.includes("bora bora")) return COUNTRY_CURRENCY_MAP["french polynesia"];

    return DEFAULT_CURRENCY;
}

/**
 * Formats numeric price with the country's native currency symbol and separators.
 */
function formatPrice(price, country) {
    const num = Number(price);
    if (!Number.isFinite(num)) return "";

    const info = getCurrencyInfo(country);
    const formatter = new Intl.NumberFormat(info.locale, {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    });

    const prefix = info.symbol.endsWith(" ") ? info.symbol : info.symbol + " ";
    return prefix + formatter.format(num);
}

module.exports = {
    getCurrencyInfo,
    formatPrice,
    COUNTRY_CURRENCY_MAP,
    DEFAULT_CURRENCY
};
