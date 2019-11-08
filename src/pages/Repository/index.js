import React from 'react'

export default function Repository({ match }) {
    return <h1>Repositorio: {decodeURIComponent(match.params.repositorio)} </h1>
}
