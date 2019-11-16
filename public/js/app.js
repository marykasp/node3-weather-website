

// fetch API- browser based API (NOT accessible in NODE JS)
// kicks off async I/O operation- provide a function to run when data is resolved- fetch data, parse into a JS object, and show data to console
// fetch('http://puzzle.mead.io/puzzle')
//     .then((response) => response.json())
//     .then((data) => console.log(data))

// get JS representation of that element
const weatherForm = document.querySelector('form');
const search = document.querySelector('#address');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const location = search.value
    // console.log(location)
    // console.log('form submitted')

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const url = `http://localhost:3000/weather?address=${location}`

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })

})

// fetch('http://localhost:3000/?address=boston')
// .then((response) => response.json())
// .then((data) => {
//     if(data.error) {
//         console.log(data.error)
//     } else {
//         console.log(data.location)
//         console.log(data.forecast)
//     }
// })