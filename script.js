const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        const circles = [
            { x: 50, y: 50, radius: 30, color: '#FFD700', originalColor: '#FFD700', hit: false },
            { x: 50, y: 150, radius: 30, color: '#4169E1', originalColor: '#4169E1', hit: false },
            { x: 50, y: 250, radius: 30, color: '#DC143C', originalColor: '#DC143C', hit: false },
            { x: 50, y: 350, radius: 30, color: '#32CD32', originalColor: '#32CD32', hit: false }
        ];

        const arrows = circles.map((circle, index) => ({
            x: 500,
            y: circle.y,
            originalX: 500,
            originalY: circle.y,
            moving: false,
            hit: false
        }));

        function drawCircle(circle) {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            ctx.fillStyle = circle.color;
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }

    function drawArrow(x, y) {
    ctx.beginPath();
    ctx.lineWidth = 3;  
    ctx.moveTo(x - 20, y);
    ctx.lineTo(x + 20, y);
    ctx.moveTo(x - 20, y);
    ctx.lineTo(x, y - 10);
    ctx.moveTo(x - 20, y);
    ctx.lineTo(x, y + 10);
    ctx.strokeStyle = '#000000';  
    ctx.stroke();
    ctx.lineWidth = 1; 
       }


        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            circles.forEach(drawCircle);
            arrows.forEach(arrow => drawArrow(arrow.x, arrow.y));
        }

        function moveArrow(arrow, targetCircle)
         {
            if (!arrow.moving) return;
            
            const dx = targetCircle.x - arrow.x;
            const dy = targetCircle.y - arrow.y;
            const speed = 5;
            

            if (Math.abs(dx) > targetCircle.radius + 20) {
                arrow.x += (dx / Math.abs(dx)) * speed;
            } else {
                arrow.moving = false;
                arrow.hit = true;
                targetCircle.hit = true;
                targetCircle.color = '#808080'; 
            }
    }

        function animate() {
            draw();
            arrows.forEach((arrow, index) => moveArrow(arrow, circles[index]));
            requestAnimationFrame(animate);
        }

        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            circles.forEach((circle, index) => {
                const dx = x - circle.x;
                const dy = y - circle.y;
                if (Math.sqrt(dx * dx + dy * dy) < circle.radius && !circle.hit) {
                    arrows[index].moving = true;
                }
            });
        });

        document.getElementById('reset').addEventListener('click', () => {
            circles.forEach(circle => {
                circle.color = circle.originalColor;
                circle.hit = false;
            });
            
            arrows.forEach(arrow => {
                arrow.x = arrow.originalX;
                arrow.y = arrow.originalY;
                arrow.moving = false;
                arrow.hit = false;
            });
        });

        animate();