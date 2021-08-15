import React from 'react'
import Chessboard from 'chessboardjsx'
import Chess from 'chess.js'

const WHITE = 'w';
const BLACK = 'b';

export const PRIMARY_BUTTON_STYLE = "m-8 font-semibold text-white px-8 py-1 rounded-md shadow-inner transition duration-300 ease-in-out border-4 border-blue-200 bg-blue-500 hover:border-blue-900"
export const SECONDARY_BUTTON_STYLE = "m-8 font-semibold text-blue-700 px-8 py-1 bg-blue-100 rounded-md shadow-inner transition duration-300 ease-in-out border-4 border-blue-200 hover:border-blue-700"

export default function Game(props) {
    const [fen, setFen] = React.useState("")
    const [turn, setTurn] = React.useState(WHITE)
    const player = WHITE;
    let chess = React.useRef(null);

    React.useEffect(() =>{
        if(props.start){
            setFen("start")
        }
    }, [props.start])
    console.log(props)
    React.useEffect(() => {
        chess.current = new Chess();
    }, [])

    const onDrop = ({sourceSquare, targetSquare}) => {
        let move = chess.current.move({
            from: sourceSquare, to: targetSquare
        })
        if(move){
            setFen(chess.current.fen())
            setTurn(chess.current.turn())
        }
    }

    React.useEffect(() => {
        if(turn !== player){
            setTimeout(computerMove, 500)
        }
    }, [turn])

    const resetGame = () => {
        chess.current.clear();
        chess.current.reset();
        setFen("start");
    }

    const computerMove = () => {
        if(turn === BLACK){
            const moves = chess.current.moves()
            if(moves && moves.length > 0){
                console.log(moves)
                let move = moves[Math.floor(Math.random() * moves.length)]
                chess.current.move(move)
                setFen(chess.current.fen())
                setTurn(chess.current.turn())
            }
        }
    }

    const openMenu = () => {
        chess.current.clear()
        chess.current.reset()
        setFen("")
        props.openMenu()
    }

    const renderFooter = () => {
        return (
            <div className="flex flex-row">
                <button onClick={resetGame} className={PRIMARY_BUTTON_STYLE}>
                    Reset
                </button>
                <button onClick={openMenu} className={SECONDARY_BUTTON_STYLE}>
                    Open Menu
                </button>
            </div>
        )
    } 

    return (
        <div className="container mx-auto flex flex-col justify-center items-center">
            {renderFooter()}
            <div className="border-solid border-8 rounded-lg border-blue-900">
            <Chessboard 
                position={fen} size={800} onDrop={onDrop} transitionDuration={400} darkSquareStyle={{backgroundColor: "#4338CA"}} lightSquareStyle={{backgroundColor: "#C7D2FE"}}/>
            </div>
        </div>
    )
}
