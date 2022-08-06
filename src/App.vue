<script setup>
import { getDatabase, ref as databaseRef, set as databaseSet, onValue } from 'firebase/database';
import { booksStore } from './store/store.js';
const db = getDatabase();
const bookStore = booksStore();
const getBooks = () => {
  const updatedBooks = databaseRef(db, '/books');
  onValue(updatedBooks, (snapshot) => {
    const data = snapshot.val();
    bookStore.setBooks(data);
  });
};
getBooks();
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped></style>
