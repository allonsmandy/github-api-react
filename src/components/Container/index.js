import styled from 'styled-components'

// *~ Container ~*
const Container = styled.div`
    max-width: 700px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    padding: 30px;
    margin: 80px auto;

    header {
    display: flex;
    justify-content: space-between;

    h1 {
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    svg {
        margin-right: 10px;
    }

    button {
        border: none;
        padding: 5px 10px;
        transition: .1s ease-in-out;
        /* cursor: ${props => (!props.disabled ? 'not-allowed' : 'pointer' )}; */
    }}
`

export default Container
