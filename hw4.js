/*
Name: Jason Le
Date created: Feb 9th, 2025
Date last edited: May 3rd, 2025
Version: 4.0
Description: Homework 4 JavaScript
*/

// Display today's date
var d = new Date();
document.getElementById("today").innerHTML = d.toLocaleDateString();

// Slider behavior
var slider = document.getElementById("range");
var output = document.getElementById("range-slider");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
};

// Alert box display
function showAlert() {
    var alertBox = document.getElementById("alert-box");
    var closeAlert = document.getElementById("close-alert");

    alertBox.style.display = "block";
    closeAlert.onclick = function () {
        alertBox.style.display = "none";
    };
}

// Validate Everything
function validateEverything() {
    let valid = true;

    if (!validateFname()) valid = false;
    if (!validateMini()) valid = false;
    if (!validateLname()) valid = false;
    if (!validateDob()) valid = false;
    if (!validateSsn()) valid = false;
    if (!validateAddress1()) valid = false;
    if (!validateCity()) valid = false;
    if (!validateEmail()) valid = false;
    if (!validatePhone()) valid = false;
    if (!validateUid()) valid = false;
    if (!validatePword()) valid = false;
    if (!confirmpword()) valid = false;

    if (valid) {
        document.getElementById("submit").disabled = false;
    } else {
        showAlert();
    }
}

// First Name Validation
function validateFname() {
    const fname = document.getElementById("fname").value.trim();
    if (!fname || fname.length > 30) {
        document.getElementById("fname-error").innerHTML = "First name is required and must be under 30 characters.";
        return false;
    }
    document.getElementById("fname-error").innerHTML = "";
    return true;
}

// Middle Initial Validation
function validateMini() {
    let mini = document.getElementById("mini").value.trim().toUpperCase();
    document.getElementById("mini").value = mini;

    if (mini === "") {
        document.getElementById("mini-error").innerHTML = "";
        return true; // Allow blank input
    }

    if (!/^[A-Z]$/.test(mini)) {
        document.getElementById("mini-error").innerHTML = "Middle initial must be a single uppercase letter.";
        return false;
    }

    document.getElementById("mini-error").innerHTML = "";
    return true;
}


// Last Name Validation
function validateLname() {
    const lname = document.getElementById("lname").value.trim();
    if (!lname || lname.length > 30) {
        document.getElementById("lname-error").innerHTML = "Last name is required and must be under 30 characters.";
        return false;
    }
    document.getElementById("lname-error").innerHTML = "";
    return true;
}

// Date of Birth Validation
function validateDob() {
    const dob = document.getElementById("dob");
    const date = new Date(dob.value);
    const maxDate = new Date().setFullYear(new Date().getFullYear() - 115);

    if (date > new Date()) {
        document.getElementById("dob-error").innerHTML = "Date can't be in the future.";
        dob.value = "";
        return false;
    } else if (date < new Date(maxDate)) {
        document.getElementById("dob-error").innerHTML = "Date can't be more than 115 years ago.";
        dob.value = "";
        return false;
    }
    document.getElementById("dob-error").innerHTML = "";
    return true;
}

// SSN Validation
function validateSsn() {
    const ssn = document.getElementById("SSN").value;
    if (!/^\d{9}$/.test(ssn)) {
        document.getElementById("SSN-error").innerHTML = "Enter a valid 9-digit SSN.";
        return false;
    }
    document.getElementById("SSN-error").innerHTML = "";
    return true;
}

// Address Line 1 Validation
function validateAddress1() {
    const address = document.getElementById("address1").value.trim();
    if (!address) {
        alert("Address Line 1 is required.");
        return false;
    }
    return true;
}

// City Validation
function validateCity() {
    const city = document.getElementById("city").value.trim();
    if (!city) {
        document.getElementById("city-error").innerHTML = "City can't be blank.";
        return false;
    }
    document.getElementById("city-error").innerHTML = "";
    return true;
}

// Email Validation
function validateEmail() {
    const email = document.getElementById("Email").value.trim();
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,20}$/i;
    if (!email) {
        document.getElementById("email-error").innerHTML = "Email can't be blank.";
        return false;
    }
    if (!regex.test(email)) {
        document.getElementById("email-error").innerHTML = "Invalid email format.";
        return false;
    }
    document.getElementById("email-error").innerHTML = "";
    return true;
}

// Phone Validation
function validatePhone() {
    const phone = document.getElementById("Pnum").value;
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 10) {
        document.getElementById("Pnum-error").innerHTML = "Enter a valid 10-digit phone number.";
        return false;
    }
    const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    document.getElementById("Pnum").value = formatted;
    document.getElementById("Pnum-error").innerHTML = "";
    return true;
}

// UID Validation
function validateUid() {
    let uid = document.getElementById("uid").value.trim();
    document.getElementById("uid").value = uid.toLowerCase();

    if (!uid || !/^[a-z][a-z0-9_-]{4,29}$/i.test(uid)) {
        document.getElementById("uid-error").innerHTML = "User ID must start with a letter and be 5-30 characters.";
        return false;
    }
    document.getElementById("uid-error").innerHTML = "";
    return true;
}

// Password Validation
function validatePword() {
    const pword = document.getElementById("pword").value;
    const uid = document.getElementById("uid").value;
    let errorMessage = [];

    if (!/[0-9]/.test(pword)) errorMessage.push("1 number");
    if (!/[a-z]/.test(pword)) errorMessage.push("1 lowercase letter");
    if (!/[A-Z]/.test(pword)) errorMessage.push("1 uppercase letter");
    if (!/[!@#$%^&*()_+\-=]/.test(pword)) errorMessage.push("1 special character");
    if (pword.includes(uid)) errorMessage.push("Can't contain user ID");

    if (errorMessage.length > 0) {
        document.getElementById("pword-error").innerHTML = "Password must include: " + errorMessage.join(", ");
        return false;
    }
    document.getElementById("pword-error").innerHTML = "";
    return true;
}

// Confirm Password Validation
function confirmpword() {
    const p1 = document.getElementById("pword").value;
    const p2 = document.getElementById("con_pword") ? document.getElementById("con_pword").value : "";
    const errorBox = document.getElementById("pword2-error");
    if (!errorBox) return true;

    if (p1 !== p2) {
        errorBox.innerHTML = "Passwords don't match.";
        return false;
    }
    errorBox.innerHTML = "Passwords match.";
    return true;
}

// Review Form Output
function reviewInput() {
    const form = document.getElementById("signup-form");
    let output = "<table class='output'><th colspan='2'>Review Your Information:</th>";
    for (let i = 0; i < form.length; i++) {
        const elem = form.elements[i];
        if (["submit", "reset", "button"].includes(elem.type)) continue;
        if ((elem.type === "checkbox" || elem.type === "radio") && !elem.checked) continue;
        if (elem.value !== "") {
            output += `<tr><td>${elem.name}</td><td>${elem.value}</td></tr>`;
        }
    }
    output += "</table>";
    document.getElementById("showInput").innerHTML = output;
}
// Set Cookie
function setCookie(name, cvalue, expiryDays) {
    var day = new Date();
    day.setTime(day.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + day.toUTCString();
    document.cookie = name + "=" + cvalue + ";" + expires + ";path=/";
}

// Get Cookie
function getCookie(name) {
    var cookieName = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

// Delete All Cookies
function deleteAllCookies() {
    document.cookie.split(";").forEach(function (cookie) {
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    });
}

// Welcome Message Logic
window.addEventListener("DOMContentLoaded", function () {
    const inputs = [
        { id: "fname", cookieName: "firstName" }
    ];

    const firstName = getCookie("firstName");
    if (firstName !== "") {
        document.getElementById("welcome1").innerHTML = "Welcome back, " + firstName + "!<br>";
        document.getElementById("welcome2").innerHTML =
            "<a href='#' id='new-user'>Not " + firstName + "? Click here to start a new form.</a>";

        document.getElementById("new-user").addEventListener("click", function () {
            inputs.forEach(function (input) {
                setCookie(input.cookieName, "", -1);
            });
            location.reload();
        });
    } else {
        document.getElementById("welcome1").innerHTML = "Welcome new user!";
    }

    // Prefill and save cookies
    inputs.forEach(function (input) {
        var inputElement = document.getElementById(input.id);
        var cookieValue = getCookie(input.cookieName);
        if (cookieValue !== "") {
            inputElement.value = cookieValue;
        }
        inputElement.addEventListener("input", function () {
            if (document.getElementById("remember-me").checked) {
                setCookie(input.cookieName, inputElement.value, 2);
            }
        });
    });

    // Remember Me logic
    document.getElementById("remember-me").addEventListener("change", function () {
        const rememberMe = this.checked;
        if (!rememberMe) {
            deleteAllCookies();
        } else {
            inputs.forEach(function (input) {
                const inputElement = document.getElementById(input.id);
                if (inputElement.value.trim() !== "") {
                    setCookie(input.cookieName, inputElement.value, 2);
                }
            });
        }
    });
});
