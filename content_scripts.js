const currentIFrame = document.querySelector('iframe#appFrame')

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


currentIFrame.addEventListener("load", function () {
    const contentFrame = currentIFrame.contentDocument
    const isEvalPage = contentFrame.querySelector('form[name="evalDocForm"]:not([title])')

    const menu = document.createElement('div')
    const button = document.createElement('button')
    button.innerText = "Colocar Notas"
    button.style.display = "block"
    button.style.marginTop = "20px"

    menu.classList.add('options_menu')

    const label_min = document.createElement('label')
    label_min.textContent = "Nota Minima: "
    label_min.style.display = "block"
    label_min.style.marginTop = "20px"

    const label_max = document.createElement('label')
    label_max.textContent = "Nota Máxima: "
    label_max.style.display = "block"

    const label_check = document.createElement('label')
    label_check.textContent = "Enviar resultado inmedianto: "


    const input_min = document.createElement('input')
    input_min.type = "range"
    input_min.min = 1
    input_min.max = 4
    input_min.value = 2
    input_min.style.display = "block"
    input_min.id = "input_min"

    input_min.addEventListener('change', function(e) {
        const max = contentFrame.querySelector('#input_max').value

        if (e.target.value > max) {
            e.target.value = max
        }
    })

    const input_max = document.createElement('input')
    input_max.type = "range"
    input_max.min = 1
    input_max.max = 4
    input_max.value = 4
    input_max.style.display = "block"
    input_max.id = "input_max"

    input_max.addEventListener('change', function(e) {
        const min = contentFrame.querySelector('#input_min').value

        if (e.target.value < min) {
            e.target.value = min
        }
    })

    const check_salida = document.createElement('input')
    check_salida.type = "checkbox"
    check_salida.id = "check_salida"

    if (!isEvalPage) return

    const menuPosition = contentFrame.querySelector('.servicios-urbe-tablas caption')
    const rows = Array.from(contentFrame.querySelectorAll('.servicios-urbe-tablas tbody tr'))
        .filter(r => r.querySelector('input'));

    button.addEventListener('click', e => {
        e.preventDefault()

        const min = contentFrame.querySelector('#input_min').value
        const max = contentFrame.querySelector('#input_max').value
        const isAutomaticClick = contentFrame.querySelector('#check_salida').checked


        rows.forEach(r => {
            const random_score = min === max ? min : getRandom(min, max)
            r.children[random_score].firstChild.checked = true
        })

        if(isAutomaticClick) {
            const btn_send = contentFrame.querySelector('input[value="Enviar Evaluación"]')
            btn_send.click()
        }
    })

    menuPosition.appendChild(menu)
    menu.appendChild(label_min)
    menu.appendChild(input_min)
    menu.appendChild(label_max)
    menu.appendChild(input_max)
    menu.appendChild(label_check)
    menu.appendChild(check_salida)
    menu.appendChild(button)

});

