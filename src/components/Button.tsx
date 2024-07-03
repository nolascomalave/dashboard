import clsx from 'clsx';
import * as LudiceIcons from 'lucide-react';

export default function Button({children, IconName, className, ...props}: {children?: React.ReactNode, IconName?: string, className?: string, props: any}) {
    const Icon = !IconName ? null : LudiceIcons[IconName];
    return (
        <button
            className={clsx({
                "flex text-sm items-center gap-1 bg-primary_layout focus:outline-none hover:bg-secondary_layout text-white font-bold p-2 px-3 rounded": true,
                [className ?? '']: true
            })}
            {...props}
        >
            {IconName && (
                <Icon
                    width={20}
                    height={20}
                    style={{
                        width: '1rem',
                        height: '1rem'
                    }}
                />
            )}
            {children}
        </button>
    );
}