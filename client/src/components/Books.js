
import React, { useState } from 'react';
/*function Books() {
    return (
        <div>
            <h2>Favorite Books</h2>
            <ul>
                {
                    books.map((book) => (
                        <li key={book.id}> {book.title}</li>
                    ))
                }
            </ul>
        </div>
    );
}*/

function Books(props) {
    const [bookhold, setBookhold] = useState('');
    return(
        <div class = "objdef">
            <h2>Favorite Books</h2>
            <ul id = "bookList">
                {
                    props.books.map((book) => 
                        <li onClick={displayBook} key={book.id}> {book.title}</li>
                    )
                }
            </ul>
            <div>
                <input onChange={searchBooks} type = "search" />
            </div>
            <div>
                <p>{ bookhold }</p>
            </div>
        </div>
    );
    
}
const displayBook = (e) => {
        console.log(e.target, " was clicked");
    };

const searchBooks = (e) => { 
    console.log(e.target.value, " was searched");
};

export default Books;