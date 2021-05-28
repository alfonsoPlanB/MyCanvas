import {createRef, useState} from 'react';
import {Layer, Stage} from 'react-konva';
import {Grid, Button} from '@material-ui/core';

import {
    addLine,
    ImageShape,
    NewRectangle,
    NewCircle,
    addTextNode
} from './shapes/';

export default function CustomCanvas({image, setUri}) {

    const colors = {
        circle: 'orange',
        rectangle: 'blue',
        line: '#b7950b',
        text: 'red',
        clear: 'grey'
    }

    const stageEl = createRef()
    const layerEl = createRef()
    const layerBase = createRef()

    const [rectangles, setRectangles] = useState([]);
    const [circles, setCircles] = useState([]);
    const [selectedId, selectShape] = useState(null);
    const [shapes, setShapes] = useState([]);

    const drawLine = () => {
        addLine(stageEl.current.getStage(), layerEl.current, colors.line, 'brush');
    }

    const drawText = () => {
        const id = addTextNode(stageEl.current.getStage(), layerEl.current, colors.text);
        const shs = shapes.concat([id]);
        setShapes(shs);
    };

    const addRectangle = () => {

        const rect = {
            x: 300,
            y: 300,
            width: 100,
            height: 100,
            stroke: colors.rectangle,
            id: `rect${rectangles.length + 1}`,
        };
        const rects = rectangles.concat([rect]);
        setRectangles(rects);
        const shs = shapes.concat([`rect${rectangles.length + 1}`]);
        setShapes(shs);
    };

    const addCircle = () => {

        const circ = {
            x: 200,
            y: 200,
            width: 100,
            height: 100,
            stroke: colors.circle,
            id: `circ${circles.length + 1}`,
        };
        const circs = circles.concat([circ]);
        setCircles(circs);
        const shs = shapes.concat([`circ${circles.length + 1}`]);
        setShapes(shs);
    };

    const undo = () => {
        layerEl.current.clear()
        layerEl.current.destroyChildren()

    }

    const exportUrl = () => {
        setUri(stageEl.current.getStage().toDataURL())
    }


    return (
        <Grid container>
            <Grid item xs={12}>
                <Stage
                    style={{margin: '1em', border: '2px solid grey'}}
                    width={window.innerWidth * 0.9}
                    height={window.innerHeight - 150}
                    ref={stageEl}
                    onMouseDown={e => {
                        // deselect when clicked on empty area
                        const clickedOnEmpty = e.target === e.target.getStage();
                        if (clickedOnEmpty) {
                            selectShape(null);
                        }
                    }}

                >
                    <Layer ref={layerBase}>
                        <ImageShape imageUrl={image}/>
                    </Layer>
                    <Layer ref={layerEl}>
                        {rectangles.map((rect, i) => {
                            return (
                                <NewRectangle
                                    key={i}
                                    shapeProps={rect}
                                    isSelected={rect.id === selectedId}
                                    onSelect={() => {
                                        selectShape(rect.id);
                                    }}
                                    onChange={newAttrs => {
                                        const rects = rectangles.slice();
                                        rects[i] = newAttrs;
                                        setRectangles(rects);
                                    }}
                                />
                            );
                        })}
                        {circles.map((circle, i) => {
                            return (
                                <NewCircle
                                    key={i}
                                    shapeProps={circle}
                                    isSelected={circle.id === selectedId}
                                    onSelect={() => {
                                        selectShape(circle.id);
                                    }}
                                    onChange={newAttrs => {
                                        const circs = circles.slice();
                                        circs[i] = newAttrs;
                                        setCircles(circs);
                                    }}
                                />
                            );
                        })}
                    </Layer>
                </Stage>
            </Grid>
            <Grid item xs={12} >
                <Grid container justify="space-between">

                    <Grid
                        item xs={12}
                        sm={8}
                        style={{display: 'flex', marginLeft: 20, marginTop: 10}}>
                        <Button
                            variant="outlined"
                            style={{border: `1px solid ${colors.rectangle}`, color: colors.rectangle}}
                            onClick={addRectangle}
                        >
                            Rectangle
                        </Button>
                        <Button
                            variant="outlined"
                            style={{border: `1px solid ${colors.circle}`, color: colors.circle, marginLeft:5}}
                            onClick={addCircle}>
                            Circle
                        </Button>
                        <Button
                            variant="outlined"
                            style={{border: `1px solid ${colors.line}`, color: colors.line, marginLeft:5}}
                            onClick={drawLine}>
                            Line
                        </Button>
                        <Button
                            variant="outlined"
                            style={{border: `1px solid ${colors.text}`, color: colors.text, marginLeft:5}}
                            onClick={drawText}>
                            Text
                        </Button>
                        <Button
                            variant="outlined"
                            style={{border: `1px solid ${colors.clear}`, color: colors.clear, marginLeft:5}}
                            onClick={undo}>
                            Clear
                        </Button>
                        {/*<Button variant="outlined" color="secondary" onClick={exportUrl}>*/}
                        {/*    Export*/}
                        {/*</Button>*/}
                    </Grid>

                    {/*<Grid item xs={4} >*/}
                    <Grid
                        item
                        xs={12}
                        sm={3}
                        style={{display: 'flex', justifyContent: 'flex-end', marginRight: 20, marginTop: 10}}
                    >
                        <Button variant="outlined" color="secondary" onClick={undo} style={{marginRight: 10}}>
                            Cancel
                        </Button>
                        <Button variant="outlined" color="primary" onClick={exportUrl} >
                            Save and Send
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    )
}

