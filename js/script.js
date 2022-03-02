// function to toggle the display property of the loading spinner
const toggleSpinner = displayStyle => {
    document.getElementById("spinner").style.display = displayStyle;
}

// function to toggle the display property of the search results container and phone details container
const toggleSearchResult = displayStyle => {
    document.getElementById("search-result-container").style.display = displayStyle;
    document.getElementById("phone-detail-container").style.display = displayStyle;
}

// function to search phone by fetching the url, converting it to json object and display the results
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
        .then(res => res.json())                         // convert the response into json object
        .then(phones => displayResults(phones.data))    // display results by calling displayResults function

}
// handle the click event on the search-btn
document.getElementById("search-btn").addEventListener("click", searchPhone);


// display search results 
const displayResults = (phones) => {
    const searchResultContainer = document.getElementById("search-result-container");

    if (phones.length == 0) {   // if no phone is found
        searchResultContainer.innerHTML = `<h4 class="text-muted text-center">No results found!</h4>`;

    } else {    // if phone is found

        let div = document.createElement("div");
        div.classList.add("row", "row-cols-1", "row-cols-md-3", "g-4");

        phones.slice(0, 20).forEach(phone => {      // display first 20 or less phones
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

        if (phones.length > 20) {       // display the show button and the remaining phones when the show button will be clicked if the count of phones is more than 20 
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

    // toggle the spinner to display none when all the results have been displayed and make the search results visible
    toggleSpinner("none");
    toggleSearchResult("block");
}

// function to get the detail of the targeted phone by fetching the url, convert the response to json and display the phone detail
const phoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneDetails(data.data));  // calling the displayPhoneDetail function to display detail of the phone
}

// function to display the detail of the phone
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
                        <li class="list-group-item bg-dark text-white">sensors- <strong><ul>${phone.mainFeatures?.sensors.map(s => `<li>${s}</li>`).toString().split(",").join('') ?? "not given"}</ul></strong></li>
                    </ul>
                    <br>

                    ${(phone.others) ? `Others: <br/>
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




