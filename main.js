// DOCTYPE html
// Project: Web App Part 3
// Rami Hollingsworth
// Term 0112


window.addEventListener("DOMContentLoaded", function(){
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	function selectBn(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id","groups");
		for(var i=0, j=dropAddToGroups.length; i<j; i++){
			var makeOption = document.createElement("option");
			var optText = dropAddToGroups[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
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
		getSelectRadio();
		var item 			={};
			item.group		=["Group:", $("groups").value];
			item.ename		=["Name of Electronic:", $("name").value];
			item.purchase	=["Purchase Date:", $("purchased").value];
			item.rating		=["Rate it on a scale of 1 to 5:", $("rating").value];
			item.toe		=["Type of Electronic:", toeValue];
			item.notes		=["Notes:", $("notes").value];
			
		localStorage.setItem(id, JSON.stringify(item));
		alert("Item Saved :]");
	}	
	function getData(){
			toggleControls();
			if(localStorage.length ===0){
				alert("No data Stored");
			}		
			var makeDiv = document.createElement("div");
			makeDiv.setAttribute("id", "items");
			var makeList = document.createElement("ul");
			makeDiv.appendChild(makeList);
			document.body.appendChild(makeDiv);
			$("items").style.display = "block";
			for(var i=0, len=localStorage.length; i<len;i++){
				var makeli = document.createElement("li");
				var linksLi= document.createElement("li");
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
					makeSubli.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i),linksLi);
		}
	}
	
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Item";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Item";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		toggleControls("off");
		
		$("groups").value = item.group[1];
		$("name").value = item.name[1];
		$("purchased").value = item.purchased[1];
		$("rating").value = item.rating[1];
		var radios = document.forms[0].toe;
		for(var i =0; i<radios.length; i++){
			if(radios[i].value == "computer" && item.toe[1] == "computer"){
				radios[i].setAttribute("checked", "checked");
			}else if (radios[i].value == "tv" && item.toe[1] == "tv"){
				radios[i].setAttribute("checked", "checked");
			}else if (radios[i].value == "phone" && item.toe[1] == "phone"){
				radios[i].setAttribute("checked", "checked");
			}else if (radios[i].value == "other" && item.toe[1] == "other"){
				radios[i].setAttribute("checked", "checked");
			}	
		} 
		$("notes").value = item.notes[1];
		}
		//
	function clearLocal(){
		if(localStorage.length ===0){
			alert("Database Empty.");
		}else{
			localStorage.clear();
			alert("All data deleted");
				window.location.reload();
				return false;
		}
	};	
	var dropAddToGroups = ["---Do I own this Item---", "Own","Owned", "Want"],
		toeValue;
	selectBn();
	
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var dark = $("submit");
	dark.addEventListener("click", storeData);
});


