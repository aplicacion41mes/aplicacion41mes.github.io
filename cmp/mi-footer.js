class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2023
        Espinosa Serrano Marco Antonio.
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
