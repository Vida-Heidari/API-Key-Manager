// ------------------- Variables -------------------
const apiForm = document.querySelector(".api-form");
const tbody = document.querySelector("tbody");

const usernameInput = document.querySelector("#username");
const apiKeyInput = document.querySelector("#api-key");
const apiSecretInput = document.querySelector("#api-secret");

const submitBtn = document.querySelector(".submit__btn");
const apiList = document.querySelector(".table__body");

const editBtn = document.querySelector(".edit-btn");
const deleteBtn = document.querySelector(".delete-btn");

let apiInfo = [];
let formState = "add";
let selectedId = null;
// ------------------- Functions -------------------

// ------------------- Event Listeners -------------------
apiForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //get form data
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  const usernameValue = usernameInput.value;
  const apiKeyValue = apiKeyInput.value;
  const apiSecretValue = apiSecretInput.value;

  if (usernameValue && apiKeyValue && apiSecretValue) {
    if (formState === "add") {
      // push formProps into apiInfo and set a Unique ID for that info
      apiInfo.push({ ...formProps, id: new Date().getTime() });
    } else if (formState === "edit") {
      const foundIndex = apiInfo.findIndex((item) => item.id === selectedId);

      if (foundIndex === -1) {
        console.log("Not Found");
        return;
      }
      apiInfo.splice(foundIndex, 1, { id: selectedId, ...formProps });
      formState = "add";
      selectedId = null;
      submitBtn.innerText = "Submit";
    }
  } else {
    alert("Oops... Please fill the form properly");
  }

  displayListItems(apiInfo);
  apiForm.reset();
});

const generateListItem = (index, data) => {
  const { id, username, apiKey, apiSecret } = data;

  const newItem = document.createElement("tr");
  newItem.id = id;
  newItem.className = "table__row";

  const itemData = `
  <td class="row__number">
    ${index + 1}
  </td>

  <td class="row__info row__username" data-type="username">
      <div class="row__item">
        <p class="td__text">
          ${username}
        </p>
      </div>
  </td>

  <td class="row__info row__key" data-type="key">
    <div class="row__item">
      <p class="td__text">
        ${apiKey}
      </p>
    </div>
  </td>

  <td class="row__info row__key" data-type="secret">
    <div class="row__item">
      <p class="td__text">
        ${apiSecret}
      </p>
    </div>
  </td>

  <td class="row__btns">
    <button class="item__btn item__edit">Edit</button>
    <button class="item__btn item__delete">Delete</button>
  </td>

  `;

  newItem.innerHTML = itemData;

  newItem.querySelector(".item__edit").addEventListener("click", () => {
    editListItem(id);
  });

  newItem.querySelector(".item__delete").addEventListener("click", () => {
    displayPopup(`Are you sure you want to delete "${username}"?`);
    selectedId = id;
  });

  apiList.appendChild(newItem);
};

const displayListItems = (data) => {
  apiList.innerHTML = "";

  data.map((item, index) => generateListItem(index, item));
};

const editListItem = (id) => {
  const foundItem = apiInfo.find((item) => item.id === id);

  if (foundItem === undefined) {
    console.log("Not Found");
    return;
  }

  const { username, apiKey, apiSecret } = foundItem;

  usernameInput.value = username;
  apiKeyInput.value = apiKey;
  apiSecretInput.value = apiSecret;

  submitBtn.innerHTML = "Update";
  formState = "edit";
  selectedId = id;
};

const deleteListItem = (id) => {
  apiInfo = apiInfo.filter((item) => item.id !== id);

  displayListItems(apiInfo);
};

// ------------------- show Popup to confirm delete action before actually deleting item from list

const popup = document.querySelector("#popup");

const displayPopup = (msg) => {
  popup.querySelector(".popup__text").innerText = msg;
  popup.classList.add("popup__Wrapper--show");
};

const closePopup = () => {
  popup.classList.remove("popup__Wrapper--show");
};

const popupCancelBtn = popup.querySelector(".popup__btn--cancel");
const popupDeleteBtn = popup.querySelector(".popup__btn--delete");

popupCancelBtn.addEventListener("click", () => {
  closePopup();
});

popupDeleteBtn.addEventListener("click", () => {
  deleteListItem(selectedId);
  closePopup();
  selectedId = null;
});
