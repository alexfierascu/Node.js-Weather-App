const input = document.querySelector('#location');
const form = document.querySelector('form');
const type = document.querySelector('#type');
const feedback = document.querySelector('#feedback');

//Listening for submit event
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Ouput error message and return from the function otherwise continue
    if(input.value.trim() == '') {
        return feedback.innerHTML = 'Location must be specified !';
    }

    feedback.innerHTML = 'Loading...';

    // Fetching Data and output
    fetch(`/weather?address=${input.value}&units=${type.value}`)
        .then(res => res.json())
        .then(data => {

            if(data.error) {
                feedback.innerHTML = `<p>${data.error}</p>`;
            } else {
            feedback.innerHTML = `<p><strong>Location: </strong>${data.location}</p>
                                  <p><strong>Forecast: </strong>${data.forecast}</p>`;
                }
        });
});