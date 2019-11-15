import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import Loading from '../../components/Loading'
import Repositories from './styles'
import {Actions} from '../Repository/styles'

import api from '../../services/api'

export default class Followers extends Component {

    state = {
        repositories: [],
        user: '',
        loading: 1,
        page: 1
    }

    async componentDidMount() {
        const { match } = this.props
        const nomeUsuario = decodeURIComponent(match.params.user)

        const repositories = await api.get(`/users/${nomeUsuario}/repos`, {
            params: {
                per_page: 15
            }
        })

        this.setState({repositories: repositories.data, user: nomeUsuario, loading: 0})
    }

    loadRepositories = async () => {
        // const { match } = this.props
        const { page, user } = this.state

        // const userName = decodeURIComponent(match.params.user)

        const [repositories] = await Promise.all([
            api.get(`/users/${user}/repos`, {
                params: {
                    per_page: 15,
                    page
                }
            }),
        ])

        this.setState({ repositories: repositories.data })
    }

    prevPage = async () => {
        const { page } = this.state

        await this.setState({ page: page === 1 ? page : page - 1})
        this.loadRepositories()
    }

    nextPage = async () => {
        const { page } = this.state

        await this.setState({ page: page + 1})
        this.loadRepositories()
    }

    render() {
        const { repositories, user, page, loading } = this.state

        if (loading) {
            return <Loading>Carregando... *u*</Loading>
        }

        return (
            <Container>
                <h1>Repositórios de <Link to={`/usuario/${encodeURIComponent(user)}`}>{user}</Link></h1>
                    <Repositories>
                        {repositories.map(repositories => (
                            <li key={String(repositories.id)}>
                                <Link to={`/repositorio/${repositories.owner.login}%2F${encodeURIComponent(repositories.name)}`}>{repositories.name}</Link>
                            </li>
                        ))}
                    </Repositories>

                    <Actions>
                    <button type="button" disabled={page === 1} onClick={this.prevPage}>
                        Anterior
                    </button>
                    <span>Página { page }</span>
                    <button type="button" disabled={repositories.length === 0} onClick={this.nextPage}>
                        Próxima
                    </button>
                </Actions>
            </Container>
        )
    }
}
