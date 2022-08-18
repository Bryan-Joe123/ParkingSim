class grid{
    height = 10;
    width = 10;
    density = 2;

    grid = [];
    alloted = [];

    no_parked = 0;
    no_empty = 0;

    row_no_parked = [];
    row_no_empty = [];

    col_no_parked = [];
    col_no_empty = [];
    
    generate(){
        this.width = document.getElementById("width").value;
        this.height = document.getElementById("height").value;
        this.density = document.getElementById("density").value;

        this.grid = [];
        for (let x = 0; x < this.width; x++) {
            this.grid.push([]);
            this.alloted.push([]);
            for (let y = 0; y < this.height; y++) {
                if(x >= this.width-this.width/5)
                    this.alloted[x].push("Truck")
                else if(x >= this.width/2)
                    this.alloted[x].push("Motorcycle")
                else
                    this.alloted[x].push("Car")
                
                if(randBetween(1,this.density) == 1){
                    var veh = new vehicle();
                    veh.generate_numberplate();
                    veh.generate_stats();
                    veh.set_entry_rand();
                    veh.type = this.alloted[x][y];
                    this.grid[x].push(veh);
                }else{
                    this.grid[x].push("");
                }
            }
        }
    }

    display(){
        this.no_parked = 0;
        this.no_empty = 0;
        this.row_no_parked = [];
        this.row_no_empty = [];
        this.col_no_parked = [];
        this.col_no_empty = [];

        var d = new Date();
        
        var parent = document.getElementById("grid-container");
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

        var div = document.createElement("div");
        div.classList.add("grid-row");

        for(let y = 0; y <= this.height; y++){
            var number = document.createElement("button");
            if(y!=0){
                number.innerHTML = convertToLetters(y);
                number.addEventListener("click",(e)=>{
                    document.getElementById("stat-parked").value = this.col_no_parked[convertToNumbers(e.path[0].innerHTML)-1];
                    document.getElementById("stat-empty").value = this.col_no_empty[convertToNumbers(e.path[0].innerHTML)-1];
                    document.getElementById("stat").classList.remove("hide-popup");
                    document.getElementById("stat").classList.add("show-popup");
                })
            }else{
                number.innerHTML = "";
            }
            number.classList.add("buttons");
            div.appendChild(number);
        }
        document.getElementById("grid-container").appendChild(div);

        for (let x = 0; x < this.width; x++) {
            var div = document.createElement("div");
            if((x+1)%2==0)
                div.classList.add("grid-row");
            else
                div.classList.add("grid-row-lanegap");

            var number = document.createElement("button");
            number.innerHTML = x+1;
            number.addEventListener("click",(e)=>{
                document.getElementById("stat-parked").value = this.row_no_parked[e.path[0].innerHTML-1];
                document.getElementById("stat-empty").value = this.row_no_empty[e.path[0].innerHTML-1];
                document.getElementById("stat").classList.remove("hide-popup");
                document.getElementById("stat").classList.add("show-popup");
            })
            number.classList.add("buttons");
            div.appendChild(number);

            for (let y = 0; y < this.height; y++) {
                var button = document.createElement("button");
                if(this.grid[x][y] != ""){
                    this.grid[x][y].calculate_duration();
                    button.innerHTML = "<br>" + this.grid[x][y].date+" | "+this.grid[x][y].duration + "<br>" + this.grid[x][y].number_plate;
                    button.classList.add("buttons-parked");
                    button.dataset.posx = x;
                    button.dataset.posy = y;
                }else{
                    button.innerHTML = ""
                    button.classList.add("buttons-empty");
                    button.dataset.posx = x;
                    button.dataset.posy = y;
                    button.dataset.type = this.alloted[x][y];
                }
                if(this.alloted[x][y]=="Car"){
                    button.classList.add("fa");
                    button.classList.add("fa-car");
                }else if(this.alloted[x][y]=="Truck"){
                    button.classList.add("fa");
                    button.classList.add("fa-truck");
                }else{
                    button.classList.add("fa");
                    button.classList.add("fa-motorcycle");
                }
                button.addEventListener("click",(e)=>{
                    cancel();
                    if(e.path[0].innerHTML == ""){
                        editingx = e.path[0].dataset.posx;
                        editingy = e.path[0].dataset.posy;

                        document.getElementById("add-type").value = e.path[0].dataset.type;
                        document.getElementById("add").classList.remove("hide-popup");
                        document.getElementById("add").classList.add("show-popup");
                    }else{
                        editingx = e.path[0].dataset.posx;
                        editingy = e.path[0].dataset.posy;

                        this.grid[x][y].calculate_duration();

                        document.getElementById("edit-type").value = this.grid[x][y].type;
                        document.getElementById("edit-color").value = this.grid[x][y].color;
                        document.getElementById("edit-company").value = this.grid[x][y].company;
                        document.getElementById("edit-plate").value = this.grid[x][y].number_plate;
                        document.getElementById("edit-time").value = this.grid[x][y].entry_time;
                        document.getElementById("edit-duration").value = this.grid[x][y].duration;

                        entry_receipt = this.grid[x][y].hour + ":" + this.grid[x][y].minute;
                        fee_receipt = (((d.getHours() - this.grid[x][y].hour)*60)+(d.getMinutes() - this.grid[x][y].minute) * 1) + "Rs";
                        duration_receipt = (d.getHours() - this.grid[x][y].hour) + "h " + (d.getMinutes() - this.grid[x][y].minute) + "m";

                        document.getElementById("edit").classList.remove("hide-popup");
                        document.getElementById("edit").classList.add("show-popup");
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

        var no_parked = 0;
        var no_empty = 0;
        for (let x = 0; x < this.width; x++) {
            var row_empty_counter = 0;
            var row_parked_counter = 0;
            

            this.grid[x].forEach(element => {
                if(element==""){
                    row_empty_counter++;
                }else{
                    row_parked_counter++;
                }
            });

            this.row_no_parked.push(row_parked_counter);
            this.row_no_empty.push(row_empty_counter);


            for (let y = 0; y < this.height; y++) {
                if(this.grid[x][y] == ""){
                    this.no_empty++;
                }else{
                    this.no_parked++;
                }
            }
        }

        for (let v = 0; v < this.width; v++) {
            var col_empty_counter = 0;
            var col_parked_counter = 0;
            for (let z = 0; z < this.grid.length; z++) {
                for (let w = 0; w < this.grid[z].length; w++) {
                    if(w==v){
                        if(this.grid[z][w]==""){
                            col_empty_counter++;
                        }else{
                            col_parked_counter++;
                        }
                    }
                }
                
            }
            this.col_no_parked.push(col_parked_counter);
            this.col_no_empty.push(col_empty_counter);
        }
        document.getElementById("no_empty").innerHTML = "Empty Spots: " + this.no_empty;
        document.getElementById("no_parked").innerHTML = "Vehicles Parked: " +  this.no_parked;
    }

    add(auto = true,x,y,type,color,company,plate,time){
        this.grid[x][y] = new vehicle();

        if(auto){
            this.grid[x][y].generate_stats();
            this.grid[x][y].generate_numberplate();
        }else{
            this.grid[x][y].type = type;
            this.grid[x][y].number_plate = plate;
            this.grid[x][y].company = company;
            this.grid[x][y].color = color;
            this.grid[x][y].entity_time = time;
        }
        this.grid[x][y].set_date();
        this.grid[x][y].set_entry();
    }

    remove(x,y){
        this.grid[x][y] = "";
        document.getElementById("fee").classList.remove("hide-popup");
        document.getElementById("fee").classList.add("show-popup");
        parking.display();
    }
}