// let query = window.location.search;
// console.log(query)
// let id = query.split('?')[1]
// let displayName=document.getElementById('title')
// console.log(id)
// fetch(`/api/${id}.json`)
//     .then(res => res.json()) //if only passing one argument and immediately returning can use this
//     .then((jsonRes) => {
//         console.log(jsonRes)
//         displayName.innerText = jsonRes.name;
//         fetch(`https://nominatim.openstreetmap.org/search/?q=${jsonRes.address}&format=json`)
//             .then(res => res.json())
//             .then((infoFromJson) => {
//             console.log(infoFromJson)
//         })
//     })

