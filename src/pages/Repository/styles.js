import styled from 'styled-components'

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
