<template>
  <div class="admin">
    <TheModal />
    <div class="btn-tabs" v-if="mode !== 'create'">
      <button class="button" :class="{ active: mode === 'create' }" @click="clearForm">
        <h4>Add new book</h4>
      </button>
    </div>
    <h1 :style="{ textAlign: 'center' }">Please, {{ modeLabel }}</h1>
    <form class="book-form" ref="addBookRef">
      <div>
        <div class="image-container">
          <img v-if="img.length" class="form-image" :src="img" alt="Image" />
        </div>
      </div>
      <div class="form-inputs">
        <div>
          <h4>Назва</h4>
          <input class="form-input" placeholder="Назва" v-model="title" />
        </div>
        <div>
          <h4>Автор</h4>
          <input class="form-input" placeholder="Автор" v-model="author" />
        </div>
        <div>
          <h4>Ціна</h4>
          <input class="form-input" placeholder="Ціна" v-model="price" />
        </div>
        <div>
          <h4>Опис</h4>
          <input class="form-input" placeholder="Опис" v-model="description" />
        </div>
        <div class="upload-file">
          <input type="file" class="select-file" accept="image/*" @change="selectFile" />
        </div>
      </div>
    </form>
    <div class="btn-tabs">
      <button class="button" @click.prevent="saveBook">Save</button>
      <button class="button" @click.prevent="clearForm">Cancel</button>
    </div>

    <ul class="books-list">
      <h2>Список доступних книжок:</h2>
      <li v-for="book in allBooks" :key="book.id" class="book-review">
        <img class="small-image" :src="book.img" />
        <div class="book-info">
          <h3>{{ book.title }}</h3>
          <h3>{{ book.author }}</h3>
          <h2>{{ book.price }} ₪</h2>
        </div>
        <div class="book-review-btns">
          <button class="button" @click="selectBook(book)">Редагувати</button>
          <button class="button" @click="deleteBook(book)">Видалити</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import {
  getDatabase,
  ref as databaseRef,
  set as databaseSet,
  onValue,
  update,
  remove,
} from 'firebase/database';

import { ref, computed } from 'vue';
import { booksStore, modalStore } from '../store/store.js';

import { v4 as uuidv4 } from 'uuid';
import TheModal from './TheModal.vue';
const bookStore = booksStore();
const modal = modalStore();
const allBooks = computed(() => bookStore.allBooks);
const mode = ref('create');
const changeMode = (data) => {
  mode.value = data;
};

const addBookRef = ref(null);

const modeLabel = computed(() =>
  mode.value === 'create' ? 'create new book' : `edit book "${title.value}"`
);
const selectedImage = ref(null);

const title = ref('');
const author = ref('');
const price = ref('');
const description = ref('');
const img = ref('');
const id = ref('');

const resetData = () => {
  title.value = '';
  author.value = '';
  price.value = '';
  description.value = '';
  img.value = '';
  id.value = '';
};

const clearForm = () => {
  changeMode('create');
  resetData();
};

const saveBook = () => {
  const book = {
    title: title.value,
    author: author.value,
    price: price.value,
    description: description.value,
    img: img.value,
    id: id.value || uuidv4(),
  };
  if (!title.value.trim().length || !author.value.trim().length || !price.value.trim().length || !img.value) return showError('all');
  if (isNaN(price.value)) return showError('price')
  if (mode.value === 'create') {
    addNewBook(book);
    return resetData();
  }
  saveUpdatedBook(book);
  resetData();
};

const showError = (type) => {
  modal.setModalMode('showError')
  const errorMessage = type === 'all' ? "Будь ласка, заповніть обов'язкові поля: Назва, Автор, Ціна і додайте картинку" : 'Ціна має містити лише числа!'
  modal.setModalInfo(errorMessage);
  modal.openModal();
}

const selectBook = (book) => {
  title.value = book.title;
  author.value = book.author;
  price.value = book.price;
  description.value = book.description;
  img.value = book.img;
  id.value = book.id;
  changeMode('update');
  addBookRef.value.scrollIntoView({ behavior: 'smooth' });
};

const selectFile = (event) => {
  selectedImage.value = event.target.files[0];
  const storage = getStorage();
  const flRef = storageRef(storage, `book-images/${selectedImage.value.name}`);

  uploadBytes(flRef, selectedImage.value).then((snapshot) => {
    getDownloadURL(storageRef(storage, `book-images/${selectedImage.value.name}`)).then((url) => {
      img.value = url;
    });
  });
};

const addNewBook = (book) => {
  const db = getDatabase();
  databaseSet(databaseRef(db, 'books/' + book.id), book).then((res) => {
    const updatedBooks = databaseRef(db, '/books');
    onValue(updatedBooks, (snapshot) => {
      const data = snapshot.val();
      bookStore.setBooks(data);
    });
  });
};

const saveUpdatedBook = (book) => {
  const db = getDatabase();
  const updates = { [`/books/${book.id}`]: book };
  update(databaseRef(db), updates).then(() => {
    getBooks();
  });
};

const deleteImage = (urlData) => {
  const storage = getStorage();
  var url_token = urlData.split('?');
  var url = url_token[0].split('/');
  var filePath = url[url.length - 1].replaceAll('%2F', '/');
  console.log('filePath', filePath);
  const imgRef = storageRef(storage, filePath);
  deleteObject(imgRef).then(() => {
    console.log('image deleted');
  });
};

const getBooks = () => {
  const db = getDatabase();
  const updatedBooks = databaseRef(db, '/books');
  onValue(updatedBooks, (snapshot) => {
    const data = snapshot.val();
    bookStore.setBooks(data);
  });
};

const deleteBook = (book) => {
  deleteImage(book.img);
  const db = getDatabase();
  remove(databaseRef(db, 'books/' + book.id)).then(() => {
    getBooks();
  });
};
</script>

<style scoped>
.admin {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.btn-tabs {
  display: flex;
  gap: 2rem;
  justify-content: center;
  max-height: 4rem;
}
.active {
  background-color: var(--first-color-alt);
}

.book-form {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.book-info {
  min-width: 200px;
}

.form-inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 400px;
}

.form-input {
  width: 80%;
  padding: 0.4rem;
}

.image-container {
  height: 300px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(209, 208, 208);
}

.form-image {
  max-width: 300px;
  max-height: 300px;
}

.select-file {
  width: 300px;
  align-self: flex-start;
}
.button {
  padding: 10px 10px;
}

.books-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
  align-self: center;
}

.book-review {
  padding: 1rem;
  max-height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--first-color);
}

.book-review img {
  max-width: 180px;
  max-height: 180px;
}
.book-review-btns {
  display: flex;
  gap: 1rem;
  align-self: flex-end;
}

@media screen and (max-width: 767px) {
  .book-review {
    flex-direction: column;
    max-height: 1000px;
  }
  .book-review-btns {
    flex-direction: row;
  }

  .book-form {
    flex-direction: column;
  }

  .form-inputs {
    width: 200px;
  }

  .book-info {
    min-width: none;
    text-align: center;
  }
}
</style>
