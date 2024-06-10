import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import classes from './navbar.module.css';

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(classes.responsive_nav);
	};
	

	return (
		<header>
			<h3>LOGO</h3>
			<nav ref={navRef}>
				<a href="/#">Home</a>
				<a href="/#">About Us</a>
				<a href="/#">Gallery</a>
				<a href="/#">Movies</a>
				<a href="/#">Contact Us</a>
				<a href="/#">Sign In</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes/>
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;