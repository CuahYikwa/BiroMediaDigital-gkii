/* =
   ELEMENT ========== */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.querySelector(".header");


/* =========================================
   HAMBURGER MENU
========================================= */

hamburger.addEventListener("click", () => {

    hamburger.classList.toggle("active");

    navMenu.classList.toggle("active");

});


/* =========================================
   CLOSE MENU KETIKA LINK DIKLIK
========================================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        hamburger.classList.remove("active");

        navMenu.classList.remove("active");

    });

});


/* =========================================
   CLOSE MENU KETIKA KLIK DI LUAR
========================================= */

document.addEventListener("click", (event) => {

    const clickedInsideMenu =
        navMenu.contains(event.target);

    const clickedHamburger =
        hamburger.contains(event.target);


    if (
        !clickedInsideMenu &&
        !clickedHamburger &&
        navMenu.classList.contains("active")
    ) {

        hamburger.classList.remove("active");

        navMenu.classList.remove("active");

    }

});


/* =========================================
   HEADER EFFECT SAAT SCROLL
========================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================
   ACTIVE NAVIGATION BERDASARKAN SECTION
========================================= */

const sections = document.querySelectorAll("main section");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

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

    revealObserver.observe(element);

});


/* =========================================
   FILTER KEGIATAN
========================================= */

const filterButtons = document.querySelectorAll(".activity-filter-btn");
const activityCards = document.querySelectorAll(".activity-card");
const activityFeature = document.querySelector(".activity-feature");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // tombol aktif
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;


        // CARD
        activityCards.forEach(card => {

            const category = card.dataset.category;

            if (filter === "all" || category === filter) {

                card.classList.remove("hide");

                setTimeout(() => {
                    card.classList.remove("show");
                    void card.offsetWidth;
                    card.classList.add("show");
                }, 10);

            } else {

                card.classList.add("hide");

            }

        });


        // FEATURE
        if (activityFeature) {

            const featureCategory =
                activityFeature.dataset.category;

            if (
                filter === "all" ||
                featureCategory === filter
            ) {

                activityFeature.classList.remove("hide");

            } else {

                activityFeature.classList.add("hide");

            }

        }

    });

});


/* =========================================
   GALERI FILTER
========================================= */

const galleryFilterButtons =
    document.querySelectorAll(".gallery-filter-btn");

const galleryItems =
    document.querySelectorAll(".gallery-item");

const galleryFeature =
    document.querySelector(".gallery-feature");


galleryFilterButtons.forEach(button => {

    button.addEventListener("click", () => {

        galleryFilterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
            button.getAttribute("data-gallery-filter");


        galleryItems.forEach(item => {

            const category =
                item.getAttribute("data-gallery-category");

            if (
                filter === "all" ||
                category === filter
            ) {

                item.classList.remove("gallery-hidden");

            } else {

                item.classList.add("gallery-hidden");

            }

        });


        if (galleryFeature) {

            const featureCategory =
                galleryFeature.getAttribute(
                    "data-gallery-category"
                );

            if (
                filter === "all" ||
                featureCategory === filter
            ) {

                galleryFeature.classList.remove(
                    "gallery-hidden"
                );

            } else {

                galleryFeature.classList.add(
                    "gallery-hidden"
                );

            }

        }

    });

});


/* =========================================
   LIGHTBOX
========================================= */

const lightbox =
    document.getElementById("galleryLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxCategory =
    document.getElementById("lightboxCategory");

const lightboxCurrent =
    document.getElementById("lightboxCurrent");

const lightboxTotal =
    document.getElementById("lightboxTotal");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");


const galleryButtons =
    document.querySelectorAll(".gallery-open");


let currentGalleryIndex = 0;

let galleryData = [];


/* =========================================
   AMBIL DATA GALERI
========================================= */

galleryButtons.forEach((button, index) => {

    galleryData.push({

        image:
            button.getAttribute("data-image"),

        title:
            button.getAttribute("data-title"),

        category:
            button.getAttribute("data-category")

    });


    button.addEventListener("click", () => {

        currentGalleryIndex = index;

        openGallery(currentGalleryIndex);

    });

});


/* =========================================
   OPEN
========================================= */

function openGallery(index) {

    const data =
        galleryData[index];

    if (!data) return;


    lightboxImage.src =
        data.image;

    lightboxImage.alt =
        data.title;

    lightboxTitle.textContent =
        data.title;

    lightboxCategory.textContent =
        data.category.toUpperCase();


    lightboxCurrent.textContent =
        String(index + 1).padStart(2, "0");

    lightboxTotal.textContent =
        String(galleryData.length)
        .padStart(2, "0");


    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================
   CLOSE
========================================= */

function closeGallery() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


lightboxClose.addEventListener(
    "click",
    closeGallery
);


/* =========================================
   NEXT
========================================= */

function nextGallery() {

    currentGalleryIndex++;

    if (
        currentGalleryIndex >=
        galleryData.length
    ) {

        currentGalleryIndex = 0;

    }

    openGallery(currentGalleryIndex);

}


lightboxNext.addEventListener(
    "click",
    nextGallery
);


/* =========================================
   PREVIOUS
========================================= */

function previousGallery() {

    currentGalleryIndex--;

    if (currentGalleryIndex < 0) {

        currentGalleryIndex =
            galleryData.length - 1;

    }

    openGallery(currentGalleryIndex);

}


lightboxPrev.addEventListener(
    "click",
    previousGallery
);


/* =========================================
   CLICK BACKGROUND
========================================= */

lightbox.addEventListener("click", event => {

    if (
        event.target === lightbox
    ) {

        closeGallery();

    }

});


/* =========================================
   KEYBOARD
========================================= */

document.addEventListener("keydown", event => {

    if (
        !lightbox.classList.contains("active")
    ) return;


    if (event.key === "Escape") {

        closeGallery();

    }


    if (event.key === "ArrowRight") {

        nextGallery();

    }


    if (event.key === "ArrowLeft") {

        previousGallery();

    }

});


/* =====================================================
   WHATSAPP ADMIN
===================================================== */

const whatsappButton = document.getElementById("whatsappButton");

if (whatsappButton) {

    whatsappButton.addEventListener("click", function () {

        const adminNumber = "6282292605436";

        const message =
            "Shalom Biro Media Digital GKII Wilayah IV Papua Pegunungan.%0A%0A" +
            "Saya ingin menghubungi admin melalui website.%0A%0A" +
            "Nama: %0A" +
            "Keperluan: %0A%0A" +
            "Terima kasih.";

        const whatsappURL =
            `https://wa.me/${adminNumber}?text=${message}`;

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

}


/* =====================================================
   FOOTER YEAR
===================================================== */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =====================================================
   AUTO CONTRAST NAVIGATION
===================================================== */

const autoContrastHeader = document.querySelector(".header");

function updateNavigationContrast() {

    if (!autoContrastHeader) return;

    const navRect = autoContrastHeader.getBoundingClientRect();

    const x = Math.max(
        0,
        Math.min(
            window.innerWidth - 1,
            window.innerWidth / 2
        )
    );

    const y = Math.min(
        window.innerHeight - 1,
        navRect.bottom + 8
    );

    let element = document.elementFromPoint(x, y);

    if (!element) return;

    const section =
        element.closest("section") ||
        document.body;

    const background =
        window.getComputedStyle(section).backgroundColor;

    const rgb = background.match(/\d+/g);

    if (!rgb || rgb.length < 3) {
        autoContrastHeader.classList.add("auto-dark");
        autoContrastHeader.classList.remove("auto-light");
        return;
    }

    const r = Number(rgb[0]);
    const g = Number(rgb[1]);
    const b = Number(rgb[2]);

    const brightness =
        (r * 299 + g * 587 + b * 114) / 1000;

    if (brightness > 165) {

        autoContrastHeader.classList.add("auto-light");
        autoContrastHeader.classList.remove("auto-dark");

    } else {

        autoContrastHeader.classList.add("auto-dark");
        autoContrastHeader.classList.remove("auto-light");
    }
}


window.addEventListener(
    "scroll",
    updateNavigationContrast,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateNavigationContrast
);

window.addEventListener(
    "load",
    updateNavigationContrast
);

setTimeout(
    updateNavigationContrast,
    300
);


/* =========================================
   DOCUMENTATION SEARCH
========================================= */

const documentationSearch =
    document.getElementById("documentationSearch");

const clearDocumentationSearch =
    document.getElementById("clearDocumentationSearch");

const documentationResultCount =
    document.getElementById("documentationResultCount");


if (
    documentationSearch &&
    clearDocumentationSearch &&
    documentationResultCount
) {

    const galleryItems =
        document.querySelectorAll(".gallery-item");


    function searchDocumentation() {

        const query =
            documentationSearch.value
                .toLowerCase()
                .trim();

        let visibleCount = 0;


        galleryItems.forEach(item => {

            const searchableText =
                item.textContent.toLowerCase();

            const match =
                query === "" ||
                searchableText.includes(query);


            if (match) {

                item.style.display = "";

                visibleCount++;

            } else {

                item.style.display = "none";

            }

        });


        /* UPDATE RESULT COUNT */

        if (query === "") {

            documentationResultCount.textContent =
                `Menampilkan ${visibleCount} dokumentasi`;

        } else {

            documentationResultCount.textContent =
                `${visibleCount} dokumentasi ditemukan untuk "${query}"`;

        }


        /* CLEAR BUTTON */

        clearDocumentationSearch.hidden =
            query === "";


        /* EMPTY STATE */

        let emptyState =
            document.querySelector(".documentation-empty");


        if (visibleCount === 0 && query !== "") {

            if (!emptyState) {

                emptyState =
                    document.createElement("div");

                emptyState.className =
                    "documentation-empty";

                emptyState.innerHTML = `
                    <i class="fas fa-images"></i>

                    <h3>Dokumentasi Tidak Ditemukan</h3>

                    <p>
                        Tidak ada dokumentasi yang sesuai
                        dengan pencarian "${query}".
                    </p>
                `;

                const gallery =
                    document.querySelector("#galeri .gallery-grid");

                if (gallery) {
                    gallery.after(emptyState);
                }
            }

        } else {

            if (emptyState) {
                emptyState.remove();
            }

        }

    }


    /* SEARCH SAAT MENGETIK */

    documentationSearch.addEventListener(
        "input",
        searchDocumentation
    );


    /* CLEAR SEARCH */

    clearDocumentationSearch.addEventListener(
        "click",
        () => {

            documentationSearch.value = "";

            searchDocumentation();

            documentationSearch.focus();

        }
    );

}