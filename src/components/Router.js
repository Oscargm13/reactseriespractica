import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import HomeSeries from './HomeSeries'
import Menu from './Menu';
import DetallesSerie from './DetallesSerie';
import CrearPersonaje from './CrearPersonaje';
import CambiarSerie from './CambiarSerie';

export default class Router extends Component {
	render() {
		function DetallesSerieElement() {
			let idserie = useParams();
			return (<DetallesSerie id={idserie} />)
		}
		return (
			<BrowserRouter>
				<Menu />
				<Routes>
					<Route path='/' element={<HomeSeries/>}/>
					<Route path='/serie/:idserie' element={<DetallesSerieElement/>}/>
					<Route path='/crear' element={<CrearPersonaje/>}/>
					<Route path='/cambiar' element={<CambiarSerie/>}/>
				</Routes>
			</BrowserRouter>

	)
	}
}
