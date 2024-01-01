/* eslint-disable jsx-a11y/anchor-is-valid */
import { TfiYoutube } from "react-icons/tfi";
import { TfiInstagram } from "react-icons/tfi";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import './Footer.css'
const Footer=()=>{
    return(
        <footer>
        <div className="first-footer">
          <nav className="find-store-footer">
            <ul>
              <li>
                <a href="#">Find a store</a>
              </li>
              <li>
                <a href="#">BECOME A MEMBER</a>
              </li>
              <li>
                <a href="#">Send Us Feedback</a>
              </li>
            </ul>
          </nav>
          <nav className="help-footer">
            <ul>
              <li className="first-line-footer">
                <a href="#">GET HELP</a>
              </li>
              <li>
                <a href="#">Oder Status</a>
              </li>
              <li>
                <a href="#">Delivery</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
              <li>
                <a href="#">Payment Options</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </nav>
          <nav className="nike-info-footer">
            <ul>
              <li className="first-line-footer">
                <a href="#">ABOUT NIKE</a>
              </li>
              <li>
                <a href="#">News</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Investors</a>
              </li>
              <li>
                <a href="#">Subtainbility</a>
              </li>
            </ul>
          </nav>
          <nav className="footer-social">
            <ul>
              <li>
                <a href="https://twitter.com/Nike">
                <FaTwitter  className="icon"/>
                </a>{" "}
              </li>
              <li>
                <a href="https://www.facebook.com/nike">
                <FaFacebook className="icon"/>

                </a>{" "}
              </li>
              <li>
                <a href="https://www.youtube.com/user/nike">
                <TfiYoutube className="icon"/>
                </a>{" "}
              </li>
              <li>
                <a href="https://www.instagram.com/nike/">
                <TfiInstagram className="icon"/>
                </a>{" "}
              </li>
            </ul>
          </nav>
        </div>
        <div className="second-footer">
          <div className="second-footer-left">
            <span className="first-second-footer-left">
              <i className="ti-location-pin" />
              Việt Nam
            </span>
            <span>
              <i className="fa-regular fa-copyright" />
              2023 Nike,Inc.All Rights Reserved
            </span>
          </div>
          <div className="second-footer-right">
            <ul>
              <li>Guides</li>
              <li>Term of Sale</li>
              <li>Term of Use</li>
              <li>Nike Privacy Policy</li>
            </ul>
          </div>
        </div>
      </footer>          
    )
}
export default Footer