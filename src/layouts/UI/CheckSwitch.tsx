import React from 'react';
import styles from './CheckSwitch.module.scss';
import clsx from 'clsx';

const CheckSwitch = ({
    className = '',
    defaultChecked = false,
    ...props
} : {
    className?: string,
    defaultChecked?: boolean,
}) => {
    return (
        <input
            className={clsx(styles.switch, className)}
            type="checkbox"
            defaultChecked={defaultChecked}
            {...((typeof props === 'object' && !Array.isArray(props)) ? props : {})}
        />
    );
}

export default CheckSwitch;
