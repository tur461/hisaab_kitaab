import '../../Styles/DrugList.css';

import tp from '../../utilities/text_process';

const DrugList = (props) => {
	const viewTheDrug = e => {
		localStorage.setItem('selected_id', e.target.dataset.id);
		props.setTrig(0); // show view drug screen
	};

	return (
		<div className='druglist'>
			<ul>
			{
				props.drugList
				.slice(0, 500)
				.map((v,i) => (
					<li data-id={v.id} onClick={viewTheDrug} className='druglist--li'>{v.name}</li>
				))
			}
			</ul>
		</div>
	);
}

export default DrugList;