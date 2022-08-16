var parking = new grid();
var editingx = ""
var editingy = ""

function generate_grid(){
    parking.generate();
    parking.display();
}

function add(){
    var rows = document.getElementById("grid-container").children;
    var button = rows[editingx].children[editingy];

    let type
    let color
    let company
    let plate

    if(document.getElementById("add").classList.contains("show-add")){
        type = document.getElementById("add-type").value;
        color = document.getElementById("add-color").value;
        company = document.getElementById("add-company").value;
        plate = document.getElementById("add-plate").value;
    }else{
        type = document.getElementById("edit-type").value;
        color = document.getElementById("edit-color").value;
        company = document.getElementById("edit-company").value;
        plate = document.getElementById("edit-plate").value;
    }
    

    parking.add(false,editingx,editingy,type,color,company,plate);
    parking.display();

    button.classList.remove("selected");

    cancel();
}

function remove(){
    parking.remove(editingx,editingy);
    parking.display();

    document.getElementById("edit").classList.remove("show-edit");
    document.getElementById("edit").classList.add("hide-edit");
}

function cancel(){
    document.getElementById("add").classList.remove("show-add");
    document.getElementById("add").classList.add("hide-add");
    document.getElementById("edit").classList.remove("show-edit");
    document.getElementById("edit").classList.add("hide-edit");
}