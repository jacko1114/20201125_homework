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
        createContinue();
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
    img.classList.add("w-75","d-inline-block");
    productPic.appendChild(img);
}
const createModelSelector = (category,product) => {
    let productModelTitle = document.querySelector(".products .product-model-title");
    let productModelSelector = document.querySelector(".products .product-model-selector");
    let subTitle = document.querySelector("#subTitle");
    let clonedSubTitle = subTitle.content.cloneNode(true);
    
    productModelTitle.innerHTML = "";
    productModelSelector.innerHTML = "";
    clonedSubTitle.querySelector("h3").textContent = `購買 ${product}`;
    clonedSubTitle.querySelector("h6").textContent = "選擇機型";
    productModelTitle.appendChild(clonedSubTitle);

    let products = Object.values(JsonData[category][product]);
    let productsName = Object.keys(JsonData[category][product]);

    products.forEach((item,index)=>{
        let modelSelector = document.querySelector("#modelSelector");
        let clonedSelector = modelSelector.content.cloneNode(true);
        clonedSelector.querySelector("a").setAttribute("data-product_name",`${productsName[index]}`)
        clonedSelector.querySelector("a .modelSelector-name").textContent = productsName[index];
        clonedSelector.querySelector("a .modelSelector-display").textContent = item.description;
        clonedSelector.querySelector("a .modelSelector-price").textContent = item.base_price;

        selectModel(clonedSelector.querySelector("a"),category,product);
        productModelSelector.appendChild(clonedSelector);
    })

    document.querySelector(".product-model").classList.add("border-bottom");
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
        clonedSelector.querySelector("a .colorSelector-word").textContent = displayChinese(subItem);
        clonedSelector.querySelector("a .colorSelector-plantium").classList.add(`${subItem}`);

        selectAppearance(clonedSelector.querySelector("a"), subItem, product);

        productAppearanceSelector.appendChild(clonedSelector);
    })

    document.querySelector(".product-appearance").classList.add("border-bottom","non-selected");
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

    let products = Object.values(JsonData[category][product]);

        products[0].memory.forEach(item=>{
            let memorySelector = document.querySelector("#memorySelector");
            let clonedSelector = memorySelector.content.cloneNode(true);
            clonedSelector.querySelector("a .memorySelector-memory").textContent = Object.keys(item)[0];
            clonedSelector.querySelector("a .memorySelector-price").textContent = Object.values(item)[0];
            clonedSelector.querySelector("a").setAttribute("data-item",`${Object.values(item)[0]}`);
            productMemorySelector.appendChild(clonedSelector);
        })

    document.querySelector(".product-memory").classList.add("non-selected");
}

const createContinue = () => {
    let productTotal = document.querySelector(".product-total");
    let continueBtn = document.getElementById("continue");
    let clonedContinueBtn = continueBtn.content.cloneNode(true);
    productTotal.innerHTML = "";
    productTotal.classList.add("bg-light");
    productTotal.appendChild(clonedContinueBtn);
    document.querySelector(".product-total").classList.add("border-bottom","non-selected");
}

const selectModel = (target,category,product) => {
    target.addEventListener("click",function(){
        document.querySelectorAll(".product-model-selector a").forEach(item=>{
            item.classList.remove("selected");
        })
        document.querySelectorAll(".product-appearance-selector a").forEach(item=>{
            item.setAttribute("data-product_name",this.dataset.product_name);
        })

        document.querySelector(".products .product-memory-selector").innerHTML = "";
        let products = JsonData[category][product][this.dataset.product_name];
            products.memory.forEach(item=>{
            let memorySelector = document.querySelector("#memorySelector");
            let clonedSelector = memorySelector.content.cloneNode(true);
            clonedSelector.querySelector("a .memorySelector-memory").textContent = Object.keys(item)[0];
            clonedSelector.querySelector("a .memorySelector-price").textContent = Object.values(item)[0];
            clonedSelector.querySelector("a").setAttribute("data-item",`${Object.values(item)[0]}`);
            selectMemory(clonedSelector.querySelector("a"));

            document.querySelector(".products .product-memory-selector").appendChild(clonedSelector);
        })


        this.classList.add("selected");
        document.querySelector(".product-appearance").classList.remove("non-selected");
    })
}

const selectAppearance = (target,color) => {
    target.addEventListener("click",function(){
        document.querySelectorAll(".product-appearance-selector a").forEach(item=>{
            item.classList.remove("selected");
        })
        
        this.classList.add("selected")
        document.querySelector(".product-memory").classList.remove("non-selected");

        document.querySelector(".product-pic img").src = `./images/${this.dataset.product_name}_${color}.png`;
    })
}

const selectMemory = (target) =>{
    target.addEventListener("click",function(){
        document.querySelectorAll(".product-memory-selector a").forEach(item=>{
            item.classList.remove("selected");
        })
        document.querySelector(".product-total h3").textContent = `${this.dataset.item}`;
        document.querySelector(".product-price h3").textContent = `${this.dataset.item}`;
        
        this.classList.add("selected")
        document.querySelector(".product-total").classList.remove("non-selected");
    })
}



const choiceIcon = (device) => {
    let i = document.createElement("i");
    i.classList.add("fas","fs-1");

    device.includes("iPhone") ? i.classList.add("fa-mobile-alt")
    : device.includes("iPad") ? i.classList.add("fa-tablet-alt") 
    : i.classList.add("fa-laptop");

    return i;
}
const displayChinese = (eng) => {
    let color = "";
    switch(eng){
        case "white":
            color = "米白";
            break;
        case "black":
            color = "黑";
            break;
        case "red":
            color = "紅";
            break;
        case "blue":
            color = "海軍藍";
            break;
        case "yellow":
            color = "黃";
            break;
        case "coral":
            color = "珊瑚紅";
            break;
        case "green":
            color = "綠";
            break;
        case "purple":
            color = "紫";
            break;
        case "graphite":
            color = "石墨黑";
            break;
        case "silver":
            color = "金屬銀";
            break;
        case "gold":
            color = "玫瑰金";
            break;
        case "gray":
            color = "太空灰";
            break;
    }
    return `${color}色`;
}







window.addEventListener("load",getJSONdata);