

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("background-music");
    const playButton = document.getElementById("play-music-btn");
    const navbarLinks = document.querySelectorAll(".navbar a");

    // Check if autoplay was previously allowed
    if (sessionStorage.getItem("autoplayAllowed")) {
        audio.play().catch(error => console.log("Autoplay blocked:", error));
        if (playButton) playButton.style.display = "none"; // Hide button if present
    }

    // Play music on button click
    if (playButton) {
        playButton.addEventListener("click", () => {
            audio.play().then(() => {
                playButton.style.display = "none"; // Hide button
                sessionStorage.setItem("autoplayAllowed", "true"); // Store permission
            }).catch(error => console.log("Playback error:", error));
        });
    }

    // Play music when any navbar link is clicked
    navbarLinks.forEach(link => {
        link.addEventListener("click", () => {
            audio.play().catch(error => console.log("Autoplay blocked:", error));
        });
    });
});

// Countdown timer functionality
const countdownDate = new Date("Feb 6, 2025 10:30:00").getTime();

function updateTimer() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
        clearInterval(interval);

        // Change background color
        document.body.classList.add("wedding-theme");

        // Display "Happy Married Life!" message
        const clock = document.getElementById("reminder-clock");
        clock.innerHTML = `<h1 class="wedding-message">🎉 Happy Married Life! 💖</h1>`;

        return;
    }

    // Calculate time left
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the HTML
    document.getElementById("days").textContent = days.toString().padStart(2, '0');
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
}

// Run the function immediately and then every second
const interval = setInterval(updateTimer, 1000);
updateTimer();
