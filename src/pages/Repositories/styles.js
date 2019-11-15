import styled from 'styled-components'

const Repositories = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    margin-top: 10px;

    li {
        width: 50%;
        padding: 5px 4px;

        a {

            &:hover {
                background-color: pink;
            }
        }
    }
`
export default Repositories
