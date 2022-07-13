export default class Whatsapp {
  constructor(btnToggle, btnClose, container) {
    this.btnToggle = document.querySelector(btnToggle);
    this.btnClose = document.querySelector(btnClose);
    this.container = document.querySelector(container);
    this.chatContent = document.querySelector('[data-whatsapp="chat-content"]');
    this.message = document.querySelector('[data-whatsapp="message"]');
  }

  binds() {
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
  }

  addEvents() {
    this.btnToggle.addEventListener('click', this.handleToggle);
    this.container.addEventListener('click', this.handleInsideClick);
    this.btnClose.addEventListener('click', this.handleClose);
  }

  removeEvents() {
    if (this.btnToggle.classList.contains('is-active')) {
      window.addEventListener('click', this.handleOutsideClick);
      window.addEventListener('keydown', this.handleEscape);
      this.btnToggle.appendChild(this.container);
    } else {
      window.removeEventListener('click', this.handleOutsideClick);
      window.removeEventListener('keydown', this.handleEscape);
      this.container.remove();
    }
  }

  handleToggle(e) {
    e.preventDefault();
    this.btnToggle.classList.toggle('is-active');
    this.handleLoading();
    this.removeEvents();
  }

  handleInsideClick(e) {
    e.stopPropagation();
  }

  handleClose(e) {
    e.preventDefault();
    this.btnToggle.classList.remove('is-active');
    this.removeEvents();
  }

  handleOutsideClick(e) {
    if (e.target !== this.btnToggle) {
      this.handleClose(e);
    }
  }

  handleEscape(e) {
    if (e.key === 'Escape' && this.btnToggle.classList.contains('is-active')) {
      return this.handleClose(e);
    }
  }

  handleLoading() {
    if (this.btnToggle.classList.contains('is-loading')) {
      const container = document.createElement('div');
      const inner = document.createElement('div');
      const dot1 = document.createElement('span');
      const dot2 = document.createElement('span');
      const dot3 = document.createElement('span');

      container.classList.add('loading', 'whatsapp-card');
      inner.appendChild(dot1);
      inner.appendChild(dot2);
      inner.appendChild(dot3);

      container.appendChild(inner);
      this.chatContent.appendChild(container);

      this.message.style.display = 'none';
      setTimeout(() => container.remove(), 2500);
      setTimeout(() => (this.message.style.display = 'block'), 2500);

      return this.btnToggle.classList.remove('is-loading');
    } else return null;
  }

  init() {
    if (this.btnToggle && this.btnClose && this.container) this.binds();
    this.addEvents();
    return this;
  }
}
