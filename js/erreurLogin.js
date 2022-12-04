const showAlert = (msg) =>{
    let alertBox = document.querySelector('.alert-box')
    alertBox.removeAttribute('hidden')
    let alertMsg = document.querySelector('.alert-msg')
    let alertImg = document.querySelector('.alert-img')
    alertMsg.innerHTML = msg
    alertImg.src = 'img/errorLogin.png'
    alertMsg.style.color = 'red'
    alertBox.classList.add('show')
    setTimeout(() => {
        alertBox.classList.remove('show')
    }, 2000)
}

const submit = document.querySelector('.submit')
submit.addEventListener('click', () => {
    const inputs = document.querySelectorAll('input')
    var ok = new Boolean(true)
    inputs.forEach(item => {
        if(item.value == "") ok = false
    })
    if(!ok) showAlert('Merci de renseigner toutes les informations')
    else if(document.querySelector(".pwd").value.length < 8) showAlert('Le mot de passe doit être composé au minimum de 8 caractères')
    else document.querySelector('form').submit()
})
