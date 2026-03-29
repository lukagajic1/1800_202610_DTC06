class SiteFooter extends HTMLElement {
  constructor() {
    super();
    this.renderFooter();
  }

  renderFooter() {
    this.innerHTML = `
      <footer class="bg-gray-900 text-gray-200 py-10">
        <div class="max-w-full justify-center px-4 flex md:gap-60 gap-14">
          <div>
            <h3 class="text-sm font-semibold text-gray-400 uppercase mb-4">
              Services
            </h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-white">Branding</a></li>
              <li><a href="#" class="hover:text-white">Design</a></li>
              <li><a href="#" class="hover:text-white">Marketing</a></li>
              <li><a href="#" class="hover:text-white">Advertisement</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 uppercase mb-4">
              Company
            </h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-white">About us</a></li>
              <li><a href="#" class="hover:text-white">Contact</a></li>
              <li><a href="#" class="hover:text-white">Jobs</a></li>
              <li><a href="#" class="hover:text-white">Press kit</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 uppercase mb-4">
              Legal
            </h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-white">Terms of use</a></li>
              <li><a href="#" class="hover:text-white">Privacy policy</a></li>
              <li><a href="#" class="hover:text-white">Cookie policy</a></li>
            </ul>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("site-footer", SiteFooter);