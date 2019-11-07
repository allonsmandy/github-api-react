import styled from 'styled-components'

// *~ Container ~*
export const Container = styled.div`
    max-width: 700px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    padding: 30px;
    margin: 80px auto;

    h1 {
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    svg {
        margin-right: 10px;
    }
`

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

// *~ Botão de envio  ~*
export const SubmitButton = styled.button.attrs({
    type: 'submit'
})`
    background: #715;
    border: 0;
    padding-left: 10px;
    margin-left: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background: #000;
    }
`
