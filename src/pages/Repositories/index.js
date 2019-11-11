import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/Container'

import api from '../../services/api'

export default class Followers extends Component {

    state = {
        repositories: [],
        user: ''
    }

    async componentDidMount() {
        const { match } = this.props
        const nomeUsuario = decodeURIComponent(match.params.user)

        const repositories = await api.get(`/users/${nomeUsuario}/repos`)

        this.setState({repositories: repositories.data, user: nomeUsuario})
    }

    render() {
        const { repositories, user } = this.state

        return (
            <Container>
                <h1>Repositórios de <Link to={`/usuario/${encodeURIComponent(user)}`}>{user}</Link></h1>
                    {repositories.map(repositories => (
                        <li key={String(repositories.id)}>
                            <Link to={`/repositorio/${repositories.owner.login}%2F${encodeURIComponent(repositories.name)}`}>{repositories.name}</Link>
                        </li>
                    ))}
            </Container>
        )
    }
}
