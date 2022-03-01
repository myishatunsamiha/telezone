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

