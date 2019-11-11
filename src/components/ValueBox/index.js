import styled from 'styled-components'

// Valores do box de usuario

const ValueBox = styled.div`
    width: 280px;
    background-color: ${props => props.bgColor};
    color: black;
    padding: 20px;
    margin: 5px;

    span {
        text-transform: uppercase;
    }
`

export default ValueBox
