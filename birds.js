
async function fetchData() {
	const response = await fetch('./data/nzbird.json');
	if (!response.ok){
		console.error(response.status); // error handling
	}
	const data = await response.json()
	loadAllBirds(data);
}

async function fetchCertainBirds(bird) {
	const response = await fetch('./data/nzbird.json');
	if (!response.ok){
		console.error(response.status); // error handling
	}
	const data = await response.json();
	bird = bird.toLowerCase();
	

	const removebirds = document.querySelectorAll('.bird');
	removebirds.forEach(bird => bird.remove());
	const removeText = document.querySelectorAll('.noSearchResults');
	removeText.forEach(noSearchResults => noSearchResults.remove());
	
	for( i = 0; i < data.length; i++){
		const name = data[i].english_name.toLowerCase();
		const pname = data[i].primary_name.toLowerCase();
		
		if(!name.startsWith(bird) && !pname.startsWith(bird) && name.includes(bird) || pname.includes(bird)){		
			createBird(data[i].primary_name, data[i].english_name, data[i].scientific_name, data[i].photo.source, data[i].photo.credit, data[i].family, data[i].order, data[i].status, data[i].size.length.value, data[i].size.weight.value);
		
		}
	}


	for( i = 0; i < data.length; i++){
		const name = data[i].english_name.toLowerCase();
		const pname = data[i].primary_name.toLowerCase();
		
		if(name.startsWith(bird) || pname.startsWith(bird)){		
			createBird(data[i].primary_name, data[i].english_name, data[i].scientific_name, data[i].photo.source, data[i].photo.credit, data[i].family, data[i].order, data[i].status, data[i].size.length.value, data[i].size.weight.value);
		
		}
	}
	const currentbirds = document.querySelectorAll('.bird');
	if(currentbirds.length == 0){
		const e = document.createElement('p');
		e.setAttribute('class', 'noSearchResults')
		e.textContent = "No Birds Found...";
		document.querySelector('.flex-bird-container').prepend(e);
	}

}

function loadAllBirds(data){
	
	const removebirds = document.querySelectorAll('.bird');
	removebirds.forEach(bird => bird.remove());
	const removeText = document.querySelectorAll('.noSearchResults');
	removeText.forEach(noSearchResults => noSearchResults.remove());
	
	for(i = 0; i < data.length; i++)
	createBird(data[i].primary_name, data[i].english_name, data[i].scientific_name, data[i].photo.source, data[i].photo.credit, data[i].family, data[i].order, data[i].status, data[i].size.length.value, data[i].size.weight.value);
	
	
}



async function createBird(primary_name, english_name, scientific_name, photo_source, photo_credit, family_name, order, status, length, weight){
	

	const birdbox = document.createElement('div');
	birdbox.setAttribute('class', 'bird');
	birdbox.append(newElement('p', 'birdname-primary', primary_name));
	const birdImageBox =(newElement('div', 'bird-image-box', ''));
	const birdImage =(newPhotoElement('img', 'bird-image', photo_source));
	birdImageBox.append(birdImage);
	birdImageBox.append(addStatus(status));
	birdbox.append(birdImageBox);
	birdbox.append(newElement('p', 'bird-photo-credit', "Photo Credit: "+photo_credit));
	birdbox.append(newElement('p', 'birdname-secondary', english_name));
	birdbox.append(newElement('p', 'scientific-name', "Scientific name: "+scientific_name));
	birdbox.append(newElement('p', 'family-name', "Family name: "+ family_name));
	birdbox.append(newElement('p', 'order', "Order: "+ order));
	birdbox.append(newElement('p', 'status', "Status: "+ status));
	birdbox.append(newElement('p', 'length', "Length: "+ length + " cm"));
	birdbox.append(newElement('p', 'weight', "Weight: "+ weight + " g"));
	//birdbox.append(addStatus());


	document.querySelector('.flex-bird-container').prepend(birdbox);

}

function newElement(type, className, content) {
    const e = document.createElement(type);
    e.setAttribute('class', className);
    e.textContent = content;
    return e;
}

function addStatus(status) {

	const e = document.createElement('div');
	e.setAttribute('class', 'conservation-circle');

	if(status.includes('Not Threatened')){
		e.setAttribute('id', 'not-threatened');
	}
	if(status.includes('Naturally Uncommon')){
		e.setAttribute('id', 'naturally_uncommon');
	}

	if(status.includes('Relict')){
		e.setAttribute('id', 'relict');
	}

	if(status.includes('Recovering')){
		e.setAttribute('id', 'recovering');
	}
	if(status.includes('Declining')){
		e.setAttribute('id', 'declining');
	}
	if(status.includes('Nationally Increasing')){
		e.setAttribute('id', 'nationally-increasing');
	}
	if(status.includes('Nationally Vulnerable')){
		e.setAttribute('id', 'nationally-vulnerable');
	}
	if(status.includes('Nationally Endangered')){
		e.setAttribute('id', 'nationally-endangered');
	}
	if(status.includes('Nationally Critical')){
		e.setAttribute('id', 'nationally-critical');
	}
	if(status.includes('Extinct')){
		e.setAttribute('id', 'extinct');
	}
	if(status.includes('Data Deficient')){
		e.setAttribute('id', 'data-deficient');
	}
	return e;

}
function newPhotoElement(type, className, content){
	const e = document.createElement(type);
	e.setAttribute('class', className);
	e.setAttribute('src', content);

	return e;
}

function searchBirds(data){
	const searchInput = document.querySelector('#message-text');
	if(searchInput.value == "") return;
	const bird = searchInput.value;
	searchInput.value = "";

	fetchCertainBirds(bird);

}

function clickHandler(event) {
    event.preventDefault();
    searchBirds();
}


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropDownFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
  }

  function dropDownFunction2() {
	document.getElementById("myDropdown2").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {
	  var dropdowns = document.getElementsByClassName("dropdown-content");
	  var i;
	  for (i = 0; i < dropdowns.length; i++) {
		var openDropdown = dropdowns[i];
		if (openDropdown.classList.contains('show')) {
		  openDropdown.classList.remove('show');
		}
	  }
	}
  }

  async function fetchBirdByStatus(birdStatus) {
	const response = await fetch('./data/nzbird.json');
	if (!response.ok){
		console.error(response.status); // error handling
	}
	const data = await response.json();
	

	const removebirds = document.querySelectorAll('.bird');
	removebirds.forEach(bird => bird.remove());
	const removeText = document.querySelectorAll('.noSearchResults');
	removeText.forEach(noSearchResults => noSearchResults.remove());
	
	for( i = 0; i < data.length; i++){

		if(data[i].status == birdStatus){
			createBird(data[i].primary_name, data[i].english_name, data[i].scientific_name, data[i].photo.source, data[i].photo.credit, data[i].family, data[i].order, data[i].status, data[i].size.length.value, data[i].size.weight.value);
		}

	}

	const currentbirds = document.querySelectorAll('.bird');
	if(currentbirds.length == 0){
		const e = document.createElement('p');
		e.setAttribute('class', 'noSearchResults')
		e.textContent = "No Birds Found...";
		document.querySelector('.flex-bird-container').prepend(e);
	}

}

  function notThreatened(){
	const birdStatus = "Not Threatened";
	fetchBirdByStatus(birdStatus);
  }
  function naturallyUncommon(){
	const birdStatus = "Naturally Uncommon";
	fetchBirdByStatus(birdStatus);
  }

  function relict(){
	const birdStatus = "Relict";
	fetchBirdByStatus(birdStatus);
  }

  function recovering(){
	const birdStatus = "Recovering";
	fetchBirdByStatus(birdStatus);
  }

  function declining(){
	const birdStatus = "Declining";
	fetchBirdByStatus(birdStatus);
  }

  function nationallyIncreasing(){
	const birdStatus = "Nationally Increasing";
	fetchBirdByStatus(birdStatus);
  }

  function nationallyVulnerable(){
	const birdStatus = "Nationally Vulnerable";
	fetchBirdByStatus(birdStatus);
  }

  function nationallyEndangered(){
	const birdStatus = "Nationally Endangered";
	fetchBirdByStatus(birdStatus);
  }

  function nationallyCritical(){
	const birdStatus = "Nationally Critical";
	fetchBirdByStatus(birdStatus);
  }
  function extinct(){
	const birdStatus = "Extinct";
	fetchBirdByStatus(birdStatus);
  }

  function dataDeficient(){
	const birdStatus = "Data Deficient";
	fetchBirdByStatus(birdStatus);
  }

  //Comparer Function    
function GetIncOrder(prop, p2, p3) {    
    return function(a, b) {    
        if (a[prop][p2][p3] < b[prop][p2][p3] ) {    
            return 1;    
        } else if (a[prop][p2][p3]  > b[prop][p2][p3] ) {    
            return -1;    
        }    
        return 0;    
    }    
}    
  //Comparer Function    
  function GetDecOrder(prop, p2, p3) {    
    return function(a, b) {    
        if (a[prop][p2][p3] > b[prop][p2][p3] ) {    
            return 1;    
        } else if (a[prop][p2][p3]  < b[prop][p2][p3] ) {    
            return -1;    
        }    
        return 0;    
    }    
}  

  async function loadBirdsOrdered(order) {
	const response = await fetch('./data/nzbird.json');
	if (!response.ok){
		console.error(response.status); // error handling
	}
	const data = await response.json();
	

	const removebirds = document.querySelectorAll('.bird');
	removebirds.forEach(bird => bird.remove());
	const removeText = document.querySelectorAll('.noSearchResults');
	removeText.forEach(noSearchResults => noSearchResults.remove());
	
	

	if(order == "increasing-weight"){
		data.sort(GetIncOrder("size", "weight", "value"));


		for(var i in data){
			createBird(data[i].primary_name, data[i].english_name, data[i].scientific_name, data[i].photo.source, data[i].photo.credit, data[i].family, data[i].order, data[i].status, data[i].size.length.value, data[i].size.weight.value);
		}
	}
	if(order == "increasing-length"){
		data.sort(GetIncOrder("size", "length", "value"));


		for(var i in data){
			createBird(data[i].primary_name, data[i].english_name, data[i].scientific_name, data[i].photo.source, data[i].photo.credit, data[i].family, data[i].order, data[i].status, data[i].size.length.value, data[i].size.weight.value);
		}
	}

	if(order == "decreasing-length"){
		data.sort(GetDecOrder("size", "length", "value"));


		for(var i in data){
			createBird(data[i].primary_name, data[i].english_name, data[i].scientific_name, data[i].photo.source, data[i].photo.credit, data[i].family, data[i].order, data[i].status, data[i].size.length.value, data[i].size.weight.value);
		}
	}
	if(order == "decreasing-weight"){
		data.sort(GetDecOrder("size", "weight", "value"));


		for(var i in data){
			createBird(data[i].primary_name, data[i].english_name, data[i].scientific_name, data[i].photo.source, data[i].photo.credit, data[i].family, data[i].order, data[i].status, data[i].size.length.value, data[i].size.weight.value);
		}
	}
}

async function showRandomBird(){
	const response = await fetch('./data/nzbird.json');
	if (!response.ok){
		console.error(response.status); // error handling
	}
	const data = await response.json()


	const removebirds = document.querySelectorAll('.bird');
	removebirds.forEach(bird => bird.remove());
	const removeText = document.querySelectorAll('.noSearchResults');
	removeText.forEach(noSearchResults => noSearchResults.remove());
	
	

	const x = Math.floor(Math.random() * 68);
	
	createBird(data[x].primary_name, data[x].english_name, data[x].scientific_name, data[x].photo.source, data[x].photo.credit, data[x].family, data[x].order, data[x].status, data[x].size.length.value, data[x].size.weight.value);
	 
}

document.querySelector("#search-button").addEventListener('click', clickHandler);




fetchData();


