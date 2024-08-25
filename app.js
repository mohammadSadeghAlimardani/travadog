const sidebar = document.querySelector(".sidebar");
const openSidebarBtn = document.querySelector(".open-sidebar-btn");
const closeSidebarBtn = document.querySelector(".close-sidebar-btn");

openSidebarBtn.addEventListener("click", function(e){
    e.preventDefault();
    sidebar.classList.add("show");
})
closeSidebarBtn.addEventListener("click", function(e){
    e.preventDefault();
    sidebar.classList.remove("show");
})

//-------------------



const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", function(e){
    if(window.scrollY > 150){
        navbar.style.backgroundColor = "#7793A9";
    }else{
        navbar.style.backgroundColor = "transparent";
    }
})


//--------------

const mostVisitCountriesImageDOM = document.querySelector(".most-visit-countries-image");
const mostVisitCountriesImageURL = "./api/most-visit-countries-image.json";
async function fetchMostVisitCountriesImage(){
    const response = await fetch(mostVisitCountriesImageURL);
    const data = await response.json();
    displayMostVisitCountriesImage(data);
}
function displayMostVisitCountriesImage(items){
    mostVisitCountriesImageDOM.innerHTML = items.map(item => {
        const {image, country} = item;
        return `<article>
                    <img src="${image}" alt="${country}">
                    <h3>Travel to ${country}</h3>
                    <a href="#">
                        <span>see more</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>
                </article>`;
    }).join("");
}
window.addEventListener("DOMContentLoaded", fetchMostVisitCountriesImage);



//--------------------



const serviceItemsDOM = document.querySelector(".service-items");
const serviceItemsURL = "./api/service-items.json";

async function fetchServiceItems(){
    const response = await fetch(serviceItemsURL);
    const data = await response.json();
    displayServiceItems(data);
}
function displayServiceItems(items){
    serviceItemsDOM.innerHTML = items.map(item => {
        const {icon, title, description} = item;
        return  `<article>
                    <div class="service-icon">
                        <i class="${icon}"></i>
                    </div>
                    <h3 class="service-title">${title}</h3>
                    <p class="service-description">
                        ${description}
                    </p>
                </article>`;
    }).join("");
}
window.addEventListener("DOMContentLoaded", fetchServiceItems);




//----------------------

const travelPackagesDOM = document.querySelector(".travel-packages-container");
const travelPackagesURL = './api/travel-packages.json';

const foramtPrice = (price) => {
    const priceStr = price.toString();
    let step = -1;
    const priceArray = [];
    for (let index = priceStr.length - 1; index >= 0; index--) {
        step++;
        if(step % 3 == 0 && step != 0){
            priceArray.unshift(",");
            priceArray.unshift(priceStr[index]);
        }else{
            priceArray.unshift(priceStr[index]);    
        }
    }
    let formattedPrice = "";
    priceArray.map(item => formattedPrice += item);
    return formattedPrice;
}

async function fetchTravelPackages(){
    try {
        const response = await fetch(travelPackagesURL);
        const data = await response.json();
        const loadingDOM = document.querySelector(".loading");
        loadingDOM.style.display = "none";
        displayTravelPackages(data);
    } catch (error) {
        console.log(error);
    }
}

function displayTravelPackages(items){
    travelPackagesDOM.innerHTML = items.map(item => {
        const {image, title, place} = item;
        const {travelStatus, rating, date, price, duration} = item;

        return  `<article>
                    <img src="${image}" alt="${place}">
                    <h2>${title}</h2>
                    <h4>
                        <i class="fa-solid fa-location-dot"></i>
                        <span>${place}</span>
                    </h4>
                    <ul>
                        <li>
                            <i class="fa-solid fa-arrows-spin"></i>
                            <span>${travelStatus}</span>
                        </li>
                        <div class="seprate-vertical-border"></div>
                        <li>
                            <i class="fa-solid fa-star"></i>
                            <span>${rating} rating</span>
                        </li>
                        <div class="seprate-vertical-border"></div>
                        <li>
                            <i class="fa-solid fa-calendar-days"></i>
                            <span>${date}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>$${foramtPrice(price)}</li>
                        <button class="btn btn-white">book</button>
                    </ul>
                    <h5>${duration}</h5>
                </article>`
    }).join("");
}

window.addEventListener("DOMContentLoaded", fetchTravelPackages);





const exploreBtns = [...document.querySelectorAll(".explore-btns a")];
exploreBtns.forEach(exploreBtn => {
    exploreBtn.addEventListener("click", function(e){
        e.preventDefault();
        removeActiveClass();
        e.currentTarget.classList.add("active");
        const textBtn = e.currentTarget.textContent;
        filterByType(textBtn);
    })
})

async function filterByType(type){
    try {
        const response = await fetch(travelPackagesURL);
        let data = await response.json();
        if(type != "all"){
            data = data.filter(item => item.type == type);
        }
        displayTravelPackages(data);
    } catch (error) {
        console.log(error);
        
    }
}

function removeActiveClass(){
    const activeBtn = exploreBtns.find(exploreBtn => exploreBtn.classList.contains("active"));
    activeBtn.classList.remove("active");
}





// --------------------

const blogsContainerDOM = document.querySelector(".blogs-container");
const blogsContainerURL = "./api/blogs-container.json";

async function fetchBlogsContainer(){
    const response = await fetch(blogsContainerURL);
    const data = await response.json();
    displayBlogsContainer(data);
}

function displayBlogsContainer(items){
    blogsContainerDOM.innerHTML = items.map(item => {
        const {type, description, image} = item;

        return  `<article>
                    <div>
                        <img src="${image}" alt="${type}"/>
                        <section>
                            <h3>${type}</h3>
                            <h2>${description}</h2>
                            <a href="#">
                                <span>learn more</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </a>
                        </section>
                    </div>
                </article>`;
    }).join("");
}

window.addEventListener("DOMContentLoaded", fetchBlogsContainer);




//----------------------

const copyRightDOM = document.querySelector(".copy-right p");
copyRightDOM.innerHTML = `&copy;${new Date().getFullYear()} travadog All rights reserved`;