import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';

export default class CambiarSerie extends Component {
	selectPersonaje = React.createRef();
	selectSerie = React.createRef();

	state = {
		series: [],
		personajes: []
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

	loadPersonajes = () => {
		let request = "api/personajes";
		let url = Global.urlApiSeries + request;
		console.log(url);
		axios.get(url).then(response => {
			//console.log("leyendo...");
			this.setState({
				personajes: response.data
			})
		})
	}

	cambiarPersonaje = (e) =>{
		e.preventDefault()
		let personaje = this.selectPersonaje.current.value;
		let serie = this.selectSerie.current.value;
		//console.log(personaje+" "+serie)
		let request = "api/personajes/" + personaje + "/" + serie;
		let url = Global.urlApiSeries + request;
		axios.put(url).then(response => {
			console.log("cambio hecho")
		})
	}

	componentDidMount = () => {
		this.loadSeries();
		this.loadPersonajes()
	}

	render() {
		return (
			<div>
				<h1>Personajes y series</h1>
				<form className=''>
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
					<label>Personajes</label>
					<select ref={this.selectPersonaje} className='form-control' >
						{
							this.state.personajes.map((personaje, index) => {
								return (
									<option key={index} value={personaje.idPersonaje}>
										{personaje.nombre}
									</option>
								)
							})
						}
					</select>
					<button onClick={this.cambiarPersonaje}>cambiar personaje</button>
				</form>
			</div>
		)
	}
}
