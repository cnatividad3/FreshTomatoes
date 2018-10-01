$(document).ready(function () {

  //three ajax calls after the user inputs a search terms

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
      var titleSpan = $("<span>");
      searchDiv.addClass("card bg-light mb-3");
      headerDiv.addClass("card-header");
      bodyDiv.addClass("card-body row text-center");
      titleSpan
        .addClass("title-text")
        .text(response.results[0].title)
      headerDiv
        .text("Based on your search for: ")
        .append(titleSpan);
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
            movieDiv.addClass("col-4");
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

  $(document).on("click", ".posterImg", function () {
    $("#exampleModalCenter").modal("show");
    console.log($(this).attr("alt"))

    // ajax info for omdb

    var recTitle = $(this).attr("alt")
    var recURL = "https://www.omdbapi.com/?t=" + recTitle + "&y=&plot=short&apikey=trilogy";

    // ajax call for omdb

    $.ajax({
      url: recURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      console.log(response.Plot);
      var plot = response.Plot;
      var actors = response.Actors;
      var rating = response.Rated;
      var released = response.Released;
      var metascore = response.Metascore;
      $("#exampleModalLongTitle").text(recTitle);
      $("#modal-plot").text("Summary: " + plot);
      $("#modal-actors").text("Cast: " + actors);

      // get rating number, convert it to a five star rating
      // loop and make stars colored relative to the rating (round the ratings)

      $("#modal-rated").text("Rated: " + rating);
      $("#modal-released").text("Release Date: " + released);

      metascore = Math.round(metascore / 20);

      // emptying modal rating to start with 0 stars each time

      $("#modal-rating").empty();

      // display colored stars equal to metascore

      for (var i = 1; i <= metascore; i++) {
        var span = $("<span>");
        span.addClass("fa fa-star checked");
        $("#modal-rating").append(span);
      }
      // display non-colored stars

      for (var i = 0; i < (5 - metascore); i++) {
        var span = $("<span>");
        span.addClass("fa fa-star");
        $("#modal-rating").append(span);
      }
    })
  })
})