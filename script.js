const scanBtn = document.getElementById("scanBtn");

const wifiName = document.getElementById("wifiName");
const securityType = document.getElementById("securityType");
const signalStrength = document.getElementById("signalStrength");
const deviceCount = document.getElementById("deviceCount");

const securityStatus = document.getElementById("securityStatus");
const deviceList = document.getElementById("deviceList");

const password = document.getElementById("password");
const checkPasswordBtn = document.getElementById("checkPasswordBtn");
const passwordResult = document.getElementById("passwordResult");


/*
    SAFE DEMO SCANNER

    A normal browser cannot directly crack Wi-Fi passwords
    or read the connected-device list of arbitrary nearby
    networks.

    This demo shows how the dashboard works.
*/

scanBtn.addEventListener("click", function () {

    scanBtn.disabled = true;
    scanBtn.textContent = "Scanning...";

    wifiName.textContent = "Scanning...";
    securityType.textContent = "Checking...";
    signalStrength.textContent = "Checking...";
    deviceCount.textContent = "Checking...";

    securityStatus.innerHTML = `
        <strong>🔄 Analyzing network...</strong>
        <p>Please wait.</p>
    `;

    deviceList.innerHTML = `
        <div class="empty">
            Checking authorized network information...
        </div>
    `;

    setTimeout(function () {

        /*
            Demo data only.
            Later this can be connected to an authorized
            router/API where supported.
        */

        wifiName.textContent = "Your Wi-Fi";
        securityType.textContent = "WPA2/WPA3";
        signalStrength.textContent = "Good";
        deviceCount.textContent = "Available via router";

        securityStatus.innerHTML = `
            <strong>🛡️ Security information detected</strong>
            <p>
                Your network is using a modern Wi-Fi security
                standard. Check your router for additional settings.
            </p>
        `;

        deviceList.innerHTML = `
            <div class="device-item">
                👥 Connected-device information
                <br>
                <small>
                    Connect this dashboard to your own router/API
                    to retrieve the actual device list.
                </small>
            </div>
        `;

        scanBtn.disabled = false;
        scanBtn.textContent = "🔍 Scan Network";

    }, 1800);
});


checkPasswordBtn.addEventListener("click", checkPassword);

password.addEventListener("input", checkPassword);


function checkPassword() {

    const value = password.value;

    if (value.length === 0) {
        passwordResult.textContent =
            "Enter a password to check its strength.";
        return;
    }

    let score = 0;

    if (value.length >= 8) score++;
    if (value.length >= 12) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 2) {
        passwordResult.textContent =
            "⚠️ Weak password — use a longer and more unique password.";
    } else if (score <= 4) {
        passwordResult.textContent =
            "🟡 Medium password — consider making it longer and more unique.";
    } else {
        passwordResult.textContent =
            "🟢 Strong password.";
    }
}