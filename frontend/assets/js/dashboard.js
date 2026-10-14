"use strict";

/**
 * ============================================================
 * FREEZONE — DASHBOARD
 * ============================================================
 * Frontend Dashboard
 *
 * Stack:
 * - JavaScript
 * - jQuery
 * - Bootstrap
 * - AOS
 * - Chart.js
 *
 * Futuramente:
 * Frontend → REST API → Controller → Service → Repository → DB
 * ============================================================
 */

const Dashboard = {

    // ========================================================
    // CONFIGURAÇÕES
    // ========================================================

    config: {
        sidebarBreakpoint: 992,
        animationDuration: 700,
        chartFontFamily: "Inter, system-ui, sans-serif"
    },

    // ========================================================
    // DADOS DO UTILIZADOR
    // ========================================================

    user: {
        name: "Juliano Barros",
        artistName: "Artist Name",
        email: "juliano@example.com",
        avatar: null
    },

    // ========================================================
    // INICIALIZAÇÃO
    // ========================================================

    init() {

        this.initializeAOS();
        this.initializeSidebar();
        this.initializeNavigation();
        this.initializeSearch();
        this.initializeNotifications();

        this.initializeCharts();

        this.initializeProfile();
        this.initializeSettings();
        this.initializeReleaseActions();
        this.initializeArtistActions();
        this.initializeDistributionActions();
        this.initializeRevenueActions();

        this.initializeAnimations();

        this.loadUser();

        this.initializeResponsive();

        console.log("FREEZONE Dashboard iniciado.");
    },


    // ========================================================
    // AOS
    // ========================================================

    initializeAOS() {

        if (typeof AOS === "undefined") {
            return;
        }

        AOS.init({
            duration: this.config.animationDuration,
            once: true,
            offset: 40,
            easing: "ease-out-cubic"
        });
    },


    // ========================================================
    // SIDEBAR
    // ========================================================

    initializeSidebar() {

        const sidebar = document.getElementById("dashboardSidebar");
        const overlay = document.getElementById("dashboardOverlay");
        const menuButton = document.getElementById("dashboardMenuBtn");
        const closeButton = document.getElementById("sidebarClose");

        if (!sidebar) {
            return;
        }

        const openSidebar = () => {

            sidebar.classList.add("active");

            if (overlay) {
                overlay.classList.add("active");
            }

            document.body.classList.add("sidebar-open");
        };

        const closeSidebar = () => {

            sidebar.classList.remove("active");

            if (overlay) {
                overlay.classList.remove("active");
            }

            document.body.classList.remove("sidebar-open");
        };

        if (menuButton) {
            menuButton.addEventListener("click", openSidebar);
        }

        if (closeButton) {
            closeButton.addEventListener("click", closeSidebar);
        }

        if (overlay) {
            overlay.addEventListener("click", closeSidebar);
        }

        document.querySelectorAll(".dashboard-nav-link").forEach(link => {

            link.addEventListener("click", () => {

                if (window.innerWidth < this.config.sidebarBreakpoint) {
                    closeSidebar();
                }

            });

        });
    },


    // ========================================================
    // NAVEGAÇÃO
    // ========================================================

    initializeNavigation() {

        const navLinks = document.querySelectorAll(".dashboard-nav-link");
        const sections = document.querySelectorAll(".dashboard-section");

        if (!navLinks.length || !sections.length) {
            return;
        }

        navLinks.forEach(link => {

            link.addEventListener("click", event => {

                const targetId = link.getAttribute("href");

                if (!targetId || !targetId.startsWith("#")) {
                    return;
                }

                const target = document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                this.setActiveNavigation(link);
            });
        });


        // Intersection Observer

        if ("IntersectionObserver" in window) {

            const observer = new IntersectionObserver(entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const sectionId = entry.target.id;

                    const activeLink = document.querySelector(
                        `.dashboard-nav-link[href="#${sectionId}"]`
                    );

                    if (activeLink) {
                        this.setActiveNavigation(activeLink);
                    }

                });

            }, {
                threshold: 0.15,
                rootMargin: "-100px 0px -55% 0px"
            });

            sections.forEach(section => observer.observe(section));
        }
    },


    setActiveNavigation(activeLink) {

        document
            .querySelectorAll(".dashboard-nav-link")
            .forEach(link => link.classList.remove("active"));

        activeLink.classList.add("active");
    },


    // ========================================================
    // PESQUISA
    // ========================================================

    initializeSearch() {

        const searchInput = document.querySelector(
            ".dashboard-search input"
        );

        if (!searchInput) {
            return;
        }

        searchInput.addEventListener("input", event => {

            const value = event.target.value
                .trim()
                .toLowerCase();

            const rows = document.querySelectorAll(
                ".dashboard-table tbody tr"
            );

            rows.forEach(row => {

                const text = row.textContent.toLowerCase();

                row.style.display =
                    !value || text.includes(value)
                        ? ""
                        : "none";
            });

        });
    },


    // ========================================================
    // NOTIFICAÇÕES
    // ========================================================

    initializeNotifications() {

        const notificationButtons = document.querySelectorAll(
            "[data-notification]"
        );

        notificationButtons.forEach(button => {

            button.addEventListener("click", () => {

                this.showToast(
                    "Notificações",
                    "Não existem novas notificações.",
                    "info"
                );

            });

        });
    },


    // ========================================================
    // CHARTS
    // ========================================================

    initializeCharts() {

        this.initializeStreamsChart();
        this.initializeRevenueChart();
        this.initializeAnalyticsChart();
    },


    // ========================================================
    // GRÁFICO DE STREAMS
    // ========================================================

    initializeStreamsChart() {

        const canvas = document.getElementById("streamsChart");

        if (!canvas || typeof Chart === "undefined") {
            return;
        }

        const context = canvas.getContext("2d");

        const gradient = context.createLinearGradient(
            0,
            0,
            0,
            320
        );

        gradient.addColorStop(0, "rgba(124, 58, 237, 0.35)");
        gradient.addColorStop(1, "rgba(124, 58, 237, 0)");

        new Chart(canvas, {

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

                datasets: [{

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

                    borderColor: "#8b5cf6",

                    backgroundColor: gradient,

                    borderWidth: 3,

                    pointRadius: 4,

                    pointHoverRadius: 7,

                    pointBackgroundColor: "#8b5cf6",

                    fill: true,

                    tension: 0.4
                }]
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

                        backgroundColor: "#111827",

                        titleColor: "#ffffff",

                        bodyColor: "#d1d5db",

                        padding: 12,

                        displayColors: false,

                        callbacks: {

                            label(context) {

                                return `${Dashboard.formatNumber(
                                    context.raw
                                )} streams`;
                            }
                        }
                    }
                },

                scales: {

                    x: {

                        grid: {
                            display: false
                        },

                        ticks: {
                            color: "#94a3b8"
                        }
                    },

                    y: {

                        beginAtZero: true,

                        grid: {
                            color: "rgba(148, 163, 184, 0.08)"
                        },

                        ticks: {

                            color: "#94a3b8",

                            callback(value) {

                                if (value >= 1000) {
                                    return `${value / 1000}K`;
                                }

                                return value;
                            }
                        }
                    }
                }
            }
        });
    },


    // ========================================================
    // GRÁFICO DE RENDIMENTOS
    // ========================================================

    initializeRevenueChart() {

        const canvas = document.getElementById("revenueChart");

        if (!canvas || typeof Chart === "undefined") {
            return;
        }

        const context = canvas.getContext("2d");

        const gradient = context.createLinearGradient(
            0,
            0,
            0,
            300
        );

        gradient.addColorStop(0, "rgba(34, 197, 94, 0.30)");
        gradient.addColorStop(1, "rgba(34, 197, 94, 0)");

        new Chart(canvas, {

            type: "line",

            data: {

                labels: [
                    "Jan",
                    "Fev",
                    "Mar",
                    "Abr",
                    "Mai",
                    "Jun"
                ],

                datasets: [{

                    label: "Rendimentos",

                    data: [
                        18500,
                        24300,
                        29800,
                        35200,
                        41600,
                        51200
                    ],

                    borderColor: "#22c55e",

                    backgroundColor: gradient,

                    borderWidth: 3,

                    fill: true,

                    tension: 0.4,

                    pointRadius: 4
                }]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    },

                    tooltip: {

                        callbacks: {

                            label(context) {

                                return `${Dashboard.formatCurrency(
                                    context.raw
                                )}`;
                            }
                        }
                    }
                },

                scales: {

                    x: {
                        grid: {
                            display: false
                        }
                    },

                    y: {

                        beginAtZero: true,

                        ticks: {

                            callback(value) {

                                return `${value / 1000}K Kz`;
                            }
                        }
                    }
                }
            }
        });
    },


    // ========================================================
    // GRÁFICO ANALYTICS
    // ========================================================

    initializeAnalyticsChart() {

        const canvas = document.getElementById(
            "analyticsChart"
        );

        if (!canvas || typeof Chart === "undefined") {
            return;
        }

        new Chart(canvas, {

            type: "bar",

            data: {

                labels: [
                    "Jan",
                    "Fev",
                    "Mar",
                    "Abr",
                    "Mai",
                    "Jun"
                ],

                datasets: [

                    {
                        label: "Streams",

                        data: [
                            52000,
                            68000,
                            72000,
                            85000,
                            104000,
                            128450
                        ],

                        backgroundColor: "#8b5cf6",

                        borderRadius: 8
                    },

                    {
                        label: "Seguidores",

                        data: [
                            1200,
                            1800,
                            2400,
                            3200,
                            5100,
                            8642
                        ],

                        backgroundColor: "#3b82f6",

                        borderRadius: 8
                    }
                ]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        position: "bottom"
                    }
                },

                scales: {

                    x: {
                        grid: {
                            display: false
                        }
                    },

                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    },


    // ========================================================
    // PERFIL
    // ========================================================

    initializeProfile() {

        const profileButton = document.querySelector(
            "[data-profile]"
        );

        if (profileButton) {

            profileButton.addEventListener("click", event => {

                event.preventDefault();

                const profileSection =
                    document.getElementById("profile");

                if (profileSection) {

                    profileSection.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            });
        }


        const profileForm = document.getElementById(
            "profileForm"
        );

        if (profileForm) {

            profileForm.addEventListener("submit", event => {

                event.preventDefault();

                const formData =
                    new FormData(profileForm);

                const name =
                    formData.get("name");

                const artistName =
                    formData.get("artist_name");

                if (name) {
                    this.user.name = name;
                }

                if (artistName) {
                    this.user.artistName =
                        artistName;
                }

                this.saveUser();

                this.loadUser();

                this.showToast(
                    "Perfil actualizado",
                    "As alterações do perfil foram guardadas.",
                    "success"
                );
            });
        }
    },


    // ========================================================
    // DEFINIÇÕES
    // ========================================================

    initializeSettings() {

        document
            .querySelectorAll("[data-setting-toggle]")
            .forEach(toggle => {

                toggle.addEventListener("change", event => {

                    const setting =
                        event.target.dataset.settingToggle;

                    localStorage.setItem(
                        `freezone_setting_${setting}`,
                        event.target.checked
                    );
                });
            });


        const passwordForm =
            document.getElementById("passwordForm");

        if (passwordForm) {

            passwordForm.addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                    const password =
                        passwordForm.querySelector(
                            '[name="password"]'
                        );

                    const confirmation =
                        passwordForm.querySelector(
                            '[name="password_confirmation"]'
                        );

                    if (
                        password &&
                        confirmation &&
                        password.value !== confirmation.value
                    ) {

                        this.showToast(
                            "Erro",
                            "As palavras-passe não coincidem.",
                            "danger"
                        );

                        return;
                    }

                    this.showToast(
                        "Segurança",
                        "Palavra-passe actualizada com sucesso.",
                        "success"
                    );

                    passwordForm.reset();
                }
            );
        }
    },


    // ========================================================
    // LANÇAMENTOS
    // ========================================================

    initializeReleaseActions() {

        const buttons = document.querySelectorAll(
            "[data-action='new-release']"
        );

        buttons.forEach(button => {

            button.addEventListener("click", () => {

                this.openModal(
                    "newReleaseModal"
                );
            });
        });


        document
            .querySelectorAll("[data-release]")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const releaseId =
                        button.dataset.release;

                    console.log(
                        "Release seleccionado:",
                        releaseId
                    );
                });
            });
    },


    // ========================================================
    // ARTISTAS
    // ========================================================

    initializeArtistActions() {

        document
            .querySelectorAll(
                "[data-action='new-artist']"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        this.openModal(
                            "newArtistModal"
                        );
                    }
                );
            });


        const artistForm =
            document.getElementById(
                "artistForm"
            );

        if (artistForm) {

            artistForm.addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                    this.showToast(
                        "Artista",
                        "Artista criado com sucesso.",
                        "success"
                    );

                    artistForm.reset();

                    this.closeModal(
                        "newArtistModal"
                    );
                }
            );
        }
    },


    // ========================================================
    // DISTRIBUIÇÃO
    // ========================================================

    initializeDistributionActions() {

        document
            .querySelectorAll(
                "[data-action='distribution']"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const distribution =
                            document.getElementById(
                                "distribution"
                            );

                        if (distribution) {

                            distribution.scrollIntoView({
                                behavior: "smooth"
                            });
                        }
                    }
                );
            });


        const distributionForm =
            document.getElementById(
                "distributionForm"
            );

        if (distributionForm) {

            distributionForm.addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                    this.showToast(
                        "Distribuição",
                        "Pedido de distribuição criado com sucesso.",
                        "success"
                    );
                }
            );
        }
    },


    // ========================================================
    // RENDIMENTOS / LEVANTAMENTOS
    // ========================================================

    initializeRevenueActions() {

        document
            .querySelectorAll(
                "[data-action='withdraw']"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        this.openModal(
                            "withdrawModal"
                        );
                    }
                );
            });


        const withdrawalForm =
            document.getElementById(
                "withdrawForm"
            );

        if (withdrawalForm) {

            withdrawalForm.addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                    this.showToast(
                        "Levantamento",
                        "Pedido de levantamento enviado.",
                        "success"
                    );

                    withdrawalForm.reset();

                    this.closeModal(
                        "withdrawModal"
                    );
                }
            );
        }
    },


    // ========================================================
    // ANIMAÇÕES
    // ========================================================

    initializeAnimations() {

        const cards = document.querySelectorAll(
            ".dashboard-stat-card, .quick-action-card"
        );

        cards.forEach(card => {

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
                        ((y - centerY) / centerY) * -3;

                    const rotateY =
                        ((x - centerX) / centerX) * 3;

                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-3px)`;
                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";
                }
            );
        });
    },


    // ========================================================
    // RESPONSIVIDADE
    // ========================================================

    initializeResponsive() {

        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth >=
                    this.config.sidebarBreakpoint
                ) {

                    const sidebar =
                        document.getElementById(
                            "dashboardSidebar"
                        );

                    const overlay =
                        document.getElementById(
                            "dashboardOverlay"
                        );

                    if (sidebar) {
                        sidebar.classList.remove(
                            "active"
                        );
                    }

                    if (overlay) {
                        overlay.classList.remove(
                            "active"
                        );
                    }

                    document.body.classList.remove(
                        "sidebar-open"
                    );
                }
            }
        );
    },


    // ========================================================
    // UTILIZADOR
    // ========================================================

    loadUser() {

        const storedUser =
            localStorage.getItem("user");

        if (storedUser) {

            try {

                const parsedUser =
                    JSON.parse(storedUser);

                this.user = {
                    ...this.user,
                    ...parsedUser
                };

            } catch (error) {

                console.warn(
                    "Não foi possível carregar o utilizador.",
                    error
                );
            }
        }


        this.updateUserInterface();
    },


    updateUserInterface() {

        const fullName =
            this.user.name || "Utilizador";

        const firstName =
            fullName
                .trim()
                .split(" ")[0];


        // Nome completo

        document
            .querySelectorAll(
                "[data-user-name]"
            )
            .forEach(element => {

                element.textContent =
                    fullName;
            });


        // Primeiro nome

        document
            .querySelectorAll(
                "[data-user-first-name]"
            )
            .forEach(element => {

                element.textContent =
                    firstName;
            });


        // Nome artístico

        document
            .querySelectorAll(
                "[data-artist-name]"
            )
            .forEach(element => {

                element.textContent =
                    this.user.artistName ||
                    "Artist Name";
            });


        // Email

        document
            .querySelectorAll(
                "[data-user-email]"
            )
            .forEach(element => {

                element.textContent =
                    this.user.email || "";
            });


        // Avatar / iniciais

        const initials =
            this.getInitials(fullName);

        document
            .querySelectorAll(
                "[data-user-avatar]"
            )
            .forEach(element => {

                if (this.user.avatar) {

                    element.style.backgroundImage =
                        `url("${this.user.avatar}")`;

                    element.textContent = "";

                } else {

                    element.textContent =
                        initials;
                }
            });
    },


    saveUser() {

        localStorage.setItem(
            "user",
            JSON.stringify(this.user)
        );
    },


    // ========================================================
    // MODAIS
    // ========================================================

    openModal(modalId) {

        const modalElement =
            document.getElementById(modalId);

        if (!modalElement) {
            return;
        }

        if (typeof bootstrap !== "undefined") {

            const modal =
                bootstrap.Modal.getOrCreateInstance(
                    modalElement
                );

            modal.show();

        } else {

            modalElement.classList.add("show");

            modalElement.style.display = "block";
        }
    },


    closeModal(modalId) {

        const modalElement =
            document.getElementById(modalId);

        if (!modalElement) {
            return;
        }

        if (typeof bootstrap !== "undefined") {

            const modal =
                bootstrap.Modal.getInstance(
                    modalElement
                );

            if (modal) {
                modal.hide();
            }

        } else {

            modalElement.classList.remove("show");

            modalElement.style.display = "none";
        }
    },


    // ========================================================
    // TOAST
    // ========================================================

    showToast(
        title,
        message,
        type = "info"
    ) {

        const container =
            document.getElementById(
                "dashboardToastContainer"
            );

        if (!container) {

            console.log(
                `[${type}] ${title}: ${message}`
            );

            return;
        }


        const toast =
            document.createElement("div");

        toast.className =
            `dashboard-toast dashboard-toast-${type}`;

        toast.innerHTML = `

            <div class="dashboard-toast-content">

                <strong>
                    ${this.escapeHtml(title)}
                </strong>

                <span>
                    ${this.escapeHtml(message)}
                </span>

            </div>

            <button
                type="button"
                class="dashboard-toast-close"
                aria-label="Fechar"
            >
                &times;
            </button>
        `;


        container.appendChild(toast);


        requestAnimationFrame(() => {

            toast.classList.add("show");
        });


        const closeButton =
            toast.querySelector(
                ".dashboard-toast-close"
            );

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                () => {

                    this.removeToast(toast);
                }
            );
        }


        setTimeout(() => {

            this.removeToast(toast);

        }, 5000);
    },


    removeToast(toast) {

        if (!toast) {
            return;
        }

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);
    },


    // ========================================================
    // HELPERS
    // ========================================================

    getInitials(name) {

        if (!name) {
            return "U";
        }

        const parts =
            name
                .trim()
                .split(/\s+/)
                .filter(Boolean);

        if (parts.length === 1) {

            return parts[0]
                .substring(0, 2)
                .toUpperCase();
        }

        return (
            parts[0][0] +
            parts[parts.length - 1][0]
        ).toUpperCase();
    },


    formatNumber(value) {

        return new Intl.NumberFormat(
            "pt-AO"
        ).format(value || 0);
    },


    formatCurrency(value) {

        return new Intl.NumberFormat(
            "pt-AO",
            {
                style: "currency",
                currency: "AOA",
                minimumFractionDigits: 0
            }
        ).format(value || 0);
    },


    escapeHtml(value) {

        const div =
            document.createElement("div");

        div.textContent =
            value ?? "";

        return div.innerHTML;
    },


    // ========================================================
    // API — PREPARADO PARA A FASE BACKEND
    // ========================================================

    api: {

        baseURL: "/api",

        async request(
            endpoint,
            options = {}
        ) {

            const token =
                localStorage.getItem(
                    "access_token"
                );

            const headers = {
                "Content-Type":
                    "application/json",
                ...(options.headers || {})
            };


            if (token) {

                headers.Authorization =
                    `Bearer ${token}`;
            }


            const response =
                await fetch(
                    `${this.baseURL}${endpoint}`,
                    {
                        ...options,
                        headers
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `API Error: ${response.status}`
                );
            }


            return response.json();
        },


        async get(endpoint) {

            return this.request(
                endpoint,
                {
                    method: "GET"
                }
            );
        },


        async post(endpoint, data) {

            return this.request(
                endpoint,
                {
                    method: "POST",
                    body: JSON.stringify(data)
                }
            );
        },


        async put(endpoint, data) {

            return this.request(
                endpoint,
                {
                    method: "PUT",
                    body: JSON.stringify(data)
                }
            );
        },


        async delete(endpoint) {

            return this.request(
                endpoint,
                {
                    method: "DELETE"
                }
            );
        }
    },


    // ========================================================
    // LOGOUT
    // ========================================================

    initializeLogout() {

        document
            .querySelectorAll(
                "[data-action='logout'], #logoutBtn"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        this.logout();
                    }
                );
            });
    },


    logout() {

        localStorage.removeItem(
            "access_token"
        );

        localStorage.removeItem(
            "user"
        );

        window.location.href =
            "pages/login.html";
    }
};


// ============================================================
// START DASHBOARD
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        Dashboard.init();
    }
);