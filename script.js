/* ==========================================
   SECURIFEED - MAIN SCRIPT
========================================== */

/* ==========================================
   HAMBURGER MENU
========================================== */

function toggleMenu() {
    document
        .getElementById("navLinks")
        .classList
        .toggle("active");
}


/* ==========================================
   URL PHISHING ANALYZER
========================================== */

function analyzeURL() {

    const url = document.getElementById("urlInput").value.trim();
    const result = document.getElementById("urlResult");

    if (url === "") {
        result.innerHTML = "⚠ Please enter a URL.";
        return;
    }

    let risk = 0;
    let findings = [];

    if (!url.startsWith("https://")) {
        risk += 25;
        findings.push("❌ Website is not using HTTPS.");
    }

    if (url.includes("@")) {
        risk += 20;
        findings.push("⚠ URL contains '@' symbol.");
    }

    if (url.length > 50) {
        risk += 15;
        findings.push("⚠ URL is unusually long.");
    }

    if (/\d+\.\d+\.\d+\.\d+/.test(url)) {
        risk += 20;
        findings.push("⚠ URL contains an IP address.");
    }

    const suspiciousWords = [
        "login",
        "verify",
        "secure",
        "update",
        "account",
        "bank",
        "signin",
        "confirm",
        "payment"
    ];

    suspiciousWords.forEach(word => {
        if (url.toLowerCase().includes(word)) {
            risk += 10;
            findings.push(`⚠ Suspicious keyword detected: ${word}`);
        }
    });

    let status = "Low Risk";

    if (risk >= 70) {
        status = "High Risk";
    } else if (risk >= 40) {
        status = "Medium Risk";
    }

    result.innerHTML = `
        <h3>URL Analysis Result</h3>
        <p><strong>Risk Score:</strong> ${risk}/100</p>
        <p><strong>Status:</strong> ${status}</p>
        <hr>
        ${findings.length > 0
            ? findings.join("<br>")
            : "✅ No suspicious indicators found."}
    `;
}


/* ==========================================
   EMAIL HEADER ANALYZER
========================================== */

function analyzeEmail() {

    const header =
        document.getElementById("emailHeader")
        .value
        .toLowerCase()
        .trim();

    const result =
        document.getElementById("emailResult");

    if (header === "") {
        result.innerHTML = "⚠ Please paste an email header.";
        return;
    }

    let risk = 0;
    let findings = [];

    const suspiciousKeywords = [
        "urgent",
        "verify",
        "password",
        "login",
        "bank",
        "account",
        "click here",
        "reset",
        "security alert",
        "limited time"
    ];

    suspiciousKeywords.forEach(word => {

        if (header.includes(word)) {
            risk += 10;
            findings.push(`⚠ Suspicious keyword found: ${word}`);
        }

    });

    if (
        header.includes("@gmail.com") ||
        header.includes("@yahoo.com") ||
        header.includes("@hotmail.com") ||
        header.includes("@outlook.com")
    ) {

        risk += 20;

        findings.push(
            "⚠ Free email provider detected."
        );
    }

    if (header.includes("reply-to")) {

        risk += 10;

        findings.push(
            "⚠ Reply-To field detected. Verify sender carefully."
        );
    }

    if (header.includes("spf=fail")) {

        risk += 20;

        findings.push(
            "⚠ SPF validation failure detected."
        );
    }

    let status = "Low Risk";

    if (risk >= 60) {
        status = "High Risk";
    } else if (risk >= 30) {
        status = "Medium Risk";
    }

    result.innerHTML = `
        <h3>Email Analysis Result</h3>
        <p><strong>Risk Score:</strong> ${risk}/100</p>
        <p><strong>Status:</strong> ${status}</p>
        <hr>
        ${findings.length > 0
            ? findings.join("<br>")
            : "✅ No suspicious indicators found."}
    `;
}


/* ==========================================
   HTTPS SECURITY CHECKER
========================================== */

function checkSSL() {

    const url =
        document.getElementById("sslInput")
        .value
        .trim();

    const result =
        document.getElementById("sslResult");

    if (url === "") {

        result.innerHTML =
            "⚠ Please enter a website URL.";

        return;
    }

    if (url.startsWith("https://")) {

        result.innerHTML = `
            <h3>HTTPS Security Check</h3>
            <p>✅ Secure HTTPS connection detected.</p>
            <p>Data is encrypted during transmission.</p>
        `;

    } else {

        result.innerHTML = `
            <h3>HTTPS Security Check</h3>
            <p>❌ HTTPS not detected.</p>
            <p>This website may transmit data without encryption.</p>
        `;

    }
}


/* ==========================================
   CYBER THREAT NEWS FEED
========================================== */

const cyberNews = [

    {
        title: "Fake Banking Websites Rise",
        description:
            "Cybercriminals are creating fake banking portals to steal user credentials."
    },

    {
        title: "New Gmail Phishing Campaign",
        description:
            "Attackers are targeting users through fake account recovery emails."
    },

    {
        title: "Credential Theft Alert",
        description:
            "Researchers report a global increase in phishing attacks."
    },

    {
        title: "Malicious QR Code Scams",
        description:
            "Fraudsters are using QR codes to redirect users to phishing pages."
    }

];


/* ==========================================
   LOAD NEWS
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const container =
        document.getElementById("newsContainer");

    if (!container) return;

    cyberNews.forEach(news => {

        const card =
            document.createElement("div");

        card.classList.add("news-card");

        card.innerHTML = `
            <h3>${news.title}</h3>
            <p>${news.description}</p>
        `;

        container.appendChild(card);

    });

});