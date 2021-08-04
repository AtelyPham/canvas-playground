{
    let canvas = document.querySelector("canvas");
    canvas.width = 1000;
    canvas.height = 600;
    let gridSize = 25;
    let innerWidth = canvas.width;
    let innerHeight = canvas.height;
    let ctx = canvas.getContext("2d");
    let snake = new Snake(3, 3, 0, 1);
    let food = new Food();

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < innerHeight; y += gridSize) {
            for (let x = 0; x < innerWidth; x += gridSize) {
                ctx.rect(x, y, gridSize, gridSize);
            }
        }
        ctx.stroke();
    }

    function Snake(x, y, dx, dy) {
        this.x = [x];
        this.y = [y];
        this.dx = dx;
        this.dy = dy;

        this.init = function () {
            this.x.push(3);
            this.y.push(2);
        };

        this.draw = function () {
            ctx.beginPath();
            for (let i = this.x.length - 1; i >= 0; i--) {
                ctx.fillStyle = i === 0 ? "red" : "green";
                ctx.fillRect(this.x[i] * gridSize, this.y[i] * gridSize, gridSize, gridSize);
            }
        };

        this.update = function () {
            if (0 <= this.y[0] + this.dy && this.y[0] + this.dy < innerHeight / gridSize) {
                for (let i = this.x.length - 1; i > 0; --i) {
                    this.y[i] = this.y[i - 1];
                }
                this.y[0] += this.dy;
            }
            if (0 <= this.x[0] + this.dx && this.x[0] + this.dx < innerWidth / gridSize) {
                for (let i = this.x.length - 1; i > 0; --i) {
                    this.x[i] = this.x[i - 1];
                }
                this.x[0] += this.dx;
            }

            this.draw();
        };

        this.add = function (x, y) {
            if (snake.dx === 1) {
                this.x.push(x - 1);
                this.y.push(y);
            } else if (snake.dx === -1) {
                this.x.push(x + 1);
                this.y.push(y);
            } else if (snake.dy === 1) {
                this.x.push(x);
                this.y.push(y - 1);
            } else if (snake.dy === -1) {
                this.x.push(x);
                this.y.push(y + 1);
            }
        };
    }

    function Food() {
        let x, y;

        Object.defineProperty(this, "x", {
            get() {
                return x;
            },
        });

        Object.defineProperty(this, "y", {
            get() {
                return y;
            },
        });

        this.draw = function () {
            ctx.beginPath();
            ctx.fillStyle = "yellow";
            ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
        };

        this.new = function () {
            x = Math.floor(Math.random() * (innerWidth / gridSize));
            y = Math.floor(Math.random() * (innerHeight / gridSize));
        };
    }

    function handleInput() {
        window.addEventListener("keydown", function (e) {
            let direction = e.key.replace("Arrow", "");
            switch (direction) {
                case "Up":
                    if (snake.dy === 0) {
                        snake.dy = -1;
                        snake.dx = 0;
                    }
                    break;
                case "Down":
                    if (snake.dy === 0) {
                        snake.dy = 1;
                        snake.dx = 0;
                    }
                    break;
                case "Left":
                    if (snake.dx === 0) {
                        snake.dy = 0;
                        snake.dx = -1;
                    }
                    break;
                case "Right":
                    if (snake.dx === 0) {
                        snake.dy = 0;
                        snake.dx = 1;
                    }
                    break;
                default:
                    break;
            }
        });
    }

    function animate() {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        draw();
        food.draw();
        snake.update();

        if (snake.x[0] === food.x && snake.y[0] === food.y) {
            snake.add(food.x, food.y);
            do {
                food.new();
            } while (snake.x.includes(food.x) && snake.y.includes(food.y));
        }

        handleInput();
    }

    food.new();
    snake.init();
    setInterval(animate, 100);
}
