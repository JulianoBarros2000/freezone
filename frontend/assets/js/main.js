$(document).ready(function () {

    AOS.init({
        duration: 800,
        once: true,
        offset: 80
    });

});

AOS.init({
    duration: 900,
    easing: "ease-out-cubic",
    once: true,
    offset: 80
});
/**
 * ============================================================
 * ONErpm — Main JavaScript
 * Frontend interactions
 * ============================================================
 */

"use strict";

$(document).ready(function () {

    /* =========================================================
       CONFIGURAÇÃO
    ========================================================= */

    const CONFIG = {
        navbarScrollOffset: 50,
        scrollOffset: 90,
        parallaxLimit: 0.35
    };


    /* =========================================================
       AOS
    ========================================================= */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 80
        });

    }


    /* =========================================================
       NAVBAR — SCROLL
    ========================================================= */

    const $navbar = $("#mainNavbar");

    function handleNavbarScroll() {

        if ($(window).scrollTop() > CONFIG.navbarScrollOffset) {

            $navbar.addClass("navbar-scrolled");

        } else {

            $navbar.removeClass("navbar-scrolled");

        }

    }

    $(window).on("scroll", handleNavbarScroll);

    handleNavbarScroll();


    /* =========================================================
       SMOOTH SCROLL
    ========================================================= */

    $('a[href^="#"]').on("click", function (event) {

        const target = $(this).attr("href");

        if (!target || target === "#") {
            return;
        }

        const $target = $(target);

        if (!$target.length) {
            return;
        }

        event.preventDefault();

        const targetPosition =
            $target.offset().top - CONFIG.scrollOffset;

        $("html, body").animate(
            {
                scrollTop: targetPosition
            },
            800
        );

        /*
         * Fecha o menu mobile depois do clique
         */

        const navbarElement =
            document.getElementById("navbarContent");

        if (
            navbarElement &&
            navbarElement.classList.contains("show")
        ) {

            const navbarCollapse =
                bootstrap.Collapse.getInstance(navbarElement);

            if (navbarCollapse) {
                navbarCollapse.hide();
            }

        }

    });


    /* =========================================================
       NAVBAR — ACTIVE LINK
    ========================================================= */

    const sections = $("main section[id]");
    const navLinks = $(".navbar-nav .nav-link[href^='#']");

    function updateActiveNavigation() {

        const scrollPosition =
            $(window).scrollTop() + CONFIG.scrollOffset + 100;

        let currentSection = "";

        sections.each(function () {

            const $section = $(this);

            const sectionTop = $section.offset().top;
            const sectionBottom =
                sectionTop + $section.outerHeight();

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {

                currentSection = $section.attr("id");

            }

        });

        navLinks.removeClass("active");

        if (currentSection) {

            $(
                `.navbar-nav .nav-link[href="#${currentSection}"]`
            ).addClass("active");

        }

    }

    $(window).on("scroll", updateActiveNavigation);

    updateActiveNavigation();


    /* =========================================================
       PARALLAX
    ========================================================= */

    const parallaxLayers =
        document.querySelectorAll(".parallax-layer");

    function updateParallax() {

        const scrollTop = window.scrollY;

        parallaxLayers.forEach(function (layer) {

            const speed =
                parseFloat(layer.dataset.speed || 0.1);

            let movement = scrollTop * speed;

            const maxMovement =
                window.innerHeight * CONFIG.parallaxLimit;

            movement = Math.min(movement, maxMovement);

            layer.style.transform =
                `translate3d(0, ${movement}px, 0)`;

        });

    }

    if (parallaxLayers.length) {

        window.addEventListener(
            "scroll",
            updateParallax,
            { passive: true }
        );

        updateParallax();

    }


    /* =========================================================
       HERO — MOUSE PARALLAX
    ========================================================= */

    const hero = document.querySelector(".hero");
    const heroVisual = document.querySelector(".hero-visual");

    if (hero && heroVisual) {

        hero.addEventListener("mousemove", function (event) {

            const rect =
                hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;

            const moveX = (x - 0.5) * 15;
            const moveY = (y - 0.5) * 15;

            heroVisual.style.transform =
                `translate3d(${moveX}px, ${moveY}px, 0)`;

        });

        hero.addEventListener("mouseleave", function () {

            heroVisual.style.transform =
                "translate3d(0, 0, 0)";

        });

    }


    /* =========================================================
       CARD 3D TILT
    ========================================================= */

    $(".music-card, .feature-card").on(
        "mousemove",
        function (event) {

            const $card = $(this);

            const offset = $card.offset();

            const width = $card.outerWidth();
            const height = $card.outerHeight();

            const mouseX =
                event.pageX - offset.left;

            const mouseY =
                event.pageY - offset.top;

            const rotateY =
                ((mouseX / width) - 0.5) * 8;

            const rotateX =
                ((mouseY / height) - 0.5) * -8;

            $card.css(
                "transform",
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-6px)`
            );

        }
    );

    $(".music-card, .feature-card").on(
        "mouseleave",
        function () {

            $(this).css(
                "transform",
                ""
            );

        }
    );


    /* =========================================================
       PLAYER
    ========================================================= */

    let currentTrack = null;
    let isPlaying = false;

    const audioPlayer =
        new Audio();

    audioPlayer.preload = "metadata";


    /*
     * Dados temporários do catálogo.
     *
     * Mais tarde estes dados virão da API.
     */

    const tracks = [

        {
            id: 1,
            title: "Midnight",
            artist: "Artist Name",
            cover: "assets/images/banners/music-01.jpg",
            audio: "assets/audio/music-01.mp3"
        },

        {
            id: 2,
            title: "Vibes",
            artist: "Artist Name",
            cover: "assets/images/banners/music-02.jpg",
            audio: "assets/audio/music-02.mp3"
        },

        {
            id: 3,
            title: "Energy",
            artist: "Artist Name",
            cover: "assets/images/banners/music-03.jpg",
            audio: "assets/audio/music-03.mp3"
        },

        {
            id: 4,
            title: "Dreams",
            artist: "Artist Name",
            cover: "assets/images/banners/music-04.jpg",
            audio: "assets/audio/music-04.mp3"
        }

    ];


    /* =========================================================
       PLAYER — CRIAR INTERFACE
    ========================================================= */

    function createPlayer() {

        if ($("#globalMusicPlayer").length) {
            return;
        }

        const playerHTML = `

            <div
                id="globalMusicPlayer"
                class="global-music-player"
                aria-label="Leitor de música"
            >

                <div class="player-track">

                    <img
                        id="playerCover"
                        src="assets/images/banners/music-cover.jpg"
                        alt="Capa da música"
                    >

                    <div class="player-info">

                        <strong id="playerTitle">
                            Nenhuma música
                        </strong>

                        <span id="playerArtist">
                            Selecciona uma música
                        </span>

                    </div>

                </div>


                <div class="player-controls">

                    <button
                        type="button"
                        id="playerPrevious"
                        aria-label="Música anterior"
                    >

                        <i class="bi bi-skip-start-fill"></i>

                    </button>


                    <button
                        type="button"
                        id="playerPlay"
                        class="player-main-button"
                        aria-label="Reproduzir"
                    >

                        <i class="bi bi-play-fill"></i>

                    </button>


                    <button
                        type="button"
                        id="playerNext"
                        aria-label="Próxima música"
                    >

                        <i class="bi bi-skip-end-fill"></i>

                    </button>

                </div>


                <div class="player-progress-wrapper">

                    <span id="playerCurrentTime">
                        0:00
                    </span>

                    <input
                        type="range"
                        id="playerProgress"
                        min="0"
                        max="100"
                        value="0"
                    >

                    <span id="playerDuration">
                        0:00
                    </span>

                </div>


                <div class="player-volume">

                    <i class="bi bi-volume-up"></i>

                    <input
                        type="range"
                        id="playerVolume"
                        min="0"
                        max="1"
                        step="0.01"
                        value="0.8"
                    >

                </div>


                <button
                    type="button"
                    id="playerClose"
                    class="player-close"
                    aria-label="Fechar leitor"
                >

                    <i class="bi bi-x-lg"></i>

                </button>

            </div>

        `;

        $("body").append(playerHTML);

    }

    createPlayer();


    /* =========================================================
       FORMATAR TEMPO
    ========================================================= */

    function formatTime(seconds) {

        if (!Number.isFinite(seconds)) {
            return "0:00";
        }

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            Math.floor(seconds % 60);

        return `${minutes}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;

    }


    /* =========================================================
       ACTUALIZAR PLAYER
    ========================================================= */

    function updatePlayer(track) {

        $("#playerCover").attr(
            "src",
            track.cover
        );

        $("#playerTitle").text(
            track.title
        );

        $("#playerArtist").text(
            track.artist
        );

        $(".floating-music-card h6").text(
            track.title
        );

        $(".floating-music-card span").text(
            track.artist
        );

    }


    /* =========================================================
       REPRODUZIR MÚSICA
    ========================================================= */

    function playTrack(track) {

        if (!track) {
            return;
        }

        currentTrack = track;

        audioPlayer.src =
            track.audio;

        audioPlayer.load();

        updatePlayer(track);

        audioPlayer
            .play()
            .then(function () {

                isPlaying = true;

                updatePlayButton();

                $("#globalMusicPlayer")
                    .addClass("player-visible");

            })
            .catch(function () {

                /*
                 * O ficheiro de áudio ainda pode não existir.
                 * O player continua preparado para receber
                 * os ficheiros reais posteriormente.
                 */

                isPlaying = false;

                updatePlayButton();

                $("#globalMusicPlayer")
                    .addClass("player-visible");

                showNotification(
                    "Adiciona o ficheiro de áudio para reproduzir esta música.",
                    "info"
                );

            });

    }


    /* =========================================================
       PLAY / PAUSE
    ========================================================= */

    function togglePlay() {

        if (!currentTrack) {

            playTrack(tracks[0]);

            return;

        }

        if (audioPlayer.paused) {

            audioPlayer
                .play()
                .then(function () {

                    isPlaying = true;

                    updatePlayButton();

                })
                .catch(function () {

                    showNotification(
                        "Não foi possível reproduzir esta música.",
                        "warning"
                    );

                });

        } else {

            audioPlayer.pause();

            isPlaying = false;

            updatePlayButton();

        }

    }


    function updatePlayButton() {

        const $button =
            $("#playerPlay i");

        const $floatingButton =
            $(".floating-music-card .play-button i");

        if (isPlaying) {

            $button
                .removeClass("bi-play-fill")
                .addClass("bi-pause-fill");

            $floatingButton
                .removeClass("bi-play-fill")
                .addClass("bi-pause-fill");

        } else {

            $button
                .removeClass("bi-pause-fill")
                .addClass("bi-play-fill");

            $floatingButton
                .removeClass("bi-pause-fill")
                .addClass("bi-play-fill");

        }

    }


    /* =========================================================
       CARDS DE MÚSICA
    ========================================================= */

    $(".music-card").each(function (index) {

        const track =
            tracks[index];

        if (!track) {
            return;
        }

        $(this).attr(
            "data-track-id",
            track.id
        );

    });


    $(".music-card .play-button").on(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            const trackId =
                Number(
                    $(this)
                        .closest(".music-card")
                        .data("track-id")
                );

            const track =
                tracks.find(
                    item => item.id === trackId
                );

            playTrack(track);

        }
    );


    /* =========================================================
       HERO PLAYER
    ========================================================= */

    $(".floating-music-card .play-button").on(
        "click",
        function () {

            if (!currentTrack) {

                playTrack(tracks[0]);

            } else {

                togglePlay();

            }

        }
    );


    /* =========================================================
       PLAYER — BOTÃO PLAY
    ========================================================= */

    $(document).on(
        "click",
        "#playerPlay",
        function () {

            togglePlay();

        }
    );


    /* =========================================================
       PLAYER — ANTERIOR
    ========================================================= */

    $(document).on(
        "click",
        "#playerPrevious",
        function () {

            if (!currentTrack) {
                return;
            }

            const currentIndex =
                tracks.findIndex(
                    track =>
                        track.id === currentTrack.id
                );

            let previousIndex =
                currentIndex - 1;

            if (previousIndex < 0) {
                previousIndex =
                    tracks.length - 1;
            }

            playTrack(
                tracks[previousIndex]
            );

        }
    );


    /* =========================================================
       PLAYER — PRÓXIMA
    ========================================================= */

    $(document).on(
        "click",
        "#playerNext",
        function () {

            if (!currentTrack) {
                return;
            }

            const currentIndex =
                tracks.findIndex(
                    track =>
                        track.id === currentTrack.id
                );

            let nextIndex =
                currentIndex + 1;

            if (
                nextIndex >=
                tracks.length
            ) {

                nextIndex = 0;

            }

            playTrack(
                tracks[nextIndex]
            );

        }
    );


    /* =========================================================
       PLAYER — PROGRESSO
    ========================================================= */

    audioPlayer.addEventListener(
        "timeupdate",
        function () {

            if (!audioPlayer.duration) {
                return;
            }

            const progress =
                (
                    audioPlayer.currentTime /
                    audioPlayer.duration
                ) * 100;

            $("#playerProgress")
                .val(progress);

            $("#playerCurrentTime")
                .text(
                    formatTime(
                        audioPlayer.currentTime
                    )
                );

            $("#playerDuration")
                .text(
                    formatTime(
                        audioPlayer.duration
                    )
                );

        }
    );


    $(document).on(
        "input",
        "#playerProgress",
        function () {

            if (!audioPlayer.duration) {
                return;
            }

            const percentage =
                Number($(this).val());

            audioPlayer.currentTime =
                (
                    percentage / 100
                ) *
                audioPlayer.duration;

        }
    );


    /* =========================================================
       PLAYER — VOLUME
    ========================================================= */

    $(document).on(
        "input",
        "#playerVolume",
        function () {

            audioPlayer.volume =
                Number($(this).val());

        }
    );

    audioPlayer.volume = 0.8;


    /* =========================================================
       MÚSICA TERMINOU
    ========================================================= */

    audioPlayer.addEventListener(
        "ended",
        function () {

            if (!currentTrack) {
                return;
            }

            const currentIndex =
                tracks.findIndex(
                    track =>
                        track.id === currentTrack.id
                );

            const nextIndex =
                (
                    currentIndex + 1
                ) % tracks.length;

            playTrack(
                tracks[nextIndex]
            );

        }
    );


    /* =========================================================
       FECHAR PLAYER
    ========================================================= */

    $(document).on(
        "click",
        "#playerClose",
        function () {

            audioPlayer.pause();

            isPlaying = false;

            updatePlayButton();

            $("#globalMusicPlayer")
                .removeClass("player-visible");

        }
    );


    /* =========================================================
       NOTIFICAÇÕES
    ========================================================= */

    function showNotification(
        message,
        type = "info"
    ) {

        const notification = `

            <div
                class="vexa-notification vexa-notification-${type}"
            >

                <div class="notification-icon">

                    <i class="bi ${
                        type === "success"
                            ? "bi-check-circle-fill"
                            : type === "warning"
                                ? "bi-exclamation-triangle-fill"
                                : "bi-info-circle-fill"
                    }"></i>

                </div>

                <div class="notification-content">

                    ${message}

                </div>

                <button
                    type="button"
                    class="notification-close"
                    aria-label="Fechar"
                >

                    <i class="bi bi-x"></i>

                </button>

            </div>

        `;

        const $notification =
            $(notification);

        $("body").append(
            $notification
        );

        setTimeout(function () {

            $notification.addClass(
                "notification-show"
            );

        }, 20);


        setTimeout(function () {

            removeNotification(
                $notification
            );

        }, 5000);

    }


    function removeNotification(
        $notification
    ) {

        $notification.removeClass(
            "notification-show"
        );

        setTimeout(function () {

            $notification.remove();

        }, 400);

    }


    $(document).on(
        "click",
        ".notification-close",
        function () {

            removeNotification(
                $(this).closest(
                    ".vexa-notification"
                )
            );

        }
    );


    /* =========================================================
       BOTÕES QUE AINDA DEPENDEM DO BACKEND
    ========================================================= */

    $(
        '[href="pages/registo.html"]'
    ).on("click", function () {

        /*
         * A página de registo será criada na próxima etapa.
         */

    });


    $(
        '[href="pages/login.html"]'
    ).on("click", function () {

        /*
         * A página de login será criada na próxima etapa.
         */

    });


    /* =========================================================
       IMAGENS — FALLBACK
    ========================================================= */

    $("img").on(
        "error",
        function () {

            if (
                $(this).data(
                    "fallback-applied"
                )
            ) {
                return;
            }

            $(this).data(
                "fallback-applied",
                true
            );

            $(this).attr(
                "src",
                "assets/images/placeholder.jpg"
            );

        }
    );


    /* =========================================================
       REVEAL EXTRA
    ========================================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );

    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "revealed"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );

        revealElements.forEach(
            element =>
                observer.observe(element)
        );

    }


    /* =========================================================
       REDUÇÃO DE MOVIMENTO
    ========================================================= */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (
        prefersReducedMotion.matches
    ) {

        $("*").css(
            "scroll-behavior",
            "auto"
        );

    }


    /* =========================================================
       CONSOLE
    ========================================================= */

    console.log(
        "%c ONErpm ",
        "background:#8A2BE2;color:#fff;font-size:18px;font-weight:700;padding:8px 14px;border-radius:8px;"
    );

    console.log(
        "%c Frontend inicializado correctamente.",
        "color:#8A2BE2;font-size:14px;font-weight:600;"
    );

});