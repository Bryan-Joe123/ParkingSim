class vehicle{
    type = "";
    number_plate = "";
    company = "";
    entry_time = "";
    color = "";

    generate_numberplate() {
        var number = randBetween(123,9999);
        this.number_plate = states[randBetween(0,states.length-1)] + " " + number;
    }

    generate_stats(){
        this.color = colors[randBetween(0,colors.length-1)];
        this.company = companies[randBetween(0,companies.length-1)];
        this.type = types[randBetween(0,types.length-1)];
    }

    set_entry(){
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        this.entry_time = hour + ":" + minute + ":" + second;
    }
}