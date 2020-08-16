import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'
import { Link } from 'react-router-dom'

class Search extends Component {
    state = {
        query: '',
        searchBooks: []
    }

/**
* @description Update books and set state based on search results
* @param {string} query - search string
* @param {object} booksOnShelf - books that were already assigned to shelves currentlyReading, wantToRead and read
*/
    updateQuery = (query, booksOnShelf) => {
        let booksSearchedCurrent = [];

        BooksAPI.search(query)
        .then((books) => {
            if(books && books.length > 0) {

                //books contains results from search query and does not have shelf assigned information
                //match with booksOnShelf and set shelf assigned. Set shelf = 'none' if not assigned to shelf.
                booksSearchedCurrent = books.map((searchResultBook) => {
                    if(!searchResultBook.shelf){
                        const bookFound = booksOnShelf.filter(bk => {
                            return bk.id === searchResultBook.id;
                        });
                        if(bookFound && bookFound.length > 0 ){
                            searchResultBook.shelf = bookFound[0].shelf;
                        }
                    }
                    if(!searchResultBook.shelf){
                        searchResultBook.shelf = "none";
                    }
                    return searchResultBook;
                });  
            }
            
            //set state with updated query and book results from search with shelves assigned
            this.setState(() => ({
                query: query,
                searchBooks: booksSearchedCurrent
            }));
        });
    }

/**
* @description Updates book shelf status. Updates local state and also refreshes books assinged to shelves by calling getAllBooks()
* @param {object} book - book object
* @param {string} shelf - shelf book is assigned to
*/
    updateBookStatus = (book, shelf) => {
        BooksAPI.update(book, shelf)
        .then(() => {
            this.props.getAllBooks();

            this.setState((currState) => ({
                searchBooks: currState.searchBooks.map((bk) => {
                    if(bk.id === book.id){
                        bk.shelf = shelf;
                    }
                    return bk;
                })
            }))
        })
      }

    render() {
        const { query, searchBooks } = this.state;
        const { books } = this.props;

        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={query} 
                    onChange= {(event) => this.updateQuery(event.target.value, books)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {
                  searchBooks.map((bk) => (
                    <Book key={bk.id} bk={bk} onUpdateBookStatus={this.updateBookStatus}/>
                  ))
              }
               </ol>
            </div>
          </div>
        )
    }
}

export default Search;