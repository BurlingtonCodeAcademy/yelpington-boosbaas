
let mymap = L.map('mapid').setView([44.476264, -73.212883], 16)


L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    minZoom: 15,
    maxZoom: 17,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
    id: 'mapbox.streets'
}).addTo(mymap);

window.fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')
    .then(response => response.json())
    .then((json) => {
        const target = document.getElementById("restaurantList");

        const postList = document.createElement("ul")

        const posts = json.map((postData) => {
            const listItem = document.createElement("li")
            let link = listItem.appendChild(document.createElement("a"))
            link.textContent = `${postData.name}`; //populates list
            link.href = `${postData.website}` //links to restaurant's website
            
            placeMarker(postData)
            return listItem;

        });

        posts.forEach((post) => {
            postList.appendChild(post);
        })

        target.append(postList);

        return undefined;
    })

function placeMarker(restaurant) {
    const { name, address, website, phone, hours,notes } = restaurant //destructuring object to make calling easier
    fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
        .then(data => {
            return data.json()
        })
        .then((locationInfo) => {
            let info = locationInfo[0];
            let lat = info.lat;
            let lon = info.lon;
            let display=`${name} ${hours} ${notes}`
            L.marker([lat, lon]).addTo(mymap).bindPopup(display)
            
        })

}



