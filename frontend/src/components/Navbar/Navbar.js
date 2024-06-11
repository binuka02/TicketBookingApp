import { useRef, useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import classes from './navbar.module.css';

function Navbar() {
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
				<a href="/#">Home</a>
				<a href="/#">About Us</a>
				<a href="/#">Gallery</a>
				<a href="/#">Movies</a>
				<a href="/#">Contact Us</a>
				<a href="/login">Sign In</a>
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
