var tags = [];


// Pops tag buttons into the tag cloud
function popButtons() {      
    $(".buttonHolder").empty();    
        for (var i = 0; i < tags.length; i++) {
              var pop = $("<button type='button' class='btn btn-success'>");
              pop.addClass("tags");
              pop.attr("data-name", tags[i]);
               pop.text(tags[i]);
              $(".buttonHolder").append(pop);
            }
          };

// Uses on click to capture user info and push input to array. Then runs button generator.
$("#gifMe").on("click", function(event) {
    event.preventDefault();
            var tag = $("#tagInput").val().trim();
            tags.push(tag);
            popButtons();
          });
 // gifMe function adds data search info onto page
    function gifMe() {
    
            var tag = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tag + "&api_key=dc6zaTOxFJmzC&limit=10";
    
            // Creating AJAX call for the specific  being clicked
            $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
             
                var giphy = response.data;
            
                
            for (var i = 0; i<giphy.length; i++){
              // Creating a div to hold the gifs
              var gifsDiv = $("<div class= 'gifsDiv'>");
              
              // Storing rating data
              var rating = giphy[i].rating;
              var p1 = $("<p>").text("Rating: " + rating);
    
              // Displays rating
              gifsDiv.append(p1);
            // Grabbing still image
              var stillURL = giphy[i].images.fixed_height_still.url;
              var animatedURL = giphy[i].images.fixed_height.url;
            
              // creating img tag  and setting state class and source for still
              var gif = $("<img class='gif' state='still' src='" + stillURL + "'/>");
                $(gif).attr("stillURL", stillURL);
                $(gif).attr("animatedURL", animatedURL);
              // Displaying the gif
              gifsDiv.append(gif);
             
              $(".gifWrap").prepend(gifsDiv);
            }
            })
    
          };
          function toggle(){
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("state");
            // If the clicked image's state is still, update to animate
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("animatedURL"));
              $(this).attr("state", "animated");
            } else {
              $(this).attr("src", $(this).attr("stillURL"));
              $(this).attr("state", "still");
            }
        }
        
// Allows all buttons with class tags to be clicked to display gifs.
$(document).on("click", ".tags", gifMe);
// 
$(document).on("click", ".gif", toggle);


