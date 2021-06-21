import '../../Styles/Home.css';
import React, {useState} from 'react';

import NavBar from '../sections/NavBar';
import DrugSearchArea from '../sections/DrugSearchArea';

import NewDrug from '../screens/NewDrug';
import UpdateDrug from '../screens/UpdateDrug';
import ViewDrug from '../screens/ViewDrug';

const Home = (props) => {
	const [subScreen, updateSubScreen] = useState(-1);
	return (
		<div className='homepage'>
			<NavBar setTrig={updateSubScreen} />
			<DrugSearchArea trig={subScreen} setTrig={updateSubScreen} />
			
			<NewDrug trig={subScreen} setTrig={updateSubScreen} />
			<UpdateDrug trig={subScreen} setTrig={updateSubScreen} />
			<ViewDrug trig={subScreen} setTrig={updateSubScreen} />
		</div>
	);
}

export default Home;