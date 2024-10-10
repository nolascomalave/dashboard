import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Arrow as TooltipArrow } from "@radix-ui/react-tooltip";
import styles from './SimpleTooltip.module.scss';

export default function SimpleTooltip({ children, text }: { children: React.ReactNode, text: string | number | React.ReactNode }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent className={styles.TooltipContent} sideOffset={5}>
                    {text}
                    <TooltipArrow className={styles.TooltipArrow} />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}