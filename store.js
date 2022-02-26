import { createStore, action } from 'easy-peasy'

export default createStore({
  //state of login
  login: {
    loggedIn: false,
    setLoggedIn: action((state) => {
      state.loggedIn = true
    }),
  },
  logout: {
    loggedIn: true,
    setLoggedIn: action((state) => {
      state.loggedIn = null
    }),
  },
  modals: {
    showModal: false,
    showLoginModal: false,
    showRegistrationModal: false,
    setShowModal: action((state) => {
      state.showModal = true
    }),
    setHideModal: action((state) => {
      state.showModal = false
    }),
    setShowLoginModal: action((state) => {
      state.showModal = true
      state.showLoginModal = true
      state.showRegistrationModal = false
    }),
    setShowRegistrationModal: action((state) => {
      state.showModal = true
      state.showLoginModal = false
      state.showRegistrationModal = true
    })
  }
})

