// Project 2
// Visual Frameworks 
// By Juan J Guzman

window.addEventListener("DOMContenLoaded", function(){

	// getElementById function
	
	function $(x){
		var theElement = document.getElementById(x);
		return theElement	
	}	
	
	//Populate field options for lead source
	
	function makeSourceOpt(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('leadSource'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "leadSources");
		for (var i=0, j=sources.length; i<j; i++){
			var makeOpt = document.createElement('option');
			var optText = sources[i];
			makeOpt.setAttribute("value", optText);
			makeOpt.innerHTML = optText;
			makeSelect.appendChild(makeOpt);
		}
		selectLi.appendChild(makeSelect);			
	}
	
	// Find the selected Radio and return value
	
	function getSelectedRadio(){
		var radios = document.forms(0).preference;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				preferencevalue = radios[i].value;	
			}
		}
	}
	
	function scheduledLeads(){
		var id 				= Math.floor(Math.random()*100000001);
			getSelectedRadio();
		var item			= {};
			item.fname			= ["First Name", $('fname').value];
			item.lname			= ["Last Name", $('lname').value];
			item.contactNum		= ["Contact Number", $('contactNum').value];
			item.contactType	= ["Contact Type", $('contactType').value];
			item.date			= ["Date", $('date').value];
			item.time 			= ["Preferred Time", timeValue];
			item.interest		= ["Interest Level", $('interestLevel')];
			item.leadSource		= ["Lead Source", $('leadSources')];
			item.comments		= ["Comments", $('comments')];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Callback Scheduled")
	}
	
	var sources = ["--Select Lead Source--", "Walk-In", "Referral", "Response to Ad", "Cold Call"],
		preferencevalue
		;
	makeSourceOpt();
	
	var displayAll = $('displayAll');
	displayAll.addEventListener("click", getData);
	var clearData = $('clearData');
	clearData.addEventListener("click", clearData);
	var scheduleButton = $('submit');
	scheduleButton.addEventListener("click", scheduledLeads);
	
	
	
	
	
	
	
	
	
	
});