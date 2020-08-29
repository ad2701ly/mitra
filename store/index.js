export const state = () => ({
  host: 'http://127.0.0.1/aio/',
  loading: false
})

export const mutations = {
/*   SET_REGISTER_MODAL_ACTIVE (state, payload) {
    state.registerModal = payload
  },
  SET_AGREED_MODAL_ACTIVE (state, payload) {
    state.modalPersetujuan = payload
  }, */
  SET_LOADING (state, payload) {
    state.loading = payload
  }
}
