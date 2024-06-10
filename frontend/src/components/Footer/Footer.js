import React from 'react';
import classes from './footer.module.css';

function Footer() {
  return (
    <>
      <footer className={classes.footer}>
        <div className={classes.container}>
          <div className={classes.col1}>
            <a href="#" className={classes.brand}>LOGO</a>
            <ul className={classes.mediaIcons}>
              <li>
                <a href="#"><i className="fa-brands fa-youtube"></i></a>
              </li>
              <li>
                <a href="#"><i className="fa-brands fa-discord"></i></a>
              </li>
              <li>
                <a href="#"><i className="fa-brands fa-instagram"></i></a>
              </li>
              <li>
                <a href="#"><i className="fa-brands fa-github"></i></a>
              </li>
            </ul>
          </div>
          <div className={classes.col2}>
            <ul className={classes.menu}>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Term & Condition</a></li>
             
            </ul>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem excepturi ipsam unde obcaecati iusto velit labore consequuntur officiis aut neque?</p>
          </div>
          <div className={classes.col3}>
            <p>Services</p>
            <form>
              {/*<div className={classes.inputWrap}>
                <input type="email" placeholder="ex@gmail.com" />
                <button type="submit"><i className="fa-solid fa-paper-plane"></i></button>
              </div>*/}
            </form>
            <ul className={classes.servicesIcons}>
              <li>
                <a href="#"><i className="fa-brands fa-cc-paypal"></i></a>
              </li>
              <li>
                <a href="#"><i className="fa-brands fa-cc-apple-pay"></i></a>
              </li>
              <li>
                <a href="#"><i className="fa-brands fa-google-pay"></i></a>
              </li>
              <li>
                <a href="#"><i className="fa-brands fa-cc-amazon-pay"></i></a>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.footerBottom}>
          <div className={classes.mekk}>
            <p>@Dev 2024 - All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
