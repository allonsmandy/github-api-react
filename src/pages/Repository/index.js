import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from '../../services/api'

import Container from '../../components/Container'
import { Loading, Owner } from './styles'

export default class extends Component {

    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repositorio: PropTypes.string
            })
        }).isRequired
    }

    state = {
        repositorio: {},
        issues: [],
        loading: true
    }

    async componentDidMount() {
        const { match } = this.props

        const repoName = decodeURIComponent(match.params.repositorio)

        //api.github.com/repos/allonsmandy/simple-page
        //api.github.com/repos/allonsmandy/simple-page/issues

        // *~ retornam juntos ~*
        const [repositorio, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: 'open',
                    per_page: 5
                }
            }),
        ])

        this.setState({
            repositorio: repositorio.data,
            issues: issues.data,
            loading: false
        })

    }

    render() {

        const { repositorio, issues, loading } = this.state

        if (loading) {
            return <Loading>Carregando... *u*</Loading>
        }
        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar aos repositórios</Link>
                    <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login}/>
                    <h1>{repositorio.name}</h1>
                    <p>{repositorio.description}</p>
                </Owner>
            </Container>
        )
    }
}

