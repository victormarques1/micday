import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    loading?: boolean,
    children: ReactNode,
}

export function Button({ loading, children, ...rest}: ButtonProps){
    return(
        <button className="button" disabled={loading} {...rest}>
            <a className="button-text">
                {children}
            </a>
        </button>
    )
}