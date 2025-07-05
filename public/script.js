document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded");

    // Handle domain booking
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        bookingForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const domainName = document.getElementById("domainName").value;
            if (!domainName.trim()) {
                alert("Please enter a domain name.");
                return;
            }

            try {
                const response = await fetch("../booking/book", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ domain_name: domainName })
                });

                if (response.ok) {
                    alert("Domain booked successfully!");
                    loadBookings(); // Refresh the bookings list
                    bookingForm.reset(); // Clear the input field
                } else {
                    alert("Error booking domain. Try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong. Please try again later.");
            }
        });
    }

    // Function to load bookings
    async function loadBookings() {
        try {
            const response = await fetch("/booking/user-bookings");
            if (!response.ok) throw new Error("Failed to fetch bookings");

            const bookings = await response.json();
            const tableBody = document.getElementById("bookingsTable");

            if (tableBody) {
                tableBody.innerHTML = ""; // Clear existing rows
                bookings.forEach((booking, index) => {
                    tableBody.innerHTML += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${booking.domain_name}</td>
                            <td>${booking.status || "Pending"}</td>
                        </tr>
                    `;
                });
            }
        } catch (error) {
            console.error("Error loading bookings:", error);
        }
    }

    // Load bookings when the page loads
    loadBookings();

    // Handle login form submission
    const loginForm = document.querySelector("form[action='/auth/login']");
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            const username = loginForm.querySelector("input[name='username']").value.trim();
            const password = loginForm.querySelector("input[name='password']").value.trim();

            if (!username || !password) {
                event.preventDefault();
                alert("Please fill in all fields.");
            }
        });
    }

    // Handle registration form validation
    const registerForm = document.querySelector("form[action='/auth/register']");
    if (registerForm) {
        registerForm.addEventListener("submit", (event) => {
            const username = registerForm.querySelector("input[name='username']").value.trim();
            const password = registerForm.querySelector("input[name='password']").value.trim();
            const confirmPassword = registerForm.querySelector("input[name='confirm_password']").value.trim();

            if (!username || !password || !confirmPassword) {
                event.preventDefault();
                alert("Please fill in all fields.");
            } else if (password !== confirmPassword) {
                event.preventDefault();
                alert("Passwords do not match.");
            }
        });
    }
});


