/**
 * AthithiBandhu - Image Upload Client Preview Logic (imagePreview.js)
 * Provides real-time preview of user-selected image before submitting form.
 */
(() => {
    "use strict";

    const imageInput = document.getElementById("image");
    const imagePreview = document.getElementById("imagePreview");
    const uploadPlaceholder = document.getElementById("uploadPlaceholder");
    let previewURL = null;

    if (!imageInput || !imagePreview) return;

    imageInput.addEventListener("change", function () {
        const file = this.files && this.files[0];
        if (!file) {
            if (uploadPlaceholder) {
                imagePreview.src = "";
                imagePreview.classList.add("d-none");
                uploadPlaceholder.classList.remove("d-none");
            }
            return;
        }

        const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!validTypes.includes(file.type)) {
            alert("Please select a valid image file (JPG, PNG, WEBP, or GIF).");
            this.value = "";
            return;
        }

        if (previewURL) {
            URL.revokeObjectURL(previewURL);
        }

        previewURL = URL.createObjectURL(file);
        imagePreview.src = previewURL;
        imagePreview.classList.remove("d-none");
        if (uploadPlaceholder) {
            uploadPlaceholder.classList.add("d-none");
        }
    });
})();

