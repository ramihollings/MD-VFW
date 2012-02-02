// DOCTYPE html
// Project: Web App Part 4
// Rami Hollingsworth
// Term 0112

// Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){

	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	//Create select field element and populate with options.
	function makeCats(){
		var formTag = document.getElementsByTagName("form"),// formtag is an array of all the form tags.
			selectLi = $("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "groups");
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
	function getSelectedRadio(){
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
			$("displayLink").style.display = "none";
			$("addNewItem").style.display = "inline";

			break;
				case "off":
			$("contactForm").style.display = "block";
			$("clear").style.display = "inline";
			$("displayLink").style.display = "inline";
			$("addNewItem").style.display = "none";
			$("items").style.display = "none";
			break;
				default:
			return false;
		}
	}

	function storeData(key){
		if(!key){
			var id 			= Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
		//gather all form fiel values an store in an objects
		//Object proprties contain array with the form label
		getSelectedRadio();
		var item 			= {};
			item.group		= ["Group:", $("groups").value];
			item.name  		= ["Name:", $("name").value];
			item.purchased	= ["Purchase Date:", $("purchased").value];
			item.rating		= ["Rating:", $("rating").value];
			item.toe 		= ["Type of Electronic:", toeValue];
			item.notes		= ["Notes:", $("notes").value];
		//Save data into localstorage: using Stringify to convert object to string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Item Saved!");
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("No data Stored. Default data added.");
			autoFillData();
		}
		//write data from loacal storage to the browser.
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "display";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli 	= document.createElement("li");
			var linksLi = document.createElement("li")
			makeList.appendChild(makeli);
			var key 	= localStorage.key(i);
			var value 	= localStorage.getItem(key);
			//Convert the String from Local Storage value back to an object by using JSON
			var obj 	= JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeli.appendChild(makeSubList);
			getImage(obj.group[1], makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}	
			makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete links for each item in local storage.
		}
	}
	
	//Get image for right catagory
	function getImage(imeName, makeSubList){
	 var imageLi = document.createElement("li")
	 makeSubList.appendChild(imageLi);
	 var newImg = document.createElement("img");
	 var setSrc = newImg.setAttribute("src", "images/"+ imeName + ".png");
	 imageLi.appendChild(newImg);
	}
	//Auto Populate local storage.
	function autoFillData(){
		//The actual JSON Object data required for this to work is coming from our json.js file, which is loaded from our HTML page.
		// Store JSON object into local storage
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
			
		}
	}
	

	//Make Items Links
	//Create the edit and delete links for each stored item when displayed.
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Item";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
	//add delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Item";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}

		
	function editItem(){
		//Grab the data from our item from local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//show the form
		toggleControls("off");
		
		//populate the form fields with current localStorage values.
		$("groups").value 	 = item.group[1];
		$("name").value   	 = item.name[1];
		$("purchased").value = item.purchased[1];
		$("rating").value 	 = item.rating[1];
		var radios = document.forms[0].toe;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Phone" && item.toe[1] == "Phone"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Other" && item.toe[1] == "Other"){
				radios[i].setAttribute("checked","checked");
			}
		}
		
		$("notes").value = item.notes[1];
		
		save.removeEventListener("click", storeData);
		$("submit").value = "Edit Item";
		var editSubmit = $("submit");
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
		
		
	}
	function deleteItem(){
		var ask = confirm("Do you want to delete this item. This can not be undone.");
			if(ask){
				localStorage.removeItem(this.key);
				alert("Item Deleted");
				window.location.reload();
			}else{
				alert("Item Deleted");
			}
		
	}
		
	function clearLocal(){
		if(localStorage.length === 0){
			alert("Database Empty.");
		}else{
			localStorage.clear();
			alert("All data deleted");
			window.location.reload();
			return false;
		}
	}
	function validate(e){
		var getGroup = $("groups");
		var getName  = $("name");
		
		
		
		errMsg.innerHTML = "";
			getGroup.style.border = "1px solid black";
			getName.style.border = "1px solid black";
		
		var messageA = [];
		if (getGroup.value === "---Do I own this Item---"){
			var groupError = "Please pick a group.";
			getGroup.style.border = "1px solid red";
			messageA.push(groupError);
		}
		
		if (getName.value === ""){
			var nameError = "Please put in name for DataBase.";
			getName.style.border = "1px solid red";
			messageA.push(nameError);
		}
		
		//If there were errors, display them on the screen.
		if (messageA.length >=1){
			for(var i=0, j=messageA.length; i<j; i++){
				var txt = document.createElement("li");
				txt.innerHTML = messageA[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			storeData(this.key);
		}		
	}

	//Variable defaults
	var contactGroups = ["---Do I own this Item---", "Own","Owned", "Want"],
		toeValue,
		errMsg = $("errors");
	makeCats();

	//Set Links & Submit Click Events
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var save = $("submit");
	save.addEventListener("click", storeData);
});