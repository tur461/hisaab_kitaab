import '../../Styles/UpdateDrug.css';
import React, {useState, useEffect} from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import uf from '../../utilities/utility_fns';
import tp from '../../utilities/text_process';

import ApiConsumer from '../../utilities/ApiConsumer';

const numOfElems = 11;

function UpdateDrug(props) {
	const ar = Array(numOfElems).fill(0);
	const refAr = [];
	const [show, setShow] = useState(!0);

	ar.forEach(_ => refAr.push(React.createRef(null)));

	let updateMe = (t, refs) => {
		console.log('updating...:', t);
		if(t==2){ // select this screen
			setShow(!0);
			uf.setValues(refs, tp.getDrugById(localStorage.getItem('selected_id')));
		}else{
			uf.clear(refs);
			setShow(!1);
		}
	}

	function updateDrug(e){
		e.preventDefault();
		e.stopPropagation();
		let drug = uf.prepareDrug(refAr, !0);

		console.log('updating:', drug);

		ApiConsumer.updateDrugById(
			drug, 
			localStorage.getItem('selected_id'), 
			(e, d) => {
				if(e || d.message){
					console.log('Error updating the drug:', e, d.message);
					toast.error(`Loss!!. Entry Not Updated: ${d.message}`);
					return;
				}
				console.log('successfully updated!. Response:', d);
				tp.updateDrugList();
				toast.success('Win!!. Entry Updated.');
		});
	}

	useEffect(_ => {
		updateMe(props.trig, refAr);
	}, [props.trig]);

	return (
		<div className={`full-screen ${show ? 'show-screen': 'hide-screen'}`}>
			<ToastContainer />
			<div className='header'>
				<p>{'Update Drug here!:'}</p>
				<a href='#' className='color--white bg--red' onClick={e => !!!e.preventDefault() && props.setTrig(-1)}>{'Cancel/Leave'}</a>
				<a href='#' className='color--white bg--blue' onClick={e => !!!e.preventDefault() && props.setTrig(0)} >{'View'}</a>
				<a href='#' className='color--white bg--purple' onClick={e => !!!e.preventDefault() && props.setTrig(1)} >{'New'}</a>
			</div>
			<div className='container--sectioned'>
				<table>
					<tbody>
						<tr>
							<td>{'Name:'}</td>
							<td><input type="text" ref={refAr[0]} /></td>
						</tr>
						<tr>
							<td>{'Batch Number:'}</td>
							<td><input type="text" ref={refAr[1]} /></td>
						</tr>
						<tr>
							<td>{'MRP:'}</td>
							<td><input type="text" ref={refAr[2]} /></td>
						</tr>
						<tr>
							<td>{'Quantity:'}</td>
							<td><input type="number" ref={refAr[3]} /></td>
						</tr>
						<tr>
							<td>{'Date Of Expiry:'}</td>
							<td><input type='date' ref={refAr[4]}/></td>
						</tr>
					</tbody>
				</table>
				<table>
					<tbody>
						<tr>
							<td>{'Purchasee:'}</td>
							<td><input type="text" ref={refAr[5]} /></td>
						</tr>
						<tr>
							<td>{'Total Purchased:'}</td>
							<td><input type="number" ref={refAr[6]} /></td>
						</tr>
						<tr>
							<td>{'Date Of Purchase:'}</td>
							<td><input type='date' ref={refAr[7]}/></td>
						</tr>
					</tbody>
				</table>
				<table>
					<tbody>
						<tr>
							<td>{'Seller:'}</td>
							<td><input type="text" ref={refAr[8]} /></td>
						</tr>
						<tr>
							<td>{'Total Sold:'}</td>
							<td><input type="number" ref={refAr[9]} /></td>
						</tr>
						<tr>
							<td>{'Date Of Selling:'}</td>
							<td><input type='date' ref={refAr[10]}/></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className='links'><a href='#' className='color--white bg--lime' onClick={updateDrug}>{'Update'}</a></div>
		</div>
	);
}

export default UpdateDrug;