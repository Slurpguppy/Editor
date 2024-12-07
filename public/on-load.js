document.addEventListener("DOMContentLoaded", function() {
    const onload = document.getElementById("onload");
    const closeonload = document.getElementById("closeonload");

    // Show the popup when the page loads
    onload.style.display = "flex";

    // Close the popup when the close button is clicked
    closeonload.addEventListener("click", function() {
        onload.style.display = "none";
    });
});