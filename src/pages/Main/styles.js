import styled from 'styled-components'

export const Title = styled.h1`
    font-size: 24px;
    color: ${props => (props.error ? 'red' : '#715')};
    font-family: Arial, Helvetica, sans-serif;
`
