let url = "https://bsopendata.azurewebsites.net/api/LeisureTravel/Attractions";
let data = [];
let center = [25.03484, 121.51763];
let map;
let dark = false;
new TwCitySelector(); //使用套件產生縣市選取器
const createMarker = (region) => {
    let result = data.filter(item => item.Region == region)
    let markers = L.markerClusterGroup();
    result.forEach(item => {
        let info = `<h1>${item.Name}</h1> 
        <h3>連絡電話 : ${item.Tel.replace("886-","0")}</h3>
        <h4>地址 : ${item.Add}</h4>
        ${item.Website != ""? `<h4>官網 : <a href="${item.Website}" target="_blank">${item.Website}</a></h4>`:""}
        <h4>開放時間 : ${item.Opentime}</h4>
        ${item.Ticketinfo == "" || item.Ticketinfo == null ? "" :`<h4>門票資訊 :  ${item.Ticketinfo}</h4>`}
        <p>${item.Description == null ? "": item.Description.length > 40 ? item.Description.substring(0,40) + "...":item.Description}</p>`

        let marker = L.marker([item.Py, item.Px], {
            title: item.Name,
            opacity: 1.0
        })
        marker.bindPopup(info).openPopup();
        markers.addLayer(marker)
    })
    map.addLayer(markers)
    map.setView([result[result.length - 1].Py, result[result.length - 1].Px], 13);
}
const fetchData = async () => {
    await fetch(url)
        .then(res => res.json())
        .then(result => {
            data = result.XML_Head.Infos.Info;
            createMarker("臺北市");
            createFilterResult("臺北市");
        })
}
const createMap = () => {
    map = L.map('map', {
        center: center,
        zoom:20,
        attributionControl: false
    });
    L.control.zoom({
        position: 'topright'
    }).addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

}

const cleanMarker = () => {
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer)
        }
    })
}
const createFilterResult = (region) => {
    let result = document.querySelector(".result");
    result.innerHTML = "";
    data.filter(item => item.Region == region).forEach(item => {
        let div = document.createElement("div");
        div.className = "result-item";
        div.innerHTML =
            `<div class="card-title">
        <h2>${item.Name}<a href="javascript:;" class="btn-search" data-Px="${item.Px}" data-Py="${item.Py}">查詢地點</a></h2> 
        </div>
        <div class="card-body">
        <h4>連絡電話 : ${item.Tel.replace("886-","0")}</h4>
        <h5>地址 : ${item.Add}</h5>
        <h5>開放時間 : ${item.Opentime}</h5>
        ${item.Ticketinfo == "" || item.Ticketinfo == null ? "" :`<h5>門票資訊 :  ${item.Ticketinfo}</h5>`}</div>`
        result.appendChild(div);
    })
    document.querySelectorAll(".btn-search").forEach(item => {
        item.addEventListener("click", function () {
            searchLocation(item);
        })
    })
}
const searchLocation = (target) => {
    map.setView([target.dataset.py, target.dataset.px], 18);
}
const getPosition = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosSuccess, getPosFail);
    }
}
const getPosSuccess = location => {
    map.setView([location.coords.latitude, location.coords.longitude], 18);
}
const getPosFail = () => {}

window.addEventListener("load", function () {
    fetchData();
    createMap();
})

document.querySelector(".button-select").addEventListener("click", function () {
    let region = document.querySelector(".county").value;
    cleanMarker();
    createMarker(region);
    createFilterResult(region);
})

document.querySelector(".button-all").addEventListener("click", function () {
    setTimeout(() => {
        document.querySelector(".loading").style.opacity = 1;
    }, 0)
    setTimeout(() => {
        let markers = L.markerClusterGroup();
        data.forEach(item => {
            let info = `<h1>${item.Name}</h1> 
        <h3>連絡電話 : ${item.Tel.replace("886-","0")}</h3>
        <h4>地址 : ${item.Add}</h4>
        ${item.Website != ""? `<h4>官網 : <a href="${item.Website}" target="_blank">${item.Website}</a></h4>`:""}
        <h4>開放時間 : ${item.Opentime}</h4>
        ${item.Ticketinfo == "" || item.Ticketinfo == null ? "" :`<h4>門票資訊 :  ${item.Ticketinfo}</h4>`}
        <p>${item.Description == null ? "": item.Description.length > 40 ? `${item.Description.substring(0,40)}...`:item.Description}</p>`

            let marker = L.marker([item.Py, item.Px], {
                title: item.Name,
                opacity: 1.0
            })
            marker.bindPopup(info).openPopup();
            markers.addLayer(marker)
        })
        map.addLayer(markers)

        map.setView(center, 10);
    }, 1000)
    setTimeout(() => {
        document.querySelector(".loading").style.opacity = 0;
    }, 3000)
})

document.querySelector("label[for='themes']").addEventListener("click", function () {
    let checked = !document.querySelector("#themes").checked
    if (checked) document.querySelector("body").classList.add("dark-theme")
    else document.querySelector("body").classList.remove("dark-theme")
    dark = !dark;
    if (dark) {
        let Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        });
        map.addLayer(Stadia_AlidadeSmoothDark)
    } else L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
})
document.querySelector(".side-menu-btn").addEventListener("click", function () {
    document.querySelector(".side-menu").classList.toggle("close");
    document.querySelector(".side-menu-btn").classList.toggle("close");
})