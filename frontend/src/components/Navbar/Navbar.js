import { useRef, useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import classes from './navbar.module.css';
import { useAuth } from "../../hooks/useAuth";
import { Link } from 'react-router-dom';

function Navbar() {
	const {user, logout} = useAuth();

	const navRef = useRef();
	const [isResponsive, setIsResponsive] = useState(false);

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

	return (
		<header>
			<h3>LOGO</h3>
			<nav ref={navRef}>
				<a href="/underconstruction">Home</a>
				<a href="/underconstruction">About Us</a>
				<a href="/underconstruction">Gallery</a>
				<a href="/underconstruction">Movies</a>
				<a href="/underconstruction">Contact Us</a>
				<a href="/login">Sign In</a>
				{/* <div>
				{
                            user? (
                            <li className={classes.menu_container}>
                                <Link className={classes.menu}>
                                    {user.name}
                                </Link>
                                <div className={classes.menu}>
                                  <a onClick={logout}>Logout</a>
                                </div>

        
                            </li> 
                            ) : (
                            <Link to="/login" className={classes.login}>Sign In</Link>
                        )}
				</div> */}
				{isResponsive && (
					<button
						className={classes.navCloseBtn}
						onClick={showNavbar}>
						<FaTimes/>
					</button>
				)}
			</nav>
			{!isResponsive && (
				<button
					className={classes.navOpenBtn}
					onClick={showNavbar}>
					<FaBars />
				</button>
			)}
		</header>
	);
}

export default Navbar;
