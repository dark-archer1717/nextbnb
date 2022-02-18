/* eslint-disable @next/next/no-sync-scripts */
import Header from './Header';
import Modal from './Modal';
import { useState } from 'react'
import LoginModal from './Modals/LoginModal';
import RegistrationModal from './Modals/RegistrationModal';
import { useStoreState, useStoreActions } from 'easy-peasy'
import Head from 'next/head';

export default function Layout(props) {

  const showModal = useStoreState((state) => state.modals.showModal)
  const showLoginModal = useStoreState((state) => state.modals.showLoginModal)
  const showRegistrationModal = useStoreState(
    (state) => state.modals.showRegistrationModal
  )

  const setHideModal = useStoreActions((actions) => actions.modals.setHideModal)
  const setShowRegistrationModal = useStoreActions(
    (actions) => actions.modals.setShowRegistrationModal
  )
  const setShowLoginModal = useStoreActions(
    (actions) => actions.modals.setShowLoginModal
  )

  return (
    <div>
      <Head>
        <script src='https://js.stripe.com/v3/'></script>
      </Head>
      <Header />
      <main>{props.content}</main>
      {
        showModal && (
          <Modal close={() => setHideModal()}>
            {showLoginModal && (
              <LoginModal
                showSignup={() => {
                  setShowRegistrationModal()
                }}
              />
            )}
            {showRegistrationModal && (
              <RegistrationModal
                showLogin={() => {
                  setShowLoginModal()
                }}
              />
            )}
          </Modal>
        )
      }
      <style jsx>{`
        main {
          position: relative;
          max-width: 56em;
          background-color: white;
          padding: 2em;
          margin: 0 auto;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
