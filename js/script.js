const showAllResults = (phones) => {
    const searchResulContainer = document.getElementById("search-result-container");

    let row = document.querySelector(".row");

    console.log("show phones after 19");
    console.log(phones.slice(20, phones.length));
    phones.slice(20, phones.length).forEach(phone => {
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
        row.appendChild(col);
    });
    searchResulContainer.appendChild(row);
}


const toggleSpinner = displayStyle => {
    document.getElementById("spinner").style.display = displayStyle;
}

const toggleSearchResult = displayStyle => {
    document.getElementById("search-result-container").style.display = displayStyle;
    document.getElementById("phone-detail-container").style.display = displayStyle;
}


const searchPhone = () => {
    const searchField = document.getElementById("search-field");
    const searchFieldValue = searchField.value.toLowerCase();

    const searchResultContainer = document.getElementById("search-result-container");
    searchResultContainer.textContent = "";

    const phoneDetailContainer = document.getElementById("phone-detail-container");
    phoneDetailContainer.textContent = "";

    if (searchFieldValue == "") {
        searchResultContainer.innerHTML = `<h4 class="text-muted text-center">Search your desired phone</h4>`;
        return;
    }


    toggleSpinner("block");
    toggleSearchResult("none");

    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchFieldValue}`)     // fetch the url
        .then(res => res.json())    // convert the response into json object
        .then(phones => displayResults(phones.data))

}
document.getElementById("search-btn").addEventListener("click", searchPhone);


const displayResults = (phones) => {
    const searchResultContainer = document.getElementById("search-result-container");

    if (phones.length == 0) {
        searchResultContainer.innerHTML = `<h4 class="text-muted text-center">No results found!</h4>`;

    } else {

        let div = document.createElement("div");
        div.classList.add("row", "row-cols-1", "row-cols-md-3", "g-4");

        phones.slice(0, 20).forEach(phone => {
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
        searchResultContainer.appendChild(div);

        if (phones.length > 20) {
            const showAllBtnDiv = document.createElement("div");
            showAllBtnDiv.classList.add("d-flex", "justify-content-center", "mt-3", "d-block");
            showAllBtnDiv.innerHTML = `<button type="button" class="btn btn-outline-success btn-lg" id="show-all-results-btn">Show All</button>`;
            searchResultContainer.appendChild(showAllBtnDiv);

            const showAllResultsBtn = document.getElementById("show-all-results-btn");
            showAllResultsBtn.onclick = () => {
                phones.slice(20, phones.length).forEach(phone => {
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
                searchResultContainer.appendChild(div);
                showAllBtnDiv.classList.remove("d-block");
                showAllBtnDiv.classList.add("d-none");
            }
        }


    }

    toggleSpinner("none");
    toggleSearchResult("block");
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

    phoneDetailContainer.innerHTML = `<div class="card text-white bg-dark" style="max-width: 25rem; font-size: 15px;">
                <img src="${phone.image}" class="card-img-top w-100" alt="...">
                <div class="card-body p-3">
                    <p class="card-text">Date: <strong>${releaseDateStatus}</strong></p>
                    <p class="card-text">Brand: <strong>${phone.brand}</strong></p>
                    <p class="card-text">Phone Name: <strong>${phone.name}</strong></p>
                    <p class="card-text">Main Features: </p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item bg-dark text-white">storage-<strong>${phone.mainFeatures?.storage ?? "not given"}</strong></li>
                        <li class="list-group-item bg-dark text-white">display size-<strong>${phone.mainFeatures?.displaySize ?? "not given"}</strong></li>
                        <li class="list-group-item bg-dark text-white">chip set-<strong>${phone.mainFeatures?.chipSet ?? "not given"}</strong></li>
                        <li class="list-group-item bg-dark text-white">memory- <strong>${phone.mainFeatures?.memory ?? "not given"}</strong></li>
                        <li class="list-group-item bg-dark text-white">sensors- <strong>${phone.mainFeatures?.sensors ?? "no given"}</strong></li>
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




