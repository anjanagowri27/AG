document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("music-intro");
    const startButton = document.getElementById("start-memory-btn");
    const music = document.getElementById("background-music");

    if (startButton && music && intro) {

        startButton.addEventListener("click", () => {

            // Start the song
            music.play()
                .then(() => {
                    console.log("Our song started ❤️");
                })
                .catch((error) => {
                    console.log("Music could not start:", error);
                });

            // Hide the opening screen
            intro.classList.add("hide");

            // Allow the main website to scroll
            document.body.style.overflow = "auto";
        });

    }

});
/* =========================================================
   AKSHAY & GOWRAMMA
   MEMORY TIME CAPSULE
   JAVASCRIPT
   ========================================================= */


/* =========================================================
   EASY CUSTOMIZATION
   ========================================================= */

const SITE_SETTINGS = {

    brotherName: "Akshay",

    sisterName: "Gowramma",

    birthday: "17 November 2005",

    songPath: "assets/music/our-song.mp3"

};


/* =========================================================
   VIDEO CONFIGURATION
   ========================================================= */

const VIDEO_CONFIG = [

    {
        src: "assets/videos/video1.mp4",
        title: "The chaos"
    },

    {
        src: "assets/videos/video2.mp4",
        title: "One of those random days"
    },

    {
        src: "assets/videos/video3.mp4",
        title: "Still us"
    },

    {
        src: "assets/videos/video4.mp4",
        title: "Why were we like this? 😂"
    }

];


/* =========================================================
   OPEN MEMORY BOX
   ========================================================= */

const openingScreen =
    document.getElementById("opening-screen");

const openMemoryButton =
    document.getElementById("open-memory");

const mainContent =
    document.getElementById("main-content");


openMemoryButton.addEventListener("click", () => {

    openingScreen.classList.add("closed");

    mainContent.classList.add("visible");

    document.body.style.overflow = "";

    setTimeout(() => {

        document.getElementById("home")
            .scrollIntoView({
                behavior: "smooth"
            });

    }, 500);

});

/* =========================================================
   NAVIGATION
   ========================================================= */

const menuToggle =
    document.getElementById("menu-toggle");

const mainNav =
    document.getElementById("main-nav");


menuToggle.addEventListener("click", () => {

    const isOpen =
        mainNav.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

});


/* Close mobile menu after clicking a link */

document.querySelectorAll("#main-nav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   FLOATING STARS
   ========================================================= */

const starsContainer =
    document.getElementById("stars-container");


function createStars() {

    const symbols = [
        "✦",
        "✧",
        "⋆",
        "✦",
        "♡"
    ];


    for (let i = 0; i < 32; i++) {

        const star =
            document.createElement("span");

        star.className =
            "floating-star";

        star.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];


        star.style.left =
            `${Math.random() * 100}%`;


        star.style.top =
            `${Math.random() * 100}%`;


        star.style.fontSize =
            `${8 + Math.random() * 15}px`;


        star.style.animationDelay =
            `${Math.random() * 5}s`;


        star.style.animationDuration =
            `${4 + Math.random() * 6}s`;


        starsContainer.appendChild(star);

    }

}


createStars();


/* =========================================================
   QUOTE ROTATION
   ========================================================= */

const quoteItems =
    document.querySelectorAll(".quote-item");


let currentQuote = 0;


function showNextQuote() {

    quoteItems[currentQuote]
        .classList.remove("active");


    currentQuote =
        (currentQuote + 1) %
        quoteItems.length;


    quoteItems[currentQuote]
        .classList.add("active");

}


setInterval(showNextQuote, 5000);


/* =========================================================
   MUSIC PLAYER
   ========================================================= */

const audio =
    document.getElementById("music.mp3");

const playButton =
    document.getElementById("music-play");

const progress =
    document.getElementById("music-progress");

const currentTimeDisplay =
    document.getElementById("current-time");

const durationDisplay =
    document.getElementById("duration");

const muteButton =
    document.getElementById("mute-button");

const musicMessage =
    document.getElementById("music-message");

const songSection =
    document.getElementById("song");


let musicAvailable = true;


/* Check whether the audio can load */

audio.addEventListener("error", () => {

    musicAvailable = false;

    musicMessage.textContent =
        "Add your song to assets/music/music.mp3.mp3";

    playButton.disabled = true;

    playButton.style.opacity = "0.5";

});


/* Format seconds */

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }


    const minutes =
        Math.floor(seconds / 60);


    const remainingSeconds =
        Math.floor(seconds % 60);


    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;

}


/* Play / Pause */

playButton.addEventListener("click", () => {

    if (!musicAvailable) {
        return;
    }


    if (audio.paused) {

        audio.play()
            .then(() => {

                playButton.textContent = "❚❚";

                songSection.classList.add(
                    "playing"
                );

                musicMessage.textContent =
                    "Playing our memory soundtrack ♡";

            })
            .catch(() => {

                musicMessage.textContent =
                    "Click play again to start the song.";

            });

    } else {

        audio.pause();

        playButton.textContent = "▶";

        songSection.classList.remove(
            "playing"
        );

        musicMessage.textContent =
            "Paused. Some memories can wait.";

    }

});


/* Update progress */

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) {
        return;
    }


    const percentage =
        (audio.currentTime / audio.duration) * 100;


    progress.value =
        percentage;


    currentTimeDisplay.textContent =
        formatTime(audio.currentTime);

});


/* Show duration */

audio.addEventListener("loadedmetadata", () => {

    durationDisplay.textContent =
        formatTime(audio.duration);

});


/* Progress bar */

progress.addEventListener("input", () => {

    if (!audio.duration) {
        return;
    }


    audio.currentTime =
        (progress.value / 100) *
        audio.duration;

});


/* Mute */

muteButton.addEventListener("click", () => {

    audio.muted =
        !audio.muted;


    muteButton.textContent =
        audio.muted ? "🔇" : "🔊";

});


/* Song ended */

audio.addEventListener("ended", () => {

    playButton.textContent = "▶";

    songSection.classList.remove(
        "playing"
    );

    progress.value = 0;

    currentTimeDisplay.textContent =
        "0:00";

    musicMessage.textContent =
        "Play it again when you want to remember.";

});


/* =========================================================
   PHOTO LIGHTBOX
   ========================================================= */


/*
    IMPORTANT:

    The photos are ALREADY visible directly on the page.

    This lightbox is only an optional enlarged view
    when someone clicks a visible photo.

    Clicking is NOT required to see the photos.
*/


const photoImages =
    document.querySelectorAll(".photo-card img");


const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightbox-image");

const lightboxCaption =
    document.getElementById("lightbox-caption");

const lightboxClose =
    document.getElementById("lightbox-close");

const lightboxPrevious =
    document.getElementById("lightbox-prev");

const lightboxNext =
    document.getElementById("lightbox-next");


let validPhotos = [];

let currentPhotoIndex = 0;


/* Build photo list */

photoImages.forEach((image) => {

    image.addEventListener("load", () => {

        if (
            !validPhotos.some(
                item => item.image === image
            )
        ) {

            const card =
                image.closest(".photo-card");

            const caption =
                card
                    ?.querySelector(".photo-caption p")
                    ?.textContent ||
                "A memory worth keeping.";

            validPhotos.push({
                image: image,
                src: image.src,
                caption: caption
            });

        }

    });


    image.addEventListener("click", () => {

        const index =
            validPhotos.findIndex(
                item => item.image === image
            );


        if (index !== -1) {

            currentPhotoIndex = index;

            showLightbox();

        }

    });

});


function showLightbox() {

    if (!validPhotos.length) {
        return;
    }


    const photo =
        validPhotos[currentPhotoIndex];


    lightboxImage.src =
        photo.src;


    lightboxImage.alt =
        photo.caption;


    lightboxCaption.textContent =
        photo.caption;


    lightbox.classList.add("open");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


function closeLightbox() {

    lightbox.classList.remove("open");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


function showPreviousPhoto() {

    if (!validPhotos.length) {
        return;
    }


    currentPhotoIndex =
        (currentPhotoIndex -
            1 +
            validPhotos.length)
        %
        validPhotos.length;


    showLightbox();

}


function showNextPhoto() {

    if (!validPhotos.length) {
        return;
    }


    currentPhotoIndex =
        (currentPhotoIndex + 1)
        %
        validPhotos.length;


    showLightbox();

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightboxPrevious.addEventListener(
    "click",
    showPreviousPhoto
);


lightboxNext.addEventListener(
    "click",
    showNextPhoto
);


/* Click outside image */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* Keyboard controls */

document.addEventListener("keydown", (event) => {

    if (
        !lightbox.classList.contains("open")
    ) {
        return;
    }


    if (event.key === "Escape") {

        closeLightbox();

    }


    if (event.key === "ArrowLeft") {

        showPreviousPhoto();

    }


    if (event.key === "ArrowRight") {

        showNextPhoto();

    }

});


/* =========================================================
   REPLAY STORY
   ========================================================= */

const replayButton =
    document.getElementById("replay-story");


replayButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =========================================================
   VIDEO ERROR HANDLING
   ========================================================= */

const videos =
    document.querySelectorAll("video");


videos.forEach((video) => {

    video.addEventListener("error", () => {

        const card =
            video.closest(".video-card");


        if (!card) {
            return;
        }


        video.style.display =
            "none";


        if (
            !card.querySelector(
                ".video-error"
            )
        ) {

            const error =
                document.createElement("div");

            error.className =
                "video-error";


            error.textContent =
                "Your memory video will live here.";


            error.style.padding =
                "70px 20px";


            error.style.textAlign =
                "center";


            error.style.fontFamily =
                "Caveat, cursive";


            error.style.fontSize =
                "28px";


            error.style.color =
                "#77758c";


            card.insertBefore(
                error,
                card.querySelector(
                    ".video-caption"
                )
            );

        }

    });

});


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        "#main-nav a"
    );


const sectionObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const id =
                        entry.target.id;


                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute("href")
                            ===
                            `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                }

            });

        },

        {
            threshold: 0.35
        }

    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================================================
   REDUCED MOTION
   ========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (prefersReducedMotion.matches) {

    document
        .querySelectorAll(".floating-star")
        .forEach(star => {

            star.style.animation =
                "none";

        });

}


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(
    "♡ Akshay & Gowramma — Memory Time Capsule loaded."
);

console.log(
    "Photos are loaded directly from index.html."
);

console.log(
    "Add more photos by copying an existing .photo-card."
);