/**
 * AthithiBandhu - Real-Time Booking Date & Price Calculator (booking.js)
 * Manages calendar boundaries and live calculation of stay pricing and taxes.
 */
(() => {
    "use strict";

    const bookingForm = document.getElementById("bookingForm");
    if (!bookingForm) return;

    const checkInInput = document.getElementById("checkInDate");
    const checkOutInput = document.getElementById("checkOutDate");
    const nightsLabel = document.getElementById("nightsLabel");
    const baseTotalVal = document.getElementById("baseTotalVal");
    const taxVal = document.getElementById("taxVal");
    const beforeTaxVal = document.getElementById("beforeTaxVal");
    const grandTotalVal = document.getElementById("grandTotalVal");

    const nightlyRate = Number(bookingForm.dataset.nightlyRate) || 0;
    const taxRate = Number(bookingForm.dataset.taxRate) || 0.14;
    const submitBtn = bookingForm.querySelector("button[type='submit']");
    const availabilityNotice = document.getElementById("availabilityNotice");

    let bookedDates = [];
    try {
        bookedDates = JSON.parse(bookingForm.dataset.bookedDates || "[]");
    } catch (e) {
        bookedDates = [];
    }

    const formatDateISO = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    };

    const parseDateISO = (str) => {
        if (!str || typeof str !== "string") return null;
        const trimmed = str.trim();
        // Handle YYYY-MM-DD
        if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
            const [y, m, d] = trimmed.split("-").map(Number);
            return new Date(y, m - 1, d);
        }
        // Handle DD-MM-YYYY
        if (/^\d{2}-\d{2}-\d{4}$/.test(trimmed)) {
            const [d, m, y] = trimmed.split("-").map(Number);
            return new Date(y, m - 1, d);
        }
        const d = new Date(trimmed);
        return isNaN(d.getTime()) ? null : d;
    };

    // Format currency amount based on current page's active currency config
    const formatAmount = (amount) => {
        const priceEl = document.querySelector(".booking-price-val");
        const sampleText = priceEl ? priceEl.textContent.trim() : "";
        const symbolMatch = sampleText.match(/^[^\d\s]+/);
        const prefix = symbolMatch ? symbolMatch[0] + " " : "$ ";

        return prefix + Math.round(amount).toLocaleString();
    };

    // Setup initial calendar minimums (Today onward; dates start clean/empty for user selection)
    const today = new Date();
    const todayStr = formatDateISO(today);

    checkInInput.min = todayStr;
    checkOutInput.min = todayStr;

    // Do NOT set checkInInput.value or checkOutInput.value to fixed dates!
    // Guests can freely select their own arrival and departure dates.

    const recalculate = () => {
        const inDate = parseDateISO(checkInInput.value);
        let outDate = parseDateISO(checkOutInput.value);

        // When Check-In is picked, adjust Checkout minimum to at least checkIn + 1 day
        if (inDate) {
            const nextDay = new Date(inDate);
            nextDay.setDate(nextDay.getDate() + 1);
            checkOutInput.min = formatDateISO(nextDay);
        } else {
            checkOutInput.min = todayStr;
        }

        // When dates are not yet selected, display base 1-night rate as starting guide
        if (!inDate || !outDate) {
            if (nightsLabel) nightsLabel.textContent = "1 night stay (base rate)";
            if (baseTotalVal) baseTotalVal.textContent = formatAmount(nightlyRate);
            if (taxVal) taxVal.textContent = formatAmount(Math.round(nightlyRate * taxRate));
            if (beforeTaxVal) beforeTaxVal.textContent = formatAmount(nightlyRate);
            if (grandTotalVal) grandTotalVal.textContent = formatAmount(Math.round(nightlyRate * (1 + taxRate)));
            if (availabilityNotice) availabilityNotice.innerHTML = "";
            if (submitBtn) submitBtn.disabled = false;
            return;
        }

        // Check if checkout is after check-in
        if (outDate <= inDate) {
            if (availabilityNotice) {
                availabilityNotice.innerHTML = `<span class="text-danger fw-semibold"><i class="fa-solid fa-triangle-exclamation me-1"></i>Checkout must be after check-in</span>`;
            }
            if (submitBtn) submitBtn.disabled = true;
            return;
        }

        const diffTime = outDate.getTime() - inDate.getTime();
        const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

        // Check availability against already reserved inventory
        const requestedDates = [];
        const cur = new Date(inDate);
        while (cur < outDate) {
            requestedDates.push(formatDateISO(cur));
            cur.setDate(cur.getDate() + 1);
        }

        const isUnavailable = requestedDates.some((d) => bookedDates.includes(d));
        if (isUnavailable) {
            if (availabilityNotice) {
                availabilityNotice.innerHTML = `<span class="text-danger fw-semibold"><i class="fa-solid fa-circle-xmark me-1"></i>Dates already booked</span>`;
            }
            if (submitBtn) submitBtn.disabled = true;
        } else {
            if (availabilityNotice) {
                availabilityNotice.innerHTML = `<span class="text-success fw-semibold"><i class="fa-solid fa-circle-check me-1"></i>Dates available</span>`;
            }
            if (submitBtn) submitBtn.disabled = false;
        }

        const baseTotal = nightlyRate * nights;
        const taxTotal = Math.round(baseTotal * taxRate);
        const grandTotal = baseTotal + taxTotal;

        if (nightsLabel) nightsLabel.textContent = `${nights} night${nights > 1 ? "s" : ""} stay`;
        if (baseTotalVal) baseTotalVal.textContent = formatAmount(baseTotal);
        if (taxVal) taxVal.textContent = formatAmount(taxTotal);
        if (beforeTaxVal) beforeTaxVal.textContent = formatAmount(baseTotal);
        if (grandTotalVal) grandTotalVal.textContent = formatAmount(grandTotal);
    };

    checkInInput.addEventListener("change", recalculate);
    checkOutInput.addEventListener("change", recalculate);
    checkInInput.addEventListener("input", recalculate);
    checkOutInput.addEventListener("input", recalculate);

    // Initial calculation on load
    recalculate();
})();
