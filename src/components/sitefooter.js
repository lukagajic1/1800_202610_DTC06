class SiteFooter extends HTMLElement {
  constructor() {
    super();
    this.renderFooter();
  }

  renderFooter() {
    this.innerHTML = `
      <footer class="bg-gray-900 text-gray-200 py-10 pb-24 md:pb-10">
        <div class="text-center space-y-1">
        <p class="text-md font-semibold">DTC-06</p>
        <p class="text-base opacity-50">© 2026 Guidebook Vancouver. All rights reserved.</p>
        </div>
      </footer>
    `;
  }
}

customElements.define("site-footer", SiteFooter);
