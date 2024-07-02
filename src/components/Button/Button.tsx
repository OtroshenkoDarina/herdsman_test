import React from 'react';
import styles from './styles.module.scss'
import cn from "classnames";

interface ButtonProps {
    text: string;
    onClick: () => void;
    customClass?: string;
    isSmall?: boolean;
}

const Button: React.FC<ButtonProps> = ({text, onClick, customClass, isSmall}) => {
    return (
        <button onClick={onClick} className={cn(styles.button, isSmall && styles.button_isSmall, customClass)}>
            {text}
        </button>
    );
};

export default Button;