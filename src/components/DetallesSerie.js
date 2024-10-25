import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class DetallesSerie extends Component {
	state = {
		serie: [],
		personajes: [],
		status: false
	}

	loadSerie = () => {
		let request = "api/series/" + this.props.id.idserie;
		let url = Global.urlApiSeries + request;
		console.log(url);
		axios.get(url).then(response => {
			console.log("leyendo...");
			this.setState({
				serie: response.data
			})
		})
	}

	mostrarPersonajes = () => {
		let request = "api/series/personajesserie/" + this.props.id.idserie;
		let url = Global.urlApiSeries + request;
		axios.get(url).then(response => {
			this.setState({
				personajes: response.data,
				status: true
			})

		})
	}

	componentDidMount = () => {
		this.loadSerie();
	}

	componentDidUpdate = (oldProps) => {
		if (oldProps.id.idserie != this.props.id.idserie) {
			//console.log(oldProps.id.idserie+" "+this.props.id.idserie)
			this.loadSerie();
		}
	}

	render() {
		return (
			<div>
				<h1>DetallesSerie</h1>
				<table className='table'>
					<thead className='thead-dark'>
						<tr>
							<th scope="col">ID serie</th>
							<th scope="col">nombre</th>
							<th scope="col">puntuacion</th>
							<th scope="col">año</th>
							<th scope="col">imagen</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{this.state.serie.idSerie}</td>
							<td>{this.state.serie.nombre}</td>
							<td>{this.state.serie.puntuacion}</td>
							<td>{this.state.serie.anyo}</td>
							<td>
								<img src={this.state.serie.imagen} width="150px" height="150px"></img>
							</td>

						</tr>
					</tbody>
				</table>
				<NavLink to={"/personajes/"+this.state.serie.idSerie}>Mostrar Personajes</NavLink>
				{/* <button onClick={this.mostrarPersonajes} className='btn btn-primary'>Mostrar Personajes</button> */}
				{this.state.status == true &&
					(<table className='table'>
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
					</table>)
				}

			</div>
		)
	}
}
