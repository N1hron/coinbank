import navbar from "./modules/navbar";
import select from "./modules/select";

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    navbar('.header__nav-item', 'active');
    select('#trading-select');
    select('#footer-select');
})