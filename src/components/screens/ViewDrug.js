import '../../Styles/ViewDrug.css';
import React, {useState, useEffect} from 'react';

import uf from '../../utilities/utility_fns';
import tp from '../../utilities/text_process';

const numOfElems = 12;

function ViewDrug(props) {
	const ar = Array(numOfElems).fill(0);
	const refAr = [];
	const [show, setShow] = useState(!0);
	ar.forEach(_ => refAr.push(React.createRef(null)));

	let updateMe = (t, refs) => {
		console.log('updating...:', t);
		if(t==0){ // select this screen
			setShow(!0);
			uf.setValues(refs, tp.getDrugById(localStorage.getItem('selected_id')));
		}else{
			uf.clear(refs);
			setShow(!1);
		}
	}

	useEffect(_ => {
		updateMe(props.trig, refAr);
	}, [props.trig]); // keep an eye for sub-screen change from other components

	return (
		<div className={`full-screen ${show ? 'show-screen': 'hide-screen'}`}>
			<div className='header'>
				<p>{'Drug Details here!:'}</p>
				<a href='#' className='color--white bg--red' onClick={e => !!!e.preventDefault() && props.setTrig(-1)}>{'Cancel/Leave'}</a>
				<a href='#' className='color--white bg--purple' onClick={e => !!!e.preventDefault() && props.setTrig(1)} >{'New'}</a>
				<a href='#' className='color--white bg--lime' onClick={e => !!!e.preventDefault() && props.setTrig(2)} >{'Update'}</a>
			</div>
			<div className='container--sectioned'>
				<table>
					<tbody>
						<tr>
							<td>{'Name:'}</td>
							<td ref={refAr[0]}></td>
						</tr>
						<tr>
							<td>{'Batch Number:'}</td>
							<td ref={refAr[1]}></td>
						</tr>
						<tr>
							<td>{'MRP:'}</td>
							<td ref={refAr[2]}></td>
						</tr>
						<tr>
							<td>{'Quantity:'}</td>
							<td ref={refAr[3]}></td>
						</tr>
						<tr>
							<td>{'Date Of Expiry:'}</td>
							<td ref={refAr[4]}></td>
						</tr>
					</tbody>
				</table>
				<table>
					<tbody>
						<tr>
							<td>{'Purchasee:'}</td>
							<td ref={refAr[5]}></td>
						</tr>
						<tr>
							<td>{'Total Purchased:'}</td>
							<td ref={refAr[6]}></td>
						</tr>
						<tr>
							<td>{'Date Of Purchase:'}</td>
							<td ref={refAr[7]}></td>
						</tr>
					</tbody>
				</table>
				<table>
					<tbody>
						<tr>
							<td>{'Seller:'}</td>
							<td ref={refAr[8]}></td>
						</tr>
						<tr>
							<td>{'Total Sold:'}</td>
							<td ref={refAr[9]}></td>
						</tr>
						<tr>
							<td>{'Date Of Selling:'}</td>
							<td ref={refAr[10]}></td>
						</tr>
						<tr>
							<td>{'Total in Stock:'}</td>
							<td ref={refAr[11]}></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ViewDrug;