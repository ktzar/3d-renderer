function $$(id) { return document.getElementById(id); }
function $val(id) { return document.getElementById(id).value; }

const FPS = 60;
const dotSize = 1;

function rotateX([x, y, z], angle) {
    return [
        x,
        y * Math.cos(angle) - z * Math.sin(angle),
        y * Math.sin(angle) + z * Math.cos(angle),
    ];
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

document.addEventListener('DOMContentLoaded', function () {
    var cnv = $$("scene");
    var ctx = cnv.getContext('2d');

    let cam_x = parseFloat($val('x'))
    let cam_y = parseFloat($val('y'))
    let cam_z = parseFloat($val('z'))

    function project(p) {
        [x,y,z] = p;
        z += cam_z
        y += cam_y
        x += cam_x
        
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
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.stroke();
    }

    function draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, cnv.width, cnv.height)
        cam_x = parseFloat($val('x'))
        cam_y = parseFloat($val('y'))
        cam_z = parseFloat($val('z'))

        if (points) {
            if (faces) {
                for (let i = 0; i < faces.length; i++) {
                    const face = faces[i];
                    drawLine(points[face[0]-1], points[face[1]-1]);
                    drawLine(points[face[1]-1], points[face[2]-1]);
                    drawLine(points[face[2]-1], points[face[0]-1]);
                }
            }
            for (let i = 0; i < points.length; i++) {
                drawPoint(points[i]);
                points[i] = rotateY(points[i], 0.02)
                points[i] = rotateZ(points[i], 0.01)
                points[i] = rotateX(points[i], 0.01)
            }
        }

        setTimeout(draw, 1000/FPS);
    }

    draw();
});
