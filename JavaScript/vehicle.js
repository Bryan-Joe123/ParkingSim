class vehicle{
    type = "";
    number_plate = "";
    company = "";
    entry_time = "";
    color = "";
    duration = "";
    date = "";

    date_obj = new Date();

    hour = 0;
    minute = 0;
    
    generate_numberplate() {
        var number = randBetween(123,9999);
        this.number_plate = states[randBetween(0,states.length-1)] + " " + number;
    }

    generate_stats(){
        this.color = colors[randBetween(0,colors.length-1)];
        this.company = companies[randBetween(0,companies.length-1)];
        this.date = this.date_obj.getDate()+"/"+(this.date_obj.getMonth()+1)+"/"+this.date_obj.getFullYear();
        // this.type = types[randBetween(0,types.length-1)];
        // this.set_entry()
        this.calculate_duration()
    }

    set_date(){
        this.date = this.date_obj.getDate()+"/"+(this.date_obj.getMonth()+1)+"/"+this.date_obj.getFullYear();
    }

    set_entry_rand(){
        this.hour = clamp(this.date_obj.getHours() - randBetween(1,this.date_obj.getHours()),1,this.date_obj.getHours());
        this.minute = clamp(this.date_obj.getMinutes() - randBetween(1,this.date_obj.getMinutes()),1,this.date_obj.getMinutes());
        this.entry_time = this.hour + ":" + this.minute;
    }

    set_entry(){
        this.hour = this.date_obj.getHours();
        this.minute = this.date_obj.getMinutes();

        this.entry_time = this.hour + ":" + this.minute;
    }

    calculate_duration(){
        const hour = this.date_obj.getHours();
        const minute = this.date_obj.getMinutes();

        var elapsed = (hour - this.hour) + "h " + (minute - this.minute) + "m";
        this.duration = elapsed;

        document.getElementById("fee-fee").value = (((hour - this.hour)*60)+(minute - this.minute) * 1) + "Rs";
        exit_receipt = hour + ":" + minute;
    }
}