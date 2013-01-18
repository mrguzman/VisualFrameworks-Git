// Visual Frame Works
// Junuary 2013
// Project 3
// By Juan J Guzman


window.addEventListener("DOMContentLoaded", function(){
	
//Function to help return HTML elements by their ID
	
	function $(x){
		var htmlID = document.getElementById(x);
		return htmlID;
	}

	
	
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

	// Selected button function to get value and save to local storage
	
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
			item.leadSource = ["Lead Source:", $('leadtypes').value];
			item.comments = ["Comments:", $('comments').value];
			localStorage.setItem(id, JSON.stringify(item));
			
			alert("Callback Scheduled");
		
	} 	
	
	
	// Toggle controls to dynamically change how data is displayed to user

	
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
	
	
	
	//Display saved data to user when "Display All Current Leads" link is clicked.
	
	var displayAll = $('displayAll');
	displayAll.addEventListener("click", getData);
	
	
	function getData(){
		toggleControls('on');
		if (localStorage.length === 0){
			alert("No Leads Currently Scheduled");			//If user clicks link but no leads are scheduled an alert displays "No Leads Currently Scheduled
		}
		var createDiv = document.createElement('div');		//Creates UL to dipslay data as a list item
		createDiv.setAttribute('id', 'items');
		var createUl = document.createElement('ul');
		createDiv.appendChild(createUl);
		document.body.appendChild(createDiv);
		$('items').style.display = "block";
		for (var i=0, len=localStorage.length; i<len; i++){		//Loops through key in local storage.
			var createLi = document.createElement('li');
			var linksLi = document.createElement('li'); 
			createUl.appendChild(createLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			createLi.appendChild(makeSubList);
			for (var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
		}

	}
	
	//Clear All Data in storage.
	
	var clearAll = $('clearLeads');
	clearAll.addEventListener("click", clearData);
	
	
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
		
/*
		
	//Sort UL list....at least that is what I was trying to do.
	
		//Create Sort button when users selects "Display Leads"
		
		function sortLeadsButton(linksLi){
			var createSort = document.createElement('input');
			createSort.setAttribute("type", "button");
		}
	
	function sortList(ul, sortDescending) {
	  if(typeof ul == 'string'){
	    	ul = document.getElementById(ul);
	   
		  
	  // Get the list items and setup an array for sorting
	  
	  var lis = ul.getElementsByTagName('li');
	  var vals = [];
	
	  // Populate the array
	  
	  for(var i = 0, l = lis.length; i < l; i++)
	    vals.push(lis[i].innerHTML);
	
	  // Sort it
	  
	  vals.sort();
	
	  // Descending
	  
	  if(sortDescending){
	    	vals.reverse();
	    	
	    	}
	
	  // Change the list on the page
	  
	  for(var i = 0, l = lis.length; i < l; i++){
	    lis[i].innerHTML = vals[i];
	    }
	
	
	// sortList();
	
	

	*/
	
	
});