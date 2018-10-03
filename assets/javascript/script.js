$(document).ready(function () {
  
  //Counter variable for dropdown menu
  var counter = 0;
  errorID = false;
  errorRec = false;

  //Three ajax calls after the user inputs a search terms

  $("#find-movie").on("click", function (event) {

    event.preventDefault();

    counter++;

    var apiKey = "f77c80e6ca6916fa5bf4047e67f042fb";
    var userInput = $("#movie-input").val();
    var searchURL = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + userInput + "&language=en-US&page=1&include_adult=false";

    //ajax call that returns the moviedb id for the searched movie

    $.ajax({
      url: searchURL,
      method: "GET"
    }).then(function (response) {
      if (response.results.length === 0) {
        errorID = true;
      }
      if (errorID === true) {
        $("#errorBody").text("Not a valid search!")
        $("#errorModal").modal("show");
        errorID = false;
      }

      console.log(response.results[0]);

      var movieID = response.results[0].id;
      var recURL = "https://api.themoviedb.org/3/movie/" + movieID + "/recommendations?api_key=" + apiKey + "&language=en-US&page=1"
      console.log(recURL);
      var searchDiv = $("<div>");
      var headerDiv = $("<div>");
      var bodyDiv = $("<div>");
      var titleSpan = $("<span>");
      var dummyAnchor = $("<a>");
      searchDiv.addClass("card bg-light mb-3 dynamic");
      headerDiv.addClass("card-header");
      bodyDiv.addClass("card-body row text-center");
      dummyAnchor
        .addClass("dynamic-dummy-anchor")
        .attr("id", "search" + counter)
      titleSpan
        .addClass("title-text")
        .text(response.results[0].title)
      headerDiv
        .text("Based on your search for: ")
        .append(titleSpan);
      searchDiv
        .append(headerDiv)
        .append(bodyDiv)
        .prepend(dummyAnchor);




      // create a button for the search term 
      var dropDown = $("<a>");
      dropDown
        .addClass("dropdown-item")
        .attr("href", "#search" + counter)
        .text(response.results[0].title);
      $("#dropdown").append(dropDown);

      //ajax call that takes the movie id and returns an array of movie objects (recommendations)

      $.ajax({
        url: recURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        //error recs modal
        if (response.results.length === 0) {
          errorRec = true;
        }
        if (errorRec === true) {
          $("#errorBody").text("No recommendations available!")
          $("#errorModal").modal("show");
          errorRec = false;
        }

        //for loop through the first 6 recommendation titles and runs an ajax call on their movie information


        for (let i = 0; i < 12; i++) {
          //where the conditinal if there are recommendation
          console.log(response.results);
          var title = response.results[i].title;

          var infoURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=full&apikey=trilogy";
          url = infoURL;
          $.ajax({
            url: url,
            method: "GET"
          }).then(function (response) {
            console.log(response);

            var movieDiv = $("<div>");
            var movieImg = $("<img>");
            movieDiv.addClass("col-2 reveal");
            movieImg
              .addClass("posterImg img-fluid my-2")
              .attr({
                "src": response.Poster,
                "alt": response.Title,
                "id": "reveal" + i
              });
            movieDiv.append(movieImg);
            bodyDiv.append(movieDiv);
          })
        }
        $("#main-content").append(searchDiv);

        // scroll to latest search

        $('html, body').animate({
          scrollTop: ($("#search" + counter).offset().top)
        }, 1000);
      })
    });
  })

  $(document).on("click", ".posterImg", function () {
    $("#movieModal").modal("show");
    console.log($(this).attr("alt"))
    
    // style modal
    
    var stickyHeader = $("#stickyHeader");
    var modal = $("#movieModal");
    modal.attr("style", "padding-right:0px;");
    stickyHeader.attr("style", "padding-right:10px;margin-right:0px;padding-left:10px;margin-left:0px;")

    // ajax info for omdb

    var recTitle = $(this).attr("alt")
    var recURL = "https://www.omdbapi.com/?t=" + recTitle + "&y=&plot=full&apikey=trilogy";


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
      var movieUrl = response.Poster;
      $("#movieModalLongTitle").text(recTitle);
      $("#modal-plot").html("<strong>Summary:</strong> " + plot);
      $("#modal-actors").html("<strong>Cast:</strong> " + actors);
      $("#modal-image").html("<img src=" + movieUrl + "></img>");

      // get rating number, convert it to a five star rating
      // loop and make stars colored relative to the rating (round the ratings)

      $("#modal-rated").html("<strong>Rated:</strong> " + rating);
      $("#modal-released").html("<strong>Release Date:</strong> " + released);

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

  // clear search results button

  $("#clear").on("click", function() {
    $("#dropdown").empty();
    $(".dynamic").remove();
  });

  // fix modal styling

  
    
  
})