/** @format */
import { addUser, checkUser, modifiyUser, getUserNfts } from "./api.js ";
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
        checkForUser().then(async (user) => {
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
                watchlist,
                favorite,
                image,
              } = user[0];
              const navimage = document.getElementById("navImage");
              navimage.src = image;
              info.innerHTML = `<div id="profile-body" class="hidden">
              
        
              <div class="container emp-profile">
                  <div class="profile__container">
                    <div class="leftPanel">
                      <div class="leftPanel__container">
                        <div class="leftPanel__container__top">
                          <p id="name" class="text-muted m-0 text-center">${username}</p>
                        
                          <img src="${
                            image ? image : "/assets/profile.svg"
                          }" class="rounded-circle shadow-4"
                          style="width: 120px;margin-top:20px;margin-bottom:20px" alt="Avatar" />
                          <h5 id="name" class="text-white m-0 text-center font-bold">${name}</h4>
                        </div>
                          <div>
                           <button
                             id="edit"
                            class="profile-edit-btn"
                            >Edit Profile</button>
                         </div>
                      </div>
                    </div>
                    <div class="rightPanel">
                      <div class="rightPanel__top">
                      <p id="about" class="text-white m-0" style="cursor:pointer;">About</p>
                      <p id="watchlist" class="text-white m-0" style="cursor:pointer;">Watchlist</p>
                      <p id="favorite" class="text-white m-0" style="cursor:pointer;">Favorite</p>
                      <p id="nfts" class="text-white m-0" style="cursor:pointer;">NFTs</p>
                      </div>
                      <div id="rightPanel__bottom" class="rightPanel__bottom">
                       <div style="padding:40px;display:flex; justify-content: space-between;">
                              <div>
                                <h5 id="username" class="text-white m-0">
                                  Username
                                </h5>
                                <p id="username" class="text-muted m-0 mb-3">
                                  ${username}
                                </p>
                                <h5 class="text-white m-0">Name</h5>
                                <p class="text-muted m-0 mb-3">${name}</p>
                                <h5 class="text-white m-0">Email</h5>
                                <p class="text-muted m-0 mb-3">${email}</p>
                                <h5 class="text-white m-0">Location</h5>
                                <p class="text-muted m-0 mb-3">${location}</p>
                                <h5 class="text-white m-0">Company</h5>
                                <p class="text-muted m-0 mb-3">${company}</p>
                                <h5 class="text-white m-0">Role</h5>
                                <p class="text-muted m-0 mb-3">${role}</p>
                                <h5 class="text-white m-0">Website</h5>
                                <p class="text-muted m-0 mb-3">${website}</p>
                              </div>
                              <div>
                                <h5 class="text-white m-0">Bio</h5>
                                <p class="text-muted m-0 mb-3">${bio}</p>
                                <h5 class="text-white m-0">Looking for</h5>
                                <p class="text-muted m-0 mb-3">
                                  ${whatAreYouLookingFor}
                                </p>
                                <h5 class="text-white m-0">Intersted in</h5>
                                <p class="text-muted m-0 mb-3">
                                  ${whatTopicsAreYouInterestedIn}
                                </p>
                                <h5 class="text-white m-0">
                                  Service you offer
                                </h5>
                                <p class="text-muted m-0 mb-3">
                                  ${whatKindOfServiceYouOffer}
                                </p>
                                <h5 class="text-white m-0">
                                  Intersted Topics for you
                                </h5>
                                <p class="text-muted m-0 mb-3">
                                  ${whatTopicsAreYouInterestedIn}
                                </p>
                                <h5 class="text-white m-0">Account Type</h5>
                                <p class="text-muted m-0 mb-3">${type}</p>
                              </div>
                            </div>
                      </div>
                    </div>
                    
                  </div>
                  
              </div>
            </div>`;

              const rightPanel__bottom =
                document.getElementById("rightPanel__bottom");
              const aboutTab = document.getElementById("about");
              aboutTab.addEventListener("click", (e) => {
                e.preventDefault();

                rightPanel__bottom.innerHTML = `
                <div style="padding:40px;display:flex; justify-content: space-between;">
                       <div>
                         <h5 id="username" class="text-white m-0">
                           Username
                         </h5>
                         <p id="username" class="text-muted m-0 mb-3">
                           ${username}
                         </p>
                         <h5 class="text-white m-0">Name</h5>
                         <p class="text-muted m-0 mb-3">${name}</p>
                         <h5 class="text-white m-0">Email</h5>
                         <p class="text-muted m-0 mb-3">${email}</p>
                         <h5 class="text-white m-0">Location</h5>
                         <p class="text-muted m-0 mb-3">${location}</p>
                         <h5 class="text-white m-0">Company</h5>
                         <p class="text-muted m-0 mb-3">${company}</p>
                         <h5 class="text-white m-0">Role</h5>
                         <p class="text-muted m-0 mb-3">${role}</p>
                         <h5 class="text-white m-0">Website</h5>
                         <p class="text-muted m-0 mb-3">${website}</p>
                       </div>
                       <div>
                         <h5 class="text-white m-0">Bio</h5>
                         <p class="text-muted m-0 mb-3">${bio}</p>
                         <h5 class="text-white m-0">Looking for</h5>
                         <p class="text-muted m-0 mb-3">
                           ${whatAreYouLookingFor}
                         </p>
                         <h5 class="text-white m-0">Intersted in</h5>
                         <p class="text-muted m-0 mb-3">
                           ${whatTopicsAreYouInterestedIn}
                         </p>
                         <h5 class="text-white m-0">
                           Service you offer
                         </h5>
                         <p class="text-muted m-0 mb-3">
                           ${whatKindOfServiceYouOffer}
                         </p>
                         <h5 class="text-white m-0">
                           Intersted Topics for you
                         </h5>
                         <p class="text-muted m-0 mb-3">
                           ${whatTopicsAreYouInterestedIn}
                         </p>
                         <h5 class="text-white m-0">Account Type</h5>
                         <p class="text-muted m-0 mb-3">${type}</p>
                       </div>
                     </div>
               </div>`;
              });

              // get nfts for the tab
              const nfts = await getUserNfts(window.accountData.account);
              console.log(nfts);

              // tabs functionality
              const watchlistTab = document.getElementById("watchlist");
              watchlistTab.addEventListener("click", (e) => {
                e.preventDefault();

                rightPanel__bottom.innerHTML = `<div style="padding:40px;">
                <h5 class="text-white m-0 mb-4">
                Watchlist Lands
                </h5>
                <div style="display:flex;  width:100%; flex-wrap: wrap;">
                ${watchlist.map(
                  (item) => `
                  <h6 class="text-white p-2 m-1" style="border: 1px solid white; border-radius:15px;">${item}</h6>
                  `
                )}
                  </div>
                  </div>`;
              });

              const favoriteTab = document.getElementById("favorite");
              favoriteTab.addEventListener("click", (e) => {
                e.preventDefault();
                rightPanel__bottom.innerHTML = `<div style="padding:40px;">
                <h5 class="text-white m-0 mb-4">
                Favorite Lands
                </h5>
                <div style="display:flex;  width:100%; flex-wrap: wrap;">
                ${favorite.map(
                  (item) => `
                  <h6 class="text-white p-2 m-1" style="border: 1px solid white; border-radius:15px;">${item}</h6>
                  `
                )}
                  </div>
                  </div>`;
              });

              const nftsTab = document.getElementById("nfts");
              nftsTab.addEventListener("click", (e) => {
                e.preventDefault();

                rightPanel__bottom.innerHTML = `<div style="padding:40px;overflow-y:scroll;height:100%">
                <h5 class="text-white m-0 mb-4">
                Collection
                </h5>
                <div style="width:100%;">
                ${nfts.data.result
                  .map((item) => {
                    return `<h6 class="text-white p-2" style="width:100%; border: 1px solid white; border-radius:15px;">${item}</h6>`;
                  })
                  .join("")}
                  </div>
                  </div>`;
              });

              if (window.location.hash === "#favorite") favoriteTab.click();
              if (window.location.hash === "#watchlist") watchlistTab.click();
              if (window.location.hash === "#nfts") nftsTab.click();
              if (window.location.hash === "#about") aboutTab.click();

              // some code i don't remember
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
  });
}
grid();
