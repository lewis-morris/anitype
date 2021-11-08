class Typer {

    constructor(element, text=null) {

        // enum directions
        this.DIRECTIONS = Object.freeze({ "FORWARD": 1, "BACKWARDS": 0 })
        
        if(typeof(element) === "string"){
            this.element = document.getElementById(element_id)
        }else{
            this.element = element
        }

        if(text){
            this.element.innerText = text
        }

        this.split_text = this.element.innerText.split("|")
        this.current_element = 0
        this.current_position = 0
        this.direction = this.DIRECTIONS.FORWARD
        this.move_times = 0
        this.end_of_line = false
        this.back_start = 0
        this.time_val = 0
        // blank the element out
        this.element.innerHTML = "&nbsp;"
        this.blinker = " |"
    }



    async run() {
        // infinatly loop the change of text with a random wait time
        setTimeout(() => {
            this.update_element();
            this.run()
        },
            this.wait_time())

    }

    random_letter() {
        const alphabet = "abcdefghijklmnopqrstuvwxyz"
        return alphabet[Math.floor(Math.random() * alphabet.length)]
    }

    update_element() {
        var new_text = this.get_new_text()

        if (new_text == "" || new_text == null) {
            this.element.innerHTML = "&nbsp;"
        } else {
            // if the start of a backwards animation first draw the wrong letter
            if (this.back_start == 1) {
                // draw random letter to the end
                this.element.innerText = new_text.slice(0, new_text.length) + this.random_letter()
                // give an extra pause for error typing
                this.time_val = 300
                // increment the flag to going backwards
                this.back_start++
            } else {
                // reset the flag to zero to resume normal oreration.
                this.back_start = 0
                // reset time val
                this.time_val = 0
                // normal text
                this.element.innerText = new_text
            }
        }
    }
    check_change_elements() {

        // check if needs new directions
        this.get_forward_times()
        // reset flag

        var reset = false
        // move current position forward or backwards
        if (this.current_position === this.split_text[this.current_element].length) {
            this.current_position = 0
            this.move_times = 0
            reset = true
        } else {
            // move in the direction of travel by 1
            if (this.direction === this.DIRECTIONS.FORWARD || this.current_position === 0) {
                this.current_position++
                //if end of line reached, increase the pause at the end
                if (this.current_position == this.split_text[this.current_element].length) {
                    this.end_of_line = true
                }

            } else {
                // get the next character back
                if (this.back_start == 0) {
                    var next_character = this.split_text[this.current_element].slice(this.current_position - 1, this.current_position)
                    // if going back a position == a blank space then zero the dont decrement the position and reset the move times.
                    if (next_character == " " || next_character == "" || next_character == null) {
                        this.move_times == 0
                    } else {
                        this.current_position--
                    }
                }

            }
            // decrement the move times
            this.move_times--
        }

        // if position was reset it means the index will need it too
        if (reset) {
            // change array index if needed
            if (this.current_element == this.split_text.length - 1) {
                this.current_element = 0

            } else {
                this.current_element++
            }
        }
    }

    get_forward_times() {
        var direction
        // if move_times is 0 then populate them with a number or places and a direction to travel.
        // Backwards is always less than forwards movements
        if (this.move_times <= 0) {
            direction = Math.floor(Math.random() * 25);   // was 25
            if (direction >= 2 || this.current_position <= 2) {
                this.direction = this.DIRECTIONS.FORWARD
                this.move_times = Math.floor(Math.random() * 3);
            } else {
                this.direction = this.DIRECTIONS.BACKWARDS
                this.move_times = Math.floor(Math.random() * 5) + 3;
                this.back_start = 1
            }
        }
    }

    get_new_text() {
        // check if need to switch array elements and move the cursur.
        this.check_change_elements()
        // get the actual text is
        return this.split_text[this.current_element].slice(0, this.current_position)
    }

    wait_time() {
        // used to get the time to wait between keystrokes, if the direction is backwards then it will happen faster.

        if (this.DIRECTIONS.FORWARD == this.direction) {
            // sometimes take a extra pause
            this.time_val = 70
            if (Math.floor(Math.random() * 8) == 0) {
                this.time_val = Math.floor(Math.random() * 230) + 200
            }
        } else {
            // less time for backspace as you generally hold it down
            this.time_val = 40
        }
        // if its the end of the line pause more before continuing
        if (this.end_of_line) {
            this.end_of_line = false;
            this.time_val = this.time_val + 700
        }
        // if error typing then add an extra pause
        if (this.back_start) {
            this.time_val = this.time_val + 300
        }
        return Math.floor(Math.random() * 100) + this.time_val;
    }

}

window.typers = []
var typer 

document.querySelectorAll("[data-typer]").forEach(value => {
    let text = null
    if(value.hasAttribute("data-text")){
        text = value.getAttribute("data-text")
    }
    typer = new Typer(value, text)
    typer.run()
    typers.push(typer)
})