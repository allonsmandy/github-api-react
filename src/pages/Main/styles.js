import styled, { keyframes, css } from 'styled-components'

// *~ Formulário ~*
export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid #eee;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;
        outline: none;
    }

    input:focus {
        border-color: #ccc;
    }
`
// *~ animação do botão ~*
const rotate = keyframes`
    from {
        transform: rotate(0deg)
    }
    to {
        transform: rotate(360deg)
    }
`

// *~ Botão de envio  ~*
export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading
}))`
    background: #715;
    border: 0;
    padding: 10px;
    margin-left: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background: #000;
    }

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.6;
    }

    ${props => props.loading && css`
        svg {
            animation: ${rotate} 2s linear infinite;
        }
    ` }
`

// *~ Listinha ~*
export const List = styled.ul`
    list-style: none;
    margin-top: 30px;

    li {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        & + li {
            border-top: 1px solid #eee;
        }

        a {
            color: #715;
            text-decoration: none;
            background: #eeeeba;
            padding: 5px;

            &:hover {
                background: #eee;
            }
        }
        div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

        button {
            color: #fff;
            font-size: 10px;
            width: 25px;
            height: 25px;
            margin-left: 10px;
            background: #715;
            border: 0;
            border-radius: 50%;

            &:hover {
                background: red;
            }
        }
    }
}
`

// Mensagem de erros :o
export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  h1 {
    margin-top: 10px;
    font-size: 16px;
    color: #ff6b6b;
  }
`;
