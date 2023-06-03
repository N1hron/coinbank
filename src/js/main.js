import navbar from "./modules/navbar";
import select from "./modules/select";

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    navbar('.header__nav-item', 'active');
    select('#trading-months-select');
    select('#footer-select');
    select('#trading-excr-select', 'minimal');
})