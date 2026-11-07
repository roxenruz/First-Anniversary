document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       CONFIGURATION
    ========================= */

    const relationshipStart = new Date(
        "2025-11-08T00:00:00"
    );


    /* =========================
       MOBILE MENU
    ========================= */

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });

    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });
    });


    /* =========================
       RELATIONSHIP DATE
    ========================= */

    const relationshipDate =
        document.getElementById("relationshipDate");

    relationshipDate.textContent =
        relationshipStart.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });


    /* =========================
       LIVE RELATIONSHIP COUNTER
    ========================= */

    function updateCounter() {

        const now = new Date();

        let difference =
            now.getTime() - relationshipStart.getTime();

        if (difference < 0) {
            difference = 0;
        }

        const totalSeconds =
            Math.floor(difference / 1000);

        const days =
            Math.floor(totalSeconds / 86400);

        const hours =
            Math.floor(
                (totalSeconds % 86400) / 3600
            );

        const minutes =
            Math.floor(
                (totalSeconds % 3600) / 60
            );

        const seconds =
            totalSeconds % 60;

        document.getElementById("days").textContent =
            days.toLocaleString();

        document.getElementById("hours").textContent =
            String(hours).padStart(2, "0");

        document.getElementById("minutes").textContent =
            String(minutes).padStart(2, "0");

        document.getElementById("seconds").textContent =
            String(seconds).padStart(2, "0");
    }


    updateCounter();

    setInterval(updateCounter, 1000);


    /* =========================
       LETTER MODAL
    ========================= */

    const letterButton =
        document.getElementById("letterButton");

    const letterModal =
        document.getElementById("letterModal");

    const letterOverlay =
        document.getElementById("letterOverlay");

    const closeLetter =
        document.getElementById("closeLetter");

    const envelope =
        document.getElementById("envelope");

    const letterContent =
        document.getElementById("letterContent");


    function openLetter() {

        letterModal.classList.add("active");

        document.body.style.overflow = "hidden";

        setTimeout(() => {
            envelope.classList.add("open");
        }, 300);

        setTimeout(() => {
            letterContent.classList.add("visible");
        }, 900);
    }


    function closeLetterModal() {

        letterModal.classList.remove("active");

        document.body.style.overflow = "";

        envelope.classList.remove("open");

        letterContent.classList.remove("visible");
    }


    letterButton.addEventListener(
        "click",
        openLetter
    );

    closeLetter.addEventListener(
        "click",
        closeLetterModal
    );

    letterOverlay.addEventListener(
        "click",
        closeLetterModal
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                letterModal.classList.contains("active")
            ) {
                closeLetterModal();
            }

        }
    );


    /* =========================
       CURRENT YEAR
    ========================= */

    document.getElementById("year").textContent =
        new Date().getFullYear();


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements =
        document.querySelectorAll(
            ".story-card, .memory-card, .section-heading"
        );

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity 0.9s ease, transform 0.9s ease";

        observer.observe(element);

    });

});

function openViewer(index) {

    currentIndex = index;

    const memory = currentMemories[currentIndex];

    viewerImage.src = memory.image;
    viewerImage.alt = memory.title;

    viewerDate.textContent = memory.date;
    viewerTitle.textContent = memory.title;
    viewerDescription.textContent = memory.description;

    viewer.classList.add("active");

    document.body.style.overflow = "hidden";
}

function closeViewer() {

    viewer.classList.remove("active");

    document.body.style.overflow = "";
}