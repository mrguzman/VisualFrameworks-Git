// Project 2
// Visual Frameworks 
// By Juan J Guzman

window.addEventListener("DOMContentLoaded", function(){
	// getElementById function
	
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;	
	}	
	
			
	//Populate field options for lead sources
	function makeSourceOpt(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('leadSource'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "leadSources");
		for (var i=0, j = sources.length; i<j; i++){
			var makeOpt = document.createElement('option');
			var optText = sources[i];
			makeOpt.setAttribute("value", optText);
			makeOpt.innerHTML = optText;
			makeSelect.appendChild(makeOpt)
		}
		selectLi.appendChild(makeSelect);			
	}


	// Find the selected Radio and return value
	
	function getSelectedRadio(){
		var radios = document.forms[0].preference;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				var timeValue = radios[i].value;	
			}
		}
	}
	
	//Add Toggle Controls
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('scheduleForm').style.display = "none";
				$('clearLeads').style.display = "inline";
				$('displayAll').style.display = "none";
				$('newLead').style.display = "inline";
				break;
			case "off":
				$('scheduleForm').style.display = "block";
				$('clearLeads').style.display = "inline";
				$('displayAll').style.display = "inline";
				$('newLead').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	// Save to Local Storage (Something is broken here)
	
	function saveLeads(key){
		if(!key){
			var id = Math.floor(Math.random()*100000001);
		}else{
			var id = key;
		}
		getSelectedRadio();
		var item				= {};
			item.fname			= ["First Name:", $('fname').value];
			item.lname			= ["Last Name:", $('lname').value];
			item.contactNum		= ["Contact Number:", $('contactNum').value];
			item.contactType	= ["Contact Type:", $('contactType').value];
			item.date			= ["Date:", $('date').value];
			item.time 			= ["Preferred Time:", timeValue];
			item.interest		= ["Interest Level:", $('interestLevel').value];
			item.leadSource		= ["Lead Source:", $('leadSources').value];
			item.comments		= ["Comments:", $('comments').value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Callback Scheduled");
	}
		
	
	// Get Data to write on browser and display to user.
	
	function getData(){
		toggleControls("on");
		if (localStorage.length === 0){
			alert("No Leads Are Currently Scheduled. Default Test Added");
			autoFill();
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for (var i=0, len=localStorage.length; i<len; i++){
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li'); 
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			getImage(obj.sources[1], makeSubList);
			for (var n in obj){
				var makeSubLi = document.createElement('li');
				makeSublist.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); 
		}

	}
	
	
/*	//Category image function
	
	function getImage(leadImage, makeSubLi){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement('img');
		var setSrc = newImage.setAttribute("src", "image/"+ leadImage +".png");
		imageLi.appendChild(newImage);
	}
	
	*/
	
	//Auto Load default test callbacks
	
	function autoFill (){
		for (var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	
	//Make Item links function. Create edit/delete for each item in local storage.
	
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Callback";
		editLink.addEventListener("click", editLead);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Callback";
		deleteLink.addEventListener("click", deleteLead);
		deleteLink.innerHTML = deleteText;
		deleteLink.appendChild(deleteLink);
		
	}
	
	function editLead(){
		//Grab data from Local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//unhide Form
		toggleControls("off");
		
		//populate form with value 
		$('fname').value = item.fname[1];
		$('lname').value = item.lname[1];
		$('contactNum').value = item.contactNum[1];
		$('contactType').value = item.contactType[1];
		$('date').value = item.date[1];
		var radios = document.forms[0].preference;
		for (var i=0 ; i<radios.length; i++){
			if (radios[i].value == "Morning" && item.preference[1] == "Morning") {
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value =="Afternoon" && item.preference[1] == "Afternoon"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Evening" && item.preference[1] == "Evening"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Anytime" && item.preference[1] == "Anytime"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		$('interestLevel').value = item.interestLevel[1];
		$('leadSources').value = item.leadSources[1];
		$('comments').value = item.comments[1];
		
		//Remove Listener from "Schedule Callback" button
		
		scheduleButton.removeEventListener("click", saveLeads);
		
		//Change "Schedule Callback" to "Edit Callback"
		
		$('submit').value = "Edit Callback";
		var editScheduleButton = $('submit');
		editScheduleButton.addEventListener("click", validate);
		editScheduleButton.key = this.key;
		 

	} 
	
	
	function deleteLead(){
		var confirmDel = confirm("Are you sure you wish to delete Callback?");
		if (ask){
			localStorage.removeItem(this.key);
			window.location.reload();
			alert("Callback Deleted"); 
		}else{
			alert("Delete Cancelled");
		}
	}
	
	function clearData(){
		if(localStorage.length === 0){
			alert("No Leads Are Currently Scheduled");
		}else {
			localStorage.clear();
				alert("All Leads Are Deleted");
				window.location.reload();
				return false;
		}
	}
	
	
	//Validate information before allowing user to proceed.
	
	function validate(e){
		var getFname = $('fname');
		var getLname = $('lname');
		var getNum = $('contactNum');
		
		//reset messages
		errMessage.innerHTML = "";
		getFname.style.border ="1px solid black";
		getLname.style.border ="1px solid black";
		getNum.style.border ="1px solid black";
			
		//Get Error message
		var messageAry = [];
		
		//Validate First Name
		if (getFname.value === ""){
			var fNameError = "Please Enter A First Name";
			getFname.style.border ="1px solid red";
			messageAry.push(fNameError);
		}
		//Validate last Name
			if (getLname.value === ""){
			var lNameError = "Please Enter A Last Name";
			getLname.style.border ="1px solid red";
			messageAry.push(lNameError);
		}
		//Validate Contact Number
			if (getNum.value === ""){
			var numError = "Please Enter A Contact Number";
			getNum.style.border ="1px solid red";
			messageAry.push(numError);
		}
		
		//Display Errors, create <li> html
		if (messageAry.length >=  1){
			for (var i=0, j=messageAry.length; i < j; i++){
				var text = document.createElement('li');
				text.innerHTML = messageAry[i];
				errMessage.appendChild(text);
			}
			e.preventDafault();
			return false;
		}else{
			saveLeads(this.key);
		}
		
	}
	
	// Variables
 
	var sources = ["--Select Lead Source--", "Walk-In", "Referral", "Response to Ad", "Cold Call"],
		timevalue,
		errMessage = $('errors');
	
	makeSourceOpt();
	
	//Navigation controls and links
	
	var displayAll = $('displayAll');
	displayAll.addEventListener("click", getData);
	var clearLeads = $('clearLeads');
	clearLeads.addEventListener("click", clearData);
	var scheduleButton = $('submit');
	scheduleButton.addEventListener("click", validate);

	
});