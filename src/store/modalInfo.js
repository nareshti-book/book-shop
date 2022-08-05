export default {
  state: () => ({
    modalInfo: null,
    modalMode: null,
    showModal: false,
    autoCloseTimeout: null,
  }),
  actions: {
    setModalMode(mode) {
      this.modalMode = mode
    },
    resetModalMode() {
      this.modalMode = null;
    },
    setModalInfo(data) {
      this.modalInfo = data
    },
    resetModalInfo() {
      this.modalInfo = null
    },
    openModal() {
      this.showModal = true
      if (this.modalMode === ('showError' || 'showInfo')) {
        this.autoCloseTimeout = setTimeout(this.closeModal, 4000)
      }
    },
    closeModal() {
      clearTimeout(this.autoCloseTimeout);
      this.showModal = false
      this.resetModalInfo();
      this.resetModalMode()
    }
  }
}
