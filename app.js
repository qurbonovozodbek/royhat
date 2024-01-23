const name = document.getElementById('name');
const price = document.getElementById('price');
const img = document.getElementById('img');
const select = document.getElementById('select');
const cardin = document.getElementById('card');
const btn = document.getElementById('btn');
const form = document.getElementById('form')

function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
}
function validate(name, price, select) {
    if (!name.value) {
        alert('name bosh')
        name.focus();
        return false;
    }

    if (name.value.trim().length <= 3) {
        alert('Mashinani toliq ismini kiriting')
        name.focus();
        return false;
    }
    if (!Number(price.value)) {
        alert('price bosh')
        price.focus();
        return false;
    }
    if (!select.value) {
        alert('select bosh')
        select.focus();
        return false;
    }
    if (!isValidUrl(img.value)) {
        alert('URL manzil kiriting')
        img.focus();
        return false;
    }

    return true
}
function getData(cars) {
    let data = []
    if (localStorage.getItem('cars')) {
        data = JSON.parse(localStorage.getItem('cars'))
    }
    return data
}
function creatCard(car) {
    return `
    <div id="box" class="d-flex">
        <img id="cardImg" style="width: 200px; height: 200px;" src="${car.img}" alt="">
        <div>
            <div id="nameCard" class="d-flex justify-content-between align-items-center">
                <h1>${car.name}</h1>
                <button data-id = 'data_${car.id}' class="btn-danger more">Batafsil</button>
            </div>
            <h4>${car.price}</h4>
            <span>${car.select}</span>
        </div>
    </div>
    `
}

btn && btn.addEventListener('click', function(e) {
    e.preventDefault();

    if (validate(name, price, select, img)) {
        let car = {
            name: name.value,
            price: price.value,
            img: img.value,
            select: select.value,
            id: Date.now()
        }

        let data = getData();
        data.push(car);
        localStorage.setItem('cars', JSON.stringify(data));


        let card = creatCard(car);
        cardin.innerHTML += card;

        form.reset();
    }

})

document.addEventListener('DOMContentLoaded', function() {
    let cars = getData();
    cars.length && cars.forEach(car => {
        let card = creatCard(car);
        cardin.innerHTML += card;
    })

    let moreButton = document.querySelectorAll('button.more')
    moreButton.length && moreButton.forEach(more => {
        more && more.addEventListener('click', function() {
            let id = this.getAttribute('data-id').substring(5);
            if (id) {
                let domain = window.location.href.substring(0, window.location.href.search('index'));
                window.location.assign(`${domain}pages/abaut.html?id=${id}`);
            }
        });
    });
});

export { getData }