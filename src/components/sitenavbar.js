// Import specific functions from the Firebase Auth SDK
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "/src/firebaseConfig.js";
import { logoutUser } from "/src/authentication.js";

class SiteNavbar extends HTMLElement {
  constructor() {
    super();
    this.renderNavbar();
    this.setupMobileMenu();
    this.renderAuthControls();
  }

  renderNavbar() {
    this.innerHTML = `
    <!-- NAVBAR STARTS HERE -->
    <!-- NAVBAR STARTS HERE -->
    <!-- NAVBAR STARTS HERE -->
    <nav class="bg-[#00C7A9] text-white z-20 relative">
      <div class="fixed inset-x-0 top-0 min-w-full md:relative md:w-auto flex justify-between bg-[#00C7A9]">
        <div class="flex p-2">
          <a class="flex" href="index.html"><img class="mx-2 w-[40px] h-[50px]" src="images/book-white.svg" alt="" />
          <h3 class="font-bold text-xl">
            Guidebooking <br>Vancouver
          </h3></a>
        </div>

        <div class="md:flex gap-5 hidden md:visible">
          <button>
            <a class="flex flex-col items-center" href="edititinerary.html"
              ><img class="w-[30px] h-[30px]" src="images/calendar-white.svg" alt="" />
              <span>Itinerary</span></a>
          </button>
          <button>
            <a class="flex flex-col items-center" href="map.html"
              ><img class="w-[30px] h-[30px]" src="images/map-white.svg" alt="" />
              <span>Event Map</span></a>
          </button>
          <button>
            <a class="flex flex-col items-center" href=""
              ><img class="w-[30px] h-[30px]" src="images/gear-white.svg" alt="" />
              <span>Settings</span></a>
          </button>
          <button id="authControls">
            
          </button>
        </div>

        <div class="pt-4 px-2">
          <div class="flex bg-white rounded-[20px] max-h-12">
          <input type="text" placeholder="Search" class="max-h-10 bg-white rounded-[20px] m-2">
          <button class="bg-[#26BDD9] rounded-r-[20px] px-2">
            <img src="images/search-white.svg" class="w-[30px]"/>
          </button>

        </div>
        </div>
        

      </div>

      <div class="flex justify-between p-3 rounded-t-[30px] gap-5 visible md:hidden fixed inset-x-0 bottom-0 min-w-full bg-[#00C7A9] md:relative" id="mobileMenu">
          <button>
            <a class="flex flex-col items-center" href=""
              ><img class="w-[30px] h-[30px]" src="images/calendar-white.svg" alt="" />
              <span>Itinerary</span></a>
          </button>
          <button>
            <a class="flex flex-col items-center" href=""
              ><img class="w-[30px] h-[30px]" src="images/map-white.svg" alt="" />
              <span>Event Map</span></a>
          </button>
          <button>
            <a class="flex flex-col items-center" href=""
              ><img class="w-[30px] h-[30px]" src="images/gear-white.svg" alt="" />
              <span>Settings</span></a>
          </button>
          <button id="authControlsMobile">
            
          </button>
        </div>

    </nav>
    `;
  }

  setupMobileMenu() {
    const btn = this.querySelector("#mobileMenuBtn");
    const menu = this.querySelector("#mobileMenu");
    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
      const isHidden = menu.classList.contains("hidden");
      menu.classList.toggle("hidden");
      btn.setAttribute("aria-expanded", String(isHidden));
    });
  }

  renderAuthControls() {
    const authControls = this.querySelector("#authControls");
    const authControlsMobile = this.querySelector("#authControlsMobile");

    const placeholder = `
          <button>
            <a class="flex flex-col items-center" href=""
              ><img class="w-[30px] h-[30px]" src="images/profile-white.svg" alt="" />
              <span>Log Out</span></a>
          </button>
    `;

    if (authControls) authControls.innerHTML = placeholder;
    if (authControlsMobile) authControlsMobile.innerHTML = placeholder;

    onAuthStateChanged(auth, (user) => {
      let desktopHTML = "";
      let mobileHTML = "";

      if (user) {
        desktopHTML = `
        <button id="signOutBtn">
            <a class="flex flex-col items-center" href=""
              ><img class="w-[30px] h-[30px]" src="images/profile-white.svg" alt="" />
              <span>Log Out</span></a>
          </button>
        `;
        mobileHTML = `
          <button id="signOutBtnMobile">
            <a class="flex flex-col items-center" href=""
              ><img class="w-[30px] h-[30px]" src="images/profile-white.svg" alt="" />
              <span>Log Out</span></a>
          </button>
        `;
      } else {
        desktopHTML = `
          <button>
            <a class="flex flex-col items-center" href="login.html"
              ><img class="w-[30px] h-[30px]" src="images/profile-white.svg" alt="" />
              <span>Log In</span></a>
          </button>
        `;
        mobileHTML = `
          <button>
            <a class="flex flex-col items-center" href=""
              ><img class="w-[30px] h-[30px]" src="images/profile-white.svg" alt="" />
              <span>Log In</span></a>
          </button>
        `;
      }

      if (authControls) authControls.innerHTML = desktopHTML;
      if (authControlsMobile) authControlsMobile.innerHTML = mobileHTML;

      const signOutBtn = this.querySelector("#signOutBtn");
      const signOutBtnMobile = this.querySelector("#signOutBtnMobile");

      signOutBtn?.addEventListener("click", logoutUser);
      signOutBtnMobile?.addEventListener("click", logoutUser);
    });
  }
}

customElements.define("site-navbar", SiteNavbar);
