import Prod1 from '../assets/product1.jpg';
import Prod2 from '../assets/product2.jpg';
import Prod3 from '../assets/product3.jpg';
import Prod4 from '../assets/product4.jpg';
import Prod5 from '../assets/product5.jpg';
import Prod6 from '../assets/product6.jpg';
import Prod7 from '../assets/product7.jpg';

export default {
  state: () => ({
    allBooks: [
      {
        author: 'Марія Матіос',
        title: 'Солодка Даруся',
        price: 130,
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt reprehenderit, delectus fugit beatae explicabo, quaerat soluta alias quos quod praesentium nihil totam dolor adipisci architecto, cupiditate expedita omnis doloremque vitae?',
        id: '1',
        img: Prod1,
      },
      {
        author: 'Деніел Кіз',
        title: 'Квіти для Елджернона',
        price: 100,
        description: 'UUUUUUUUUUUUUUUUUUUUUUU',
        id: '2',
        img: Prod2,
      },
      {
        author: 'Бернар Вербер',
        title: 'Зоряний метелик',
        price: 140,
        description: 'AAAAAAAAAA',
        id: '3',
        img: Prod3,
      },
      {
        author: 'Елізабет Ґілберт',
        title: 'Місто дівчат',
        price: 150,
        description: '111',
        id: '4',
        img: Prod4,
      },
      {
        author: 'Сергій Жадан',
        title: 'Інтернат',
        price: 120,
        description: '111',
        id: '5',
        img: Prod5
      },
      {
        author: 'Ольга Кобилянська',
        title: 'Земля',
        price: 120,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ullam nobis minima voluptate rem magni incidunt distinctio enim saepe ipsum eius fugiat neque, quaerat mollitia laboriosam labore dolore quam vel necessitatibus? Nam perferendis at quis, hic laudantium quam quae provident adipisci eaque aliquam soluta eum tenetur ipsa officiis magnam voluptatem incidunt rerum quod quisquam? Dignissimos quisquam quaerat nulla voluptates, quod eveniet deserunt dolorem quae fuga qui eum aut debitis sint hic vitae dicta sunt distinctio ut et blanditiis. Minima, facilis! Dolore placeat sunt sit natus sequi voluptatem, illo, assumenda excepturi sapiente temporibus consequuntur modi quas! Iusto nesciunt molestias et, dolorum culpa maiores laudantium! Earum tempora voluptatem ea dolore cumque iusto blanditiis cum ab quia ipsum odio odit natus dolorem ipsa repellat, inventore sint reiciendis sapiente impedit laudantium perferendis rerum animi! Iusto, ipsam. Commodi, sunt! Suscipit quidem, quisquam voluptatem fugiat dolorem cumque officia at? Fugit, dolores error eaque enim earum fuga doloremque consectetur tempora hic ad optio ducimus temporibus, nam dolorum dolore, adipisci qui possimus voluptatum soluta quidem exercitationem. Similique optio quae minus beatae, vitae modi, iure voluptates provident necessitatibus tempore in facilis expedita quasi animi explicabo adipisci, ducimus nostrum doloribus autem deserunt? Quisquam blanditiis tempore alias iste soluta maxime autem voluptatem nesciunt dignissimos nemo eveniet sed facilis qui quis dolor consequatur tempora nisi mollitia eius culpa voluptatibus, nobis accusantium. Commodi tempore voluptas quos harum, accusamus dolore iste obcaecati hic at eligendi repudiandae aspernatur eum magnam facere nesciunt explicabo, laboriosam atque dolores possimus impedit. Nobis, in provident nisi sit facere harum rerum perspiciatis adipisci beatae eius ea porro consequuntur quas, numquam corrupti temporibus quaerat, iusto molestiae expedita magni fugit aliquid? Blanditiis quas tempore exercitationem commodi pariatur, quos totam eveniet officia, corporis laborum ullam? Hic harum, dolor repellendus reprehenderit accusantium, maxime quos modi corporis expedita veritatis libero saepe ea delectus voluptatem, quia non. Sit, mollitia, quod ex eius facere laborum animi quis deleniti ipsam nulla numquam vel id ratione corrupti fugiat sunt. Incidunt eos aperiam inventore ducimus. Voluptas similique in odit amet eius distinctio qui tempore consequatur. Odio eaque vitae qui laboriosam numquam quibusdam earum aperiam quasi consequatur voluptatum labore optio, dolore, veritatis quia deleniti iste esse nostrum iusto natus, commodi vel impedit! Aliquid, voluptate repellat eligendi optio ab nulla praesentium a odit officiis harum commodi atque ex, sunt vitae doloremque mollitia fuga molestias accusamus fugiat! Inventore veniam voluptate facere alias dignissimos doloribus asperiores harum esse voluptatem assumenda consequatur perspiciatis illo laudantium corporis commodi, iusto illum aspernatur velit, impedit eum eaque facilis? Laudantium, quam ipsa blanditiis, esse obcaecati at voluptates voluptatem fugiat cum optio impedit, velit harum quo enim culpa fuga. Asperiores expedita dignissimos voluptatum odio corporis ducimus omnis quas nobis. Fugit quam deleniti dolorum doloremque eius culpa delectus nemo iusto laboriosam, dicta nobis earum architecto ea hic iste, perferendis praesentium eos ab recusandae at quia. Nostrum molestias ipsa quae quisquam vero nam perspiciatis, quibusdam officiis possimus odio error maiores, doloribus totam magnam impedit quod accusantium dicta itaque? Suscipit aspernatur perferendis culpa quo cumque perspiciatis! Illo labore repellendus vero tenetur aperiam fugiat',
        id: '6',
        img: Prod6,
      },
      {
        author: 'Саллі Руні',
        title: 'Нормальні люди',
        price: 120,
        description: '11s1',
        id: '7',
        img: Prod7,
      },
    ],
    cart: [],
  }),
  getters: {
    books: state => state.allBooks.filter(book => !state.cart.some(cartBook => cartBook === book)),
    // books: (state) => state.allBooks.filter(book => state.cart.some(cartBook => cartBook.id !== book.id)),
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
    }
  },
}
