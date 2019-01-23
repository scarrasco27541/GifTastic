  
	var giphyKey = "m8W4kJQ7eeJWY6hmo636zLKNw0BIJOZF";
  
	var animals = [
		{
			"name":"cat",
		}
		,
		{
			"name":"dog",
		}
		,
		{
			"name":"pig",
		}
		,
		{
			"name":"goat",
		}
		,
		{
			"name":"sheep",
		}
		,
		{
			"name":"horse",
		}
		,
		{
			"name":"squirrel",
		}
	];
	//Imput new animal name//
	$("#add-animal").on("click", function(event) {
		console.log("click");
		event.preventDefault();
		
		// This line grabs the input from the textbox
		var name = $("#animal-input").val().trim();
		
		var newAnimal = {
			"name":name
		};
		//  The new animal from the textbox is then added to our array
		animals.push(newAnimal);
		renderButtons();
	});
	
	function clickedButton() {
		var animal = $(this).attr("data-animal");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key="+giphyKey+"&limit=10&rating=pg-13";
		$("#images").empty();
		// Run an ajax call that then runs processGiphyResults on whatever results are returned
		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(processGiphyResults);
	};
	
	function toggleAnimation() {
	  var state = $(this).attr("data-state");
	  if (state=="still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	  } else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	  }
	}	
	
	function processGiphyResults(response) {
		console.log(response);
		var results = response.data;
		console.log(results);
		results.forEach(function(result) {
			var url_still = result.images.fixed_height_still.url;
			var url_animated = result.images.fixed_height.url;
			var container = $("<div>").addClass("giphyImage");
			
			// Create an image
			var img = $("<img>");
			img.attr("src", url_still);
			img.attr("data-still", url_still);
			img.attr("data-animate", url_animated);
			img.attr("data-state", "still");
			$(container).append(img);
			// Add it to the container
			img.on("click", toggleAnimation);
			
			// Create a paragraph for the rating
			var p = $("<p>").text("Rating: " + result.rating);
			// Add it to the container
			$(container).append(p);
			
			$("#images").append(container);
			
		}) 
	}
	
	function clickedButton() {
		var animal = $(this).attr("data-animal");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key="+giphyKey+"&limit=10&rating=pg-13";
		$("#images").empty();
		// Run an ajax call that then runs processGiphyResults on whatever results are returned
		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(processGiphyResults);
	}

	function renderButtons() {
		$("#animal-buttons").empty();
		animals.forEach(function(animal) {
			var btn = $("<button>");
			btn.text(animal.name);
			btn.attr("data-animal", animal.name);
			// Add the clickedButton function to each button here:
			btn.on("click", clickedButton);
			$("#animal-buttons").append(btn);
		});
	}
	//Calling the renderButtons function to display the intial buttons
	renderButtons();
	
  
  