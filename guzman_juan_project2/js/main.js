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
	
	var displayAll = $('displayAll');
	displayAll.addEventListener("click", getData);
	var clearAll = $('clearLeads');
	clearAll.addEventListener("click", clearData);
	var saveButton = $('submit');
	saveButton.addEventListener("click", saveLead); 
	
	
	
	
	
	
});