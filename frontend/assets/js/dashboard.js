"use strict";

/*
|--------------------------------------------------------------------------
| DASHBOARD CONFIG
|--------------------------------------------------------------------------
*/

const Dashboard = {

    user: {
        name: "Juliano Barros",
        artistName: "Artist Name"
    },

    init() {

        this.initializeAOS();

        this.initializeSidebar();

        this.initializeNavigation();

        this.initializeChart();

        this.initializeProfile();

        this.initializeLogout();

        this.initializeAnimations();

        this.loadUser();

    },


    /*
    |--------------------------------------------------------------------------
    | AOS
    |--------------------------------------------------------------------------
    */

    initializeAOS() {

        if (typeof AOS !== "undefined") {

            AOS.init({
                duration: 700,
                once: true,
                offset: 40,
                easing: "ease-out-cubic"
            });

        }

    },


    /*
    |--------------------------------------------------------------------------
    | SIDEBAR
    |--------------------------------------------------------------------------
    */

    initializeSidebar() {

        const sidebar =
            document.getElementById("dashboardSidebar");

        const overlay =
            document.getElementById("dashboardOverlay");

        const menuBtn =
            document.getElementById("dashboardMenuBtn");

        const closeBtn =
            document.getElementById("sidebarClose");


        const openSidebar = () => {

            sidebar.classList.add("active");

            overlay.classList.add("active");

            document.body.classList.add(
                "dashboard-menu-open"
            );

        };


        const closeSidebar = () => {

            sidebar.classList.remove("active");

            overlay.classList.remove("active");

            document.body.classList.remove(
                "dashboard-menu-open"
            );

        };


        menuBtn?.addEventListener(
            "click",
            openSidebar
        );


        closeBtn?.addEventListener(
            "click",
            closeSidebar
        );


        overlay?.addEventListener(
            "click",
            closeSidebar
        );


        document
            .querySelectorAll(".dashboard-nav-link")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        if (
                            window.innerWidth <= 991
                        ) {

                            closeSidebar();

                        }

                    }
                );

            });

    },


    /*
    |--------------------------------------------------------------------------
    | NAVIGATION
    |--------------------------------------------------------------------------
    */

    initializeNavigation() {

        const links =
            document.querySelectorAll(
                ".dashboard-nav-link"
            );

        const sections =
            document.querySelectorAll(
                ".dashboard-section"
            );


        links.forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const target =
                        link.getAttribute("href");

                    if (
                        !target ||
                        !target.startsWith("#")
                    ) {
                        return;
                    }

                    const section =
                        document.querySelector(target);

                    if (!section) {
                        return;
                    }

                    event.preventDefault();

                    const offset = 80;

                    const top =
                        section.getBoundingClientRect().top +
                        window.scrollY -
                        offset;

                    window.scrollTo({
                        top,
                        behavior: "smooth"
                    });

                }
            );

        });


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const id =
                            entry.target.id;

                        links.forEach(link => {

                            link.classList.toggle(
                                "active",
                                link.dataset.section === id
                            );

                        });

                    });

                },
                {
                    rootMargin: "-20% 0px -70% 0px"
                }
            );


        sections.forEach(section => {

            observer.observe(section);

        });

    },


    /*
    |--------------------------------------------------------------------------
    | CHART
    |--------------------------------------------------------------------------
    */

    initializeChart() {

        const canvas =
            document.getElementById(
                "streamsChart"
            );

        if (!canvas || typeof Chart === "undefined") {
            return;
        }


        const context =
            canvas.getContext("2d");


        const gradient =
            context.createLinearGradient(
                0,
                0,
                0,
                320
            );

        gradient.addColorStop(
            0,
            "rgba(138, 43, 226, 0.35)"
        );

        gradient.addColorStop(
            1,
            "rgba(138, 43, 226, 0)"
        );


        this.streamChart =
            new Chart(
                context,
                {

                    type: "line",

                    data: {

                        labels: [
                            "01",
                            "05",
                            "10",
                            "15",
                            "20",
                            "25",
                            "30"
                        ],

                        datasets: [

                            {
                                label: "Streams",

                                data: [
                                    8200,
                                    11300,
                                    9600,
                                    17800,
                                    21400,
                                    18700,
                                    24800
                                ],

                                borderWidth: 3,

                                borderColor:
                                    "#8A2BE2",

                                backgroundColor:
                                    gradient,

                                fill: true,

                                tension: 0.4,

                                pointRadius: 0,

                                pointHoverRadius: 6

                            }

                        ]

                    },


                    options: {

                        responsive: true,

                        maintainAspectRatio: false,

                        interaction: {
                            intersect: false,
                            mode: "index"
                        },

                        plugins: {

                            legend: {
                                display: false
                            },

                            tooltip: {

                                backgroundColor:
                                    "#1E1E1E",

                                borderColor:
                                    "rgba(138,43,226,.4)",

                                borderWidth: 1,

                                titleColor:
                                    "#FFFFFF",

                                bodyColor:
                                    "#E0E0E0",

                                padding: 12,

                                displayColors: false

                            }

                        },


                        scales: {

                            x: {

                                grid: {
                                    display: false
                                },

                                border: {
                                    display: false
                                },

                                ticks: {
                                    color: "#777"
                                }

                            },

                            y: {

                                beginAtZero: true,

                                grid: {
                                    color:
                                        "rgba(255,255,255,.05)"
                                },

                                border: {
                                    display: false
                                },

                                ticks: {

                                    color: "#777",

                                    callback(value) {

                                        return (
                                            value / 1000
                                        ) + "K";

                                    }

                                }

                            }

                        }

                    }

                }
            );

    },


    /*
    |--------------------------------------------------------------------------
    | PROFILE
    |--------------------------------------------------------------------------
    */

    initializeProfile() {

        const profileButton =
            document.getElementById(
                "profileButton"
            );


        profileButton?.addEventListener(
            "click",
            () => {

                window.location.hash =
                    "profile";

            }
        );

    },


    /*
    |--------------------------------------------------------------------------
    | LOGOUT
    |--------------------------------------------------------------------------
    */

    initializeLogout() {

        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );


        logoutBtn?.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "access_token"
                );

                localStorage.removeItem(
                    "user"
                );

                window.location.href =
                    "pages/login.html";

            }
        );

    },


    /*
    |--------------------------------------------------------------------------
    | USER
    |--------------------------------------------------------------------------
    */

    loadUser() {

        const storedUser =
            localStorage.getItem("user");


        if (!storedUser) {
            return;
        }


        try {

            const user =
                JSON.parse(storedUser);


            const name =
                user.name ||
                user.artistName ||
                "Utilizador";


            const firstName =
                name.split(" ")[0];


            const initial =
                name
                    .charAt(0)
                    .toUpperCase();


            document
                .querySelectorAll(
                    "#dashboardUserName"
                )
                .forEach(element => {

                    element.textContent =
                        firstName;

                });


            document
                .querySelectorAll(
                    "#sidebarUserName"
                )
                .forEach(element => {

                    element.textContent =
                        name;

                });


            document
                .querySelectorAll(
                    "#sidebarUserInitial, #dashboardAvatarInitial"
                )
                .forEach(element => {

                    element.textContent =
                        initial;

                });

        } catch (error) {

            console.warn(
                "Não foi possível carregar o utilizador.",
                error
            );

        }

    },


    /*
    |--------------------------------------------------------------------------
    | ANIMATIONS
    |--------------------------------------------------------------------------
    */

    initializeAnimations() {

        document
            .querySelectorAll(
                ".dashboard-stat-card, .quick-action-card"
            )
            .forEach(card => {

                card.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            card.getBoundingClientRect();

                        const x =
                            event.clientX -
                            rect.left;

                        const y =
                            event.clientY -
                            rect.top;

                        const centerX =
                            rect.width / 2;

                        const centerY =
                            rect.height / 2;

                        const rotateX =
                            ((y - centerY) /
                                centerY) *
                            -2;

                        const rotateY =
                            ((x - centerX) /
                                centerX) *
                            2;

                        card.style.transform =
                            `perspective(800px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)
                             translateY(-3px)`;

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.transform =
                            "";

                    }
                );

            });

    }

};


/*
|--------------------------------------------------------------------------
| START
|--------------------------------------------------------------------------
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        Dashboard.init();

    }
);