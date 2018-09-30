$("#find-movie").on("click", function (event) {

  event.preventDefault();


  var apiKey = "f77c80e6ca6916fa5bf4047e67f042fb";
  var userInput = $("#movie-input").val();
  var searchURL = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + userInput + "&language=en-US&page=1&include_adult=false";

  $.ajax({
    url: searchURL,
    method: "GET"
  }).then(function (response) {

    //temporary console log (returns searched movie ID)
    console.log(response.results[0].id);

    var movieID = response.results[0].id;
    var recURL = "https://api.themoviedb.org/3/movie/" + movieID + "/recommendations?api_key=" + apiKey + "&language=en-US&page=1"

    var searchDiv = $("<div>");
    var headerDiv = $("<div>");
    var bodyDiv = $("<div>");
    searchDiv.addClass("card bg-light mb-3");
    headerDiv.addClass("card-header");
    bodyDiv.addClass("card-body row text-center");
    headerDiv.text("Similar to " + userInput.trim());
    searchDiv
      .append(headerDiv)
      .append(bodyDiv);

    $.ajax({
      url: recURL,
      method: "GET"
    }).then(function (response) {

      //for loop to get the reccomendation titles
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

  //Enter Search term to find recommended movies
  // hit button or press enter to search
  // ajax call for to tastedive api
  // return object of movie recs
  //use movie rec title to call omdb for movie information
  //write posters and titles of movies to page
  //on click of poster pull modal

  $(document).on("click", ".posterImg", function () {
    $("#exampleModalCenter").modal("show");
  })

  //write movie info from omdb to modal/ ratings movie clip

  // api test
})