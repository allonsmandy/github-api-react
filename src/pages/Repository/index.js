import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from '../../services/api'

import Container from '../../components/Container'
import Owner from '../../components/Owner'
import Loading from '../../components/Loading'

import { IssuesList } from './styles'

export default class extends Component {
    constructor(props) {
        super(props)
    }

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
                    <Link to="/">Pagina inicial</Link>
                    <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login}/>
                    <h1>Repositório: {repositorio.name}</h1>
                    <h4>{repositorio.owner.login}</h4>
                    <p>{repositorio.description}</p>
                </Owner>

                <IssuesList>
                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login}/>
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>{label.name}</span>
                                    ))}
                                </strong>
                                <p>
                                    {issue.user.login}
                                </p>
                            </div>
                        </li>
                    ))}
                </IssuesList>
            </Container>
        )
    }
}

