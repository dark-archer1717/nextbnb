/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useStoreState, useStoreActions } from 'easy-peasy';
import axios from 'axios';
import Cookies from 'cookies';
import Router from 'next/router';

export default function Header() {
  const loggedIn = useStoreState((state) => state.login.loggedIn);
  const setLoggedIn = useStoreActions((actions) => actions.login.setLoggedIn);

  const setShowLoginModal = useStoreActions(
    (actions) => actions.modals.setShowLoginModal
  );
  const setShowRegistrationModal = useStoreActions(
    (actions) => actions.modals.setShowRegistrationModal
  );

  return (
    <div className="nav-container">
      <Link href="/">
        <a>
          <img src="/img/bnb.png" alt="icon" />
        </a>
      </Link>

      {loggedIn ? (
        <nav>
          <ul>
            <li>
              <Link href="/bookings">
                <a>Bookings</a>
              </Link>
            </li>
            <ul>
              <button>
                <li>
                  <a>Logged In</a>
                </li>
              </button>
            </ul>
            <ul>
              <li>
                <a
                  href="{}"
                  onClick={async () => {
                    await axios.post('/api/auth/logout');
                    localStorage.clear('sessionToken')
                    console.log('logout')
                  }}
                >
                  Log out
                </a>
              </li>
            </ul>
            <li>
              <Link href="/host">
                <a>Your Houses</a>
              </Link>
            </li>
            <li>
              <Link href="/host/new">
                <a>Add House</a>
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <a href="#" onClick={() => setShowRegistrationModal()}>
                Sign up
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setShowLoginModal()}>
                Log in
              </a>
            </li>
          </ul>
        </nav>
      )}

      <style jsx>{`
        ul {
          margin: 0;
          padding: 0;
        }
        button {
          margin-top: 6px;
        }
        house {
          border-bottom: 1px solid #eee;
          height: 50px;
          padding: 1em 0.5em;
        }
        li {
          display: block;
          float: left;
        }
        a {
          text-decoration: none;
          display: block;
          margin-right: 15px;
          color: #333;
        }
        nav a {
          padding: 1em 0.5em;
        }
        .nav-container {
          border-bottom: 1px solid #eee;
          height: 50px;
        }
        img {
          float: left;
          margin-right: auto;
        }
        ul {
          float: right;
        }
      `}</style>
    </div>
  );
}
