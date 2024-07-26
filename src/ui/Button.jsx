import { Link } from "react-router-dom"

function Button({children, disabled, to, type, onClick }) {

    const base = ' inline-block rounded-full text-sm md:text-md bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800  transition-colors duration-300  hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring-yellow-300 focus:offset-2 disabled:cursor-not-allowed cursor-pointer'

    const styles = {
        primary: base + ' px-3 py-2 md:px-4 md:py-3',
        small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
        secondary: ' px-4 py-2 md:px-5 md:py-2.5 text-sm  inline-block rounded-full bg-transparent border-stone-300 font-semibold uppercase tracking-wide text-stone-800 trancking-wide transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed cursor-pointer  ' ,
        round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
    }

    if (to) {
        return <Link to={to} className={styles[type]}>{children}</Link>
    }

    if (onClick) return (<button onClick={onClick} disabled={disabled} className={styles[type]}>
            {children}
        </button>
    )

    return (
        <button disabled={disabled} className={styles[type]}
        >
            {children}
        </button>
    )
}

export default Button
