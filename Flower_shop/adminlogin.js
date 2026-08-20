const API_BASE_URL = "http://localhost:5000/api/auth";

async function handleAdminLogin(event) {
        // Stop standard HTML form submission refresh loops
        event.preventDefault();

        const email = document.getElementById("adminEmail").value.trim();
        const password = document.getElementById("adminPassword").value;

        try {
            // Send verification request to your node application server
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Verify if the logged-in user actually has permission clearance
                if (data.user.role === 'admin' || data.user.role === 'super_admin') {
                    // Save credentials into local memory cache
                    localStorage.setItem("userToken", data.token);
                    localStorage.setItem("userRole", data.user.role);
                    localStorage.setItem("userName", data.user.name);

                    alert(`Welcome Back, ${data.user.name}! Access Granted.`);
                    
                    // TARGET REDIRECTION: Route directly to your master admin overview
                    window.location.href = "indexadmin.html";
                } else {
                    alert("Access Denied: This account does not possess administrative privileges.");
                }
            } else {
                // Server rejected login details (wrong password / user doesn't exist)
                alert(data.message);
            }
        } catch (error) {
            console.error("Authentication Network Error:", error);
            alert("Could not reach server. Verify that your backend node script is online!");
        }
    }