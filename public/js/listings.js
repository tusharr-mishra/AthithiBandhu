/**
 * AthithiBandhu - Listings Page Client-Side Logic (listings.js)
 * Manages category slider navigation and dynamic tax calculation toggling.
 */
(() => {
    "use strict";

    // 1. Horizontal Category Filter Scrolling
    const filters = document.getElementById("filters");
    const leftButton = document.getElementById("filterLeft");
    const rightButton = document.getElementById("filterRight");

    function updateArrowButtons() {
        if (!filters || !leftButton || !rightButton) return;
        const maxScroll = filters.scrollWidth - filters.clientWidth;
        leftButton.disabled = filters.scrollLeft <= 4;
        rightButton.disabled = filters.scrollLeft >= maxScroll - 4;
    }

    if (leftButton && rightButton && filters) {
        leftButton.addEventListener("click", () => {
            filters.scrollBy({ left: -260, behavior: "smooth" });
        });

        rightButton.addEventListener("click", () => {
            filters.scrollBy({ left: 260, behavior: "smooth" });
        });

        filters.addEventListener("scroll", updateArrowButtons);
        window.addEventListener("resize", updateArrowButtons);
        updateArrowButtons();
    }

    // 2. Real-Time Display Taxes Toggle with Dynamic Regional Currency & Tax Structure
    const taxBox = document.getElementById("taxToggleBox");
    const taxSwitch = document.getElementById("taxSwitch");
    const listingPrices = document.querySelectorAll(".listing-price");
    const taxLabels = document.querySelectorAll(".tax-included-label");

    function formatLocalizedPrice(amount, symbol, locale) {
        const formatter = new Intl.NumberFormat(locale || "en-US", {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        });
        const prefix = symbol ? (symbol.endsWith(" ") ? symbol : symbol + " ") : "$ ";
        return prefix + formatter.format(amount);
    }

    function updateListingPrices() {
        if (!taxSwitch) return;
        const includeTaxes = taxSwitch.checked;

        if (taxBox) {
            taxBox.classList.toggle("active", includeTaxes);
        }

        listingPrices.forEach(priceElement => {
            const basePrice = Number(priceElement.dataset.basePrice);
            if (!Number.isFinite(basePrice)) return;

            const symbol = priceElement.dataset.currencySymbol || "$";
            const locale = priceElement.dataset.locale || "en-US";
            const taxRate = Number(priceElement.dataset.taxRate) || 0.14;

            const displayedPrice = includeTaxes
                ? Math.round(basePrice * (1 + taxRate))
                : basePrice;

            priceElement.textContent = formatLocalizedPrice(displayedPrice, symbol, locale);
        });

        taxLabels.forEach(label => {
            label.hidden = !includeTaxes;
        });
    }

    if (taxBox && taxSwitch) {
        taxBox.addEventListener("click", (e) => {
            if (e.target !== taxSwitch) {
                taxSwitch.checked = !taxSwitch.checked;
                updateListingPrices();
            }
        });

        taxSwitch.addEventListener("change", updateListingPrices);
    }
})();
