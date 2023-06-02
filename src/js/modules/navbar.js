export default function navbar(itemSelector, activeClass) {
    const items = document.querySelectorAll(itemSelector);

    document.addEventListener('click', (event) => {
        const target = event.target,
              parent = target.closest(itemSelector);

        if((target.hasAttribute('data-toggle') || target.closest('[data-toggle]')) && parent) {
            if(parent.contains(parent.querySelector('ul'))) event.preventDefault();
            closeAll(parent);
            parent.classList.toggle(activeClass)
        } else if(!parent) closeAll();
    })
    
    function closeAll(exception) {
        items.forEach(item => {
            if(item != exception) item.classList.remove(activeClass);
        });
    }
}

