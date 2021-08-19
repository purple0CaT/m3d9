let dataBase
let itemLoad = document.getElementById('itemLoad')
let url = "https://striveschool-api.herokuapp.com/api/product/"
let itemID = new URLSearchParams(window.location.search).get('id')


// OnLOAD
window.onload = ()=>{
    loadData()
}

// DATA LOAD
const loadData = async ()=>{
    try {
        let response = await fetch(url+itemID, {
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
        errorAlert(err)
        setTimeout(errorAlert, 3000)
    }
};

function loadCard(elem){
    itemLoad.innerHTML =`
            <div class="col-4 p-3">
                <img src="${elem.imageUrl}" alt="" style="max-width: 100%; border-radius: 10px;">
            </div>
            <div class="col-4 d-flex flex-column p-3">
                <h1 class="font-weight-light">${elem.name}</h1>
                <h4 class="font-weight-light text-secondary">${elem.brand}</h4>
                <h4 class="font-weight-light text-secondary">${elem.description}</h4>
                <br>
                <h3 class="font-weight-light text-secondary mt-1">${elem.price}£</h3>
                <a class="btn btn-success mt-auto" href="back.html?id=${elem._id}">Edit</a>
            </div>
        `
}

// error
function errorAlert(param) {
    let alert = document.getElementById('errorAlert')
    alert.innerText = param
    alert.classList.toggle('d-none')
}