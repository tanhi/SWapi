    const data2 = {};
    //Función para mostrar modal
    function showModal(event) {
        let eventTarget = event.target;
        let eventTrigger = eventTarget.parentNode;
        let characterUrl = eventTarget.dataset.url
        //Obteniendo data de los personajes
        $.ajax({
            type: "GET",
            url: characterUrl,
            success: function (data) {
                console.log(data);
                fillModal(data);
            },
            dataType: 'json',
        }); //Termina request
        const mymodal = $('#myModal');

        function fillModal(data) {
            const characterName = data.name;
            const characterMass = data.mass;
            const characterHeight = data.height;
            const characterHair = data.hair_color;
            const characterEye = data.eye_color;

            mymodal.find('#modaltitle').text(characterName);
            mymodal.find('#imagemodal').attr('src', eventTrigger.dataset.image);
            mymodal.find('#mass').text(characterMass);
            mymodal.find('#height').text(characterHeight);
            mymodal.find('#eye').text(characterEye);
            mymodal.find('#hair').text(characterHair);
            mymodal.modal('show');
        }

    }

    $(document).ready(function () {

        //Obteniendo la data con AJAX
        $.ajax({
            type: "GET",
            url: "https://swapi.co/api/films/?format=json",
            success: function (data) {
                const dataResults = (data.results);
                const arrayMovies = Array.prototype.slice.call(dataResults);
                getMovies(arrayMovies)
            },
            dataType: 'json',
        }); //Fin del request con AJAX



        function getMovies(arrayMovies) {
            console.log(arrayMovies);
            for (let index = 0; index < arrayMovies.length; index++) {
                let movie = arrayMovies[index];
                let movieTitle = movie.title;
                let movieCharacters = movie.characters
                let movieEpisode = movie.episode_id;
                let movieImgSrc ='assets/images/' + movieEpisode + '.jpg'
                createDomMovies(movieTitle, movieCharacters, movieEpisode,movieImgSrc);

            }
        }
        //Creando en el DOM cada elemento del contenedor de peliculas
        function createDomMovies(movieTitle, movieCharacters, movieEpisode, movieImgSrc) {
            let movieContainer = $("<div></div>")
            $("#container-movie").append(movieContainer);
            let movieTitleDOM = $("<h3></h3>").text("Título: " + movieTitle);
            movieTitleDOM.attr({
                'class': 'font-weight-bold mt-3'
            });
            movieContainer.append(movieTitleDOM);
            let movieImage = $("<img></img>");
            movieImage.attr({
                width: '200px',
                src: movieImgSrc
            });
            movieContainer.append(movieImage);
            let movieEpisodeDOM = $("<h4></h4>").text("Episodio:  " + movieEpisode);
            movieContainer.append(movieEpisodeDOM);
            let movieCharDOM = $("<h4></h4>").text("Personajes:  ");
            movieContainer.append(movieCharDOM)
            movieCharacters.forEach(character => {
                var movieCharactersDOM = $("<a></a>").text(character);
                movieCharactersDOM.attr({
                    href: '#',
                    'onclick': "showModal(event)",
                    'data-url': character,
                    'class': 'd-block'
                });
                movieContainer.append(movieCharactersDOM);
            });
        }


    }); //Fin de la función ready
    // Petición para los vehículos
fetch('https://swapi.co/api/vehicles/')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const vehicles = data.results;
    let output2 = ``;
    console.log(vehicles);

    vehicles.forEach((item, index) => {
     console.log(index);
     let arrayImages = ["./assets/images/vehicles/Sand_Crawler.jpg", "./assets/images/vehicles/T-16_skyhopper.gif",
                        "./assets/images/vehicles/X_34_landspeeder.jpg", "./assets/images/vehicles/TIE_LN_starfighter.jpg",
                        "./assets/images/vehicles/Snowspeeder.jpg", "./assets/images/vehicles/TIE_bomber.jpg",
                        "./assets/images/vehicles/AT_AT.jpg", "./assets/images/vehicles/AT_ST.jpg",
                        "./assets/images/vehicles/Storm_IV_Twin_Pod_cloud_car.jpg", "./assets/images/vehicles/Sail_barge.jpg"];


     const name = item.name;
     const model = item.model;
     const manufacturer = item.manufacturer;
     const costInCredits = item.cost_in_credits;
     const images = arrayImages[index];
     console.log(images);


     output2+=

     `<div class="card stylePeople" style="width: 13rem;">
       <img class="card-img-top" src=${images} alt="Card image cap">
       <div>
         <div class="card-body">
           <h4 class="card-title">Nombre: ${name}</h4>
           <h6 class="card-text">Modelo: ${model}</h6>
           <h6 class="card-text">Manufacturer: ${manufacturer}</h6>
           <h6 class="card-text">Costo: ${costInCredits}</h6>
         </div>
       </div>
     </div>`

  $("#vehicles-Info").html(output2);
  });

  })
  .catch(function(error) {
    //console.log('Request failed', error)
  });
