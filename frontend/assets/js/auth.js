"use strict";

$(document).ready(function () {

    /* =========================================================
       CONFIGURAÇÃO DA API
    ========================================================= */

    const API_URL =
        "http://localhost:3000/api";


    /* =========================================================
       UTILITÁRIOS
    ========================================================= */

    function showAlert(message, type = "info") {

        const $alert =
            $("#authAlert");

        $alert
            .removeClass("error success info")
            .addClass(`show ${type}`)
            .html(message);

    }


    function hideAlert() {

        $("#authAlert")
            .removeClass("show error success info")
            .html("");

    }


    function showFieldError(
        field,
        message
    ) {

        const $field =
            $(`#${field}`);

        const $error =
            $(`#${field}Error`);

        $field.addClass(
            "input-error"
        );

        $error
            .text(message)
            .addClass("show");

    }


    function clearFieldError(field) {

        const $field =
            $(`#${field}`);

        const $error =
            $(`#${field}Error`);

        $field.removeClass(
            "input-error input-success"
        );

        $error
            .text("")
            .removeClass("show");

    }


    function setLoading(
        button,
        loading
    ) {

        const $button =
            $(button);

        if (loading) {

            $button
                .prop("disabled", true);

            $button
                .find(".button-text")
                .attr("hidden", true);

            $button
                .find(".button-loading")
                .removeAttr("hidden");

        } else {

            $button
                .prop("disabled", false);

            $button
                .find(".button-text")
                .removeAttr("hidden");

            $button
                .find(".button-loading")
                .attr("hidden", true);

        }

    }


    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    /* =========================================================
       MOSTRAR / OCULTAR PASSWORD
    ========================================================= */

    $(".password-toggle").on(
        "click",
        function () {

            const target =
                $(this).data("target");

            const $input =
                $(`#${target}`);

            const $icon =
                $(this).find("i");

            if (
                $input.attr("type") ===
                "password"
            ) {

                $input.attr(
                    "type",
                    "text"
                );

                $icon
                    .removeClass("bi-eye")
                    .addClass("bi-eye-slash");

            } else {

                $input.attr(
                    "type",
                    "password"
                );

                $icon
                    .removeClass("bi-eye-slash")
                    .addClass("bi-eye");

            }

        }
    );


    /* =========================================================
       LOGIN
    ========================================================= */

    $("#loginForm").on(
        "submit",
        async function (event) {

            event.preventDefault();

            hideAlert();

            clearFieldError("email");

            clearFieldError("password");


            const email =
                $("#email")
                    .val()
                    .trim();

            const password =
                $("#password")
                    .val();


            let valid = true;


            if (!email) {

                showFieldError(
                    "email",
                    "Introduz o teu email."
                );

                valid = false;

            } else if (!isValidEmail(email)) {

                showFieldError(
                    "email",
                    "Introduz um email válido."
                );

                valid = false;

            }


            if (!password) {

                showFieldError(
                    "password",
                    "Introduz a tua palavra-passe."
                );

                valid = false;

            }


            if (!valid) {
                return;
            }


            setLoading(
                "#loginButton",
                true
            );


            /*
             * Preparado para o backend.
             */

            try {

                const response =
                    await fetch(
                        `${API_URL}/auth/login`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email,
                                password
                            })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    showAlert(
                        data.message ||
                        "Não foi possível iniciar sessão.",
                        "error"
                    );

                    setLoading(
                        "#loginButton",
                        false
                    );

                    return;
                }


                /*
                 * Guardar token quando a API
                 * estiver disponível.
                 */

                if (data.token) {

                    localStorage.setItem(
                        "access_token",
                        data.token
                    );

                }


                showAlert(
                    "Sessão iniciada com sucesso. A redireccionar...",
                    "success"
                );


                setTimeout(
                    function () {

                        window.location.href =
                            "dashboard.html";

                    },
                    1000
                );


            } catch (error) {

                console.error(
                    "LOGIN ERROR:",
                    error
                );


                showAlert(
                    "Não foi possível contactar o servidor. Tenta novamente.",
                    "error"
                );


                setLoading(
                    "#loginButton",
                    false
                );

            }

        }
    );


    /* =========================================================
       REGISTO
    ========================================================= */

    $("#registerForm").on(
        "submit",
        async function (event) {

            event.preventDefault();

            hideAlert();


            const fields = [
                "name",
                "artistName",
                "registerEmail",
                "registerPassword",
                "confirmPassword",
                "terms"
            ];

            fields.forEach(function (field) {

                clearFieldError(field);

            });


            const name =
                $("#name")
                    .val()
                    .trim();

            const artistName =
                $("#artistName")
                    .val()
                    .trim();

            const email =
                $("#registerEmail")
                    .val()
                    .trim();

            const password =
                $("#registerPassword")
                    .val();

            const confirmPassword =
                $("#confirmPassword")
                    .val();

            const terms =
                $("#terms")
                    .is(":checked");


            let valid = true;


            /* Nome */

            if (!name) {

                showFieldError(
                    "name",
                    "Introduz o teu nome completo."
                );

                valid = false;

            } else if (name.length < 3) {

                showFieldError(
                    "name",
                    "O nome deve ter pelo menos 3 caracteres."
                );

                valid = false;

            }


            /* Nome artístico */

            if (
                artistName &&
                artistName.length < 2
            ) {

                showFieldError(
                    "artistName",
                    "O nome artístico é demasiado curto."
                );

                valid = false;

            }


            /* Email */

            if (!email) {

                showFieldError(
                    "registerEmail",
                    "Introduz o teu email."
                );

                valid = false;

            } else if (!isValidEmail(email)) {

                showFieldError(
                    "registerEmail",
                    "Introduz um email válido."
                );

                valid = false;

            }


            /* Password */

            if (!password) {

                showFieldError(
                    "registerPassword",
                    "Cria uma palavra-passe."
                );

                valid = false;

            } else if (password.length < 8) {

                showFieldError(
                    "registerPassword",
                    "A palavra-passe deve ter pelo menos 8 caracteres."
                );

                valid = false;

            }


            /* Confirm password */

            if (!confirmPassword) {

                showFieldError(
                    "confirmPassword",
                    "Confirma a tua palavra-passe."
                );

                valid = false;

            } else if (
                password !== confirmPassword
            ) {

                showFieldError(
                    "confirmPassword",
                    "As palavras-passe não coincidem."
                );

                valid = false;

            }


            /* Terms */

            if (!terms) {

                showFieldError(
                    "terms",
                    "É necessário aceitar os termos."
                );

                valid = false;

            }


            if (!valid) {
                return;
            }


            setLoading(
                "#registerButton",
                true
            );


            try {

                const response =
                    await fetch(
                        `${API_URL}/auth/register`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                name,

                                artistName:
                                    artistName || null,

                                email,

                                password

                            })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    showAlert(
                        data.message ||
                        "Não foi possível criar a conta.",
                        "error"
                    );

                    setLoading(
                        "#registerButton",
                        false
                    );

                    return;

                }


                showAlert(
                    "Conta criada com sucesso. Podes agora iniciar sessão.",
                    "success"
                );


                $("#registerForm")[0].reset();


                setTimeout(
                    function () {

                        window.location.href =
                            "login.html";

                    },
                    1200
                );


            } catch (error) {

                console.error(
                    "REGISTER ERROR:",
                    error
                );


                showAlert(
                    "Não foi possível contactar o servidor. Tenta novamente.",
                    "error"
                );


                setLoading(
                    "#registerButton",
                    false
                );

            }

        }
    );


    /* =========================================================
       PASSWORD STRENGTH
    ========================================================= */

    $("#registerPassword").on(
        "input",
        function () {

            const password =
                $(this).val();

            const $strength =
                $("#passwordStrength");

            $strength.removeClass(
                "weak medium good strong"
            );


            if (!password) {
                return;
            }


            let score = 0;


            if (password.length >= 8) {
                score++;
            }

            if (/[A-Z]/.test(password)) {
                score++;
            }

            if (/[0-9]/.test(password)) {
                score++;
            }

            if (
                /[^A-Za-z0-9]/.test(password)
            ) {
                score++;
            }


            if (score <= 1) {

                $strength.addClass(
                    "weak"
                );

            } else if (score === 2) {

                $strength.addClass(
                    "medium"
                );

            } else if (score === 3) {

                $strength.addClass(
                    "good"
                );

            } else {

                $strength.addClass(
                    "strong"
                );

            }

        }
    );


    /* =========================================================
       VALIDAR CONFIRMAÇÃO EM TEMPO REAL
    ========================================================= */

    $("#confirmPassword").on(
        "input",
        function () {

            const password =
                $("#registerPassword").val();

            const confirmation =
                $(this).val();


            if (!confirmation) {
                return;
            }


            if (
                password === confirmation
            ) {

                $(this)
                    .removeClass("input-error")
                    .addClass("input-success");

                $("#confirmPasswordError")
                    .removeClass("show")
                    .text("");

            } else {

                showFieldError(
                    "confirmPassword",
                    "As palavras-passe não coincidem."
                );

            }

        }
    );


    /* =========================================================
       ESQUECI A PASSWORD
    ========================================================= */

    $("#forgotPassword").on(
        "click",
        function (event) {

            event.preventDefault();

            showAlert(
                "A recuperação da palavra-passe será disponibilizada através do sistema de autenticação.",
                "info"
            );

        }
    );


    /* =========================================================
       LIMPAR ERROS AO ESCREVER
    ========================================================= */

    $(".form-control").on(
        "input",
        function () {

            $(this)
                .removeClass("input-error");

            const id =
                $(this).attr("id");

            $(`#${id}Error`)
                .removeClass("show");

        }
    );


    console.log(
        "%c AUTH MODULE ",
        "background:#8A2BE2;color:#fff;font-weight:700;padding:6px 12px;border-radius:6px;"
    );

});

const API_URL = "http://localhost:3000/api";

const GOOGLE_CLIENT_ID =
    "951270068547-hliv5lqg93p4ub6ct3rhbs391rcl6dg4.apps.googleusercontent.com";

    function initializeGoogleAuth() {
    if (!window.google?.accounts?.id) {
        console.warn("Google Identity Services ainda não foi carregado.");
        return;
    }

    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
        auto_select: false
    });

    const loginButton = document.getElementById("googleLoginButton");

    if (loginButton) {
        google.accounts.id.renderButton(loginButton, {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "signin_with",
            shape: "rectangular",
            logo_alignment: "left",
            width: 400,
            locale: "pt"
        });
    }

    const registerButton = document.getElementById("googleRegisterButton");

    if (registerButton) {
        google.accounts.id.renderButton(registerButton, {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "signup_with",
            shape: "rectangular",
            logo_alignment: "left",
            width: 400,
            locale: "pt"
        });
    }
}

async function handleGoogleCredential(response) {
    if (!response?.credential) {
        showAlert(
            "Não foi possível obter a credencial do Google.",
            "danger"
        );

        return;
    }

    try {
        const button = document.querySelector(
            "#googleLoginButton, #googleRegisterButton"
        );

        if (button) {
            button.classList.add("loading");
        }

        const result = await fetch(`${API_URL}/auth/google`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                credential: response.credential
            })
        });

        const data = await result.json();

        if (!result.ok) {
            throw new Error(
                data.message || "Não foi possível autenticar com Google."
            );
        }

        if (data.token) {
            localStorage.setItem("access_token", data.token);
        }

        if (data.user) {
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );
        }

        window.location.href = "../dashboard.html";

    } catch (error) {
        console.error("Google Auth:", error);

        showAlert(
            error.message || "Erro ao autenticar com Google.",
            "danger"
        );
    } finally {
        const button = document.querySelector(
            "#googleLoginButton, #googleRegisterButton"
        );

        if (button) {
            button.classList.remove("loading");
        }
    }
}
window.addEventListener("load", () => {
    initializeGoogleAuth();
});