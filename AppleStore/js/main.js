let JsonData = [];
let titles = [];
const ul = document.querySelector("nav ul");

const getJSONdata = () =>{
    let xhr = new XMLHttpRequest();
    xhr.open("GET","https://raw.githubusercontent.com/jacko1114/20201125_homework/main/AppleStore/js/products.json",true);
    xhr.addEventListener("load",function(){
        JsonData = JSON.parse(this.responseText)[0];
        titles = Object.keys(JsonData);
        createNav();
    })
    xhr.send();
}


const createNav = () => {
    titles.forEach(item => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute("href","javascript:;");
        a.textContent = item;
        a.setAttribute("data-item",`${item}`);
        a.classList.add("text-decoration-none","mx-5","text-light","fs-5");
        li.appendChild(a);
        ul.appendChild(li);

        createSubNav(a,item);
    })
}

const createSubNav = (target, category) => {
    target.addEventListener("click",function(){
        let subTitle = Object.keys(JsonData[this.dataset.item]);
        let title = document.getElementById("title");
        let cloneContent = title.content.cloneNode(true);
        subTitle.forEach(item => {
            let li = document.createElement("li");
            let a = document.createElement("a");
            let span = document.createElement("span");
            span.textContent = item;
            a.setAttribute("href","javascript:;");
            a.append(choiceIcon(item.toString()),span);
            a.setAttribute("data-category",`${category}`);
            a.setAttribute("data-item",`${item}`);
            a.classList.add("text-decoration-none","mx-5","py-2","text-light","text-center","fs-5","d-flex","flex-column","align-items-center");
            li.appendChild(a);
            cloneContent.querySelector("ul").appendChild(li);

            createProduct(a);
        })

        document.querySelector("nav .subtitle").innerHTML = "";
        document.querySelector("nav .subtitle").appendChild(cloneContent);
    })
}
const createProduct = (target) => {
    target.addEventListener("click",function(){
        let productCateory = this.dataset.category;
        let productName = this.dataset.item;
        createProductName(productName);
        createProductPrice(productCateory,productName);
    })
}

const createProductName = (product) =>{
    let productName = document.querySelector(".products .product-name");
    let h2 = document.createElement("h2");

    productName.innerHTML = "";
    h2.textContent = product;
    productName.appendChild(h2);
}
const createProductPrice = (category, product) =>{
    let productPrice = document.querySelector(".products .product-price");
    let h3 = document.createElement("h3");
    productPrice.innerHTML = "";
    let price = Object.values(Object.values(JsonData[category][product])[0].memory)[0]
    h3.textContent = 
                    //取得該產品資料第一筆價錢
    console.log()
    productPrice.appendChild(h3);
}

const choiceIcon = (device) => {
    let i = document.createElement("i");
    i.classList.add("fas","fs-1");

    device.includes("iPhone") ? i.classList.add("fa-mobile-alt")
    : device.includes("iPad") ? i.classList.add("fa-tablet-alt") 
    : i.classList.add("fa-laptop");

    return i;
}
const priceDisplay = (price) =>{
    let reversedArray = price.toString().split("").reverse()
    let length = reversedArray.lenth;
    for(let i = length - 1; i > 0; i-=3){
        reversedArray.push(",")
    }
    return price.toString().split("").reverse()
}

console.log(priceDisplay(1234))






window.addEventListener("load",getJSONdata);