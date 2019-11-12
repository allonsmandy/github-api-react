import styled from 'styled-components'

const Gist = styled.ul`
    list-style: none;
    margin-top: 15px;

    li + li {
        border-top: 1px solid rgba(0, 0, 0, 0.2);
    }

    a {
        display: inline-block;
        padding: 5px 7px;
        color: #715;
        text-decoration: none;

        &:hover {
            background-color: #fddadd
        }
    }
`

export default Gist
