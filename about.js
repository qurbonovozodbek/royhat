import { getData } from "./app.js";

const name = document.getElementById('name');
const img = document.getElementById('img');
const price = document.getElementById('price');
const select =  document.getElementById('select');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');

let elid;

document.addEventListener('DOMContentLoaded', function() {
    let idindex = window.location.href.search('id=');
    elid = window.location.href.substring(idindex + 3);
    
    if (elid) {
        let data = getData();
        let car = data.find(el => {
                return el.id == elid
        })

        name.innerHTML = car.name;
        price.innerHTML = car.price;
        select.innerHTML = car.select;
        img.setAttribute('src', car.img);

        // console.log(car);
    }


})

btn1 && btn1.addEventListener('click', function() {
    let isDelete = confirm('Rostan ham ochirmoqchimisz');
    if (isDelete) {
        let data = getData();
        data = data.filter(car => {
            return car.id != elid;
        })
        localStorage.setItem('cars', JSON.stringify('data'));
        window.location.assign("http://127.0.0.1:5500/index.html")
        console.log(data);
    }
}) 