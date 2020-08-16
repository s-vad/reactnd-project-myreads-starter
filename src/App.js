import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'
import { Route } from 'react-router-dom'

class BooksApp extends Component {
  state = {
    books: []
  }

/**
* @description Gets books and sets state. Books with shelf state currentlyReading, wantToRead and Read are included.
*/
  getAllBooks = () => {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
      //console.log(JSON.stringify(this.state.books));
    })
  }

  componentDidMount() {
    this.getAllBooks();
  }

/**
* @description Update a specific book shelf status. Upon completion, refresh all books and set state
* @param {object} book - Book object
* @param {string} shelf - Shelf book is assigned to
*/
  updateBookStatus = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(() => {
      this.getAllBooks();
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelf books={this.state.books} onUpdateBookStatus={this.updateBookStatus} />
        )} />
        <Route exact path='/search' render={() => (
          <Search books={this.state.books} getAllBooks={this.getAllBooks} />
        )} />
      </div>
    )
  }
}

export default BooksApp
