import React, { Component } from 'react'
import { GoStar, GoRepoForked } from 'react-icons/go'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from '../../services/api'

import Container from '../../components/Container'
import Owner from '../../components/Owner'
import Loading from '../../components/Loading'

import { IssuesList, Filter, Actions, Info_Repository } from './styles'

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
        loading: 1,
        page: 1,
        filter: 'all'
    }

    async componentDidMount() {
        const { match } = this.props
        const { filter } = this.state

        const repoName = decodeURIComponent(match.params.repositorio)

        //api.github.com/repos/allonsmandy/simple-page
        //api.github.com/repos/allonsmandy/simple-page/issues

        // *~ retornam juntos ~*
        const [repositorio, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: filter,
                    per_page: 5
                }
            }),
        ])

        this.setState({
            repositorio: repositorio.data,
            issues: issues.data,
            loading: 0
        })

    }

    loadIssues = async () => {
        const { match } = this.props
        const { page, filter } = this.state

        const repoName = decodeURIComponent(match.params.repositorio)

        const [issues] = await Promise.all([
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: filter,
                    per_page: 5,
                    page
                }
            }),
        ])

        this.setState({ issues: issues.data })
    }

    filterClick = async fil => {
        this.setState({ filter: fil, page: 1 }, this.loadIssues)
    }

    prevPage = async () => {
        const { page } = this.state

        await this.setState({ page: page === 1 ? page : page - 1})
        this.loadIssues()
    }

    nextPage = async () => {
        const { page } = this.state

        await this.setState({ page: page + 1})
        this.loadIssues()
    }

    render() {

        const { repositorio, issues, loading, page } = this.state

        if (loading === 1) {
            return <Loading>Carregando... *u*</Loading>
        }
        return (
            <Container>
                <Owner>
                    <Link to="/">Pagina inicial</Link>
                    <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login}/>
                    <h1>Repositório: <a href={repositorio.html_url}> {repositorio.name} </a></h1>
                    <Link to={`/usuario/${encodeURIComponent(repositorio.owner.login)}`}>{repositorio.owner.login}</Link>
                    <Info_Repository>
                        <li><GoStar /> {repositorio.stargazers_count}</li>
                        <li><GoRepoForked />{repositorio.forks_count}</li>
                    </Info_Repository>
                    <p>{repositorio.description}</p>
                </Owner>

                <Filter>
                    <button
                        type="button"
                        className="all"
                        key="all"
                        onClick={() => this.filterClick('all')}>
                    All
                    </button>
                    <button
                        type="button"
                        className="open"
                        key="open"
                        onClick={() => this.filterClick('open')}>
                    Abertas
                    </button>
                    <button
                        type="button"
                        className="closed"
                        key="closed"
                        onClick={() => this.filterClick('closed')}>
                    Fechadas
                    </button>
                </Filter>

                <IssuesList>
                    <h2>Issues</h2>
                    {
                        issues.length !== 0 ?

                            issues.map(issue => (
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
                            ))
                         : (
                            <h5>Nenhuma issue encontrada! :/</h5>
                        )
                    }

                </IssuesList>

                <Actions>
                    <button type="button" disabled={page === 1} onClick={this.prevPage}>
                        Anterior
                    </button>
                    <span>Página { page }</span>
                    <button type="button" disabled={issues.length === 0} onClick={this.nextPage}>
                        Próxima
                    </button>
                </Actions>
            </Container>
        )
    }
}

