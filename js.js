let dataBase
let homePage = document.getElementById('homePage')



// OnLOAD
window.onload = ()=>{
    loadData()
}

// DATA LOAD
let url = "https://striveschool-api.herokuapp.com/api/product/"

const loadData = async ()=>{
    try {
        let response = await fetch(url, {
            method: "GET",
            headers:{
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjcwZDJkNTI2MjAwMTViNmRjOTkiLCJpYXQiOjE2MjkyODgyMDUsImV4cCI6MTYzMDQ5NzgwNX0.jHNmjWp6j4MxM-iiSgDtKjZAZdf8sa1Xpvjsm8l4wuc"
            }
        }
        );
        let data = await response.json();
        dataBase = data

        loadCard(dataBase)
    } catch (err) {
        console.log(err);
    }
};

// CARD LOADING 
function loadCard(datas) {
    homePage.innerHTML =`
    <div class="col-12 text-center">
        <h2 class="font-weight-light">Catalogue</h2>
        <hr>
    </div>
    `
    datas.forEach(elem => {
        homePage.innerHTML +=`
    <div class="col-6 col-md-3 my-2">
        <a class="card h-100" href="back.html?id=${elem._id}">
            <img src="${elem.imageUrl}" class="card-img-top mt-1" style="max-height: 15rem;   object-fit: contain;" alt="...">
            <div class="card-body">
                <h5 class="card-title">${elem.name}</h5>
                <p class="card-text">${elem.brand}</p>
                <p class="card-text">${elem.description}</p>
                <strong class="card-text">${elem.price}£</strong>
            </div>
                <button href="#" class="btn btn-light">Buy</button>
        </a>
    </div>
        `
    });
}




// create all catalogue

// function itemList() {
//     let allItems = document.getElementById('allItems')

//     allItems.innerHTML=''
//     dataBase.forEach(item => {
//         allItems.innerHTML += `
//         <div class="col-12 mb-1 d-flex justify-content-between align-items-center">
//             <p class="m-0 p-0">${item.name}</p>
//             <button class="btn btn-danger" value=${item._id} onclick="deleteItem(this.value)">Delete</button>
//         </div>
//         `
//     })
// }




        // BACK OFFICE PAGE
