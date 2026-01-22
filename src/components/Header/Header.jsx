import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <header>
            <div>
                <div>
                    <nav>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/movies'>Movies</NavLink>
                    </nav>
                </div>
            </div>
        </header>
    )
}