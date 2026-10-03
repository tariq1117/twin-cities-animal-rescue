// Interactive help information
const helpOptions = {
    adopt: {
        title: "Adoption",
        message: "Adoption helps animals find safe and caring permanent homes. Learn about available animals and contact the rescue team to begin the process."
    },
    foster: {
        title: "Fostering",
        message: "Fostering provides a temporary and comfortable home for an animal while they wait for a permanent family."
    },
    volunteer: {
        title: "Volunteering",
        message: "Volunteers can help care for animals, support adoption activities, assist with community events, and share information about animals needing homes."
    }
};

// Steps used for the selected interest
const helpSteps = [
    "Learn more about the opportunity.",
    "Contact the rescue team with questions.",
    "Choose how you would like to support the animals."
];

function showHelpInformation(choice) {
    const result = document.getElementById("helpResult");

    if (!result) {
        return;
    }

    if (!choice) {
        result.innerHTML = "Select an option to see more information.";
        return;
    }

    const selectedHelp = helpOptions[choice];

    result.innerHTML = `
        <h3>${selectedHelp.title}</h3>
        <p>${selectedHelp.message}</p>
        <p><strong>Next steps:</strong></p>
        <ol>
            ${helpSteps.map(step => `<li>${step}</li>`).join("")}
        </ol>
    `;

    localStorage.setItem("selectedHelp", choice);
}

function loadSavedHelpChoice() {
    const savedChoice = localStorage.getItem("selectedHelp");
    const helpChoice = document.getElementById("helpChoice");

    if (!helpChoice) {
        return;
    }

    if (savedChoice && helpOptions[savedChoice]) {
        helpChoice.value = savedChoice;
        showHelpInformation(savedChoice);
    }
}

function setupHelpFeature() {
    const helpChoice = document.getElementById("helpChoice");

    if (!helpChoice) {
        return;
    }

    helpChoice.addEventListener("change", function () {
        showHelpInformation(this.value);
    });

    loadSavedHelpChoice();
}


// Form validation and browser storage
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);

    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    showError("nameError", "");
    showError("emailError", "");
    showError("interestError", "");

    const successMessage = document.getElementById("formSuccess");

    if (successMessage) {
        successMessage.textContent = "";
    }
}

function validateForm() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const interest = document.getElementById("interest");

    let isValid = true;

    clearErrors();

    if (name.value.trim().length < 2) {
        showError("nameError", "Please enter your full name.");
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
        showError("emailError", "Please enter a valid email address.");
        isValid = false;
    }

    if (interest.value === "") {
        showError("interestError", "Please select an interest type.");
        isValid = false;
    }

    return isValid;
}

function saveFormData() {
    const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        interest: document.getElementById("interest").value
    };

    localStorage.setItem("rescueFormData", JSON.stringify(formData));
}

function loadSavedFormData() {
    const savedData = localStorage.getItem("rescueFormData");

    if (!savedData) {
        return;
    }

    const formData = JSON.parse(savedData);

    document.getElementById("name").value = formData.name || "";
    document.getElementById("email").value = formData.email || "";
    document.getElementById("interest").value = formData.interest || "";
}

function setupFormValidation() {
    const form = document.getElementById("interestForm");

    if (!form) {
        return;
    }

    loadSavedFormData();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (validateForm()) {
            saveFormData();

            document.getElementById("formSuccess").textContent =
                "Thank you! Your interest information has been saved.";

            clearErrors();

            document.getElementById("formSuccess").textContent =
                "Thank you! Your interest information has been saved.";
        }
    });

    form.addEventListener("reset", function () {
        setTimeout(function () {
            clearErrors();
        }, 0);
    });
}


// Start the correct features when the page loads
document.addEventListener("DOMContentLoaded", function () {
    setupHelpFeature();
    setupFormValidation();
});