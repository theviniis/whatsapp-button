import Whatsapp from './whatsapp.js';

const whatsapp = new Whatsapp(
  '[data-whatsapp="container"]',
  '[data-whatsapp="close-btn"]',
  '[data-whatsapp="chat"]'
);

whatsapp.init();
