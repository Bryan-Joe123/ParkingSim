class grid{
    height = 10;
    width = 10;
    density = 2;

    grid = [];

    generate(){
        this.width = document.getElementById("width").value;
        this.height = document.getElementById("height").value;
        this.density = document.getElementById("density").value;

        this.grid = [];
        for (let x = 0; x < this.width; x++) {
            this.grid.push([]);
            for (let y = 0; y < this.height; y++) {
                if(randBetween(1,this.density) == 1){
                    var veh = new vehicle();
                    veh.generate_numberplate();
                    veh.generate_stats();
                    veh.set_entry();
                    this.grid[x].push(veh);
                }else{
                    this.grid[x].push("")
                }
            }
        }
    }

    display(){
        var parent = document.getElementById("grid-container");
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

        var div = document.createElement("div");
        div.classList.add("grid-row");

        for(let y = 1; y <= this.height; y++){
            var number = document.createElement("button");
            number.innerHTML = y;
            number.classList.add("buttons");
            div.appendChild(number);
        }
        document.getElementById("grid-container").appendChild(div);

        for (let x = 0; x < this.width; x++) {
            var div = document.createElement("div");
            div.classList.add("grid-row");

            for (let y = 0; y < this.height; y++) {
                var button = document.createElement("button");
                if(this.grid[x][y] != ""){
                    button.innerHTML = this.grid[x][y].company + "<br>" + this.grid[x][y].number_plate;
                    button.classList.add("buttons-parked");
                    button.dataset.posx = x;
                    button.dataset.posy = y;
                }else{
                    button.innerHTML = "-"
                    button.classList.add("buttons-empty");
                    button.dataset.posx = x;
                    button.dataset.posy = y;
                }

                button.addEventListener("click",(e)=>{
                    cancel();
                    if(e.path[0].innerHTML == "-"){
                        editingx = e.path[0].dataset.posx;
                        editingy = e.path[0].dataset.posy;

                        document.getElementById("add").classList.remove("hide-add");
                        document.getElementById("add").classList.add("show-add");
                    }else{
                        editingx = e.path[0].dataset.posx;
                        editingy = e.path[0].dataset.posy;

                        document.getElementById("edit-type").value = this.grid[x][y].type;
                        document.getElementById("edit-color").value = this.grid[x][y].color;
                        document.getElementById("edit-company").value = this.grid[x][y].company;
                        document.getElementById("edit-plate").value = this.grid[x][y].number_plate;

                        document.getElementById("edit").classList.remove("hide-edit");
                        document.getElementById("edit").classList.add("show-edit");
                    }
                    
                    parking.display()
                })
                if(x == editingx && y == editingy)
                    button.classList.add("selected");
                button.classList.add("buttons");
                div.appendChild(button);
            }
            document.getElementById("grid-container").appendChild(div);
        }
    }

    add(auto = true,x,y,type,color,company,plate){
        this.grid[x][y] = new vehicle();

        if(auto){
            this.grid[x][y].generate_stats();
            this.grid[x][y].generate_numberplate();
        }else{
            this.grid[x][y].type = type;
            this.grid[x][y].number_plate = plate;
            this.grid[x][y].company = company;
            this.grid[x][y].color = color;
        }

        this.grid[x][y].set_entry();
    }

    remove(x,y){
        this.grid[x][y] = "";
        parking.display()
    }
}