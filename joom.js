// Add this script to your project (create a new file named "zoom.js")

function imageZoom(imgID, resultID) {
    const img = document.getElementById(imgID);
    const result = document.getElementById(resultID);

    // Create a lens
    const lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");

    // Insert the lens
    img.parentElement.insertBefore(lens, img);

    // Calculate the ratio between result DIV and lens
    const cx = result.offsetWidth / lens.offsetWidth;
    const cy = result.offsetHeight / lens.offsetHeight;

    // Set background properties for the result DIV
    result.style.backgroundImage = `url('${img.src}')`;
    result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;

    // Execute a function when someone moves the cursor over the image or the lens
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);

    // For touch screens
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);}
    

    function moveLens(e) {
        e.preventDefault();

        // Get the cursor's x and y positions
        const pos = getCursorPos(e);
        let x = pos.x - lens.offsetWidth / 2;
        let y = pos.y - lens.offsetHeight / 2;

        // Prevent the lens from being positioned outside the image
        if (x > img.width - lens.offsetWidth) {
            x = img.width - lens.offsetWidth;
        }
        if (x < 0) {
            x = 0;
        }
        if (y > img.height - lens.offsetHeight) {
            y = img.height - lens.offsetHeight;
        }
        if (y < 0) {
            y = 0;
        }

        // Set the position of the lens
        lens.style.left = x + "px";
        lens.style.top = y + "px";

        // Display what the lens "sees"
        result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    }

    function getCursorPos(e) {
        const a = img.getBoundingClientRect();
        const x = e.pageX - a.left - window.pageXOffset;
    }