// function getParameters() {
let urlString = window.location.href;
let paramString = urlString.split('?')[1];
let queryString = new URLSearchParams(paramString);
for(let pair of queryString.entries()) {
    document.getElementById(pair[0]).innerHTML = document.getElementById(pair[0]).innerHTML+": "+pair[1];
}

print();
setInterval(window.close,200)
