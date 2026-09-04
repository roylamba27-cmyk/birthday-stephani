// ==============================
// OPEN LETTER
// ==============================

function openLetter() {

    // PLAY MUSIC
    const music = document.getElementById("bgMusic");

    if (music) {
        music.play()
            .then(() => {
                const musicButton = document.getElementById("musicButton");

                if (musicButton) {
                    musicButton.innerHTML = "♫ PAUSE MUSIC";
                }
            })
            .catch((error) => {
                console.log("Music tidak dapat dimainkan:", error);
            });
    }

    // SCROLL KE LETTER
    const letter = document.getElementById("letter");

    letter.scrollIntoView({
        behavior: "smooth"
    });

    // FLOATING HEARTS
    createHearts();
}


// ==============================
// OPEN SURPRISE
// ==============================

function showSurprise() {

    const message =
        document.getElementById("surpriseMessage");

    message.classList.remove("hidden");

    message.scrollIntoView({
        behavior: "smooth"
    });

    createHearts();

    function startSurprise() {

    music.play();

    document
        .getElementById("opening")
        .classList.add("hidden");

}
}


// ==============================
// FLOATING HEARTS
// ==============================

function createHearts() {

    for (let i = 0; i < 20; i++) {

        const heart =
            document.createElement("div");

        heart.innerHTML = "♥";

        heart.style.position = "fixed";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.bottom = "-30px";

        heart.style.fontSize =
            Math.random() * 25 + 15 + "px";

        heart.style.color = "#efa59d";

        heart.style.pointerEvents = "none";

        heart.style.zIndex = "9999";

        heart.style.animation =
            "floatHeart 3s ease forwards";

        document.body.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 3000);

    }

}// ==============================
// COUNTDOWN TO ANI'S BIRTHDAY
// ==============================

const birthdayDate =
    new Date("September 7, 2026 00:00:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const distance =
        birthdayDate - now;


    if (distance <= 0) {

        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";

        return;
    }


    const days =
        Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
                (1000 * 60))
            /
            1000
        );


    document.getElementById("days").innerText =
        String(days).padStart(2, "0");

    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);

// ==============================
// BACKGROUND MUSIC
// ==============================

const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

function updateMusicButton() {
    if (music.paused) {
        musicButton.innerHTML = "♫ PLAY MUSIC";
    } else {
        musicButton.innerHTML = "♫ PAUSE MUSIC";
    }
}

// Coba mulai musik otomatis saat website dibuka
window.addEventListener("load", () => {
    music.play()
        .then(() => {
            updateMusicButton();
        })
        .catch(() => {
            // Browser mungkin memblokir autoplay
            updateMusicButton();
        });
});

function toggleMusic() {
    if (music.paused) {
        music.play()
            .then(() => {
                updateMusicButton();
            })
            .catch((error) => {
                console.log("Musik tidak dapat dimainkan:", error);
            });
    } else {
        music.pause();
        updateMusicButton();
    }
}

// =================================
// PHOTO SCROLL ANIMATION
// =================================

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


// =================================
// PHOTO LIGHTBOX
// =================================

const photoCards =
    document.querySelectorAll(".photo-card");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");


photoCards.forEach((card) => {

    card.addEventListener("click", () => {

        const image =
            card.querySelector("img");

        lightboxImage.src =
            image.src;

        lightbox.classList.add("active");

        document.body.style.overflow =
            "hidden";

    });

});


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow =
        "";

}


// Klik background untuk menutup
lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// Tekan ESC untuk menutup
document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeLightbox();

    }

});

// =================================
// 3D PHOTO HOVER
// =================================

photoCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;


        const rotateX =
            ((y - centerY) / centerY) * -5;

        const rotateY =
            ((x - centerX) / centerX) * 5;


        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;
    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(800px) rotateX(0) rotateY(0) translateY(0)";

    });

});
// ===============================
// TYPEWRITER EFFECT
// ===============================

const letterText = document.querySelector(".letter-text");

if (letterText) {
    const originalText = letterText.innerHTML;
    letterText.innerHTML = "";

    let index = 0;

    function typeWriter() {
        if (index < originalText.length) {
            letterText.innerHTML = originalText.slice(0, index + 1);
            index++;

            setTimeout(typeWriter, 25);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                observer.disconnect();
            }
        });
    });

    observer.observe(letterText);
}// ===============================
// SEND COMMENT TO WHATSAPP
// ===============================

function sendToWhatsApp() {

    const name =
        document.getElementById("commentName").value.trim();

    const comment =
        document.getElementById("commentText").value.trim();


    if (name === "" || comment === "") {

        alert("Please fill in your name and message ❤️");

        return;
    }


    // GANTI NOMOR INI DENGAN NOMOR WHATSAPP KAMU
    const phoneNumber = "6282293822056";


    const message =
`🎂 Birthday Website Message

From: ${name}

"${comment}"

Sent from Ani's birthday website ❤️`;


    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(whatsappURL, "_blank");
}