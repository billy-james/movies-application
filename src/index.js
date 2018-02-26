const $ = require("jquery");
const {getMovies} = require('./api.js');
const addBtn = $("#add-movie-btn");
const deleteBtn = $("#delete-btn");
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
            movies.forEach(({title, rating}, i) => {
                movieHTML +=
                    ` 
          <li>${title} - rating: ${rating}
             <button id="delete-btn" type="button" class="btn-danger">Delete</button>
         </li>
          `;
            })
            movieHTML += "</ul>";
            renderMovies.innerHTML = movieHTML;
        })
        .catch(error => console.log(error));

}

$("#addMovie").click((e) => {
    e.preventDefault();
    const movie = {title: $("#newMovie").val(), rating: $("#rating").val(), id: ""};
    console.log(movie);
        fetchNBuild(movie);
        $("#newMovie").val("");
        $("#rating").val("2");
});



getMovies().then((movies) => {
  console.log('Here are all the movies:');
  console.log(movies);

  let movieHTML = "<ul>";
  movies.forEach(({title, rating}, i) => {

      movieHTML +=
          ` 
          <li>${title} - rating: ${rating}
             <button id="delete-btn" type="button" class="btn-danger">Delete</button>
         </li>
          `;
  })
    movieHTML += "</ul>";
    renderMovies.innerHTML = movieHTML;
})

  .catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

addBtn.click( (e) => {
    add(e, "add");
});

// $("#delete-btn").on("click", function(){
//     $(this).closest("ul").remove();
// });