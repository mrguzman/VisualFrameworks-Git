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

	
	
//Dynamic dropdown for "Select Lead Source"
	
	function createDropdown(){
		var grabTag = document.getElementsByTagName("form"),	//Targets <form></form> tag in additem.html
		grabLi = $('leadSource'),								//Targets and grabs <li><label for="leadSource" id="leadSource">Select Lead Source:</label></li>
		createSelect = document.createElement('select');		//Creates <select></select> tags within <li></li>
		createSelect.setAttribute("id", "leadtypes");				//Adds id="sources" to <select></select> (<select id="leadTypes"></select>)
		for (var i=0, j = leadType.length; i<j; i++){			//Loops through "var = sources" and retrieves items in array
			var createOpt = document.createElement('option');	//Creates <option></option> tag for each item in array
			var optText = leadType[i];														
			createOpt.setAttribute("value", optText);			//Adds value="" for each <option></option> tag (<option value="walkIn">Walk-In</option>)
			createOpt.innerHTML = optText;
			createSelect.appendChild(createOpt)
		}
		grabLi.appendChild(createSelect);
	}
	
	
	
//Array to contain dropdown options.
	
	var leadType = ["--Select Lead Source--", "Walk-In", "Referral", "Response to Ad", "Cold Call"],
					timeValue;
					
					createDropdown();
					

//Save info to local storage
	
	
		var saveButton = $('submit');
	saveButton.addEventListener("click", saveLead);

	// Selected Radio button function to get value and save to local storage
	
	function getRadio(){
		var radios = document.forms[0].timeOfDay;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				timeValue = radios[i].value;
			}
		}
	}
	
	// Local Storage save function
	
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
	
	

	
	
	
});