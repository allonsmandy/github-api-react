import React, { Component } from 'react'
import { FaGithubAlt, FaPlus, FaSpinner, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import api from '../../services/api'

import Container from '../../components/Container'
import { Form, SubmitButton, List } from './styles'

export default class Main extends Component {

    state = {
        repositories: [],
        newRepo: '',
        error: null,
        errorMsg: '',
        loading: 0,
    }

    // *~ carregar dados do localstorage
    componentDidMount() {
        const repositoriesStorage = localStorage.getItem('repositorios')

        if(repositoriesStorage) {
            this.setState({ repositories: JSON.parse(repositoriesStorage)})
        }
    }

    // *~ salvar dados do localstorage
    componentDidUpdate(_, prevState) {

        const { repositories } = this.state

        if (prevState.repositories !== this.state.repositories) {
            localStorage.setItem('repositorios', JSON.stringify(repositories))
        }

    }

    // *~ onChange input :3
    handleInputChange = e => {
        this.setState({ newRepo: e.target.value })
    }

    // *~ adiciona repositório na lista
    handleSubmit = async e => {
        e.preventDefault()

        this.setState({ loading: 1 })

        const { newRepo, repositories } = this.state

        const response = await api.get(`/repos/${newRepo}`)

        const data = {
            name: response.data.full_name
        }

        this.setState({
            repositories: [ ...repositories, data],
            newRepo: '',
            loading: 0
        })
    }

    // *~ deleta a lista
    handleDelete = e => {
        e.preventDefault()

        const { repositories } = this.state

        if(repositories) {
            localStorage.removeItem('repositorios')
            alert('Tudo limpo!!! ^u^')
            this.setState({ repositories: []})
        }
    }

    render() {

        const { newRepo, repositories, loading } = this.state
        return (
            <Container>
                <header>
                    <h1>
                        <FaGithubAlt />
                        Repositórios
                    </h1>

                    {!(repositories.length === 0) ?

                        <button style={{backgroundColor: '#ff8686', cursor: 'pointer'}}
                        onClick={this.handleDelete} >
                            <FaTrashAlt /> Apagar tudo
                        </button>

                    : ''
                    }

                </header>

                <Form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Adicionar repositório. Ex: allonsmandy/wordpress"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />

                    <SubmitButton loading={loading}>
                        { loading === 1 ?
                            (<FaSpinner color="#fff" size={24} />) :
                            (<FaPlus color="#fff" size={24} />)
                        }
                    </SubmitButton>
                </Form>

                <List>
                    { repositories.map (repository => (
                        <li key={repository.name}>
                            <span>
                                <Link
                                    to={`/usuario/${encodeURIComponent(repository.name.split('/', 1))}`}>
                                        {repository.name.split('/', 1)}
                                    </Link>/{repository.name.split('/').slice(1, 2)}
                            </span>
                            <Link to={`/repositorio/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                        </li>
                    ))}
                </List>
            </Container>
        )
    }
}
