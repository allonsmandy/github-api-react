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
// *~ Lista de issues
export const IssuesList = styled.ul`
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #ccc;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;
    }

    a + li {
        margin-top: 10px;
    }

    img {
        width: 36px;
        height: 36px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    div {
        flex: 1;
        margin-left: 15px;
    }

    strong {
        font-size: 16px;

        a {
            text-decoration: none;
            color: #333;

            &:hover {
                color: #715;
            }
        }

        span {
            background: #eee;
            color: #333;
            border-radius: 2px;
            font-size: 12px;
            height: 20px;
            font-weight: 600;
            padding: 3px 4px;
            margin-left: 10px;
        }
    }

    p {
        font-size: 12px;
        margin-top: 5px;
        color: #999;
    }
`
