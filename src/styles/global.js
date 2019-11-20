import { createGlobalStyle } from 'styled-components'
import bg from '../assets/6.jpg'

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        min-height: 100%;
    }

    body {
        background-image: url(${bg});
        background-size: cover;
        background-repeat: no-repeat;
        -webkit-font-smoothing: antialiased !important;
    }

    body, input, button {
        color: #222;
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
    }

    button {
        cursor: pointer;
    }

    .valueBox-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
`
