import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/Container'

import api from '../../services/api'

export default class Gists extends Component {

    state = {
        gists: [],
        user: ''
    }

    async componentDidMount() {
        const { match } = this.props
        const nomeUsuario = decodeURIComponent(match.params.user)

        const gists = await api.get(`/users/${nomeUsuario}/gists`)

        this.setState({gists: gists.data, user: nomeUsuario})
    }

    render() {
        const { gists, user } = this.state

        return (
            <Container>
                <h1>Gists de <Link to={`/usuario/${encodeURIComponent(user)}`}>{user}</Link></h1>
                    {gists.map(gist => (
                        <li key={gist.id}>
                                { Object.keys(gist.files).forEach((item) => (
                                    // console.log(gist.files[item])
                                    <a>{gist.files[item]}</a>
                    ))}
                    {console.log(gist.files)}
                        </li>
                    ))}
            </Container>
        )
    }
}
