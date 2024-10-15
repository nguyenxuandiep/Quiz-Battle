import  styles from  './Footer.module.scss';
import classNames from 'classnames/bind';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const cx = classNames.bind(styles); 
function Footer() {

    return (
    <footer className={cx("footer")}>
        <div className={cx("footer-container")}>
          <div className={cx("footer-row")}>
            <div className={cx("footer-column")}>
              <h4>About</h4>
              <ul>
                <li>
                  <a href="/">Company</a>
                </li>
                <li>
                  <a href="/">Service</a>
                </li>
                <li>
                  <a href="/">Blog</a>
                </li>
                <li>
                  <a href="/">Contact</a>
                </li>
              </ul>
            </div>
            <div className={cx("footer-column")}>
              <h4>Application</h4>
              <ul>
                <li>
                  <a href="/">At home</a>
                </li>
                <li>
                  <a href="/">At school</a>
                </li>
                <li>
                  <a href="/">At work</a>
                </li>
              </ul>
            </div>
            <div className={cx("footer-column")}>
              <h4>Terms and conditions</h4>
              <ul>
                <li>
                  <a href="/">
                  Terms and conditions
                  </a>
                </li>
                <li>
                  <a href="/">
                  Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className={cx("footer-column")}>
              <h4>Follow us</h4>
              <div className={cx("footer-social-liks")}>
                <a href="/">
                  <FacebookIcon />
                </a>
                <a href="/">
                  <TwitterIcon />
                </a>
                <a href="/">
                  <InstagramIcon />
                </a>
                <a href="/">
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>)
}

export default Footer;