function sendEmail(event) {
    event.preventDefault();
    const name = document.getElementById('form_name').value
    const phone = document.getElementById('form_phone').value
    const email = document.getElementById('form_email').value
    const subject = document.getElementById('form_subject').value
    const message = document.getElementById('form_message').value
    const submit_btn = document.getElementById('form_btn')
    const alertSuccess = document.getElementById('success_box')
    const alertError = document.getElementById('error_box')
    const errors = []
    let errorMessage = ''
    if (name === '')  errors.push('Name can not be empty')
    if (phone === '') errors.push('Phone can not be empty')
    if (email === '') errors.push('Email is require')
    if (subject === '') errors.push('Subject is required')
    if (message === '') errors.push('Message is required')
    if (errors.length > 0) {
        errors.forEach(error => {
            errorMessage += `${error} <br>`
        })
        alertError.innerHTML = errorMessage
        alertError.style.display = 'block'
    }else{
        alertError.style.display = 'none'
        const request = {
            method: 'post',
            url: 'https://aba-trader.herokuapp.com/api/v1/contact/message/dewbay',
            data: {
                name: name,
                phone: phone,
                email: email,
                subject: subject,
                message: message
            }
        }
        submit_btn.textContent = 'Please wait...'
        axios(request).then( response => {
            alertSuccess.textContent = response.data.data
            alertSuccess.style.display = 'block'
            submit_btn.textContent = 'SEND MESSAGE'
        }).catch( error => { 
            alertError.textContent = error
            alertError.style.display = 'block'
            submit_btn.textContent = 'SEND MESSAGE'
        });
    }
}