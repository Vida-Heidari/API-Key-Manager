// ------------------- Variables -------------------
const apiForm = document.querySelector(".api-form");
const tbody = document.querySelector("tbody");

const usernameInput = document.querySelector(".user__input");
const apiKeyInput = document.querySelector(".key__input");
const apiSecretInput = document.querySelector(".secret__input");

const submitBtn = document.querySelector(".submit__btn");
const editBtn = document.querySelector(".edit-btn");
const deleteBtn = document.querySelector(".delete-btn");

// ------------------- Functions -------------------
// function OnAddInput

// ------------------- Event Listeners -------------------
apiForm.addEventListener("submit", function OnAddInput(e) {
  e.preventDefault();
});
