import React, { Component } from 'react'
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import api from '../../services/api'
import { Container, Form, SubmitButton, List } from './styles'

export default class Main extends Component {

    state = {
        repositories: [],
        newRepo: '',
        loading: false
    }

    // carregar dados do localstorage
    componentDidMount() {
        const repositories = localStorage.getItem('repositorios')

        if(repositories) {
            this.setState({ repositories: JSON.parse(repositories)})
        }
    }

    // salvar dados do localstorage
    componentDidUpdate(_, prevState) {

        const { repositories } = this.state

        if (prevState.repositories !== this.state.repositories) {
            localStorage.setItem('repositorios', JSON.stringify(repositories))
        }
    }

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault()

        this.setState({ loading: true })

        const { newRepo, repositories } = this.state
        const response = await api.get(`/repos/${newRepo}`)

        const data = {
            name: response.data.full_name
        }

        this.setState({
            repositories: [ ...repositories, data],
            newRepo: '',
            loading: false
        })
    }

    render() {

        const { newRepo, repositories, loading } = this.state

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Adicionar repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />

                    <SubmitButton loading={loading}>
                        { loading ?
                            (<FaSpinner color="#fff" size={24} />) :
                            (<FaPlus color="#fff" size={24} />)
                        }
                    </SubmitButton>
                </Form>

                <List>
                    { repositories.map (repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link to={`/repositorio/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                        </li>
                    ))}
                </List>
            </Container>
        )
    }
}
