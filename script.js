document.addEventListener('DOMContentLoaded', function () {
    var cnv = document.getElementById("scene");
    var ctx = cnv.getContext('2d');
    var x = 0;
    const FPS = 60;
    const dotSize = 2;
    let cam_x = parseFloat(document.getElementById('x').value)
    let cam_y = parseFloat(document.getElementById('y').value)
    let cam_z = parseFloat(document.getElementById('z').value)

    function project(p) {
        [x,y,z] = p;
        z+= cam_z
        y+= cam_y
        x+= cam_x
        x = cnv.width/2 * (1+x/z);
        y = cnv.height/2 * (1-y/z);
        return [x,y];
    }

    function drawPoint(p) {
        [x,y] = project(p)
        ctx.fillStyle = 'black';
        ctx.fillRect(x - dotSize/2, y - dotSize/2, dotSize, dotSize);
    }

    function drawLine(point1, point2) {
        const p1 = project(point1);
        const p2 = project(point2);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.stroke();
    }

    function rotateZ([x, y, z], angle) {
        return [
            x * Math.cos(angle) - y * Math.sin(angle),
            x * Math.sin(angle) + y * Math.cos(angle),
            z
        ];
    }

    function rotateY([x, y, z], angle) {
        return [
            x * Math.cos(angle) + z * Math.sin(angle),
            y,
            -x * Math.sin(angle) + z * Math.cos(angle),
        ];
    }

    function draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, cnv.width, cnv.height)
        cam_x = parseFloat(document.getElementById('x').value)
        cam_y = parseFloat(document.getElementById('y').value)
        cam_z = parseFloat(document.getElementById('z').value)

        for (let i = 0; i < points.length; i++) {
            drawPoint(points[i]);
            points[i] = rotateY(points[i], 0.005)
        }

        setTimeout(draw, 1000/FPS);
    }

    draw();
});
