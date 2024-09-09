import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="container max-w-7xl mx-auto px-100 py-4 flex justify-between items-center">
            <div className="logo  w-100 h-10 flex items-center">
                {/* <a href="/"><img src="/Images/logo.png" alt="image" className="w-full h-full object-cover" /></a> */}
                <h1 className="text-3xl text-white  font-bold ml-20">SMART GUARD</h1>
            </div>
            <nav>
                <ul className="flex gap-8 list-none">
                    <li>
                        <NavLink
                            to="/home"
                            className="text-lg text-white font-bold hover:text-blue-200 hover:underline transition-colors duration-300"
                        >
                            HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className="text-lg text-white font-bold hover:text-blue-200 hover:underline transition-colors duration-300"
                        >
                            ABOUT US
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            className="text-lg text-white font-bold hover:text-blue-200 hover:underline transition-colors duration-300"
                        >
                            CONTACT US
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                    </li>
                </ul>
            </nav>
        </div>
    );
};