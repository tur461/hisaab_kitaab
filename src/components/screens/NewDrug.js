import '../../Styles/NewDrug.css';
import React, {useState, useEffect} from 'react';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import uf from '../../utilities/utility_fns';
import tp from '../../utilities/text_process';

import ApiConsumer from '../../utilities/ApiConsumer';

const numOfElems = 11;

function saveDrug(e, refs){
	e && e.preventDefault();
	e && e.stopPropagation();
	//debugger;
	//console.log('Saving drug with follwing details:', refs[7].current.value);
	let drug = uf.prepareDrug(refs, !1);

	console.log('creating:', drug);

	ApiConsumer.saveDrug(drug, (e, d) => {
		if(e || d.message){
			console.log('Error creating the drug:', e, d.message);
			toast.error(`Loss!!, Entry Not Created: ${d.message}`);
			return;
		}
		console.log('successfully created!. Response:', d);
		tp.updateDrugList();
		toast.success('Win!!. Entry Created.');
		uf.clear(refs);
	});

}

// function handleKeyDown(e, refs) {
// 		if (e.key === 'Enter')
// 			saveDrug(e, refs);
// 	}


function NewDrug(props) {
	const ar = Array(numOfElems).fill(0);
	const refAr = [];
	const [show, setShow] = useState(!0);
	ar.forEach(_ => refAr.push(React.createRef(null)));
	
	let updateMe = (t, refs) => {
		console.log('updating...:', t);
		if(t==1){ // select this screen
			setShow(!0);
		}else{
			uf.clear(refs);
			setShow(!1);
		}
	};
	
	useEffect(_ => {
		updateMe(props.trig, refAr);
	}, [props.trig]);



	return (
		<div className={`full-screen ${show ? 'show-screen': 'hide-screen'}`}>
			<ToastContainer />
			<div className='header'>
				<p>{'Create a new Drug entry here!:'}</p>
				<a href='#' className='color--white bg--red' onClick={e => !!!e.preventDefault() && props.setTrig(-1)}>{'Cancel/Leave'}</a>
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
						<tr className='d-none'>
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
							<td>{'Purchased:'}</td>
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
							<td>{'Retailer:'}</td>
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
			<div className='links'><a href='#' className='color--white bg--green' onClick={e => saveDrug(e, refAr)}>{'Create'}</a></div>
		</div>
	);
}

export default NewDrug;