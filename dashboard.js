function redirect(page) {
    window.location.href = page;
}

let selectedPage = "";


function handleCategoryClick(page) {
    let isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
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
    localStorage.setItem("redirectAfterLogin", selectedPage);
    window.location.href = "customer-login.html";
}


function loginUser() {
    localStorage.setItem("isLoggedIn", "true");

    let redirectPage = localStorage.getItem("redirectAfterLogin");

    if (redirectPage) {
        window.location.href = redirectPage;
    } else {
        window.location.href = "home.html"; // or main page
    }
}
