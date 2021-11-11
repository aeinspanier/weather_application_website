console.log("client side js file loaded")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mess1 = document.querySelector('#message-1')
const mess2 = document.querySelector('#message-2')

mess1.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    mess2.textContent = 'Loading...'
    const httpAddress = '/weather?address=' + search.value
    fetch(httpAddress).then((response) => {
        response.json().then((data) => {
            if(data.error){
                mess2.textContent = ''
                mess1.textContent = data.error
            }else{
                mess1.textContent = data.location
                mess2.textContent = data.forecast
            }
        })
    })
})