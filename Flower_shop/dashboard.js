const API_BASE_URL = "http://localhost:5000/api/auth";
let selectedPage = "";

document.addEventListener("DOMContentLoaded", updateNavbar);

function updateNavbar() {
    const token = localStorage.getItem("userToken");
    const userName = localStorage.getItem("userName");
    const navSlot = document.getElementById("userNavSlot");
    if (!navSlot) return;

    if (token && userName) {
        navSlot.replaceChildren();
        navSlot.classList.add("d-flex", "align-items-center", "gap-2");

        const greeting = document.createElement("span");
        greeting.className = "nav-text text-white small fw-semibold";
        greeting.textContent = `Hi, ${userName}`;

        const logoutBtn = document.createElement("button");
        // Styled slightly smaller so it matches your header spacing cleanly
        logoutBtn.className = "btn btn-sm btn-outline-danger py-0 px-2 small text-white border-white";
        logoutBtn.style.fontSize = "12px";
        logoutBtn.textContent = "Logout";
        logoutBtn.onclick = logoutUser;

        navSlot.appendChild(greeting);
        navSlot.appendChild(logoutBtn);
    }
}

function logoutUser() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    // FIXED: Drop them onto your customer storefront home screen, not admin dashboards
    window.location.href = "dashboard.html"; 
}

function redirect(page) {
    window.location.href = page;
}

function handleCategoryClick(page) {
    const token = localStorage.getItem("userToken");

    if (token) {
        window.location.href = page;
    } else {
        selectedPage = page;
        document.getElementById("loginPopup").style.display = "flex";
    }
}

function closePopup() {
    document.getElementById("loginPopup").style.display = "none";
}

function goToSignup() {
    // Only pass tracking strings if they actually selected a category block
    if (selectedPage) localStorage.setItem("redirectAfterLogin", selectedPage);
    window.location.href = "signup.html";
}

function goToLogin() {
    // FIXED: Point to your correct customer login file name
    if (selectedPage) localStorage.setItem("redirectAfterLogin", selectedPage);
    window.location.href = "login_customer.html"; 
}

async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("userToken", data.token);
            localStorage.setItem("userName", data.user.name);
            localStorage.setItem("userRole", data.user.role);

            const redirectPage = localStorage.getItem("redirectAfterLogin");
            if (redirectPage && redirectPage !== "") {
                localStorage.removeItem("redirectAfterLogin");
                window.location.href = redirectPage;
            } else {
                // FIXED: Redirect to dashboard.html for customer landings
                window.location.href = "dashboard.html"; 
            }
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Network problem:", error);
        alert("Cannot connect to server. Check your backend status console!");
    }
}