import React from 'react'

export default function Book(props) {

    return (
        <tr>
            <th>{props.title}</th>
            <th>{props.author}</th>
            <th>{props.year}</th>
        </tr>
    )

}
