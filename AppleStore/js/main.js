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
        createProductImage(productName);
        createModelSelector(productCateory,productName);
        createAppearanceSelector(productCateory,productName);
        createMemorySelector(productCateory,productName);
    })
}
const createProductName = (product) => {
    let productName = document.querySelector(".products .product-name");
    let h2 = document.createElement("h2");
    productName.innerHTML = "";
    h2.classList.add("py-3","fw-bold","fs-4");
    h2.textContent = product;
    productName.appendChild(h2);
}
const createProductPrice = (category, product) => {
    let productPrice = document.querySelector(".products .product-price");
    let h3 = document.createElement("h3");
    let price = Object.values(JsonData[category][product])[0]["base_price"];
    productPrice.innerHTML = "";
    h3.textContent = price;
    h3.classList.add("py-3","fs-4");
    productPrice.appendChild(h3);
}
const createProductImage = (category) => {
    let productPic = document.querySelector(".products .product-pic");
    productPic.innerHTML = "";
    let img = document.createElement("img");
    img.src = `./images/${category}_base.png`;
    img.classList.add("w-75");
    productPic.appendChild(img);
}
const choiceIcon = (device) => {
    let i = document.createElement("i");
    i.classList.add("fas","fs-1");

    device.includes("iPhone") ? i.classList.add("fa-mobile-alt")
    : device.includes("iPad") ? i.classList.add("fa-tablet-alt") 
    : i.classList.add("fa-laptop");

    return i;
}
const createModelSelector = (category,product) => {
    let productModelTitle = document.querySelector(".products .product-model-title");
    let productModelSelector = document.querySelector(".products .product-model-selector");
    let subTitle = document.querySelector("#subTitle");
    let clonedSubTitle = subTitle.content.cloneNode(true);
    
    productModelTitle.innerHTML = "";
    productModelSelector.innerHTML = "";
    clonedSubTitle.querySelector("h3").textContent = product;
    clonedSubTitle.querySelector("h6").textContent = "選擇機型";
    productModelTitle.appendChild(clonedSubTitle);

    let products = Object.values(JsonData[category][product]);
    let productsName = Object.keys(JsonData[category][product]);
    products.forEach((item,index)=>{
        let modelSelector = document.querySelector("#modelSelector");
        let clonedSelector = modelSelector.content.cloneNode(true);
        clonedSelector.querySelector("a .modelSelector-name").textContent =productsName[index];
        clonedSelector.querySelector("a .modelSelector-display").textContent = item.description;
        clonedSelector.querySelector("a .modelSelector-price").textContent = item.base_price;
        productModelSelector.appendChild(clonedSelector);
    })
}
const createAppearanceSelector = (category,product) => {
    let productAppearanceTitle = document.querySelector(".products .product-appearance-title");
    let productAppearanceSelector = document.querySelector(".products .product-appearance-selector");
    productAppearanceTitle.innerHTML = "";
    productAppearanceSelector.innerHTML = "";

    let subTitle = document.querySelector("#subTitle");
    let clonedSubTitle = subTitle.content.cloneNode(true);
    clonedSubTitle.querySelector("h6").textContent = "選擇外觀";
    productAppearanceTitle.appendChild(clonedSubTitle);

    let products = Object.values(JsonData[category][product]);
    products[0].color.forEach(subItem=>{
        let colorSelector = document.querySelector("#colorSelector");
        let clonedSelector = colorSelector.content.cloneNode(true);
        clonedSelector.querySelector("a .colorSelector-word").textContent =subItem;
        productAppearanceSelector.appendChild(clonedSelector);
    })
}
const createMemorySelector = (category,product) => {
    let productMemoryTitle = document.querySelector(".products .product-memory-title");
    let productMemorySelector = document.querySelector(".products .product-memory-selector");
    productMemoryTitle.innerHTML ="";
    productMemorySelector.innerHTML = "";

    let subTitle = document.querySelector("#subTitle");
    let clonedSubTitle = subTitle.content.cloneNode(true);
    
    clonedSubTitle.querySelector("h6").textContent = "選擇儲存容量";
    productMemoryTitle.appendChild(clonedSubTitle);
}







window.addEventListener("load",getJSONdata);