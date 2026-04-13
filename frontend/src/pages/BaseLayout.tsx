import '../scss/BaseLayout.scss'
import { type ReactElement  } from 'react'

interface BaseLayoutProps {
    children: ReactElement ;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
    return (
        <>
            <header>
                <div className='container'>
                    <div className='profile-photo'></div>
                </div>
            </header>

            <main>
                {children}
            </main>
            <footer>
                <div className="container">
                </div>
            </footer>
        </>
    )
}