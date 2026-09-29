"use strict";


/* =========================================================
   DISTRIBUTION
========================================================= */

const Distribution = {

    currentStep: 1,

    totalSteps: 4,

    form: null,


    /* =====================================================
       INIT
    ===================================================== */

    init() {

        this.form =
            document.getElementById(
                "distributionForm"
            );

        this.initializeAOS();

        this.initializeNavigation();

        this.initializeFiles();

        this.initializePlatforms();

        this.initializeForm();

        this.setMinimumReleaseDate();

    },


    /* =====================================================
       AOS
    ===================================================== */

    initializeAOS() {

        if (typeof AOS !== "undefined") {

            AOS.init({
                duration: 650,
                once: true
            });

        }

    },


    /* =====================================================
       NAVIGATION
    ===================================================== */

    initializeNavigation() {

        document
            .querySelectorAll(
                "[data-next]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const nextStep =
                            Number(
                                button.dataset.next
                            );

                        if (
                            this.validateStep(
                                this.currentStep
                            )
                        ) {

                            this.goToStep(
                                nextStep
                            );

                        }

                    }
                );

            });


        document
            .querySelectorAll(
                "[data-back]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        this.goToStep(
                            Number(
                                button.dataset.back
                            )
                        );

                    }
                );

            });

    },


    /* =====================================================
       STEP
    ===================================================== */

    goToStep(step) {

        if (
            step < 1 ||
            step > this.totalSteps
        ) {
            return;
        }


        document
            .querySelectorAll(
                ".distribution-step"
            )
            .forEach(section => {

                section.classList.toggle(
                    "active",
                    Number(
                        section.dataset.stepContent
                    ) === step
                );

            });


        document
            .querySelectorAll(
                ".progress-step"
            )
            .forEach(progress => {

                const progressStep =
                    Number(
                        progress.dataset.step
                    );

                progress.classList.toggle(
                    "active",
                    progressStep <= step
                );

            });


        this.currentStep = step;


        if (step === 4) {

            this.generateReview();

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    },


    /* =====================================================
       VALIDATION
    ===================================================== */

    validateStep(step) {

        this.clearErrors();


        if (step === 1) {

            const fields = [
                {
                    id: "releaseTitle",
                    message: "Informe o título da música."
                },

                {
                    id: "artistName",
                    message: "Informe o nome artístico."
                },

                {
                    id: "releaseType",
                    message: "Seleccione o tipo de lançamento."
                },

                {
                    id: "genre",
                    message: "Seleccione o género."
                },

                {
                    id: "language",
                    message: "Seleccione o idioma."
                },

                {
                    id: "releaseDate",
                    message: "Seleccione a data de lançamento."
                }
            ];


            let valid = true;


            fields.forEach(field => {

                const input =
                    document.getElementById(
                        field.id
                    );


                if (
                    !input ||
                    !input.value.trim()
                ) {

                    this.showFieldError(
                        input,
                        field.message
                    );

                    valid = false;

                }

            });


            const date =
                document.getElementById(
                    "releaseDate"
                );


            if (
                date.value &&
                date.value <= this.getToday()
            ) {

                this.showFieldError(
                    date,
                    "A data deve ser futura."
                );

                valid = false;

            }


            return valid;

        }


        if (step === 2) {

            const audio =
                document.getElementById(
                    "audioFile"
                );

            const cover =
                document.getElementById(
                    "coverFile"
                );


            if (!audio.files.length) {

                this.showUploadError(
                    "audioUploadBox",
                    "Seleccione o ficheiro de áudio."
                );

                return false;

            }


            if (!cover.files.length) {

                this.showUploadError(
                    "coverUploadBox",
                    "Seleccione a capa."
                );

                return false;

            }


            return true;

        }


        if (step === 3) {

            const platforms =
                document.querySelectorAll(
                    'input[name="platforms"]:checked'
                );


            if (!platforms.length) {

                alert(
                    "Seleccione pelo menos uma plataforma."
                );

                return false;

            }


            return true;

        }


        return true;

    },


    /* =====================================================
       ERRORS
    ===================================================== */

    showFieldError(
        input,
        message
    ) {

        if (!input) {
            return;
        }


        input.classList.add(
            "is-invalid"
        );


        const container =
            input.closest(
                ".distribution-field"
            );


        const error =
            container?.querySelector(
                ".field-error"
            );


        if (error) {

            error.textContent =
                message;

        }

    },


    showUploadError(
        elementId,
        message
    ) {

        const element =
            document.getElementById(
                elementId
            );


        if (!element) {
            return;
        }


        element.style.borderColor =
            "#ef4444";


        alert(message);


        setTimeout(() => {

            element.style.borderColor =
                "";

        }, 1500);

    },


    clearErrors() {

        document
            .querySelectorAll(
                ".is-invalid"
            )
            .forEach(element => {

                element.classList.remove(
                    "is-invalid"
                );

            });


        document
            .querySelectorAll(
                ".field-error"
            )
            .forEach(element => {

                element.textContent = "";

            });

    },


    /* =====================================================
       FILES
    ===================================================== */

    initializeFiles() {

        const audio =
            document.getElementById(
                "audioFile"
            );

        const cover =
            document.getElementById(
                "coverFile"
            );


        audio?.addEventListener(
            "change",
            () => {

                this.handleAudio(
                    audio.files[0]
                );

            }
        );


        cover?.addEventListener(
            "change",
            () => {

                this.handleCover(
                    cover.files[0]
                );

            }
        );

    },


    handleAudio(file) {

        if (!file) {
            return;
        }


        const allowed = [
            "audio/mpeg",
            "audio/wav",
            "audio/flac"
        ];


        if (
            !allowed.includes(
                file.type
            )
        ) {

            alert(
                "Formato de áudio não suportado."
            );

            return;

        }


        const preview =
            document.getElementById(
                "audioPreview"
            );


        preview.classList.add(
            "active"
        );


        preview.innerHTML = `

            <div class="audio-preview-card">

                <div class="audio-preview-icon">

                    <i class="bi bi-music-note-beamed"></i>

                </div>

                <div class="audio-preview-info">

                    <strong>
                        ${this.escapeHTML(file.name)}
                    </strong>

                    <span>
                        ${this.formatFileSize(file.size)}
                    </span>

                </div>

                <button
                    type="button"
                    class="remove-file"
                    id="removeAudio"
                >

                    <i class="bi bi-trash"></i>

                </button>

            </div>

        `;


        document
            .getElementById(
                "removeAudio"
            )
            ?.addEventListener(
                "click",
                () => {

                    document.getElementById(
                        "audioFile"
                    ).value = "";

                    preview.classList.remove(
                        "active"
                    );

                    preview.innerHTML = "";

                }
            );

    },


    handleCover(file) {

        if (!file) {
            return;
        }


        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            alert(
                "Seleccione uma imagem válida."
            );

            return;

        }


        const reader =
            new FileReader();


        reader.onload = event => {

            const preview =
                document.getElementById(
                    "coverPreview"
                );


            preview.classList.add(
                "active"
            );


            preview.innerHTML = `

                <div class="cover-preview-card">

                    <img
                        src="${event.target.result}"
                        alt="Pré-visualização da capa"
                    >

                    <button
                        type="button"
                        id="removeCover"
                    >

                        <i class="bi bi-x"></i>

                    </button>

                </div>

            `;


            document
                .getElementById(
                    "removeCover"
                )
                ?.addEventListener(
                    "click",
                    () => {

                        document.getElementById(
                            "coverFile"
                        ).value = "";

                        preview.classList.remove(
                            "active"
                        );

                        preview.innerHTML = "";

                    }
                );

        };


        reader.readAsDataURL(file);

    },


    /* =====================================================
       PLATFORMS
    ===================================================== */

    initializePlatforms() {

        document
            .querySelectorAll(
                'input[name="platforms"]'
            )
            .forEach(input => {

                input.addEventListener(
                    "change",
                    () => {

                        const card =
                            input.closest(
                                ".platform-card"
                            );


                        card?.classList.toggle(
                            "selected",
                            input.checked
                        );

                    }
                );

            });

    },


    /* =====================================================
       REVIEW
    ===================================================== */

    generateReview() {

        const title =
            document.getElementById(
                "releaseTitle"
            ).value;


        const artist =
            document.getElementById(
                "artistName"
            ).value;


        const type =
            document.getElementById(
                "releaseType"
            );


        const genre =
            document.getElementById(
                "genre"
            );


        const language =
            document.getElementById(
                "language"
            );


        const date =
            document.getElementById(
                "releaseDate"
            );


        const audio =
            document.getElementById(
                "audioFile"
            ).files[0];


        const cover =
            document.getElementById(
                "coverFile"
            ).files[0];


        const platforms =
            Array.from(
                document.querySelectorAll(
                    'input[name="platforms"]:checked'
                )
            );


        const container =
            document.getElementById(
                "reviewContainer"
            );


        let coverURL = "";


        if (cover) {

            coverURL =
                URL.createObjectURL(
                    cover
                );

        }


        container.innerHTML = `

            <div class="review-cover">

                ${
                    coverURL

                        ? `
                            <img
                                src="${coverURL}"
                                alt="Capa"
                            >
                        `

                        : `
                            <div
                                style="
                                    height:100%;
                                    display:flex;
                                    align-items:center;
                                    justify-content:center;
                                    color:#555;
                                "
                            >
                                <i class="bi bi-image"></i>
                            </div>
                        `
                }

            </div>


            <div class="review-data">

                <div class="review-item">

                    <span>
                        Título
                    </span>

                    <strong>
                        ${this.escapeHTML(title)}
                    </strong>

                </div>


                <div class="review-item">

                    <span>
                        Artista
                    </span>

                    <strong>
                        ${this.escapeHTML(artist)}
                    </strong>

                </div>


                <div class="review-item">

                    <span>
                        Tipo
                    </span>

                    <strong>
                        ${type.options[type.selectedIndex]?.text}
                    </strong>

                </div>


                <div class="review-item">

                    <span>
                        Género
                    </span>

                    <strong>
                        ${genre.options[genre.selectedIndex]?.text}
                    </strong>

                </div>


                <div class="review-item">

                    <span>
                        Idioma
                    </span>

                    <strong>
                        ${language.options[language.selectedIndex]?.text}
                    </strong>

                </div>


                <div class="review-item">

                    <span>
                        Lançamento
                    </span>

                    <strong>
                        ${this.formatDate(date.value)}
                    </strong>

                </div>


                <div class="review-item">

                    <span>
                        Áudio
                    </span>

                    <strong>
                        ${
                            audio
                                ? this.escapeHTML(audio.name)
                                : "Não seleccionado"
                        }
                    </strong>

                </div>


                <div class="review-item review-platforms">

                    <span>
                        Plataformas
                    </span>

                    <div class="review-platform-list">

                        ${
                            platforms
                                .map(
                                    platform => `
                                        <span class="review-platform">
                                            ${this.platformName(
                                                platform.value
                                            )}
                                        </span>
                                    `
                                )
                                .join("")
                        }

                    </div>

                </div>

            </div>

        `;

    },


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    initializeForm() {

        this.form?.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                if (
                    !this.validateStep(4)
                ) {
                    return;
                }


                const confirmation =
                    document.getElementById(
                        "termsConfirmation"
                    );


                if (
                    !confirmation.checked
                ) {

                    alert(
                        "Confirme que possui os direitos necessários sobre o conteúdo."
                    );

                    return;

                }


                const submit =
                    document.getElementById(
                        "submitDistribution"
                    );


                const text =
                    submit.querySelector(
                        ".submit-text"
                    );


                const loading =
                    submit.querySelector(
                        ".submit-loading"
                    );


                text.hidden = true;

                loading.hidden = false;

                submit.disabled = true;


                try {

                    /*
                     * FUTURO:
                     *
                     * Aqui vamos enviar os ficheiros
                     * para o backend através de
                     * FormData.
                     */

                    await new Promise(
                        resolve =>
                            setTimeout(
                                resolve,
                                1800
                            )
                    );


                    alert(
                        "Lançamento preparado com sucesso. A integração com a API será adicionada na próxima etapa."
                    );


                    this.form.reset();

                    this.goToStep(1);

                } catch (error) {

                    console.error(
                        error
                    );

                    alert(
                        "Não foi possível enviar o lançamento."
                    );

                } finally {

                    text.hidden = false;

                    loading.hidden = true;

                    submit.disabled = false;

                }

            }
        );

    },


    /* =====================================================
       DATE
    ===================================================== */

    setMinimumReleaseDate() {

        const input =
            document.getElementById(
                "releaseDate"
            );


        if (!input) {
            return;
        }


        input.min =
            this.getTomorrow();

    },


    getToday() {

        return new Date()
            .toISOString()
            .split("T")[0];

    },


    getTomorrow() {

        const date =
            new Date();

        date.setDate(
            date.getDate() + 1
        );

        return date
            .toISOString()
            .split("T")[0];

    },


    formatDate(value) {

        if (!value) {
            return "-";
        }


        return new Intl.DateTimeFormat(
            "pt-PT",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        ).format(
            new Date(`${value}T00:00:00`)
        );

    },


    /* =====================================================
       PLATFORM
    ===================================================== */

    platformName(platform) {

        const names = {

            spotify: "Spotify",

            apple: "Apple Music",

            youtube: "YouTube Music",

            deezer: "Deezer",

            tidal: "TIDAL",

            amazon: "Amazon Music"

        };


        return (
            names[platform] ||
            platform
        );

    },


    /* =====================================================
       FILE SIZE
    ===================================================== */

    formatFileSize(bytes) {

        if (!bytes) {
            return "0 Bytes";
        }


        const units = [
            "Bytes",
            "KB",
            "MB",
            "GB"
        ];


        const index =
            Math.floor(
                Math.log(bytes) /
                Math.log(1024)
            );


        return (
            parseFloat(
                (
                    bytes /
                    Math.pow(
                        1024,
                        index
                    )
                ).toFixed(2)
            ) +
            " " +
            units[index]
        );

    },


    /* =====================================================
       ESCAPE
    ===================================================== */

    escapeHTML(value) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }

};


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        Distribution.init();

    }
);