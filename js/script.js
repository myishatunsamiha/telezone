
const searchPhone = () => {
    const searchField = document.getElementById("search-field");
    const searchFieldValue = searchField.value.toLowerCase();

    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchFieldValue}`)     // fetch the url
        .then(res => res.json())    // convert the response into json object
        .then(phones => displayResults(phones.data))

}
document.getElementById("search-btn").addEventListener("click", searchPhone);

const displayResults = (phones) => {
    console.log(phones);
    if (phones.length == 0) {
        console.log("no results found");
    } else {

        let div = document.createElement("div");
        div.classList.add("row", "row-cols-1", "row-cols-md-3", "g-4");

        phones.forEach(phone => {
            const col = document.createElement("col");
            col.innerHTML = `<div class="card h-100 rounded-3 p-3">
                                <img src="${phone.image}" class="card-img-top rounded" alt="image of the phone">
                                    <div class="card-body">
                                        <p class="card-title">Brand: <strong>${phone.brand}</strong></p>
                                        <p class="card-text">Phone Name: <strong>${phone.phone_name}</strong></p>
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <button type="button" class="btn btn-outline-success btn-lg" onclick=phoneDetails('${phone.slug}')>Explore</button>
                                    </div>
                            </div>`;
            div.appendChild(col);
        });

        const searchResulContainer = document.getElementById("search-result-container");
        searchResulContainer.appendChild(div);
        console.log(searchResulContainer.innerHTML);
    }
}

const phoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneDetails(data.data));
}

const displayPhoneDetails = (phone) => {

    let releaseDateStatus;
    if (phone.releaseDate.length > 0) {
        releaseDateStatus = phone.releaseDate;
    } else {
        releaseDateStatus = `<span class="text-muted">No data found</span>`;
    }

    console.log(phone.others);
    const phoneDetailContainer = document.getElementById("phone-detail-container");

    phoneDetailContainer.innerHTML = `<div class="card text-white bg-dark" style="max-width: 20rem; font-size: 15px;">
                <img src="${phone.image}" class="card-img-top w-100" alt="...">
                <div class="card-body p-3">
                    <p class="card-text">Date: <strong>${releaseDateStatus}</strong></p>
                    <p class="card-text">Brand: <strong>${phone.brand}</strong></p>
                    <p class="card-text">Phone Name: <strong>${phone.name}</strong></p>
                    <p class="card-text">Main Features: </p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item bg-dark text-white">storage-<strong>${phone.mainFeatures.storage}</strong></li>
                        <li class="list-group-item bg-dark text-white">display size-<strong>${phone.mainFeatures.displaySize}</strong></li>
                        <li class="list-group-item bg-dark text-white">chip set-<strong>${phone.mainFeatures.chipSet}</strong></li>
                        <li class="list-group-item bg-dark text-white">memory- <strong>${phone.mainFeatures.memory}</strong></li>
                        <li class="list-group-item bg-dark text-white">sensors- <strong>${phone.mainFeatures.sensors}</strong></li>
                    </ul>
                    <br>

                    ${(phone.others) ? `Others: 
                    <ul>
                        <li>WLAN: ${phone.others.WLAN ?? ""}</li>
                        <li>Bluetooth:${phone.others.Bluetooth ?? ""}</li>
                        <li>GPS: ${phone.others.GPS ?? ""}</li>
                        <li>NFC: ${phone.others.NFC ?? ""}</li>
                        <li>Radio: ${phone.others.Radio ?? ""}</li>
                        <li>USB: ${phone.others.USB ?? ""}</li>
                    </ul>` : ""}
                    

    <a href="#" class="btn btn-outline-light">Purchase</a>
                </div >
                </div > `
};
// ${phone.releaseDate}
