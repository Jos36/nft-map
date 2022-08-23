/** @format */
import { addUser, checkUser, modifiyUser } from "./api.js ";
import { verifyWalletConnection } from "./wallet.js";

document.querySelector("input").focus();
async function grid() {
  let formType = "person";
  let isEditing = false;

  const addModal = new bootstrap.Modal(document.getElementById("addModal"), {
    keyboard: false,
  });
  const info = document.getElementById("info");

  async function isLoggedIn() {
    verifyWalletConnection().then((data) => {
      if (data) {
        console.log(data);
        console.log("wallet connection verified");
        checkForUser().then((user) => {
          console.log(user);
          if (user) {
            if (user.length === 0) {
              addModal.show();
            } else {
              const {
                name,
                username,
                email,
                location,
                company,
                role,
                website,
                bio,
                whatAreYouLookingFor,
                whatTopicsAreYouInterestedIn,
                whatKindOfServiceYouOffer,
                type,
                wallet,
              } = user[0];
              info.innerHTML = `<div id="profile-body" class="hidden">
              
        
              <div class="container emp-profile">
                <div >
                  <div class="row">
                    <div class="col-md-10">
                      <div class="profile-head">
                        <h5 style="color: white">${name}</h5>
                        <h6>${company}</h6>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <button
                        id="edit"
                        class="profile-edit-btn"
                       
                      >Edit Profile</button>
                    </div>
                    <div class="col-md-8 spliter"></div>
                  </div>
                  <div class="row">
                    <div class="">
                      <div
                        class="tab-content profile-tab"
                        id="myTabContent"
                        style="margin-top: 70px"
                      >
                        <div
                          class="tab-pane fade show active"
                          id="home"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                        >
                          <div class="row">
                            <div class="col-md-8">
                              <label>Name</label>
                            </div>
                            <div class="col-md-4 d-flex flex-row-reverse">
                              <p>${name}</p>
                            </div>
                          </div>
                          <div class="row col-md-8 split"></div>
                          <div class="row" style="margin-top: 10px;">
                            <div class="col-md-8" >
                              <label>Username</label>
                            </div>
                            <div class="col-md-4 d-flex flex-row-reverse">
                              <p>${username}</p>
                            </div>
                          </div>
                          <div class="row col-md-8 split"></div>
                          <div class="row" style="margin-top: 10px;">
                            <div class="col-md-8">
                              <label>Email</label>
                            </div>
                            <div class="col-md-4 d-flex flex-row-reverse">
                              <p>${email}</p>
                            </div>
                          </div>
                          <div class="row col-md-8 split"></div>
                          <div class="row" style="margin-top: 10px;">
                            <div class="col-md-8">
                              <label>Location</label>
                            </div>
                            <div class="col-md-4 d-flex flex-row-reverse">
                              <p>${location}</p>
                            </div>
                          </div>
                          <div class="row col-md-8 split"></div>
                          <div class="row" style="margin-top: 10px;">
                            <div class="col-md-8">
                              <label>Company</label>
                            </div>
                            <div class="col-md-4 d-flex flex-row-reverse">
                              <p>${company}</p>
                            </div>
                          </div>
                          <div class="row col-md-8 split"></div>
                          <div class="row" style="margin-top: 10px;">
                            <div class="col-md-8">
                              <label>Role</label>
                            </div>
                            <div class="col-md-4 d-flex flex-row-reverse">
                              <p>${role}</p>
                            </div>
                          </div>
                          <div class="row col-md-8 split"></div>
                          <div class="row" style="margin-top: 10px;">
                            <div class="col-md-8">
                              <label>Website</label>
                            </div>
                            <div class="col-md-4 d-flex flex-row-reverse">
                              <a href="${website}">${website}</a>
                            </div>
                          </div>
                          <div class="row col-md-8 split"></div>
                          <div class="row" style="margin-top: 10px;">
                            <div class="col-md-8">
                              <label>Bio</label>
                            </div>
                            <div class="col-md-4 d-flex flex-row-reverse">
                              <p>${bio}</p>
                            </div>
                          </div>
                          <div class="row col-md-8 split"></div>
                          <div class="row" style="margin-top: 10px;">
                            <div class="col-md-8">
                              <label>Looking for</label>
                            </div>
                            <div class="col-md-4 d-flex flex-row-reverse">
                              <p>${whatAreYouLookingFor}</p>
                            </div>
                          </div>
                          <div class="row col-md-8 split"></div>
                          <div class="row" style="margin-top: 10px;">
                            <div class="col-md-8">
                              <label>Intersted in</label>
                            </div>
                            <div class="col-md-4 d-flex flex-row-reverse">
                              <p>${whatTopicsAreYouInterestedIn}</p>
                            </div>
                          </div>
                          <div class="row col-md-8 split"></div>
                          <div class="row" style="margin-top: 10px;">
                            <div class="col-md-8">
                              <label>Service you offer</label>
                            </div>
                            <div class="col-md-4 d-flex flex-row-reverse">
                              <p>${whatKindOfServiceYouOffer}</p>
                            </div>
                          </div>
                          <div class="row col-md-8 split"></div>
                          <div class="row" style="margin-top: 10px;">
                            <div class="col-md-8">
                              <label>Intersted Topics for you</label>
                            </div>
                            <div class="col-md-4 d-flex flex-row-reverse">
                              <p>${whatTopicsAreYouInterestedIn}</p>
                            </div>
                          </div>
                          <div class="row col-md-8 split"></div>
                          <div class="row" style="margin-top: 10px;">
                            <div class="col-md-8">
                              <label>Account Type</label>
                            </div>
                            <div class="col-md-4 d-flex flex-row-reverse">
                              <p>${type}</p>
                            </div>
                          </div>
                          <div class="row col-md-8 split"></div>
                          <div class="row" style="margin-top: 10px;">
                            <div class="col-md-8">
                              <label>Your wallet address</label>
                            </div>
                            <div class="col-md-4 d-flex flex-row-reverse">
                              <p>${wallet}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
              document.getElementById("clientLoader").classList.add("hidden");
              document
                .getElementById("profile-body")
                .classList.remove("hidden");
              const edit = document.getElementById("edit");
              if (edit) {
                edit.addEventListener("click", (e) => {
                  e.preventDefault;
                  isEditing = true;
                  addModal.show();
                });
              }
            }
          }
        });
      } else {
        window.location.replace("/");
      }
    });
  }

  async function checkForUser() {
    const user = checkUser(window.accountData.account);
    return user;
  }

  await isLoggedIn();

  // onsubmit form logic
  const form = document.getElementById("add-form");
  document.getElementById("add-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const multiInput = document.querySelector("multi-input");

    let data = [...e.currentTarget.elements]
      .filter((ele) => ele.type !== "submit")
      .map((ele) => {
        return {
          [ele.getAttribute("name")]:
            ele.type === "file" ? ele.files : ele.value,
        };
      });

    console.log(data);
    data.splice(8, 1);

    let formData = new FormData(form);
    if (multiInput.getValues().length > 0) {
      formData.set(
        "whatAreYouLookingFor",
        `${multiInput.getValues().join(",")}`
      );
    } else {
      formData.set("whatAreYouLookingFor", "");
    }

    formData.set("type", formType);
    formData.set("wallet", window.accountData.account);
    if (isEditing) {
      modifiyUser(formData);
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
  });
}
grid();
