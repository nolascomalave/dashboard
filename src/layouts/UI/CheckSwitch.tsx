import React from 'react';
import styles from './CheckSwitch.module.scss';
import clsx from 'clsx';

const CheckSwitch = ({
    className = '',
    defaultChecked = false,
    checked,
    ...props
} : {
    className?: string,
    defaultChecked?: boolean,
    checked?: boolean
}) => {
    return (
        <input
            className={clsx(styles.switch, className)}
            type="checkbox"
            checked={checked}
            {...((typeof props === 'object' && !Array.isArray(props)) ? props : {})}
        />
    );
}

export default CheckSwitch;
