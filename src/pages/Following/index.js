import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import FollowersList from '../Followers/styles'
import Loading from '../../components/Loading'

import {Actions} from '../Repository/styles'
import api from '../../services/api'

export default class Followings extends Component {

    state = {
        followings: [],
        user: '',
        loading: 1,
        page: 1
    }

    async componentDidMount() {
        const { match } = this.props
        const nomeUsuario = decodeURIComponent(match.params.user)

        const followings = await api.get(`/users/${nomeUsuario}/following`, {
            params: {
                per_page: 12
            }
        })

        this.setState({followings: followings.data, user: nomeUsuario, loading: 0})
    }

    loadfollowings = async () => {
        // const { match } = this.props
        const { page, user } = this.state

        // const userName = decodeURIComponent(match.params.user)

        const [followings] = await Promise.all([
            api.get(`/users/${user}/following`, {
                params: {
                    per_page: 12,
                    page
                }
            }),
        ])

        this.setState({ followings: followings.data })
    }

    prevPage = async () => {
        const { page } = this.state

        await this.setState({ page: page === 1 ? page : page - 1})
        this.loadfollowings()
    }

    nextPage = async () => {
        const { page } = this.state

        await this.setState({ page: page + 1})
        this.loadfollowings()
    }


    render() {
        const { followings, user, page, loading } = this.state

        if (loading === 1) {
            return <Loading>Carregando... *u*</Loading>
        }

        return (
            <Container>
                <h1>Seguidos por <Link to={`/usuario/${encodeURIComponent(user)}`}>{user}</Link></h1>
                <FollowersList>
                    {followings.map(foll => (
                        <li key={String(foll.id)}>
                            <img src={foll.avatar_url} alt={foll.login}/>
                            <Link to={`/usuario/${encodeURIComponent(foll.login)}`}>{foll.login}</Link>
                        </li>
                    ))}
                </FollowersList>

                <Actions>
                    <button type="button" disabled={page === 1} onClick={this.prevPage}>
                        Anterior
                    </button>
                    <span>Página { page }</span>
                    <button type="button" disabled={followings.length === 0} onClick={this.nextPage}>
                        Próxima
                    </button>
                </Actions>
            </Container>
        )
    }
}
