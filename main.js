// DOCTYPE html
// Project: Web App Part 2
// Rami Hollingsworth
// Term 0112



// Wait until DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
// Create select field element and populate with options.    makeCats	
	function makeCats(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id","groups");
		for(var i=0, j=contactGroups.length; i<j; i++){
			var makeOption = document.createElement("option");
			var optText = contactGroups[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	//Find value of selected radio button.
	function getSelectRadio(){
		var radios = document.forms[0].toe;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
			toeValue = radios[i].value;
			}
		}
	}
	function storeData(){
		var id			= Math.floor(Math.random()*1000000007);
		//Gather up all our form field values and store in an object.
		//Object properties contain array with the form label and input value.
		getSelectRadio();
		var item 			={};
			item.group		=["Group:", $("groups").value];
			item.ename		=["Name of Electronic:", $("name").value];
			item.purchase	=["Purchase Date:", $("purchased").value];
			item.rating		=["Rate it on a scale of 1 to 5:", $("rating").value];
			item.toe		=["Type of Electronic:", toeValue];
			item.notes		=["Notes:", $("notes").value];
			
		//Save data into Local Storage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Item Saved :]");
		}
//Variable Defaults	
	var contactGroups = ["---Do I own this Item---", "Own","Owned", "Want"],
		toeValue
	;
	makeCats();
	
	/*Set Link and Submit Click Events	
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);*/
	var save = $("submit");
	save.addEventListener("click", storeData);
});
