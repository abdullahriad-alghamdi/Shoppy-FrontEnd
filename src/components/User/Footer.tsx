import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footerContent">
        <div className="contentBox subscribeForm">
          <label htmlFor="subscribe">
            <h3>Unlock Exclusive Deals and Offers!</h3>
            <input type="text" id="subscribe" placeholder="Enter your email address" />
            <button type="submit">Subscribe Now</button>
          </label>
        </div>
        <div className="contentBox"></div>
        <div className="contentBox contactsUsInfo">
          <h3> Contact Us</h3>
          <p>
            <span>Phone:</span> +966 51 256 7897
          </p>
          <p>
            <span>Email:</span>
            <a href="mailto:Shoppy@gmail.com">Shoppy@gmail.com</a>
          </p>
          <p>
            <span>Address:</span> 2030 Future, Neom, Saudi Arabia
          </p>
        </div>
      </section>
      <hr />
      <section className="footerBottom">
        <p>© 2021 Shoppy. All Rights Reserved.</p>
        <ul>
          <li>
            <a href="/">
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a href="/">
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href="/">
              <FaInstagram />
            </a>
          </li>
        </ul>
      </section>
    </footer>
  )
}

export default Footer
