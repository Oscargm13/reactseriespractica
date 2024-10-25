import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';

export default class CrearPersonaje extends Component {
	cajaNombre = React.createRef();
	cajaImagen = React.createRef();
	selectSerie = React.createRef();

	state = {
		series: []
	}

	loadSeries = () => {
		let request = "api/series";
		let url = Global.urlApiSeries + request;
		console.log(url);
		axios.get(url).then(response => {
			//console.log("leyendo...");
			this.setState({
				series: response.data
			})
		})
	}

	componentDidMount = () => {
		this.loadSeries();
	}

	nuevoPersonaje = (e) => {
		e.preventDefault();
		let request = "api/Personajes";
		let urlPer = "https://apiseriespersonajes.azurewebsites.net/api/personajes";
		console.log(urlPer);
		let nombre = this.cajaNombre.current.value;
		let imagen = this.cajaImagen.current.value;
		let serie = parseInt(this.selectSerie.current.value);
		//console.log(serie)
		let personaje = {
			idPersonaje: 0,
			nombre: nombre,
			imagen: imagen,
			idSerie: serie
		}
		console.log(personaje);
		axios.post(urlPer, personaje).then(response => {
			console.log("personaje insertado");
		})
	}

	render() {
		return (
			<div>
				<h1>Nuevo personaje</h1>
				<form className=''>
					<label>Nombre</label>
					<input type='text' ref={this.cajaNombre} className='form-control' />
					<label>Serie</label>
					<select ref={this.selectSerie} className='form-control' >
						{
							this.state.series.map((serie, index) => {
								return (
									<option key={index} value={serie.idSerie}>
										{serie.nombre}
									</option>
								)
							})
						}
					</select>
					<label>imegen</label>
					<input type='text' ref={this.cajaImagen} className='form-control' />
					<button onClick={this.nuevoPersonaje}>Crear Personaje</button>
				</form>
			</div>
		)
	}
}
