import React, { Component } from 'react'
import { FaGithubAlt, FaPlus, FaSpinner, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import api from '../../services/api'

import Container from '../../components/Container'
import { Form, SubmitButton, List, ErrorMessage } from './styles'

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
        this.setState({ newRepo: e.target.value, error: null })
    }

    // *~ adiciona repositório na lista
    handleSubmit = async e => {
        e.preventDefault()

        this.setState({ loading: 1, error: null })

        try {
            const { newRepo, repositories } = this.state

            // verifica se campo ta vazio
            if (newRepo === '')
                throw new Error('Você precisa indicar um repositório')

            const temRepo = repositories.find( r => r.name === newRepo)
            if(temRepo) throw new Error ('Repositório duplicado :(')

            const response = await api.get(`/repos/${newRepo}`)

            const data = {
                name: response.data.full_name
            }

            this.setState({
                repositories: [ ...repositories, data],
                newRepo: '',
            })
        } catch (error) {
            this.setState({
                error: true,
                errorMsg: error.response ? error.response.data.message : error.message
            })
        } finally {
            this.setState({ loading: 0})
        }
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

    DeletaApenasUm = repo => {
        const { repositories } = this.state
        this.setState({ repositories: repositories.filter( t => t !== repo)})
    }

    render() {

        const { newRepo, repositories, loading, errorMsg, error } = this.state
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

                <Form onSubmit={this.handleSubmit} error={error}>
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

                {error &&
                    <ErrorMessage>
                        <h1>{errorMsg}</h1>
                    </ErrorMessage>
                }

                <List>
                    { repositories.map (repository => (
                        <li key={repository.name}>
                            <span>
                                <Link
                                    to={`/usuario/${encodeURIComponent(repository.name.split('/', 1))}`}>
                                        {repository.name.split('/', 1)}
                                    </Link>/{repository.name.split('/').slice(1, 2)}
                            </span>
                            <div>
                            <Link to={`/repositorio/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                            <button
                                key={repository}
                                onClick={() => this.DeletaApenasUm(repository)}
                                type="button">x</button>
                             </div>
                        </li>
                    ))}
                </List>
            </Container>
        )
    }
}
