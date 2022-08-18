var parking = new grid();
var entry_receipt = "";
var exit_receipt = "";
var duration_receipt = "";
var fee_receipt = "";
var editingx = "";
var editingy = "";

function generate_grid(){
    parking.generate();
    parking.display();
}

function add(){
    var rows = document.getElementById("grid-container").children;
    var button = rows[editingx].children[editingy];

    let type;
    let color;
    let company;
    let plate;
    let time;

    if(document.getElementById("add").classList.contains("show-popup")){
        type = document.getElementById("add-type").value;
        color = document.getElementById("add-color").value;
        company = document.getElementById("add-company").value;
        plate = document.getElementById("add-plate").value;
    }else{
        type = document.getElementById("edit-type").value;
        color = document.getElementById("edit-color").value;
        company = document.getElementById("edit-company").value;
        plate = document.getElementById("edit-plate").value;
        time = document.getElementById("edit-time").value;
    }

    parking.add(false,editingx,editingy,type,color,company,plate,time);
    parking.display();

    button.classList.remove("selected");

    cancel();
}

function exit(){
    window.open('http://127.0.0.1:5500/reciept.html'+"?entry="+entry_receipt+"&exit="+exit_receipt+"&duration="+duration_receipt+"&fee="+fee_receipt, '_blank');
    remove();
}

function remove(){
    parking.remove(editingx,editingy);
    parking.display();

    document.getElementById("edit").classList.remove("show-popup");
    document.getElementById("edit").classList.add("hide-popup");
}

function cancel(){
    document.getElementById("add").classList.remove("show-popup");
    document.getElementById("add").classList.add("hide-popup");
    document.getElementById("edit").classList.remove("show-popup");
    document.getElementById("edit").classList.add("hide-popup");
    document.getElementById("fee").classList.remove("show-popup");
    document.getElementById("fee").classList.add("hide-popup");
    document.getElementById("stat").classList.remove("show-popup");
    document.getElementById("stat").classList.add("hide-popup");
}

function stats(){
    parking.stats();
}
