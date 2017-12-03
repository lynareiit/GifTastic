// $(document).ready(function() {
// 	console.log("hello")

var animals = ["kitty", "peacock", "lion", "penguins"];

	// Initial array of animals
	//var animals = ["kitty", "peacock", "lion", "penguins"];

	// Create a function to display the animal buttons
function renderButtons(arrayToUse, classToAdd, areaToAddTo) {
	// eliminate repeating buttons, empty the div
	$(areaToAddTo).empty();
	// Loop through the array of animals
	for (var i = 0; i < animals.length; i++) {

		// generate buttons for each animal pulled from the array
		// This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
		var a = $("<button>");
		// add a class
		a.addClass(classToAdd);
		// add a data attribute with a value of the movie
		a.attr("data-type", animals[i]);
		// button's text assigned to the value of the movie
		a.text(animals[i]);
		// add a button to the html
		$(areaToAddTo).append(a);
	}
}
// An event listener for all my button elements
$(document).ready(function() {
	console.log("hello");
	renderButtons(animals, "animal-button", "#animal-buttons");
});

$(document).on("click", ".animal-button", function(event) {

	console.log("yay im a button");
	$("#animals").empty()
	$(".animal-button").removeClass("active");
	$(this).addClass("active");

	var type = $(this).attr("data-type")

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=UXKXmLtlI5jSCW3jbkeBLCtlgn43LPWR";
	// "this" refers to button clicked above
	// use queryURL to search for Giphy associated with animal name
// ******STILL CONFUSED HOW TO PULL AN API FROM A SITE*******		

	// use the get method to pull the giphy url using ajax
	$.ajax({
		url: queryURL,
		method: "GET"
	})
	// After the data comes from the API
	.done(function(response) {
		var results = response.data;
		console.log(results);
		console.log("I am results hear me roar", results[0].images.fixed_height_still.url);
	// sore the image_original_url and assign to a variable
		for (var i = 0; i < results.length; i++) {
		var animalDiv = $("<div class=\"animal-item\">")

		var rating = results[i].rating;

		var imageURL = results[i].images.fixed_height_still.url;

		// assign an animal image, an image tag
		var animalImage = $("<img>");

		// set up image src url for the image
		animalImage.attr("src", imageURL);
		// set up the image alt alternative text for the image
		animalImage.attr("alt", "animal image");

		// When I add these click handlers...the GIFs don't appear anymore...
		// animalImage.attr("data-still");

		// animalImage.attr("data-animate");

		// animalImage.attr("data-state");


		//TODO: create still, state and animate attr for images, add class, append to animal div
		$("#animals").append(animalImage);
		}

	});
});

$("#add-animal").on("click", function () {
		event.preventDefault();
		
		var newAnimal = $("#animal-input").val().trim();
		//console.log("111");
		//if (newAnimal.length > 2) {
			console.log(newAnimal);
			animals.push(newAnimal);
		//}
		renderButtons(animals, "animal-button", "#animal-buttons");
});

    $(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
