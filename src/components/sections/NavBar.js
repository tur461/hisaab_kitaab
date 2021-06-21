import '../../Styles/NavBar.css';

const NavBar = (props) => {
	function selectScreen(e) {
		e.preventDefault();
		e.stopPropagation();
		//switch(e.target.textContent){
			// case 'Home': props.trig(-1); break;
			// case 'View': props.trig(0); break;
			//case 'New': props.trig(1); break;
			// case 'Update': props.trig(2); break;
		//}
	}
	return (
		<div className='navbar'>
			<a href='#' className={'color--white bg--purple'} onClick={e => !!!e.preventDefault() && props.setTrig(1)} >{'New'}</a>
		</div>
	);
}

export default NavBar;