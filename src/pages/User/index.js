import React, { Component } from 'react'
import { FaHome,FaLaptop, FaSplotch } from 'react-icons/fa'

import { Link } from 'react-router-dom'

import api from '../../services/api'

import Container from '../../components/Container'
import Owner from '../../components/Owner'
import Loading from '../../components/Loading'

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

        this.setState({ user: nome.data, loading: false })

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
                </Owner>
            </Container>
        )
    }
}
