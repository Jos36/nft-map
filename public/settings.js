import { addUser, checkUser, modifiyUser, getUserNfts } from "./api.js ";
import { verifyWalletConnection } from "./wallet.js";

// onsubmit form logic
let isEditing = true;
let formType = "person";

verifyWalletConnection();

const form = document.getElementById("settings-form");
document.getElementById("settings-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const multiInput = document.querySelector("multi-input");

  let data = [...e.currentTarget.elements]
    .filter((ele) => ele.type !== "submit")
    .map((ele) => {
      return {
        [ele.getAttribute("name")]: ele.type === "file" ? ele.files : ele.value,
      };
    });

  console.log(data);
  data.splice(8, 1);

  let formData = new FormData(form);
  if (multiInput.getValues().length > 0) {
    formData.set("whatAreYouLookingFor", `${multiInput.getValues().join(",")}`);
  } else {
    formData.set("whatAreYouLookingFor", "");
  }

  formData.set("type", formType);
  formData.set("wallet", window.accountData.account);
  if (isEditing) {
    modifiyUser(formData);
    window.location.replace("/profile");
  } else {
    addUser(formData);
  }
});

const person = document.getElementById("person-tab-button");
const company = document.getElementById("company-tab-button");

person.addEventListener("click", (e) => {
  e.preventDefault();
  company.classList.remove("active");
  person.classList.add("active");
  formType = "person";

  form.innerHTML = `<div class="mb-2">
  <span>Name</span>
  <input
    type="text"
    name="name"
    class="form-control form-control-sm"
    id="name"
  />
</div>
<div class="mb-2">
  <label for="" class="form-label">Username</label>
  <input
    type="text"
    required
    name="username"
    class="form-control form-control-sm"
    id="username"
  />
</div>
<div class="mb-2">
<label for="" class="form-label">Profile image</label>
<input
  type="file"
  required
  name="logo"
  class="form-control form-control-sm"
  id="logo"
/>
</div>
<div class="mb-2">
  <label for="" class="form-label">Email</label>
  <input
    type="text"
    required
    name="email"
    class="form-control form-control-sm"
    id="email"
  />
</div>
<div class="mb-2">
  <label for="" class="form-label">Location</label>
  <input
    type="text"
    required
    name="location"
    class="form-control form-control-sm"
    id="location"
  />
</div>
<div class="mb-2">
  <label for="" class="form-label">Company</label>
  <input
    type="text"
    required
    name="company"
    class="form-control form-control-sm"
    id="company"
  />
</div>
<div class="mb-2">
  <label for="" class="form-label">Role</label>
  <input
    type="text"
    required
    name="role"
    class="form-control form-control-sm"
    id="role"
  />
</div>
<div class="mb-2">
  <label for="" class="form-label">Website</label>
  <input
    type="text"
    name="website"
    class="form-control form-control-sm"
    id="website"
  />
</div>
<div class="mb-2">
  <label for="" class="form-label">Bio</label>
  <input
    type="text"
    name="bio"
    class="form-control form-control-sm"
    id="bio"
  />
</div>

<div style="width: 220px">
  <label for="" class="form-label"
    >What are you looking for?</label
  >
  <multi-input>
    <input list="speakers" />
    <datalist id="speakers">
      <option value="Cannabis market"></option>
      <option value="Blockchain"></option>
      <option value="Web 3"></option>
      <option value="Crypto"></option>
      <option value="Investments in cannabis"></option>
      <option value="Investments in crypto"></option>
      <option value="Investments in Cannabitz"></option>
      <option value="Networking"></option>
      <option value="Study"></option>
      <option value="Social media"></option>
      <option value="News"></option>
      <option value="Events"></option>
      <option value="Metaverse"></option>
      <option value="Products"></option>
      <option value="Services"></option>
      <option value="Job offers"></option>
      <option value="Meet new people"></option>
    </datalist>
  </multi-input>
</div>
<div class="mb-2">
  <label for="" class="form-label"
    >What topics are you interested in?</label
  >
  <input
    type="text"
    name="whatTopicsAreYouInterestedIn"
    class="form-control form-control-sm"
    id="whatTopicsAreYouInterestedIn"
  />
</div>


<input
  type="submit"
  value="Request"
  class="btn btn-primary float-lg-end"
/>`;
  console.log("testing");
});

company.addEventListener("click", (e) => {
  e.preventDefault();

  person.classList.remove("active");
  company.classList.add("active");
  formType = "company";

  form.innerHTML = `<div class="mb-2">
  <span>Name</span>
  <input
    type="text"
    name="name"
    class="form-control form-control-sm"
    id="name"
  />
</div>
<div class="mb-2">
  <label for="" class="form-label">Username</label>
  <input
    type="text"
    required
    name="username"
    class="form-control form-control-sm"
    id="username"
  />
</div>
<div class="mb-2">
<label for="" class="form-label">Profile image</label>
<input
  type="file"
  required
  name="logo"
  class="form-control form-control-sm"
  id="logo"
/>
</div>
<div class="mb-2">
  <label for="" class="form-label">Email</label>
  <input
    type="text"
    required
    name="email"
    class="form-control form-control-sm"
    id="email"
  />
</div>
<div class="mb-2">
  <label for="" class="form-label">Location</label>
  <input
    type="text"
    required
    name="location"
    class="form-control form-control-sm"
    id="location"
  />
</div>
<div class="mb-2">
  <label for="" class="form-label">Company</label>
  <input
    type="text"
    required
    name="company"
    class="form-control form-control-sm"
    id="company"
  />
</div>
<div class="mb-2">
  <label for="" class="form-label">Role</label>
  <input
    type="text"
    required
    name="role"
    class="form-control form-control-sm"
    id="role"
  />
</div>
<div class="mb-2">
  <label for="" class="form-label">Website</label>
  <input
    type="text"
    name="website"
    class="form-control form-control-sm"
    id="website"
  />
</div>
<div class="mb-2">
  <label for="" class="form-label">Bio</label>
  <input
    type="text"
    name="bio"
    class="form-control form-control-sm"
    id="bio"
  />
</div>

<div style="width: 220px">
  <label for="" class="form-label"
    >What are you looking for?</label
  >
  <multi-input>
    <input list="speakers" />
    <datalist id="speakers">
      <option value="Cannabis market"></option>
      <option value="Blockchain"></option>
      <option value="Web 3"></option>
      <option value="Crypto"></option>
      <option value="Investments in cannabis"></option>
      <option value="Investments in crypto"></option>
      <option value="Investments in Cannabitz"></option>
      <option value="Networking"></option>
      <option value="Study"></option>
      <option value="Social media"></option>
      <option value="News"></option>
      <option value="Events"></option>
      <option value="Metaverse"></option>
      <option value="Products"></option>
      <option value="Services"></option>
      <option value="Offer Jobs"></option>
      <option value="Meet new people"></option>
    </datalist>
  </multi-input>
</div>
<div class="mb-2">
  <label for="" class="form-label"
    >What topics are you interested in?</label
  >
  <input
    type="text"
    name="whatTopicsAreYouInterestedIn"
    class="form-control form-control-sm"
    id="whatTopicsAreYouInterestedIn"
  />
</div>
<div class="mb-2">
  <label for="" class="form-label"
    >What kind of service you offer?</label
  >
  <input
    type="text"
    name="whatKindOfServiceYouOffer"
    class="form-control form-control-sm"
    id="whatKindOfServiceYouOffer"
  />
</div>
<input
  type="submit"
  value="Request"
  class="btn btn-primary float-lg-end"
/>`;
  console.log("testinghow");
});

const closeBtn = document.getElementById("close-settings-btn");
closeBtn.addEventListener("click", () => {
  window.location.replace("/profile");
});

const darkModeSwitch = document.getElementById("darkMode");
const nav = document.getElementById("nav");

darkModeSwitch.addEventListener("click", (e) => {
  if (e.target.checked) {
    nav.classList.remove("navbar-light");
    nav.classList.remove("bg-light");
    nav.classList.add("darkMode");
  } else {
    nav.classList.remove("darkMode");
    nav.classList.add("navbar-light");
    nav.classList.add("bg-light");
  }
});
