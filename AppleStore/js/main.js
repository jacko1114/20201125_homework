import {$g, $c, choiceIcon, displayChinese} from './helper.js';

let JsonData = [];
let titles = [];

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
        const ul = $g("nav ul");
        let li = $c("li");
        let a = $c("a");
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
        let title = $g("#title");
        let cloneContent = title.content.cloneNode(true);

        subTitle.forEach(item => {
            let li = $c("li");
            let a = $c("a");
            let span = $c("span");
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

        $g("nav .subtitle").innerHTML = "";
        $g("nav .subtitle").appendChild(cloneContent);
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
    let productName = $g(".products .product-name");
    let h2 = $c("h2");
    productName.innerHTML = "";
    h2.classList.add("py-3","fw-bold","fs-4");
    h2.textContent = product;
    productName.appendChild(h2);
}

const createProductPrice = (category, product) => {
    let productPrice = $g(".products .product-price");
    let h3 = $c("h3");
    let price = Object.values(JsonData[category][product])[0]["base_price"];
    productPrice.innerHTML = "";
    h3.textContent = price;
    h3.classList.add("py-3","fs-4");
    productPrice.appendChild(h3);
}

const createProductImage = (category) => {
    let productPic = $g(".products .product-pic");
    productPic.innerHTML = "";
    let img = $c("img");
    img.src = `./images/${category}_base.png`;
    img.classList.add("w-75","d-inline-block");
    productPic.appendChild(img);
}

const createModelSelector = (category,product) => {
    let productModelTitle = $g(".products .product-model-title");
    let productModelSelector = $g(".products .product-model-selector");
    let subTitle = $g("#subTitle");
    let clonedSubTitle = subTitle.content.cloneNode(true);
    
    productModelTitle.innerHTML = "";
    productModelSelector.innerHTML = "";
    clonedSubTitle.querySelector("h3").textContent = `購買 ${product}`;
    clonedSubTitle.querySelector("h6").textContent = "選擇機型";
    productModelTitle.appendChild(clonedSubTitle);

    let products = Object.values(JsonData[category][product]);
    let productsName = Object.keys(JsonData[category][product]);

    products.forEach((item,index)=>{
        let modelSelector = $g("#modelSelector");
        let clonedSelector = modelSelector.content.cloneNode(true);
        clonedSelector.querySelector("a").setAttribute("data-product_name",`${productsName[index]}`)
        clonedSelector.querySelector("a .modelSelector-name").textContent = productsName[index];
        clonedSelector.querySelector("a .modelSelector-display").textContent = item.description;
        clonedSelector.querySelector("a .modelSelector-price").textContent = item.base_price;

        selectModel(clonedSelector.querySelector("a"),category,product);
        productModelSelector.appendChild(clonedSelector);
    })

    $g(".product-model").classList.add("border-bottom");
}

const createAppearanceSelector = (category,product) => {
    let productAppearanceTitle = $g(".products .product-appearance-title");
    let productAppearanceSelector = $g(".products .product-appearance-selector");
    productAppearanceTitle.innerHTML = "";
    productAppearanceSelector.innerHTML = "";

    let subTitle = $g("#subTitle");
    let clonedSubTitle = subTitle.content.cloneNode(true);
    clonedSubTitle.querySelector("h6").textContent = "選擇外觀";
    productAppearanceTitle.appendChild(clonedSubTitle);

    let products = Object.values(JsonData[category][product]);
    products[0].color.forEach(subItem=>{
        let colorSelector = $g("#colorSelector");
        let clonedSelector = colorSelector.content.cloneNode(true);
        clonedSelector.querySelector("a .colorSelector-word").textContent = displayChinese(subItem);
        clonedSelector.querySelector("a .colorSelector-plantium").classList.add(`${subItem}`);

        selectAppearance(clonedSelector.querySelector("a"), subItem, product);

        productAppearanceSelector.appendChild(clonedSelector);
    })

    $g(".product-appearance").classList.add("border-bottom","non-selected");
}

const createMemorySelector = (category,product) => {
    let productMemoryTitle = $g(".products .product-memory-title");
    let productMemorySelector = $g(".products .product-memory-selector");
    productMemoryTitle.innerHTML ="";
    productMemorySelector.innerHTML = "";

    let subTitle = $g("#subTitle");
    let clonedSubTitle = subTitle.content.cloneNode(true);
    
    clonedSubTitle.querySelector("h6").textContent = "選擇儲存容量";
    productMemoryTitle.appendChild(clonedSubTitle);

    let products = Object.values(JsonData[category][product]);

        products[0].memory.forEach(item=>{
            let memorySelector = $g("#memorySelector");
            let clonedSelector = memorySelector.content.cloneNode(true);
            clonedSelector.querySelector("a .memorySelector-memory").textContent = Object.keys(item)[0];
            clonedSelector.querySelector("a .memorySelector-price").textContent = Object.values(item)[0];
            clonedSelector.querySelector("a").setAttribute("data-item",`${Object.values(item)[0]}`);
            productMemorySelector.appendChild(clonedSelector);
        })

    $g(".product-memory").classList.add("non-selected");
}

const createContinue = () => {
    let productTotal = $g(".product-total");
    let continueBtn = $g("#continue");
    let clonedContinueBtn = continueBtn.content.cloneNode(true);
    productTotal.innerHTML = "";
    productTotal.classList.add("bg-light");
    productTotal.appendChild(clonedContinueBtn);
    $g(".product-total").classList.add("border-bottom","non-selected");
}

const selectModel = (target,category,product) => {
    target.addEventListener("click",function(){
        console.log($g(".product-model-selector a"))
        if($g(".product-model-selector a").length > 1){
            $g(".product-model-selector a").forEach(item=>{
                item.classList.remove("selected");
            })
        }
        $g(".product-appearance-selector a").forEach(item=>{
            item.setAttribute("data-product_name",this.dataset.product_name);
        })

        $g(".products .product-memory-selector").innerHTML = "";
        let products = JsonData[category][product][this.dataset.product_name];
            products.memory.forEach(item=>{
            let memorySelector = $g("#memorySelector");
            let clonedSelector = memorySelector.content.cloneNode(true);
            clonedSelector.querySelector("a .memorySelector-memory").textContent = Object.keys(item)[0];
            clonedSelector.querySelector("a .memorySelector-price").textContent = Object.values(item)[0];
            clonedSelector.querySelector("a").setAttribute("data-item",`${Object.values(item)[0]}`);
            selectMemory(clonedSelector.querySelector("a"));

            $g(".products .product-memory-selector").appendChild(clonedSelector);
        })


        this.classList.add("selected");
        $g(".product-appearance").classList.remove("non-selected");
    })
}

const selectAppearance = (target,color) => {
    target.addEventListener("click",function(){
        $g(".product-appearance-selector a").forEach(item=>{
            item.classList.remove("selected");
        })
        
        this.classList.add("selected")
        $g(".product-memory").classList.remove("non-selected");

        $g(".product-pic img").src = `./images/${this.dataset.product_name}_${color}.png`;
    })
}

const selectMemory = (target) =>{
    target.addEventListener("click",function(){
        $g(".product-memory-selector a").forEach(item=>{
            item.classList.remove("selected");
        })
        $g(".product-total h3").textContent = `${this.dataset.item}`;
        $g(".product-price h3").textContent = `${this.dataset.item}`;
        
        this.classList.add("selected")
        $g(".product-total").classList.remove("non-selected");
    })
}

window.addEventListener("load",getJSONdata);