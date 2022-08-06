export default {
  state: () => ({
    allBooks: [],
    cart: [],
  }),
  getters: {
    books: state => state.allBooks.filter(book => !state.cart.some(cartBook => cartBook.id === book.id)),
    totalCartPrice: (state) => state.cart.reduce((acc, book) => {
      return acc + book.price
    }, 0)
  },
  actions: {

    addToCart(book) {
      this.cart.push(book)
    },
    removeFromCart(id) {
      this.cart = this.cart.filter(item => item.id !== id)
    },
    resetCart() {
      this.cart = [];
    },

    setBooks(data) {
      if (!data) return
      this.allBooks = Object.entries(data).map(([key, value]) => value)
    }
  },
}
