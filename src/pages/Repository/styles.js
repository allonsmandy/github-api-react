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

        span.open {
          background: #3d9c11;
          color: #fff;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
        span.closed {
          background: #ff6b6b;
          color: #fff;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
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

// filtro
export const Filter = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-top: 30px;
  button {
    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 10px;
    margin: 0 10px;
    background: #576574;
    color: white;
  }
  button.open {
    background: #3d9c11;
    color: #fff;
  }
  button.closed {
    background: #ff6b6b;
    color: #fff;
  }
`
// actions
export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0 20px 0;
  span {
    margin-top: 5px;
    font-size: 12px;
    color: #999;
  }
  button {
    padding: 10px;
    border-radius: 5px;
    border: 0;
    background: #7159c1;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
    &:hover {
      opacity: 0.7;
    }
    &:disabled:hover {
      opacity: 0.5;
    }
  }
`;
