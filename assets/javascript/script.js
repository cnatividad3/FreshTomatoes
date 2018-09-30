$(document).ready(function () {

  //on click of element with .poster image, trigger modal
  $(document).on("click", ".posterImg", function () {

    //the modal text function will have to go here 

    $("#exampleModalCenter").modal("show");

  })

  //three ajax calls after the 

  $("#find-movie").on("click", function (event) {

    event.preventDefault();

    var apiKey = "f77c80e6ca6916fa5bf4047e67f042fb";
    var userInput = $("#movie-input").val();
    var searchURL = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + userInput + "&language=en-US&page=1&include_adult=false";

    //ajax call that returns the moviedb id for the searched movie

    $.ajax({
      url: searchURL,
      method: "GET"
    }).then(function (response) {

      console.log(response.results[0]);

      var movieID = response.results[0].id;
      var recURL = "https://api.themoviedb.org/3/movie/" + movieID + "/recommendations?api_key=" + apiKey + "&language=en-US&page=1"

      var searchDiv = $("<div>");
      var headerDiv = $("<div>");
      var bodyDiv = $("<div>");
      searchDiv.addClass("card bg-light mb-3");
      headerDiv.addClass("card-header");
      bodyDiv.addClass("card-body row text-center");
      headerDiv.text("Similar to " + userInput.trim()); // need to capitalize the text
      searchDiv
        .append(headerDiv)
        .append(bodyDiv);

      //ajax call that takes the movie id and returns an array of movie objects (recommendations)

      $.ajax({
        url: recURL,
        method: "GET"
      }).then(function (response) {

        //for loop through the first 6 recommendation titles and runs an ajax call on their movie information

        for (let i = 0; i < 6; i++) {
          var title = response.results[i].title;
          var infoURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
          url = infoURL;
          $.ajax({
            url: url,
            method: "GET"
          }).then(function (response) {
            console.log(response);
            var movieDiv = $("<div>");
            var movieImg = $("<img>");
            movieDiv.addClass("col-6");
            movieImg
              .addClass("posterImg img-fluid my-2")
              .attr({
                "src": response.Poster,
                "alt": response.Title
              });
            movieDiv.append(movieImg);
            bodyDiv.append(movieDiv);
          })
        }
        $("#main-content").append(searchDiv);
      })
    });
  })
})