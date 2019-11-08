import styled from 'styled-components'

// *~ Carregandoo...
export const Loading = styled.div`
    color: #fff;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`
// *~ Owner/Autor
export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        color: #715;
        text-decoration: none;
        font-size: 16px;
    }

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
        color: #ccc;
    }
`
