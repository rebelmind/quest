class Game {
    event = "1";
    choices;
    wins = 0;
    losses = 0;
    constructor() {
        this.textContainer = document.querySelector("#text");
        this.btnsContainer = document.querySelector("#btns");
        this.images = document.querySelector("#img");
        this.choices = new Data().choices;
        if (localStorage.getItem("stats") != null) {
            if (confirm("Есть сохраненные данные, Хотите их загрузить ? ")) {
                this.event = JSON.parse(localStorage.getItem("stats")).event;
            }
        }
        this.showImage(this.event);
        this.createButtons(this.event);
        this.showText(this.event);
    }

    createButtons(event) {
        let nextEvent;
        if (this.choices[event] == null) {
            event = "23";
        }
        this.choices[event].buttons.forEach((value, index) => {

            let button = document.createElement("button");
            button.innerText = value;
            button.onclick = () => {
                this.clearPage();
                nextEvent = this.choices[event].links[index];
                console.log(nextEvent);
                this.createButtons(nextEvent);
                this.showText(nextEvent);
                this.showImage(nextEvent);
                if (this.choices[event].status === 2) {
                    this.wins++;
                }
                else if (this.choices[event].status === 0) {
                    this.losses++
                }

                let stats = {};
                stats.event = nextEvent;
                stats.wins = this.wins;
                stats.losses = this.losses;
                localStorage.setItem("stats", JSON.stringify(stats));

                if (this.choices[event].gameover) {
                    this.showResult();
                }
            };
            this.btnsContainer.append(button);
        });
    }

    showResult() {
        alert(`Выигрышей: ${JSON.parse(localStorage.getItem("stats")).wins}; Проигрышей ${JSON.parse(localStorage.getItem("stats")).losses}`);
    }

    showText(event) {
        this.choices[event].text.forEach(element => {
            let p = document.createElement("p");
            p.innerText = element;
            this.textContainer.append(p);
        });;
    }
    showImage(event) {
        while (this.images.firstChild) {
            this.images.removeChild(this.images.firstChild);
        }
        let img = document.createElement("img");
        img.src = this.choices[event].image;
        this.images.appendChild(img);

    }
    clearPage() {
        this.textContainer.innerHTML = "";
        this.btnsContainer.innerHTML = "";
 
    }

}