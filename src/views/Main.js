import { DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react';
import { PRIMARY_BUTTON_STYLE } from './Game';

export default function Main(props) {
    return (
        <DialogContent>
            <button onClick={props.startGame} className={PRIMARY_BUTTON_STYLE}>
                Start Game
            </button>
        </DialogContent>
    )
}
