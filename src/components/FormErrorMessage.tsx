const FormErrorMessage = ({children, className}: {children: React.ReactNode, className?: string}) => {
    return (
        <p
            className={className}
            style={{
                color: 'rgb(220 38 38)',
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                lineHeight: '1'
            }}
        >
            {children}
        </p>
    )
}

export default FormErrorMessage;