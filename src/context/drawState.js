import { useReducer } from 'react';

import DrawContext from './drawContext';
import DrawReducer from './drawReducer';

export default function DrawState({ children }) {

    const initialData = {
        draw: ''
    }

    const [ state, dispatch ] = useReducer(DrawReducer, initialData)

    const setDraw = info => {
        dispatch({
            type: 'DRAW',
            payload: info
        })
    }

    return (
        <DrawContext.Provider
            value={{
                draw: state.draw,
                setDraw
            }}
        >
            {children}
        </DrawContext.Provider>
    )
}