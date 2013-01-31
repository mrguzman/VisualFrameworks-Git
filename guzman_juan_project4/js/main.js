// Visual Frame Works
// Junuary 2013
// Project 4
// By Juan J Guzman


window.addEventListener("DOMContentLoaded", function(){
	
//Function to help return HTML elements by their ID
	
	function autoGet(x){
		var htmlID = document.getElementById(x);
		return htmlID;
	}

	
	
//Dynamic dropdown for "Select Lead Source"
	
	function createDropdown(){
		var grabTag = document.getElementsByTagName("form"),	//Targets <form></form> tag in additem.html
		grabLi = autoGet('leadSource'),								//Targets and grabs <li><label for="leadSource" id="leadSource">Select Lead Source:</label></li>
		createSelect = document.createElement('select');		//Creates <select></select> tags within <li></li>
		createSelect.setAttribute("id", "leadTypes");				//Adds id="sources" to <select></select> (<select id="leadTypes"></select>)
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
					timeValue,
					flagMessage = autoGet('errors');
					
					createDropdown();
					

//Save info to local storage
	
	
		var saveButton = autoGet('submit');
	saveButton.addEventListener("click", required);
	
	//Dynamically create individual button/links to edit and delete each item.
	
	function createLinks(key, linksLi){
		var editButton = document.createElement('a');
		editButton.href = "#";
		editButton.key = key;
		var editText = "Edit";
		editButton.addEventListener("click", editLead);
		editButton.innerHTML = editText;
		linksLi.appendChild(editButton);
		
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);
		
		var deleteButton = document.createElement('a');
		deleteButton.href = "#";
		deleteButton.key = key;
		var deleteText = "Delete";
		deleteButton.addEventListener("click", deleteLead);
		deleteButton.innerHTML = deleteText;
		linksLi.appendChild(deleteButton);
		
	}
	
	//Function to edit each item individually...(Yikes!)
	
	function editLead(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		toggleControls("off");
		
		autoGet('fname').value = item.fname[1];
		autoGet('lname').value = item.lname[1];
		autoGet('contactNum').value = item.contactNum[1];
		autoGet('contactType').value = item.contactType[1];
		autoGet('date').value = item.date[1];
		var radios = document.forms[0].timeOfDay;
		for (var i=0 ; i<radios.length; i++){
			if (radios[i].value == "Morning" && item.timeOfDay[1] == "Morning") {
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value =="Afternoon" && item.timeOfDay[1] == "Afternoon"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Evening" && item.timeOfDay[1] == "Evening"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Anytime" && item.timeOfDay[1] == "Anytime"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		autoGet('interestLevel').value = item.interestLevel[1];
		autoGet('leadTypes').value = item.leadSource[1];
		autoGet('comments').value = item.comments[1];
	
		
		saveButton.removeEventListener("click", saveLead);
		
		
		autoGet('submit').value = "Edit Lead";
		var editSaveButton = autoGet('submit');
		editSaveButton.addEventListener("click", required);
		editSaveButton.key = this.key;
		 

	}
	
	function deleteLead(){
		var confirmDel = confirm("Are you sure you wish to delete this lead?");
		if (confirmDel){
			localStorage.removeItem(this.key);
			window.location.reload();
			alert("Callback Deleted"); 
		}else{
			alert("Delete Cancelled");
		}
	}
	
	
	
	//Validate required information before allowing the user to proceed...
	
	function required(r){
		var checkFname = autoGet('fname');
		var checkLname = autoGet('lname');
		var checkNum = autoGet('contactNum');
		
		flagMessage.innerHTML = "";
		checkFname.style.border = "1px solid black";
		checkLname.style.border = "1px solid black";
		checkNum.style.border = "1px solid black";
		
		var flagArray = [];
		if (checkFname.value === ""){
			var fNameFlag = "Please Enter A First Name";
			checkFname.style.border ="1px solid red";
			flagArray.push(fNameFlag);
		}
			if (checkLname.value === ""){
			var lNameFlag = "Please Enter A Last Name";
			checkLname.style.border ="1px solid red";
			flagArray.push(lNameFlag);
		}
			if (checkNum.value === ""){
			var numFlag = "Please Enter A Contact Number";
			checkNum.style.border ="1px solid red";
			flagArray.push(numFlag);
		}
		if (flagArray.length >=  1){
			for (var i=0, j=flagArray.length; i < j; i++){
				var text = document.createElement('li');
				text.innerHTML = flagArray[i];
				flagMessage.appendChild(text);
			}
			r.preventDefault();
			return false;
		}else{
			saveLead(this.key);
		}
		
	}
	
	 
	
	

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
	
	function saveLead(key){
		if(!key){
			var id = Math.floor(Math.random()*100000001);
		}else{
			var id = key;
		}
		getRadio();
		var item = {};
			item.fname = ["First Name:", autoGet('fname').value];
			item.lname = ["Last Name:", autoGet('lname').value];
			item.contactNum = ["Contact Number:", autoGet('contactNum').value];
			item.contactType = ["Contact Type:", autoGet('contactType').value];
			item.date = ["Scheduled Date:", autoGet('date').value];
			item.timeOfDay = ["Preferred Time:", timeValue];
			item.interestLevel = ["Interest Level", autoGet('interestLevel').value];
			item.leadSource = ["Lead Source:", autoGet('leadTypes').value];
			item.comments = ["Comments:", autoGet('comments').value];
			localStorage.setItem(id, JSON.stringify(item));
			
			alert("Callback Saved");
		
	} 	
	
	
	// Toggle controls to dynamically change how data is displayed to user

	
	function toggleControls(n){
		switch(n){
			case "on":
				autoGet('scheduleForm').style.display = "none";
				autoGet('clearLeads').style.display = "inline";
				autoGet('displayAll').style.display = "none";
				autoGet('newLead').style.display = "inline";
				break;
			case "off":
				autoGet('scheduleForm').style.display = "block";
				autoGet('clearLeads').style.display = "inline";
				autoGet('displayAll').style.display = "inline";
				autoGet('newLead').style.display = "none";
				autoGet('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	
	
	//Display saved data to user when "Display All Current Leads" link is clicked.
	
	var displayAll = autoGet('displayAll');
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
		autoGet('items').style.display = "block";
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
			createLinks(localStorage.key(i), linksLi);
		}

	}
	
	//Clear All Data in storage.
	
	var clearAll = autoGet('clearLeads');
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