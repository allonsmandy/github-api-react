import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import Loading from '../../components/Loading'
import {Actions} from '../Repository/styles'

import api from '../../services/api'

import Gist from './styles'


export default class Gists extends Component {

    state = {
        gists: [],
        user: '',
        loading: 1,
        page: 1
    }

    async componentDidMount() {
        const { match } = this.props
        const nomeUsuario = decodeURIComponent(match.params.user)

        const gists = await api.get(`/users/${nomeUsuario}/gists`, {
            params: {
                per_page: 15
            }
        })

        this.setState({ gists: gists.data, user: nomeUsuario, loading: 0 })
    }

    loadGists = async () => {
        const { page, user } = this.state

        const [gists] = await Promise.all([
            api.get(`/users/${user}/gists`, {
                params: {
                    per_page: 15,
                    page
                }
            }),
        ])

        this.setState({ gists: gists.data })
    }

    prevPage = async () => {
        const { page } = this.state

        await this.setState({ page: page === 1 ? page : page - 1})
        this.loadGists()
    }

    nextPage = async () => {
        const { page } = this.state

        await this.setState({ page: page + 1})
        this.loadGists()
    }


    render() {
        const { gists, user, page, loading } = this.state

        if (loading) {
            return <Loading>Carregando... *u*</Loading>
        }

        return (
            <Container>
                <h1>Gists de <Link to={`/usuario/${encodeURIComponent(user)}`}>{user}</Link></h1>
                {
                    gists.length >= 1 ? (
                        <Gist>
                            {gists.map(gist => (
                                <li key={gist.id}>
                                    {
                                        Object.keys(gist.files).map(key => {
                                            return (
                                                <a href={gist.files[key].raw_url} key={key}>{key}</a>
                                            )
                                        })

                                    }
                                    <strong>- {gist.description}</strong>
                                </li>
                            ))}
                        </Gist>
                    ) : (
                        <h1>Nenhum gist encontrado! :(</h1>
                    )
                }

                <Actions>
                    <button type="button" disabled={page === 1} onClick={this.prevPage}>
                        Anterior
                    </button>
                    <span>Página { page }</span>
                    <button type="button" disabled={gists.length === 0} onClick={this.nextPage}>
                        Próxima
                    </button>
                </Actions>

            </Container>
        )
    }
}
