import { onAuthStateChanged } from "firebase/auth";
import { auth } from "/src/firebaseConfig.js";
import { logoutUser } from "/src/authentication.js";

class SiteNavbar extends HTMLElement {
  constructor() {
    super();
    this.renderNavbar();
    this.setupMobileMenu();
    this.renderAuthControls();
    this.setupSearch();
  }

  renderNavbar() {
    this.innerHTML = `
    <nav class="bg-[#00C7A9] text-white z-20 relative">
      <div class="fixed inset-x-0 top-0 min-w-full md:relative md:w-auto flex justify-between bg-[#00C7A9]">
        <div class="flex p-2">
          <a class="flex" href="index.html">
            <img class="mx-2 w-[40px] h-[50px]" src="images/book-white.svg" alt="" />
            <h3 class="font-bold text-xl">
              Guidebooking <br>Vancouver
            </h3>
          </a>
        </div>

        <div class="md:flex gap-5 hidden md:visible">
          <button>
            <a class="flex flex-col items-center" href="edititinerary.html">
              <img class="w-[30px] h-[30px]" src="images/calendar-white.svg" alt="" />
              <span>Itinerary</span>
            </a>
          </button>
          <button>
            <a class="flex flex-col items-center" href="map.html">
              <img class="w-[30px] h-[30px]" src="images/map-white.svg" alt="" />
              <span>Event Map</span>
            </a>
          </button>
          <button>
            <a class="flex flex-col items-center" href="profilepage.html">
              <img class="w-[30px] h-[30px]" src="images/profile-white.svg" alt="" />
              <span>Profile</span>
            </a>
          </button>
          <button id="authControls"></button>
        </div>

        <div class="pt-4 px-2">
          <div class="relative">
            <form id="searchForm" class="flex bg-white rounded-[20px] max-h-12">
              <input
                id="searchInput"
                type="text"
                placeholder="Search events..."
                autocomplete="off"
                class="max-h-10 text-black bg-white rounded-l-[20px] m-2 outline-none"
              />
              <button type="submit" class="bg-[#26BDD9] rounded-r-[20px] px-2">
                <img src="images/search-white.svg" class="w-[30px]" alt="Search" />
              </button>
            </form>

            <div
              id="suggestions"
              class="absolute left-0 right-0 mt-1 bg-white border border-gray-300 max-h-48 overflow-y-auto z-50 rounded-lg"
            ></div>
          </div>
        </div>
      </div>

      <div class="flex justify-between p-3 rounded-t-[30px] gap-5 visible md:hidden fixed inset-x-0 bottom-0 min-w-full bg-[#00C7A9] md:relative" id="mobileMenu">
        <button>
          <a class="flex flex-col items-center" href="edititinerary.html">
            <img class="w-[30px] h-[30px]" src="images/calendar-white.svg" alt="" />
            <span>Itinerary</span>
          </a>
        </button>
        <button>
          <a class="flex flex-col items-center" href="map.html">
            <img class="w-[30px] h-[30px]" src="images/map-white.svg" alt="" />
            <span>Event Map</span>
          </a>
        </button>
        <button>
          <a class="flex flex-col items-center" href="profilepage.html">
            <img class="w-[30px] h-[30px]" src="images/profile-white.svg" alt="" />
            <span>Profile</span>
          </a>
        </button>
        <button id="authControlsMobile"></button>
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

  async setupSearch() {
    const { collection, getDocs } = await import("firebase/firestore");
    const { db } = await import("/src/firebaseConfig.js");

    let preDefinedSuggestions = [];

    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      querySnapshot.forEach((doc) => {
        preDefinedSuggestions.push({
          name: doc.data().name,
          id: doc.id,
        });
      });
    } catch (error) {
      console.error("Error fetching events:", error);
    }

    const searchInput = this.querySelector("#searchInput");
    const suggestions = this.querySelector("#suggestions");
    const searchForm = this.querySelector("#searchForm");

    if (!searchInput || !suggestions || !searchForm) return;

    let selectedEvent = null;

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();
      suggestions.innerHTML = "";
      selectedEvent = null;

      if (!query) return;

      const filteredResults = preDefinedSuggestions.filter((item) =>
        item.name.toLowerCase().includes(query),
      );

      filteredResults.forEach((result) => {
        const suggestionItem = document.createElement("div");
        suggestionItem.classList.add(
          "p-3",
          "cursor-pointer",
          "text-black",
          "hover:bg-gray-100",
        );

        suggestionItem.textContent = result.name;

        suggestionItem.addEventListener("click", () => {
          searchInput.value = result.name;
          selectedEvent = result;
          suggestions.innerHTML = "";
        });

        suggestions.appendChild(suggestionItem);
      });
    });

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const query = searchInput.value.toLowerCase().trim();
      if (!query) return;

      if (selectedEvent) {
        window.location.href = `eventGeneric.html?docID=${selectedEvent.id}`;
        return;
      }

      const matchedEvent = preDefinedSuggestions.find((item) =>
        item.name.toLowerCase().includes(query),
      );

      if (matchedEvent) {
        window.location.href = `eventGeneric.html?docID=${matchedEvent.id}`;
      } else {
        alert("No matching event found.");
      }
    });

    document.addEventListener("click", (event) => {
      if (event.target !== searchInput && !suggestions.contains(event.target)) {
        suggestions.innerHTML = "";
      }
    });
  }

  renderAuthControls() {
    const authControls = this.querySelector("#authControls");
    const authControlsMobile = this.querySelector("#authControlsMobile");

    const placeholder = `
      <button>
        <a class="flex flex-col items-center" href="">
          <img class="w-[30px] h-[30px]" src="images/logout.png" alt="" />
          <span>Log Out</span>
        </a>
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
            <a class="flex flex-col items-center" href="">
              <img class="w-[30px] h-[30px]" src="images/gear-white.svg" alt="" />
              <span>Log Out</span>
            </a>
          </button>
        `;
        mobileHTML = `
          <button id="signOutBtnMobile">
            <a class="flex flex-col items-center" href="">
              <img class="w-[30px] h-[30px]" src="images/gear-white.svg" alt="" />
              <span>Log Out</span>
            </a>
          </button>
        `;
      } else {
        desktopHTML = `
          <button>
            <a class="flex flex-col items-center" href="login.html">
              <img class="w-[30px] h-[30px]" src="images/gear-white.svg" alt="" />
              <span>Log In</span>
            </a>
          </button>
        `;
        mobileHTML = `
          <button>
            <a class="flex flex-col items-center" href="login.html">
              <img class="w-[30px] h-[30px]" src="images/gear-white.svg" alt="" />
              <span>Log In</span>
            </a>
          </button>
        `;
      }

      if (authControls) authControls.innerHTML = desktopHTML;
      if (authControlsMobile) authControlsMobile.innerHTML = mobileHTML;

      const signOutBtn = this.querySelector("#signOutBtn");
      const signOutBtnMobile = this.querySelector("#signOutBtnMobile");

      signOutBtn?.addEventListener("click", (event) => {
        event.preventDefault();
        logoutUser();
      });

      signOutBtnMobile?.addEventListener("click", (event) => {
        event.preventDefault();
        logoutUser();
      });
    });
  }
}

customElements.define("site-navbar", SiteNavbar);
