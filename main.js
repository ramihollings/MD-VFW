// DOCTYPE html
// Project: Web App Part 2
// Rami Hollingsworth
// Term 0112

window.addEventListener("DOMContentLoaded", function(){
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	var displayLink = $("displayLink");
	displayLink.addEventLister("click", getData);
	var clearLink = $("clear");
	clearLink.addEventLister("click", clearLocal);
	var save = $("submit");
	save.addEventLister("click, saveData);

});