document.addEventListener("DOMContentLoaded", function() {
    // Fade-in effect for each section
    const sections = document.querySelectorAll(".section");
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = 1;
            section.style.transform = "translateY(0)";
        }, 300 * index); // Delay animation for each section
    });

    // Hover effect on header
    const header = document.querySelector(".header");
    header.addEventListener("mouseover", () => {
        header.style.backgroundColor = "#444";
    });
    header.addEventListener("mouseout", () => {
        header.style.backgroundColor = "#333";
    });
});
