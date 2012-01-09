// DOCTYPE html
// Project: Web App Part 2
// Rami Hollingsworth
// Term 0112

window.addEventListener("DOMContentLoaded", function(){
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	function selectOwnership(){
		var formTag = document.getElementsByTagName("form"),
			selectListItem = $("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id","groups");
		for(var i=0, j=ownTypes.length; i<j; i++){
			var makeOption = document.createElement("option");
			var optText = ownTypes[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectListItem.appendChild(makeSelect);
		
	}
	
	var ownTypes = ["---Do I own this Item---", "Own","Owned", "Want"];
	selectOwnership();
	/*
	
	var displayLink = $("displayLink");
	displayLink.addEventLister("click", getData);
	var clearLink = $("clear");
	clearLink.addEventLister("click", clearLocal);
	var save = $("submit");
	save.addEventLister("click, saveData");
*/
});
