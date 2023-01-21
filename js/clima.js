window.addEventListener('load', ()=> {
    let lon
    let lat

    let temperaturaValor = document.getElementById('temperaturaValor')  
    let temperaturaDescripcion = document.getElementById('temperaturaDescripcion')  
    
    let ubicacion = document.getElementById('ubicacion')  
    let iconoAnimado = document.getElementById('iconoAnimado') 

// Toma la info de localizacion del navegador del usuario y toma data de su ciudad
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( posicion => {
    
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

// Busca en la api, con latitud y longitud del navegador, temperaturaValor y temperaturaDescripcion. Utiliza el apikey que me dio el recurso al registrarme
            const urlapi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a7a674272505e750c4013d4906a6ea71`

            fetch(urlapi)
            .then( response => { return response.json()})
            .then( data => {
                
                let temp = Math.round(data.main.temp)
                temperaturaValor.textContent = `${temp} ° C`

                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()
                ubicacion.textContent = data.name

                //Condicional para iconos dinámicos
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                        iconoAnimado.src='../animated/thunder.svg'
                        console.log('TORMENTA');
                        break;
                    case 'Drizzle':
                        iconoAnimado.src='../animated/rainy-2.svg'
                        console.log('LLOVIZNA');
                        break;
                    case 'Rain':
                        iconoAnimado.src='../animated/rainy-7.svg'
                        console.log('LLUVIA');
                        break;
                    case 'Snow':
                        iconoAnimado.src='../animated/snowy-6.svg'
                        console.log('NIEVE');
                        break;                        
                    case 'Clear':
                        iconoAnimado.src='../animated/day.svg'
                        console.log('LIMPIO');
                        break;
                    case 'Atmosphere':
                        iconoAnimado.src='../animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='../animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                        iconoAnimado.src='../animated/cloudy-day-1.svg'
                        console.log('por defecto');
                }
            })

            .catch( error => {
                console.log(error)
            })
        })
    
    }
})