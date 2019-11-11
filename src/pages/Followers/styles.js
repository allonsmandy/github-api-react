import styled from 'styled-components'

const FollowersList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    list-style: none;
    text-align: center;

    li {
        width: 190px;
        margin: 7px 3px;
    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        box-shadow: 2px 1px 5px rgba(0, 0, 0, 0.3)
    }

    a {
        text-decoration: none;
        /* background-color: black; */
        display: block;
        max-width: 100%;
        color: #715;
        padding: 2px 0;
    }
`

export default FollowersList
