import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import { joinOrCreateRoom, setAuthenToken } from "./api";
import { UserContext } from "./context/UserContext";
import TicTacToeState from "./schema/TicTacToeState";

const TicTacToe = () =>
{
    const { userId } = React.useContext(UserContext);
    const [room, setRoom] = useState(null);
    const [board, setBoard] = useState(Array(9).fill(null));
    const [playerSymbol, setPlayerSymbol] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [status, setStatus] = useState("Waiting for opponent...");
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() =>
    {
        const init = async () =>
        {
            const _room = await joinOrCreateRoom("tic_tac_toe", {}, TicTacToeState);
            setRoom(_room);

            _room.onStateChange((state) =>
            {
                console.log("State change", JSON.stringify(state));
                setBoard(state.board);
                setCurrentPlayer(state.currentPlayer);
            });


            _room.onMessage("gameover", (message) =>
            {
                console.log("Game over", JSON.stringify(message));
                const { winner, line, player } = message;
                setStatus(`Winner: ${winner}`);
                setIsGameOver(true);
            });

            _room.onMessage("symbol", (symbol) =>
            {
                console.log("Player symbol", symbol);
                setPlayerSymbol(symbol);
            });

            _room.onMessage("opponent-left", () =>
            {
                console.log("Opponent left the game.");
                setStatus("Opponent left the game.");
                setIsGameOver(true);
            });

            _room.onMessage("start", (symbol) =>
            {
                console.log("Game started.");
                setIsGameOver(false);
            });
        };

        if (userId?.length > 0)
        {
            console.log("User ID", userId);
            setAuthenToken(userId);
            init();
        }
        else
        {
            console.log("User ID not available.");
        }
    }, [userId]);

    const handleClick = (index) =>
    {
        if (playerSymbol === currentPlayer && !board[index])
        {
            room.send("move", { index });
        }
    };

    const handleRestart = () =>
    {
        room.send("restart");
    }

    const handleLeave = () =>
    {
        room.leave();
    }

    if (!userId)
    {
        return <div>Loading...</div>;
    }

    const renderStatus = () =>
    {
        if (isGameOver)
        {
            return status;
        }

        if (currentPlayer === "")
        {
            return "Waiting for opponent...";
        }

        if (playerSymbol === currentPlayer)
        {
            return "Your turn";
        }

        return "Opponent's turn";
    }

    return (
        <div>
            {
                room && (
                    <div className="title">RoomID: {room.id}</div>
                )
            }
            <div className="status">{renderStatus()}</div>
            <div className="player-symbol">You are: {playerSymbol}</div>
            <Board board={board} onClick={handleClick} />
            {
                isGameOver && (
                    <div className="buttons">
                        <button onClick={handleLeave}>Leave</button>
                        <button onClick={handleRestart}>Play Again</button>
                    </div>
                )
            }
        </div>
    );
}

export default TicTacToe;