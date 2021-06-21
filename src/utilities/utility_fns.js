import {drug_model} from './models';

let uf = {
	clone: d => JSON.parse(JSON.stringify(d)),
	formatDate: function(dt) {
		if(!dt) return '';
		let D = new Date(dt), 
			c = D.toLocaleString('en-IN'),
			s = c.split(',')[0].split('/'),
			d = +s[0] < 10 ? `0${s[0]}` : s[0],
			m = +s[1] < 10 ? `0${s[1]}` : s[1],
			y = s[2];

		return `${y}-${m}-${d}`;
	},
	prepareDrug: function(refs, isUpdate) {
		let drug = this.clone(drug_model);
		drug.name = refs[0].current.value;
		drug.batch_no = refs[1].current.value;
		drug.mrp = refs[2].current.value;
		drug.quantity = refs[3].current.value;
		drug.date_of_expiry = refs[4].current.value;
		
		drug.name_of_purchasee = refs[5].current.value;
		drug.purchased_total = refs[6].current.value;
		drug.date_of_last_purchase = refs[7].current.value;
		
		drug.name_of_seller = refs[8].current.value;
		drug.sold_total = refs[9].current.value;
		drug.date_of_last_sale = refs[10].current.value;
		drug.date_of_last_update = isUpdate ? this.formatDate(new Date()) : null;
		drug.date_of_entry = this.formatDate(new Date());
		return drug;
	},
	setValues: function(refs, drug){
		console.log('setting drug values:', drug);
		let vals = [
			drug.name, 
			drug.batch_no, 
			drug.mrp, 
			+drug.quantity, 
			this.formatDate(drug.date_of_expiry), 
			drug.name_of_purchasee,
			+drug.purchased_total,
			this.formatDate(drug.date_of_last_purchase),
			drug.name_of_seller,
			+drug.sold_total,
			this.formatDate(drug.date_of_last_sale),
			this.formatDate(drug.date_of_last_update),
		];
		if(refs[0].current.tagName.toLowerCase() == 'input')
			refs.forEach((r,i) => r.current.value = vals[i]);
		else
			refs.forEach((r,i) => {
				if(i === refs.length-1){
					r.current.textContent = vals[6] - vals[9];
					return;
				}
				r.current.textContent = vals[i];
			});

	},
	clear: function(refs) {
		refs.forEach(r => {
			if('textContent' in r.current)
				r.current.textContent = '';
			if('value' in r.current)
				r.current.value = '';
			if(r.current.onClick)
				r.current.onClick = '';
			if(r.current.onChange)
				r.current.onChange = '';
		});
	}
};

export default uf;