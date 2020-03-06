


let mymap = L.map('mapid').setView([44.476264, -73.212883], 16)


L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 18,
    ext: 'jpg'
}).addTo(mymap);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
id: 'mapbox.streets'
}).addTo(mymap);

window.fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')
    .then(response => response.json())
    .then((json) => {
        const target = document.getElementById("restaurantList");

        const postList = document.createElement("ol")

        const posts = json.map((postData) => {
            const listItem = document.createElement("li")
            listItem.textContent = `address:${postData.address}`;

            placeMarker(postData.address, "wtf")
            return listItem;

        });
        console.log("TEST posts" + posts)
        posts.forEach((post) => {
            postList.appendChild(post);


        })

        target.append(postList);

        return undefined;
    })


function placeMarker(address, myInfo) {
    fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
        .then(data => {
            return data.json()
        })
        .then((locationInfo) => {
            let info = locationInfo[0];
            let lat = info.lat;
            let lon = info.lon;
            L.marker([lat, lon]).addTo(mymap).bindPopup(myInfo)
            console.log("TEST" + lat + lon)
        })

}
