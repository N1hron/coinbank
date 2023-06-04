import navbar from './modules/navbar';
import select from './modules/select';
import chart from './modules/chart';
import tradingChartData from './tradingChartData.json';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    navbar('.header__nav-item', 'active');
    select('#trading-months-select');
    select('#footer-select');
    select('#trading-excr-select', 'minimal');
    chart('#trading-chart', tradingChartData);
})