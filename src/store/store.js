import { defineStore } from 'pinia'

import books from './books'
import sections from './sections'
import modalInfo from './modalInfo'

export const booksStore = defineStore('books', books)
export const sectionsStore = defineStore('sections', sections)
export const modalStore = defineStore('modalInfo', modalInfo)
