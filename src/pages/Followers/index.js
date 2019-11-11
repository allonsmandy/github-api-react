import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import FollowersList from './styles'

import api from '../../services/api'

export default class Followers extends Component {

    state = {
        followers: [],
        user: ''
    }

    async componentDidMount() {
        const { match } = this.props
        const nomeUsuario = decodeURIComponent(match.params.user)

        const followers = await api.get(`/users/${nomeUsuario}/followers`)

        this.setState({followers: followers.data, user: nomeUsuario})
    }

    render() {
        const { followers, user } = this.state

        return (
            <Container>
                <h1>Seguimores de <Link to={`/usuario/${encodeURIComponent(user)}`}>{user}</Link></h1>
                <FollowersList>
                    {followers.map(follower => (
                        <li key={String(follower.id)}>
                            <img src={follower.avatar_url} alt={follower.login}/>
                            <Link to={`/usuario/${encodeURIComponent(follower.login)}`}>{follower.login}</Link>
                        </li>
                    ))}
                </FollowersList>
            </Container>
        )
    }
}
