export default function passwordBtns(formSelector) {
    const forms = document.querySelectorAll(formSelector)

    forms.forEach(form => {
        const inputs = form.querySelectorAll('[data-type="password"]')
        inputs.forEach(input => {
            const btn = input.parentElement.querySelector('.password-visibility')

            btn.addEventListener('click', () => {
                input.setAttribute('type', input.type === 'text' ? 'password' : 'text')
                btn.classList.toggle('password-visibility_hide')
            })
            
            document.addEventListener('click', (e) => {
                
                if (!([btn, input].includes(e.target) || e.target.closest('button') === btn)) {
                    input.setAttribute('type', 'password')
                    btn.classList.remove('password-visibility_hide')
                }
            })
        })
    })
}