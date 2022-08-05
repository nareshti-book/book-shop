<template>
  <div class="admin">
    <h1>Hello, I am admin page!</h1>

    <form>

      <input placeholder="Назва" />
      <input placeholder="Опис" />
      <input placeholder="Картинка" />
      <input placeholder="Ціна" />
      <input placeholder="Автор" />

      <button @click.prevent>Додати книжку</button>
    </form>

    <ul>Список книжок
      <li>Книга1  <button>(видалити)</button><button>(редагувати)</button></li>
      <li>Книга2  <button>(видалити)</button><button>(редагувати)</button></li>
      <li>Книга3  <button>(видалити)</button><button>(редагувати)</button></li>
      <li>Книга4  <button>(видалити)</button><button>(редагувати)</button></li>
      <li>Книга5  <button>(видалити)</button><button>(редагувати)</button></li>
      <li>Книга6  <button>(видалити)</button><button>(редагувати)</button></li>
      <li>Книга7  <button>(видалити)</button><button>(редагувати)</button></li>
      <li>Книга8  <button>(видалити)</button><button>(редагувати)</button></li>
    </ul>
  </div>
</template>

<style scoped>
.admin {
  margin: 100px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
button {
  align-self: flex-end;
  padding: 1rem;
  margin: 1rem
}

li {
  border: 1px solid grey;
  margin: 1rem
}

input {
  width: 350px;
}
</style>
