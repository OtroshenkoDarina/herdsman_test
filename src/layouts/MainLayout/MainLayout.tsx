import React, {FC, ReactNode} from 'react';
import styles from './styles.module.scss'

type MainLayoutProps = {
    children: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            {children}
        </div>
    );
};

export default MainLayout;
