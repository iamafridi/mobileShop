const loadPhone = async (searchText='mini',isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  showPhones(phones,isShowAll);
};

const showPhones = (phones,isShowAll) =>{
  // console.log(phones);

  //Step-1
  const phoneContainer = document.getElementById('phone-container');
  // clear phone container cards before adding new cards
  phoneContainer.textContent = '';

  //Display Showall button if there are more than 12 phones
  const showAllPhones = document.getElementById('showAllContainer');
  if(phones.length > 12 && !isShowAll){
    showAllPhones.classList.remove('hidden');
  }
  else{
    showAllPhones.classList.add('hidden');
  }

  //Display only first 10 Phones if not show all
 if(!isShowAll){
    phones = phones.slice(0,10);
 }


  phones.forEach(phone =>{
    // console.log(phone);

    //STEP-2=create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-neutral-100 shadow-xl`;

    //Step-3 : Set Inner Html
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Phone" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.brand}</h2>
          <p>${phone.phone_name} </p>
          <div class="card-actions justify-center">
            <button id="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div> 
        `;
        // dynamic id string hoye jai tai quotation er vetore id ta send korsi
    //Step -4= Apppend Child
    phoneContainer.appendChild(phoneCard);
  });
//   hide loading Spinner 
toggleHandler(false);
};

//show Modal details
const handleShowDetails = async (id) =>{
    //loading indivisual data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/{id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone)
} 


const showPhoneDetails = (phone) =>{
   console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText =phone.name;
    
    const showDetailsContainer = document.getElementById('show-detail-container');
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    
    `
    
        //show Modal
        show_details_modal.showModal();
    } 

    

// handle search button
const handleSearch = (isShowAll) =>{
    toggleHandler(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText,isShowAll);
}

const toggleHandler = (isLoading)=>{
    const toggleLoading = document.getElementById('loading-spinner');
    if(isLoading){
        toggleLoading.classList.remove('hidden')
    }
    else{
        toggleLoading.classList.add('hidden')
    }

}



// handle show all 
const hangleShowAll = ()=>{
    handleSearch(true);
}

loadPhone();
