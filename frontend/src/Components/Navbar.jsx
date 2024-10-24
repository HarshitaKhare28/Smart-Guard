import { NavLink, useLocation } from "react-router-dom";

export const Navbar = () => {
    const location = useLocation();

    return (
        <div className="container max-w-7xl mx-auto px-100 py-4 flex justify-between items-center">
            <div className="logo  w-100 h-10 flex items-center">
                <h1 className="text-3xl text-white font-bold ml-20">SMART GUARD</h1>
            </div>
            <nav>
                <ul className="flex gap-8 list-none">
                    {/* Conditionally render the Home button if not on the login page */}
                    {location.pathname !== "/" && (
                        <li>
                            <NavLink
                                to="/home"
                                className="text-lg text-white font-bold hover:text-blue-200 hover:underline transition-colors duration-300"
                            >
                                HOME
                            </NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink
                            to="/about"
                            className="text-lg text-white font-bold hover:text-blue-200 hover:underline transition-colors duration-300"
                        >
                            ABOUT US
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
