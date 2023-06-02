export default function select(selector) {
    const originalSelect = document.querySelector(selector),
          originalOptions = originalSelect.querySelectorAll('option');

    const customSelect = document.createElement('div');
    customSelect.classList.add('trading__select');
    const customOptions = Array.from(originalOptions, option => {
        const customOption = document.createElement('li');
        customOption.setAttribute('data-value', option.value);
        customOption.setAttribute('data-toggle', '');
        customOption.textContent = option.textContent;
        customOption.addEventListener('click', () => {
            originalSelect.value = customOption.getAttribute('data-value');
            customSelect.querySelector('button>span').textContent = customOption.textContent;
        });
        return customOption;
    });
    
    customSelect.innerHTML = `
    <button data-toggle><span>${customOptions[0].textContent}</span><img src="./images/chevron_down.svg" alt="arrow"></button>
    <ul></ul>
    `
    customOptions.forEach(option => {
        customSelect.querySelector('ul').append(option);
    });

    originalSelect.insertAdjacentElement('afterend', customSelect);
    document.addEventListener('click', (event) => {
        const target = event.target;
        if(customSelect.contains(target)) {
            customSelect.classList.toggle(`${customSelect.classList[0]}_active`);
        } else {
            customSelect.classList.remove(`${customSelect.classList[0]}_active`);
        }
    });
}