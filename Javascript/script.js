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

const apiInfo = [];
let formState = "add";
let selectedId = null;
// ------------------- Functions -------------------
// function OnAddInput

// ------------------- Event Listeners -------------------
apiForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //get form data
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  if (formState === "add") {
    // push formProps into apiInfo and set a Unique ID for that info
    apiInfo.push({ ...formProps, id: new Date().getTime() });
  } else if (formState === "edit") {
    const foundIndex = apiInfo.findIndex((item) => item.id === selectedId);

    if (foundIndex === -1) {
      alert("Not Found");
      return;
    }
    apiInfo.splice(foundIndex, 1, { id: selectedId, ...formProps });
    formState = "add";
    selectedId = null;
    submitBtn.innerText = "Submit";
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
