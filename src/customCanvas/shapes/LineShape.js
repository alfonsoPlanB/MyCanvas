import Konva from "konva";

export default function LineShape (stage, layer, color, mode = "") {

    let isPaint = false;
    let lastLine;

    stage.on("mousedown touchstart", function(e) {
            isPaint = true;
            let pos = stage.getPointerPosition();
            lastLine = new Konva.Line({
                stroke: mode === "brush" ? color : "transparent",
                strokeWidth: mode === "brush" ? 5 : 20,
                globalCompositeOperation:
                    mode === "brush" ? "source-over" : "destination-out",
                points: [pos.x, pos.y],
                draggable: mode === "brush",
            });
            (!!mode) && layer.add(lastLine);
    });

    stage.on("mouseup touchend", function() {
        isPaint = false
        mode = ''
    });

    stage.on("mousemove touchmove", function() {
        if (!isPaint || !mode) {
            return;
        }

        const pos = stage.getPointerPosition();
        let newPoints = lastLine.points().concat([pos.x, pos.y]);
        lastLine.points(newPoints);
        layer.batchDraw();
    });

};