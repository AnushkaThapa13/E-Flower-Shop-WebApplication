const API_BASE_URL = "http://localhost:5000/api/auth";

async function signupuser() {
    let name = document.querySelector('input[type="text"]').value.trim();
    let email = document.querySelector('input[type="email"]').value.trim();
    let password = document.querySelectorAll('input[type="password"]')[0].value;
    let confirmPassword = document.querySelectorAll('input[type="password"]')[1].value;

    if (name === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Please fill all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role: "user" })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Signup Successful!");
            // Store user data in localStorage after signup
            localStorage.setItem("userName", name);
            localStorage.setItem("userRole", "user");
            // UPDATED: Changed to match your exact file name layout sequence
            window.location.href = "login_customer.html"; 
        } else {
            alert(data.message); 
        }
    } catch (error) {
        console.error("Network issue:", error);
        alert("Server communication error. Make sure your backend node environment is online.");
    }
}