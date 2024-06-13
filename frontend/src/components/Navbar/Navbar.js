import { useRef, useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import classes from './navbar.module.css';
import { useAuth } from "../../hooks/useAuth";
import { Link } from 'react-router-dom';

function Navbar() {
    const { user, logout } = useAuth();

    const navRef = useRef();
    const [isResponsive, setIsResponsive] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const showNavbar = () => {
        navRef.current.classList.toggle(classes.responsive_nav);
        setIsResponsive(!isResponsive);
    };

    const handleResize = () => {
        if (window.innerWidth > 1024) {
            setIsResponsive(false);
            if (navRef.current) {
                navRef.current.classList.remove(classes.responsive_nav);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLinkClick = () => {
        if (isResponsive) {
            showNavbar();
        }
    };

    return (
        <header>
            <h3>LOGO</h3>
            <nav ref={navRef}>
                <Link to="/" onClick={handleLinkClick}>Home</Link>
                <Link to="/underconstruction" onClick={handleLinkClick}>About Us</Link>
                <Link to="/underconstruction" onClick={handleLinkClick}>Gallery</Link>
                <Link to="/underconstruction" onClick={handleLinkClick}>Movies</Link>
                <Link to="/underconstruction" onClick={handleLinkClick}>Contact Us</Link>

				{user ? (
                <div className={classes.dropdown}>
                    <button onClick={toggleDropdown} className={classes.userBtn}>
                        {user.firstName}
                    </button>
                    {isDropdownOpen && (
                        <div className={classes.dropdownContent}>
                            <button onClick={logout}>Logout</button>
                        </div>
                    )}
                </div>
            ) : (
                <Link to="/login" className={classes.signInBtn}>
                    Sign In
                </Link>
            )}

                {isResponsive && (
                    <button className={classes.navCloseBtn} onClick={showNavbar}>
                        <FaTimes />
                    </button>
                )}
            </nav>
            {!isResponsive && (
                <button className={classes.navOpenBtn} onClick={showNavbar}>
                    <FaBars />
                </button>
            )}
        </header>
    );
}

export default Navbar;
