// Função para definir um cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Função para obter um cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Função para exibir o banner se o cookie de consentimento não estiver presente
function showCookieBanner() {
    if (!getCookie('cookieConsent')) {
        document.getElementById('cookie-banner').style.display = 'block';
    } else {
        // Carregar scripts e funcionalidades que requerem consentimento
        loadConsentDependentScripts();
    }
}

// Função para aceitar cookies e ocultar o banner
function acceptCookies() {
    setCookie('cookieConsent', 'true', 365);
    document.getElementById('cookie-banner').style.display = 'none';
    loadConsentDependentScripts();
}

// Função para carregar scripts que dependem de consentimento
function loadConsentDependentScripts() {
    // Exemplo: Carregar Google Analytics
    const script = document.createElement('script');
    script.src = 'https://www.google-analytics.com/analytics.js';
    document.head.appendChild(script);
}

// Adiciona um ouvinte de evento para o botão de aceitação de cookies
document.getElementById('accept-cookies').addEventListener('click', acceptCookies);

// Exibe o banner quando a página é carregada
window.onload = showCookieBanner;
