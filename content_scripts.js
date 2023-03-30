const currentIFrame = document.querySelector('iframe#appFrame')

currentIFrame.addEventListener("load", function() {
    const contentFrame = currentIFrame.contentDocument
    const isEvalPage = contentFrame.querySelector('form[name="evalDocForm"]:not([title])')

    if (isEvalPage) {

        const menuPosition = contentFrame.querySelector('.servicios-urbe-tablas caption')

        const button = document.createElement('button')
        const score = 4

        

        button.innerText = "Colocar Notas"
        button.addEventListener('click', e => {
            e.preventDefault()
            const rows = Array.from(contentFrame.querySelectorAll('.servicios-urbe-tablas tbody tr'))
            .filter(r => r.querySelector('input'));
            
            rows.forEach(r => r.children[score].firstChild.checked = true)
        })
        
        menuPosition.appendChild(button)
    }
});

