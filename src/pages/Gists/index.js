import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/Container'

import api from '../../services/api'

import Gist from './styles'

export default class Gists extends Component {

    state = {
        gists: [],
        user: ''
    }

    async componentDidMount() {
        const { match } = this.props
        const nomeUsuario = decodeURIComponent(match.params.user)

        const gists = await api.get(`/users/${nomeUsuario}/gists`)

        this.setState({ gists: gists.data, user: nomeUsuario })
    }

    render() {
        const { gists, user } = this.state
        console.log(gists)

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


            </Container>
        )
    }
}
