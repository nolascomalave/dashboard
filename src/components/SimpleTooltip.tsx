import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Arrow as TooltipArrow } from "@radix-ui/react-tooltip";
import styles from './SimpleTooltip.module.scss';
import clsx from 'clsx';

export default function SimpleTooltip({
    children,
    text,
    selectable = false,
    side = 'top'
}: {
    children: React.ReactNode,
    text: string | number | React.ReactNode,
    selectable?: boolean,
    side?: 'top' | 'bottom' | 'right' | 'left'
}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent className={clsx({
                        [styles.TooltipContent]: true,
                        "selectable": selectable
                    })}
                    sideOffset={5}
                    side = {side}
                >
                    {text}
                    <TooltipArrow className={styles.TooltipArrow} />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}