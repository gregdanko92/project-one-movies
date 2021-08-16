const forms = document.querySelectorAll('form')
console.log(forms)


for (let i = 0; i < forms.length; i++) {
    forms.addEventListener('submit', handleSubmit)
}


function handleSubmit(event) {
    // step 1: stop form from refreshing page
    event.preventDefault()
    //step 2: make sure that form is posting to /movies
    //make fetch request that posts to /movies
    const data = { 
        Title: '',
        Year: '',
        Type: '',
        Poster: ''
    };
    // nice

    fetch('/movies', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        //     //step 3: if successfully added to database, render success message
        // })
        .catch((error) => {
            console.error('Error:', error);
            // step 4: if failure to add to database, render failure message
            res.render()
        });
    console.log(event.target)
}