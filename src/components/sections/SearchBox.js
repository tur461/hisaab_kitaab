import '../../Styles/SearchBox.css';

import tp from '../../utilities/text_process';
import Constants from '../../utilities/Constants';

let qt = Constants.SearchQueryLengthThreshold;

const NavBar = (props) => {

	function handleSearch(e) {
		let q = e.target.value;
		//if(!q || q.length <= qt) return;
		tp.filter_drugs(q, d => props.updateDrugList(d));
	}

	return (
		<div className='searchbox'>
			<input onChange={handleSearch} type='text' placeholder='search a drug here...' />
		</div>
	);
}

export default NavBar;