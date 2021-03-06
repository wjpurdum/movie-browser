// API Docs at:
// http://www.omdbapi.com
// "http://www.omdbapi.com/?"



$("#submit").on("click", (event) => {
   event.preventDefault();
  // Make sure to add your API key to the URL!
  $("#movie-select").css('display', 'block')
  var search = $("#user-input").val()
  var url = "http://www.omdbapi.com/?s=" + escape(search)

  console.log(url)

  $.ajax({
    url: url,
    type: "get",
    dataType: "json"
  }).done((response) => {
    var titles = []
    $("#movie-select").empty()
      $("#movie-select").append("<option>" + "Movies matching " + search + "</option>")
    data = response.Search
    console.log(data)

    function getTitle() {
      for (var i = 0; i < data.length; i++) {
        var newTitle = data[i].Title
        // titles.push(newTitle)
        $("#movie-select").append("<option>" + newTitle + "</option>")
      }
      // console.log (titles)
    }
    // console.log(response.Search[0].Title)
    getTitle()

    $("#movie-select").change(function(){
      $("#photo").html("")
      var selectedTitle = $("#movie-select").find(":selected").html();
      console.log(selectedTitle)
      for (var i = 0; i < data.length; i++) {
        if (selectedTitle === data[i].Title) {
          $("#title").html(data[i].Title)
          $("#photo").append("<img src=" + data[i].Poster + ">")
        }
      }
    })

  }).fail((message) => {
    console.log("Ajax request fails!")
    console.log(message)
  }).always(() => {
    console.log("This always happens regardless of successful ajax request or not.")
  })
})
