import React, { useState, useEffect } from 'react'
import Book from './Book'

export default function AddForm() {

    const [books, setBooks] = useState([])
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [year, setYear] = useState("")
    const [getData, setgetData] = useState(false)


    useEffect(async () => {
        await fetch('https://booklist-903cb-default-rtdb.firebaseio.com/books.json')
            .then(response => response.json())
            .then(data => {
                console.log(Object.entries(data))
                setBooks(Object.entries(data))
            })
    }, [getData])


    const addBookHandler = async (event) => {
        event.preventDefault()
        if (title && author && year) {
            let newBook = {
                title,
                author,
                year
            }
            await fetch('https://booklist-903cb-default-rtdb.firebaseio.com/books.json', {
                method: 'POST',
                body: JSON.stringify(newBook)
            }).then(response => (response.status == 200) && setgetData(prev => !prev))
        }
        clearInputValue()
    }


    const clearInputValue=()=>{
        setTitle("")
        setAuthor("")
        setYear("")
    }


    return (
        <>
            <form id="book-form" autocomplete="off">
                <div className="form-group">
                    <label for="title">Title</label>
                    <input type="text" id="title" className="form-control" value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>

                <div className="form-group">
                    <label for="author">Author</label>
                    <input type="text" id="author" className="form-control" value={author} onChange={(event) => setAuthor(event.target.value)} />
                </div>

                <div className="form-group">
                    <label for="year">Year</label>
                    <input type="number" id="year" className="form-control" value={year} onChange={(event) => setYear(event.target.value)} />
                </div>
                <input type="submit" value="Add Book" className="btn btn-warning btn-block add-btn" onClick={addBookHandler} />
            </form>
            <table class="table table-striped mt-5 text-center">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody id="book-list">
                    {books.map(book => (
                        <Book {...book[1]} />
                    ))}
                </tbody>
            </table>


        </>
    )
}

