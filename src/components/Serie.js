import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class serie extends Component {
	state = {
		personajes: []
	}
	mostrarPersonajes = () => {
		let request = "api/series/personajesserie/" + this.props.id.idSerie;
		let url = Global.urlApiSeries + request;
		console.log(this.props.id.idSerie)
		axios.get(url).then(response => {
			this.setState({
				personajes: response.data,
				status: true
			})

		})
	}

	componentDidMount = () => {
		this.mostrarPersonajes()
	}

	render() {
		return (
			<div>
				<h1>Personajes</h1>
				<table className='table'>
					<thead className='thead-dark'>
						<tr>
							<th scope="col">ID Personaje</th>
							<th scope="col">nombre</th>
							<th scope="col">ID serie</th>
							<th scope="col">imagen</th>
						</tr>
					</thead>
					<tbody>

						{
							this.state.personajes.map((personaje, index) => {
								return (
									<tr key={index}>
										<td>{personaje.idPersonaje}</td>
										<td>{personaje.nombre}</td>
										<td>{personaje.idSerie}</td>
										<td>
											<img src={personaje.imagen} width="150px" height="150px"></img>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
				<NavLink to={"/serie/"+this.props.id.idSerie}>Volver</NavLink>
			</div>
		)
	}
}
