import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import FollowersList from './styles'
import Loading from '../../components/Loading'

import {Actions} from '../Repository/styles'
import api from '../../services/api'

export default class Followers extends Component {

    state = {
        followers: [],
        user: '',
        loading: 1,
        page: 1
    }

    async componentDidMount() {
        const { match } = this.props
        const nomeUsuario = decodeURIComponent(match.params.user)

        const followers = await api.get(`/users/${nomeUsuario}/followers`, {
            params: {
                per_page: 12
            }
        })

        this.setState({followers: followers.data, user: nomeUsuario, loading: 0})
    }

    loadFollowers = async () => {
        // const { match } = this.props
        const { page, user } = this.state

        // const userName = decodeURIComponent(match.params.user)

        const [followers] = await Promise.all([
            api.get(`/users/${user}/followers`, {
                params: {
                    per_page: 12,
                    page
                }
            }),
        ])

        this.setState({ followers: followers.data })
    }

    prevPage = async () => {
        const { page } = this.state

        await this.setState({ page: page === 1 ? page : page - 1})
        this.loadFollowers()
    }

    nextPage = async () => {
        const { page } = this.state

        await this.setState({ page: page + 1})
        this.loadFollowers()
    }


    render() {
        const { followers, user, page, loading } = this.state

        if (loading === 1) {
            return <Loading>Carregando... *u*</Loading>
        }

        return (
            <Container>
                <h1>Seguidores de <Link to={`/usuario/${encodeURIComponent(user)}`}>{user}</Link></h1>
                <FollowersList>
                    {followers.map(follower => (
                        <li key={String(follower.id)}>
                            <img src={follower.avatar_url} alt={follower.login}/>
                            <Link to={`/usuario/${encodeURIComponent(follower.login)}`}>{follower.login}</Link>
                        </li>
                    ))}
                </FollowersList>

                <Actions>
                    <button type="button" disabled={page === 1} onClick={this.prevPage}>
                        Anterior
                    </button>
                    <span>Página { page }</span>
                    <button type="button" disabled={followers.length === 0} onClick={this.nextPage}>
                        Próxima
                    </button>
                </Actions>
            </Container>
        )
    }
}
