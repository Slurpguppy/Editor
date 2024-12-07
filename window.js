const openPopupButton = document.getElementById("open-popup");
const closePopupButton = document.getElementById("close-popup");
const snapRightButton = document.getElementById("snap-right");
const snapLeftButton = document.getElementById("snap-left");
const fullScreenButton = document.getElementById("full-screen"); // Reference to full-screen button
const popup = document.getElementById("popup");

// Open popup
openPopupButton.addEventListener("click", () => {
    popup.style.display = "block";
    openPopupButton.style.display = "none";
    closePopupButton.style.display = "inline";
    snapRightButton.style.display = "inline";
    snapLeftButton.style.display = "inline";
    fullScreenButton.style.display = "inline"; // Show full-screen button when popup is open

    // Ensure popup is fully visible on open
    constrainBounds();
});

// Close popup
closePopupButton.addEventListener("click", () => {
    popup.style.display = "none";
    closePopupButton.style.display = "none";
    snapRightButton.style.display = "none";
    snapLeftButton.style.display = "none";
    fullScreenButton.style.display = "none"; // Hide full-screen button when popup is closed
    openPopupButton.style.display = "inline";
});

// Snap the popup to the right half of the screen
snapRightButton.addEventListener("click", () => {
    popup.style.top = "0";
    popup.style.left = window.innerWidth / 2 + "px"; // Move to the right half
    popup.style.width = window.innerWidth / 2 + "px"; // Set width to half of screen
    popup.style.height = "99.5vh"; // Full height of the screen
});

// Snap the popup to the left half of the screen
snapLeftButton.addEventListener("click", () => {
    popup.style.top = "0";
    popup.style.left = "0"; // Move to the left half
    popup.style.width = window.innerWidth / 2 + "px"; // Set width to half of screen
    popup.style.height = "99.5vh"; // Full height of the screen
});

// Make the popup fullscreen
fullScreenButton.addEventListener("click", () => {
    popup.style.top = "0";
    popup.style.left = "0"; // Move to the top left
    popup.style.width = "100vw"; // Full width of the screen
    popup.style.height = "99.5vh"; // Full height of the screen
});

// Drag functionality
initDragElement();

function initDragElement() {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = popup.querySelector(".popup-header");

    if (header) {
        header.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        let newTop = popup.offsetTop - pos2;
        let newLeft = popup.offsetLeft - pos1;

        const maxTop = window.innerHeight - popup.offsetHeight;
        const maxLeft = window.innerWidth - popup.offsetWidth;

        if (newTop < 0) newTop = 0;
        if (newLeft < 0) newLeft = 0;
        if (newTop > maxTop) newTop = maxTop;
        if (newLeft > maxLeft) newLeft = maxLeft;

        popup.style.top = newTop + "px";
        popup.style.left = newLeft + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Resize functionality: ensure it stays strictly within bounds
const resizeObserver = new ResizeObserver(() => constrainBounds());
resizeObserver.observe(popup);

function constrainBounds() {
    const rect = popup.getBoundingClientRect();

    if (rect.left < 0) {
        popup.style.left = "0px";
    }
    if (rect.top < 0) {
        popup.style.top = "0px";
    }
    if (rect.right > window.innerWidth) {
        popup.style.width = window.innerWidth - rect.left + "px";
    }
    if (rect.bottom > window.innerHeight) {
        popup.style.height = window.innerHeight - rect.top + "px";
    }

    if (popup.offsetWidth > window.innerWidth) {
        popup.style.width = window.innerWidth + "px";
    }
    if (popup.offsetHeight > window.innerHeight) {
        popup.style.height = window.innerHeight + "px";
    }
}
