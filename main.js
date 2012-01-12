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
	
	function toggleControls(n){
		switch(n){
			case "on":
				$("contactForm").style.display = "none";
				$("clear").style.display = "inline";
				$("display").style.display = "none";
				$("addNewItem").style.display = "inline";
				
				break;
			case "off":
				$("contactForm").style.display = "block";
				$("clear").style.display = "inline";
				$("display").style.display = "inline";
				$("addNewItem").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
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
		
	function getData(){
			toggleControls();
			if(localStorage.length ===0){
				alert("No data Stored"):
			}		
			var makeDiv = document.createElement("div");
			makeDiv.setAttribute("id", "items");
			var makeList = document.createElement("ul");
			makeDiv.appendChild(makeList);
			document.body.appendChild(makeDiv);
			$("items").style.display = "block";
			for(var i=0, len=localStorage.length; i<len;i++){
				var makeli = document.createElement("li");
				makeList.appendChild(makeli);
				var key= localStorage.key(i);
				var value = localStorage.getItem(key);
				var obj = JSON.parse(value);
				var makeSubList = document.createElement("ul");
				makeli.appendChild(makeSubList);
				for(var n in obj){
					var makeSubli = document.createElement("li");
					makeSubList.appendChild(makeSubli);
					var optSubText = obj[n][0]+" "+obj[n][1];
					makeSubli.innerHTML = optSubText;
			}
		}
	}
	function clearLocal(){
		if(localStorage.length ===0){
			alert("Database Empty.")
		}else{
			localStorage.clear();
			alert("All data deleted");
				window.location.reload();
				return false;
		}
	};	
//Variable Defaults	
	var contactGroups = ["---Do I own this Item---", "Own","Owned", "Want"],
		toeValue;
	makeCats();
	
	//Set Link and Submit Click Events		
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var save = $("submit");
	save.addEventListener("click", storeData);
});

