import style from './InputRadio.module.scss';

export default function InputRadio({children, ...props}: {children: React.ReactNode, props: any}) {
    return (
        <label className={style['input-radio']}>
            <div></div>
            <input
                type='radio'
                {...props}
            />
            <span>
                {children}
            </span>
        </label>
    );
}