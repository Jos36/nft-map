/** @format */
import { addUser, checkUser, modifiyUser, getUserNfts } from "./api.js ";
import { verifyWalletConnection } from "./wallet.js";
import { CoordToLandsId } from "./CoordToLandsId.js";

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

              let readyToRenderWatchList = [];
              let readyToRenderFavorite = [];

              watchlist.map(async (item) => {
                const nftId = CoordToLandsId[`${item}`];
                const data = fetch(`/data/${nftId}.json`)
                  .then((response) => response.json())
                  .then((obj) => {
                    return `
                <h6 class="text-white p-2 m-1" style="display:flex;align-items:center;flex-direction:column; ">
                <img src="${obj.image}" style="width:100px;height:100px;border-radius:15px;"/>
                <p style="margin-top:3px" >${item}</p>
                </h6>
                `;
                  });
                const t = await data;

                readyToRenderWatchList.push(t);
              });

              favorite.map(async (item) => {
                const nftId = CoordToLandsId[`${item}`];
                const data = fetch(`/data/${nftId}.json`)
                  .then((response) => response.json())
                  .then((obj) => {
                    return `
                <h6 class="text-white p-2 m-1" style="display:flex;align-items:center;flex-direction:column; ">
                <img src="${obj.image}" style="width:100px;height:100px;border-radius:15px;"/>
                <p style="margin-top:3px" >${item}</p>
                </h6>
                `;
                  });
                const t = await data;

                readyToRenderFavorite.push(t);
              });

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
                ${readyToRenderWatchList.map((item) => item)}
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
                ${readyToRenderFavorite.map((item) => item)}
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
                  window.location.replace("settings");
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

  const walletModalBtn = document.getElementById("walletModalBtn");
  const walletModal = new bootstrap.Modal(
    document.getElementById("walletModal"),
    {
      keyboard: false,
    }
  );

  walletModalBtn.addEventListener("click", () => {
    const walletAddressField = document.getElementById("walletAddressField");
    walletModal.show();
    walletAddressField.value = window.accountData.account;
    navigator.clipboard.writeText(window.accountData.account);
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
}
grid();
