//Enter Search term to find recommended movies
// hit button or press enter to search
// ajax call for to tastedive api
// return object of movie recs
//use movie rec title to call omdb for movie information
//write posters and titles of movies to page
//on click of poster pull modal
//write movie info from omdb to modal/ ratings movie clip





// api test

var apiKey = "320659-MovieRec-EQXEO1T6";
var input = "nightcrawler";
var url = "https://tastedive.com/api/similar?q=" + input + "&k=" + apiKey;

var corsUrl = "http://cos-anywhere.herokuapp.com/" + url

$.ajax({
  url: url,
  method: "GET"
}).then(function(response) {
  console.log(response);
})