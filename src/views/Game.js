import React from 'react'
import Chessboard from 'chessboardjsx'
import Chess from 'chess.js'

const WHITE = 'w';
const BLACK = 'b';

export default function Game(props) {
    const [fen, setFen] = React.useState("start")
    const [turn, setTurn] = React.useState(WHITE)
    const [gameOver, setGameOver] = React.useState(false)
    const [player, setplayerSide] = React.useState(props.playerSide || WHITE)

    let chess = React.useRef(null);

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
        else return isGameOver()
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

    const isGameOver = () => {
        if(chess.current.game_over()){
            setGameOver(true)
        }
    }

    return (
        <div className="container mx-auto flex justify-center items-center">
            <Chessboard 
                position={fen} size={800} onDrop={onDrop}/>
        </div>
    )
}
