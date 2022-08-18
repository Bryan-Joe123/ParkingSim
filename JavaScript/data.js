var types = ["Car","Motorcycle","Truck"]
var companies = [
    "Audi","BMW","Chevrolet","Dodge","Honda","Jaguar","MAZDA","Mercedes-Benz","NISSAN","FIAT",
    "SCION","Subaru","Bentley","Buick","Ford","HYUNDAI","LEXUS","MASERATI","Ferrari","Volkswagen",
    "Acura","Cadillac","INFINITI","KIA","Mitsubishi","TOYOTA","Volvo","Chrysler","Lincoln","GMC",
    "RAM","CHEVROLET","Jeep","Land Rover"
]

var colors = ["Red","Black","Ash","Blue","White"]
var states = [
    "AP","AR","AS","BR","CG","GA","GJ","HR",
    "HP","JH","KA","KL","MP","MH","MN","ML",
    "MZ","NL","OD","PB","SK","TN","TS","TR",
    "UP","UK","WB"
]

function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function convertToNumbers(str) {
    if ((typeof str === "string" || str instanceof String) && /^[a-zA-Z]+$/.test(str)) {
        str = str.toUpperCase();
        let out = 0,
        len = str.length;
        for (pos = 0; pos < len; pos++) {
        out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
        }
        return out;
    } else {
        return undefined;
    }
}

function convertToLetters(num){
var s = '', t;

while (num > 0) {
    t = (num - 1) % 26;
    s = String.fromCharCode(65 + t) + s;
    num = (num - t)/26 | 0;
}
return s || undefined;
}