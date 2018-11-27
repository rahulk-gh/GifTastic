var animals = ["dog", "cat", "bear", "rat", "bat", "turtle", "gerbil", "crab"];

//jquery that prevents partial load functionality

$(document).ready(function(){

    //function to make and add buttons
    var createButton= function (arrayToUse, classToAdd, areaToAddTo){
        //empties div for rerendering
        $(areaToAddTo).empty();

        for( var i = 0; i<arrayToUse.length; i++){
            var x = $("<button>");
            x.addClass(classToAdd);
            x.attr("data-type",arrayToUse[i]);
            x.text(arrayToUse[i]);
            $(areaToAddTo).append(x);
        }
    }
        //button to generate API call and  functionality to make button active   
    $(document).on("click",".animal-button", function(){
        $("#animals").empty();
        $(".animal-button").removeClass("active");
        $(this).addClass("active");
    
        var type = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=06N8MESmuljlKBWmOER8WaGS8IX2FRFZ&limit=9";
    
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
    
            for (var i = 0; i < results.length; i++) {
              var animalDiv = $("<div class=\"animal-item\">");
    
              var rating = results[i].rating;
    
              var p = $("<p>").text("Rating: " + rating);
    
              var animated = results[i].images.fixed_height.url;
              var still = results[i].images.fixed_height_still.url;
    
              var animalImage = $("<img>");
              animalImage.attr("src", still);
              animalImage.attr("data-still", still);
              animalImage.attr("data-animate", animated);
              animalImage.attr("data-state", "still");
              animalImage.addClass("animal-image");
    
              animalDiv.append(p);
              animalDiv.append(animalImage);
    
              $("#animals").append(animalDiv);
            }
          });
    });
    //animate function
    $(document).on("click", ".animal-image", function() {

        var state = $(this).attr("data-state");
    
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        var newAnimal = $("input").eq(0).val();
    
        if (newAnimal.length > 2) {
          animals.push(newAnimal);
        }
    
        createButton(animals, "animal-button", "#animal-buttons");
    
      });
    
      createButton(animals, "animal-button", "#animal-buttons");



});