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
