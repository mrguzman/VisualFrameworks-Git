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
	clearAll.addEventListener("click", clearData);
	var saveButton = $('submit');*/
	saveButton.addEventListener("click", saveLead);
	
	
	
	//Save info to local storage
	
	
	function saveLead(){
		var id = math.floor(Math.random()*1000000001);
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