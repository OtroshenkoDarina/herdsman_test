import React from 'react';
import MainLayout from "../../layouts/MainLayout/MainLayout";
import styles from './styles.module.scss'
import cn from 'classnames'
import useHandleGame from "../../hooks/game/useHandleGame";
import {IHandleGame} from "../../types/structures";
import Button from "../../components/Button/Button";

const HomePage = () => {
    const handleGame: IHandleGame = useHandleGame()

    return (
        <MainLayout>
            <div className={styles.wrapper}>
                {!handleGame.isGameStarted && <Button text={'Start game'} onClick={handleGame.startGame}/>}
            </div>

            <div
                id={'canvas_container'}
                className={cn(styles.canvas_container, handleGame.isGameStarted && styles.canvas_container_active)}
            >
                {handleGame.isGameStarted && <p className={styles.score}>Score: {handleGame.score}</p>}
                {handleGame.isGameStarted &&
                    <Button
                        text={'End game'}
                        onClick={handleGame.endGame}
                        customClass={styles.button_end}
                        isSmall
                    />}
            </div>
        </MainLayout>
    );
};

export default HomePage;
