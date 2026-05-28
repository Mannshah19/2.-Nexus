document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 700,
        once: true
    });
    
    // Countdown Timer logic
    const timerEl = document.querySelector(".register-timer");
    if (timerEl) {
        const endTime = timerEl.getAttribute("data-timer-end");
        if (endTime) {
            const tick = () => {
                const dist = new Date(endTime).getTime() - Date.now();
                if (dist < 0) {
                    timerEl.innerHTML = "00:00:00";
                    clearInterval(timerInterval);
                    return;
                }
                const hoursVal = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minsVal = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
                const secsVal = Math.floor((dist % (1000 * 60)) / 1000);
                
                const hours = String(hoursVal).padStart(2, "0");
                const mins = String(minsVal).padStart(2, "0");
                const secs = String(secsVal).padStart(2, "0");
                
                timerEl.innerHTML = `${hours}:${mins}:${secs}`;
            };
            const timerInterval = setInterval(tick, 1000);
            tick(); // Initial call to avoid 1s delay
        }
    }
    
    // Navbar Scroll Shadow logic
    const navbar = document.querySelector(".navbar_component");
    if (navbar) {
        const updateNav = () => {
            if (window.scrollY > 20) {
                navbar.style.boxShadow = "0 2px 40px rgba(0,0,0,0.6)";
            } else {
                navbar.style.boxShadow = "none";
            }
        };
        window.addEventListener("scroll", updateNav, { passive: true });
        updateNav();
    }

    // ScrollSpy active link toggle logic
    const navLinks = document.querySelectorAll(".navbar_component .navbar_link");
    const sections = document.querySelectorAll("section[id]");

    const updateActiveLink = () => {
        let currentSectionId = "";
        const scrollPosition = window.scrollY + 120; // Offset to trigger active state when section is near top

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove("active", "w--current");
                if (link.getAttribute("href") === `#${currentSectionId}`) {
                    link.classList.add("active", "w--current");
                }
            });
        }
    };

    window.addEventListener("scroll", updateActiveLink, { passive: true });
    updateActiveLink(); // Initial call
});