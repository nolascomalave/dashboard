import clsx from "clsx";

export default function DatalistSectionMessage({
    children,
    isError = false
}: {
    children: React.ReactNode;
    isError?: boolean
}) {
    return (
        <div className="h-full w-full flex items-center justify-center">
            <h3
                className={clsx({
                    "text-center": true,
                    "opacity-20 font-thin": !isError,
                    "text-red-700": isError
                })}
                style={{
                    fontSize: '2.5rem'
                }}
            >
                {children}
            </h3>
        </div>
    );
}