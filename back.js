// OnLOAD
window.onload = ()=>{
    loadData()
}
// ATRIBUTES
let formInput = document.getElementsByTagName('form')[0]
let itemName = document.getElementById('textChange')
let url = "https://striveschool-api.herokuapp.com/api/product/"
let method
let submitBtn = document.getElementById('submitBtn')
let itemID = new URLSearchParams(window.location.search).get('id')

// ID CHECK
if(itemID){
    method="PUT"
    document.getElementById('deleteIt').classList.remove('d-none')
    submitBtn.classList.remove('btn-info')
    submitBtn.classList.add('btn-success')
    submitBtn.innerText = 'Edit'
} else {
    itemID = ''
    itemName.innerText=`Add product`
    method="POST"
    formInput.classList.remove('d-none')
}

// DATA LOAD
const loadData = async ()=>{
    if(itemID){
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

        itemName.innerHTML=`Edit - <i>${dataBase.name}</i>`
        formInput.classList.remove('d-none')

        document.getElementById('name').value = dataBase.name
        document.getElementById('brand').value = dataBase.brand
        document.getElementById('description').value = dataBase.description
        document.getElementById('imageUrl').value = dataBase.imageUrl
        document.getElementById('price').value = dataBase.price

    } catch (err) {
        errorAlert(err)
        setTimeout(errorAlert, 2500)      
    }}
};

// POST FUNCTION
const submitData = async(event)=>{
    event.preventDefault()
    try {
        let postData = {
            name: document.getElementById('name').value,
            brand: document.getElementById('brand').value,
            description: document.getElementById('description').value,
            imageUrl: document.getElementById('imageUrl').value,
            price: document.getElementById('price').value
        }

        let response = await fetch(url+itemID, {
            method,
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjcwZDJkNTI2MjAwMTViNmRjOTkiLCJpYXQiOjE2MjkyODgyMDUsImV4cCI6MTYzMDQ5NzgwNX0.jHNmjWp6j4MxM-iiSgDtKjZAZdf8sa1Xpvjsm8l4wuc"
            }
        })
        // IF RESPONSE OK
        if (response.ok) {
            const respns = await response.json()
            if(itemID){
                succes(`${respns.name} edited`)
                setTimeout(succes, 2500)
                setTimeout(goHome, 3500)
            } else {
                succes(`${respns.name} added to catalouge`)
                setTimeout(succes, 2500)
                setTimeout(goHome, 3500)
            }
            document.getElementById('name').value=''
            document.getElementById('brand').value=''
            document.getElementById('description').value=''
            document.getElementById('imageUrl').value=''
            document.getElementById('price').value=''
        } else {
        // IF RESPONSE ERROR
            if (response.status >= 400 && response.status < 500) {
                errorAlert(`${response.status} User generated error, verify the data that you are sending!`)
                setTimeout(errorAlert, 2500)
            } else if (response.status >= 500 && response.status < 600) {
                errorAlert(`${response.status} Server generated error, contact the admin to fix this problem.`)
                setTimeout(errorAlert, 2500)
            }
        }
    } catch (err) {
        errorAlert(`${err}`)
        setTimeout(errorAlert, 2500)
    }}

// Delete item
const deleteItem = async()=>{
    try {
        let response = await fetch(url+itemID, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjcwZDJkNTI2MjAwMTViNmRjOTkiLCJpYXQiOjE2MjkyODgyMDUsImV4cCI6MTYzMDQ5NzgwNX0.jHNmjWp6j4MxM-iiSgDtKjZAZdf8sa1Xpvjsm8l4wuc"
            }
        })
        const respEvent = await response.json()

        succes(`${respns.name} deleted`)
        setTimeout(succes, 2500)
        setTimeout(goHome, 3500)    
    } catch (err) {
        errorAlert(err)
        setTimeout(errorAlert, 2500)    
    }
}

// ALERTS
// Go home
function goHome() {
    window.location.assign("./home.html")
}
// SUCCES ALERT
function succes(param) {
    let succes = document.getElementById('succesAlert')
    succes.innerText = param
    succes.classList.toggle('d-none')
}
function errorAlert(param) {
    let alert = document.getElementById('errorAlert')
    alert.innerText = param
    alert.classList.toggle('d-none')
}

