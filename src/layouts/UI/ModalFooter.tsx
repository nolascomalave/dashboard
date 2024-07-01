import clsx from "clsx";

export default function ModalFooter({className, children, ...props}: { className?: string, children: React.ReactNode, props?: any[] }) {
    return (
        <footer
            className={clsx({
                'Modal__content__footer flex-shrink-0 px-4 py-2 rounded-b-md border-t': true,
                ...(!className ? {} : {
                    [className]: true
                })
            })}
            {...props}
        >
            {children}
        </footer>
    );
};