console.log('Client side JavaScript file is loaded!!!')

// fetch('http://localhost:3000/weather?location=boston').then(res=>{
//     res.json().then(data => {
//         if(data.error){
//             console.log(error);
//         }else{
//             console.log(data);
//             console.log(`location: ${data.location} and forecast: ${data.weatherDescription}`);
//         }
//     })
// })
const search = document.querySelector('input');
const place = document.querySelector('#place');
place.textContent = '';
const info = document.querySelector('#info');
document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    if(!location){
        // console.log("Enter the location");
        alert('Enter the locaiton!!!')
    }else{
        place.textContent = 'Loading...';
        info.textContent = '';
        fetch(`/weather?location=${location}`).then(res=>{
            res.json().then(data=>{
                if(data.error){
                    place.textContent = data.error;
                    // console.log(data.error);
                }else{
                    // console.log(`location: ${data.location} and forecast: ${data.weatherDescription}`);
                    place.textContent = data.location;
                    info.textContent = data.weatherDescription;
                }
            })
        })
    }
})