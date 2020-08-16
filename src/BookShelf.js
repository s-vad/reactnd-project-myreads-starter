import React, { Component } from 'react'
import Book from './Book'
import './App.css'
import { Link } from 'react-router-dom'

class BookShelf extends Component {
    state = {
        shelves: [
            { id: 'currentlyReading', desc: 'Currently Reading' },
            { id: 'wantToRead', desc: 'Want To Read' },
            { id: 'read', desc: 'Read' }
        ]
    }

   render() { 
    const { books, onUpdateBookStatus } = this.props;

    return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {
            this.state.shelves.map((shelf) => {
                let booksOnShelf = "";

                // Display books on each of the shelves
                if(books && books.length > 0){
                    booksOnShelf = books.filter((bks) => {
                        return bks.shelf === shelf.id
                    }).map((bk) => (
                        <Book key={bk.id} bk={bk} onUpdateBookStatus={onUpdateBookStatus} />
                    ))
                }

                return (
                    <div key={shelf.id} className="bookshelf">
                        <h2 className="bookshelf-title">{shelf.desc}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                { booksOnShelf }
                            </ol>
                        </div>
                    </div>
                )
            })
          }
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
    }
}

export default BookShelf;