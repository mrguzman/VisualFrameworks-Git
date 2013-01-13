// Visual Frame Works
// Junuary 2013
// Project 2
// By Juan J Guzman


window.addEventListener("DOMContentLoaded", function(){
	
	//Function to help return HTML elements by their ID
	
	function $(x){
		var htmlID = document.getElementById(x);
		return htmlID;
	}
	
	
	
	// Controls to display and clear all leads
	
/*	var displayAll = $('displayAll');
	displayAll.addEventListener("click", getData);
	var clearAll = $('clearLeads');
	clearAll.addEventListener("click", clearData);  */
	var saveButton = $('submit');
	saveButton.addEventListener("click", saveLead);
	
	
	
	//Dynamic dropdown for "Select Lead Source"
	
	function createDropdown(){
		var grabTag = document.getElementsByTagName("form"),
		grabLi = $('leadSource'),
		createSelect = document.createElement('select');
		createSelect.setAttribute("id", "leadSources");
		for (var i=0, j = sources.length; i<j; i++){
			var createOpt = document.createElement('option');
			var optText = sources[i];
			createOpt.setAttribute("value", optText);
			createOpt.innerHTML = optText;
			createSelect.appendChild(createOpt)
		}
		grabLi.appendChild(createSelect);
	}
	
	
	//Array to contain dropdown options.
	
	var sources = ["--Select Lead Source--", "Walk-In", "Referral", "Response to Ad", "Cold Call"],
					timeValue;
	
	
	//Save info to local storage
	
	
	function saveLead(){
		var id = Math.floor(Math.random()*1000000001);
		getRadio();
		var item = {};
			item.fname = ["First Name:", $('fname').value];
			item.lname = ["Last Name:", $('lname').value];
			item.contactNum = ["Contact Number:", $('contactNum').value];
			item.contactType = ["Contact Type:", $('contactType').value];
			item.date = ["Scheduled Date:", $('date').value];
			item.timeOfDay = ["Preferred Time:", timeValue];
			item.interestLevel = ["Interest Level", $('interestLevel').value];
			item.leadSource = ["Lead Source:", $('leadSource').value];
			item.comments = ["Comments:", $('comments').value];
			localStorage.setItem(id, JSON.stringify(item));
			
			alert("Callback Scheduled");
		
	} 
	
	
	// Selected Radio button
	
	
	function getRadio(){
		var radios = document.forms[0].timeOfDay;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				timeValue = radios[i].value;
			}
		}
	}
	
	
	
	
});