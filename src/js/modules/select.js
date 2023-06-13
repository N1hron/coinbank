export default function select(selector, modificator) {
    const originalSelect = document.querySelector(selector);
          
    if(originalSelect) {
        const originalOptions = originalSelect.querySelectorAll('option');
        const customSelect = document.createElement('div');
        customSelect.classList.add('select');
        if(modificator) customSelect.classList.add(`select_${modificator}`);

        const customOptions = Array.from(originalOptions, option => {
            const customOption = document.createElement('li');
            customOption.setAttribute('data-value', option.value);
            customOption.setAttribute('data-toggle', '');
            customOption.textContent = option.textContent;
            customOption.addEventListener('click', () => {
                originalSelect.value = customOption.getAttribute('data-value');
                customSelect.querySelector('button').textContent = customOption.textContent;
            });
            return customOption;
        });
        
        originalSelect.style.display = 'none';
        customSelect.innerHTML = `
        <button data-toggle>${customOptions[0].textContent}</button>
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
}