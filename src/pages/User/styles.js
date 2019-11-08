import styled from 'styled-components'

const Info = styled.ul`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: row;
    width: 80%;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;

    li {
        list-style: none;
    }

    svg {
        vertical-align: middle;
        margin-right: 5px;
    }
`

export default Info
