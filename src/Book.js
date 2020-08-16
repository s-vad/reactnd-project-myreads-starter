import React, { Component } from 'react'
import './App.css'

class Book extends Component {
    render() {
        const { bk, onUpdateBookStatus } = this.props;
        let authors = '';

        // Cleanse book author and thumbnail data
        if(bk.authors && bk.authors.length > 0){
            authors = bk.authors.map(author => (
                <div key={author} className="book-authors">{author}</div>
            ))
        }
        let bkImage = (bk.imageLinks && bk.imageLinks.thumbnail) ? bk.imageLinks.thumbnail : "";

        return (
            <li key={bk.id}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${bkImage}")` }}></div>
                    <div className="book-shelf-changer">
                        <select value={bk.shelf} onChange={(event) => { onUpdateBookStatus(bk, event.target.value) }}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{bk.title}</div>
                { authors }
            </div>
            </li>  
        )
    }
}

export default Book