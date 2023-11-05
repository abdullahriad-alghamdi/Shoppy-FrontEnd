import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Footer = () => {

  const { isLogin, userData } = useSelector((state: RootState) => state.users)

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.success('Thank you for subscribing!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true
    })
  }

  return (
    <footer className="footer">
      {((isLogin && userData && userData.role !== 'admin') || !isLogin) && (
        <section className="footerContent">
          <div className="contentBox subscribeForm">
            <form onSubmit={handleSubscribe}>
              <label htmlFor="subscribe">
                <h3>Unlock Exclusive Deals and Offers!</h3>
                <input type="email" id="subscribe" placeholder="Enter your email address" required />
                <button type="submit">Subscribe Now</button>
              </label>
            </form>
          </div>
          <div className="contentBox"></div>
          <div className="contentBox contactsUsInfo">
            <h3> Contact Us</h3>
            <p>
              <span>Phone:</span>
              <a href="tel:+966 55 555 5555" className='text-decoration-none'
              > +966 55 555 5555</a>
            </p>
            <p>
              <span>Email:</span>
              <a href="mailto:Shoppy@gmail.com" className='text-decoration-none'
              > Shoppy@gmail.com</a>
            </p>
            <p>
              <span>Address:</span>
              <a href="https://goo.gl/maps/7L2WVZdK9jyRb9wN8" className='text-decoration-none'
              > Kingdom of Saudi Arabia</a>
            </p>
          </div>
        </section>
      )}
      <section className="footer-bottom">
        <p>© 2021 Shoppy. All Rights Reserved.</p>
        <ul>
          <li>
            <a href="https://www.facebook.com/">
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/">
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/">
              <FaInstagram />
            </a>
          </li>
        </ul>
      </section>
    </footer>
  )
}

export default Footer
