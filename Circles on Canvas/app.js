{
    let canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext("2d");

    // Rectangle
    /*
    ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
    ctx.fillRect(10, 10, 100, 100);
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    ctx.fillRect(10, 200, 100, 100);
    ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
    ctx.fillRect(250, 150, 100, 100);
    */
    // Lines
    /*
    ctx.beginPath();
    ctx.moveTo(100, 150);
    ctx.lineTo(400, 0);
    ctx.lineTo(400, 150);
    ctx.strokeStyle = "#fa34a3";
    ctx.stroke();
    */
    // Arc / Circle
    /* for (let i = 0; i < 10; i++) {
     *     let x = Math.floor(Math.random() * (canvas.width - 50)) + 50;
     *     let y = Math.floor(Math.random() * (canvas.height - 50)) + 50;
     *     ctx.beginPath();
     *     ctx.arc(x, y, 50, 0, 2 * Math.PI);
     *     ctx.strokeStyle = "blue";
     *     ctx.stroke();
     * } */

    // Animate
    /*     let x = 50,
     *         dx = 10,
     *         y = 50,
     *         r = 50,
     *
     *     function moveCircle() {
     *         requestAnimationFrame(moveCircle);
     *         ctx.clearRect(0, 0, canvas.width, canvas.height);
     *         ctx.beginPath();
     *         ctx.arc(x, y, r, 0, Math.PI * 2, false);
     *         ctx.stroke();
     *         if (x + r > canvas.width || x - r <= 0)
     *             dx = -dx;
     *         x += dx;
     *     } */

    // Animate multiple shape
    let mouse = {
        x: undefined,
        y: undefined,
    };
    let maxRadius = 50;
    let circles = [];
    let numOfCir = 700;
    let speedCon = 3;

    function Circle(_x, _y, _dx, _dy, _radius, _color) {
        this.x = _x;
        this.y = _y;
        this.dx = _dx;
        this.dy = _dy;
        this.radius = _radius;
        this.minRadius = _radius;
        this.color = _color;

        this.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        };

        this.update = function () {
            if (this.x + this.dx >= canvas.width - this.radius || this.x + this.dx <= this.radius) {
                this.dx = -this.dx;
            }

            if (this.y + this.dy >= canvas.height - this.radius || this.y + this.dy <= this.radius) {
                this.dy = -this.dy;
            }

            if (Math.abs(this.x - mouse.x) < 100 && Math.abs(this.y - mouse.y) < 100) {
                if (this.radius < maxRadius) {
                    this.radius += 1;
                }
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;
            }

            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        };
    }

    function randomColor() {
        let hexCode = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];
        let nu = Math.floor(Math.random() * hexCode.length);
        return hexCode[nu];
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0, len = numOfCir; i < len; i++) {
            circles[i].update();
        }
    }

    function generateNewCircle() {
        circles = [];
        for (let i = 0, len = numOfCir; i < len; i++) {
            let x = Math.random() * (canvas.width - 40) + 20;
            let y = Math.random() * (canvas.height - 40) + 20;
            let dx = Math.random() * speedCon;
            let dy = Math.random() * speedCon;
            let radius = Math.random() * 10 + 3;

            circles.push(new Circle(x, y, dx, dy, radius, randomColor()));
        }
    }

    window.addEventListener("mousemove", function (e) {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        generateNewCircle();
    });

    generateNewCircle();
    animate();
}
