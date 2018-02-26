const $ = require("jquery");
const {getMovies} = require('./api.js');
const addBtn = $("#add-movie-btn");
const deleteBtn = $("#btn-delete");
let renderMovies = document.getElementById("movie-title");

function fetchNBuild(movieObj)
{
    const url = '/api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieObj)
    };
    fetch(url, options)
        .then((data) => getMovies())
        .then(movies => {
            let movieHTML = "<ul>";
            movies.forEach(({title, rating, id}) => {
                movieHTML +=
                    `
          <li>${title} - rating: ${rating}
             <button type="button" class="btn-danger delete" data-attribute=${id}>Delete</button>
         </li>
          `;
            });
            movieHTML += "</ul>";
            renderMovies.innerHTML = movieHTML;
        })
        .catch(error => console.log(error));

}

$("#addMovie").click((e) => {
    e.preventDefault();
    const movie = {title: $("#newMovie").val(), rating: $("#rating").val(), id: " "};
    console.log(movie);
        fetchNBuild(movie);
        $("#newMovie").val("");
        $("#rating").val("1");
});


    // add a data-target property on the delete buttons where the value is the id of the movie
    // console.log the data-target of the delete button you click on - make sure you get the right ID!
    // save that data-target id to a variable called ID inside of the delete movie function
    // make a fetch request where the METHOD is DELETE and the url is api/movies/id

function removeMovie(id) {
    const url = `/api/movies/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },

    };

    fetch(url, options)
        .then(response => response.json())
        .catch(error => console.log(error))

}


// $("#delete-btn").click((e) => {
//     e.preventDefault();
//     const movie = {title: $("#newMovie").val(), rating: $("#rating").val(), id: ""};
//     console.log(movie);
//     removeMovie(movie);
//
// });

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  console.log(movies);

  let movieHTML = "<ul>";
  movies.forEach(({title, rating}, id) => {

      movieHTML +=
          ` 
          <li>${title} - rating: ${rating}
             <button type="button" class="btn-danger delete" data-attribute=${id}>Delete</button>
         </li>
          `;
  });
    movieHTML += "</ul>";
    renderMovies.innerHTML = movieHTML;

    addBtn.click( (e) => {
        addoredit(e, "add");
    });

    $(".delete").on("click", function(e){
        ($(this).removeAttr("data-id"));

    });
})

  .catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});



// $("#delete-btn").on("click", function(){
//     $(this).closest("ul").remove();
// });
