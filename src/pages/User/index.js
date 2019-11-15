import React, { Component } from 'react'
import { FaHome,FaLaptop, FaSplotch } from 'react-icons/fa'

import { Link } from 'react-router-dom'

import api from '../../services/api'

import Container from '../../components/Container'
import Owner from '../../components/Owner'
import Loading from '../../components/Loading'
import ValueBox from '../../components/ValueBox'

import Info from './styles'

export default class User extends Component {

    state = {
        user: [],
        loading: 1
    }

    async componentDidMount() {
        const { match } = this.props
        const usuarioNome = decodeURIComponent(match.params.user)

        const nome = await api.get(`/users/${usuarioNome}`)

        this.setState({ user: nome.data, loading: 0 })

        console.log(this.state.user)
    }

    render(){

        const { user, loading } = this.state

        if (loading) {
            return <Loading>Carregando... *u*</Loading>
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">Página inicial</Link>
                    <h1>{user.name}</h1>
                    <img src={user.avatar_url} alt={user.login}/>
                    <p>{user.bio}</p>
                    <Info>
                        <li>
                            <FaLaptop />
                            { user.blog ? <strong>{user.blog}</strong> : 'No website'}
                        </li>

                        <li>
                            <FaSplotch />
                            { user.company ? <strong>{user.company}</strong> : 'No Company'}
                        </li>

                        <li>
                            <FaHome />
                            { user.location ? <strong>{user.location}</strong> : 'No Location'}
                        </li>
                    </Info>
                    <section className="valueBox-list">
                        <ValueBox bgColor="#F3AB93">
                            <span><Link to={`/usuario/${encodeURIComponent(user.login)}/seguidores`}>Seguidores: </Link></span>
                            <strong>{user.followers}</strong>
                        </ValueBox>
                        <ValueBox bgColor="#B3A9C4">
                            <span><Link to={`/usuario/${encodeURIComponent(user.login)}/seguindo`}>Seguindo: </Link></span>
                            <strong>{user.following}</strong>
                        </ValueBox>
                        <ValueBox bgColor="#8FC4C4">
                        <span><Link to={`/usuario/${encodeURIComponent(user.login)}/gists`}>Gists: </Link></span>
                            <strong>{user.public_gists}</strong>
                        </ValueBox>
                        <ValueBox bgColor="#DAC">
                            <span><Link to={`/usuario/${encodeURIComponent(user.login)}/repositorios`}>Repositorios: </Link></span>
                            <strong>{user.public_repos}</strong>
                        </ValueBox>
                    </section>
                </Owner>
            </Container>
        )
    }
}
