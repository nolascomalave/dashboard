import clsx from 'clsx';
import styles from './EntityCard.module.scss';

export default function EntityCard({ children }: { children?: React.ReactNode }) {
    return (
        <div
            className={clsx({
                [styles['entity-card']]: true,
                'w-full bg-white': true
            })}
            style={{
                boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)'
            }}
        >
            Holas

            {children}
        </div>
    )
}