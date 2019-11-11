import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import FollowersList from '../Followers/styles'

import api from '../../services/api'

export default class Followers extends Component {

    state = {
        following: [],
        user: ''
    }

    async componentDidMount() {
        const { match } = this.props
        const nomeUsuario = decodeURIComponent(match.params.user)

        const following = await api.get(`/users/${nomeUsuario}/following`)

        this.setState({following: following.data, user: nomeUsuario})
    }

    render() {
        const { following, user } = this.state

        return (
            <Container>
                <h1>Seguidos por <Link to={`/usuario/${encodeURIComponent(user)}`}>{user}</Link></h1>
                <FollowersList>
                    {following.map(following => (
                        <li key={String(following.id)}>
                            <img src={following.avatar_url} alt={following.login}/>
                            <Link to={`/usuario/${encodeURIComponent(following.login)}`}>{following.login}</Link>
                        </li>
                    ))}
                </FollowersList>
            </Container>
        )
    }
}
