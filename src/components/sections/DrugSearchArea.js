import '../../Styles/DrugSearchArea.css';
import {useState, useEffect} from 'react';

import tp from '../../utilities/text_process';

import SearchBox from './SearchBox';
import DrugList from './DrugList';

const DrugSearchArea = (props) => {

	const [drugList, updateDrugList] = useState([]);
	useEffect(_ => tp.filter_drugs('', d => updateDrugList(d)), []);
	return (
		<div className='drug-search-area'>
			<SearchBox updateDrugList={updateDrugList} drugList={drugList} />
			<DrugList drugList={drugList} setTrig={props.setTrig} />
		</div>
	);
}

export default DrugSearchArea;