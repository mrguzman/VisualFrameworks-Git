// Project 2
// Visual Frameworks 
// By Juan J Guzman

window.addEventListener("DOMContenLoaded", function(){

	function $(x){
		var theElement = document.getElementById(x);
		return theElement	
	}	
	
	
	function makeSourceOpt(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('leadSource'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "leadSources");
		for (var i=0, j=sources.length; i<j; i++){
			
		}			
	}
	
	
	var sources = ["--Select Lead Source--", "Walk-In", "Referral", "Response to Ad", "Cold Call"];
	
	
	var displayAll = $('displayAll');
	displayAll.addEventListener("click", getData);
	var clearData = $('clearData');
	clearData.addEventListener("click", clearData);
	var scheduleButton = $('submit');
	scheduleButton.addEventListener("click", scheduleLead);
	
	
	
	
	
	
	
	
});