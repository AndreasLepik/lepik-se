function initDraw() {
    var canvas = document.getElementById("canvas1");
    document.getElementById("title").innerHTML = 'texten har ändrats';

    var context = canvas.getContext('2d');

    context.fillStyle = "#FF0000";
    context.fillrect(1, 1, 100, 100);
    context.moveTo(0,0);
    context.lineTo(200, 100);
    context.stroke(); 
    console.log('initDraw');
}
