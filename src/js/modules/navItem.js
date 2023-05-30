export default function navItem(selector, activeClass, parentSelector) {
    const parent = document.querySelector(parentSelector);
    const items = parent.querySelectorAll(selector);
   
    items.forEach(item => {
        item.addEventListener('click', (event) => {
            closeAll(item);
            if(['A', 'IMG'].includes(event.target.tagName)) {
                item.classList.toggle(activeClass);
            } else {
                item.classList.add(activeClass);
            }
        })
    })

    document.addEventListener('click', (event) => {
        if(!itemsInclude(event.target)) closeAll();
    })
    
    function itemsInclude(element) {
        let result = false;
        items.forEach(item => {
            if(item == element || item.contains(element)) result = true;
        })
        return result;
    }

    function closeAll(exception) {
        items.forEach(item => {
            if(item != exception) item.classList.remove(activeClass);
        });
    }
}
