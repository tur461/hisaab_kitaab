import ApiConsumer from './ApiConsumer';

import drug_list from './data';

let tp = {
	drug_list: null,
	numOfDrugs: 0,
	last_q: '',
	interval: null,
	jump_gap: 100,
	start_i: 0,
	end_i: 100,

	get_drugs: function(cbk, isUpdate) {
		if(!this.drug_list || isUpdate)
			ApiConsumer.getAllDrugs((e, d) => {
				if(e) return;
				console.log('got list of new drugs.');
				this.drug_list = d.sort((a, b) => a.name.localeCompare(b.name));
				this.numOfDrugs = d.length;
				cbk(this.drug_list);
			});
			// {
			// 	this.drug_list = drug_list.sort();
			// 	cbk(drug_list);
			// }
		//return this.drug_list;
	},
	getDrugById: function(id) {
		return this.drug_list.filter(d => d.id == id)[0];
	},
	filter_drugs: function(q, cbk) {
		q = q.toLowerCase();
		if(this.last_q)
			cbk(this.drug_list.filter(d => d.name.toLowerCase().indexOf(q) !== -1));
		this.last_q = q;
		this.get_drugs(cbk, !1);
	},

	updateDrugList: function(){
		this.get_drugs(_ => _, !0);
	}

	// lazy_load: function(cbk) {
	// 	if(!this.interval)
	// 		this.interval = setInterval(_ => {
	// 			cbk(this.drug_list.slice(this.start_i, this.end_i))
	// 			if(this.end_i === this.numOfDrugs){
	// 				clearInterval(this.interval);
	// 				return;
	// 			}
	// 			this.curr_i = this.end_i;
	// 			this.end_i = this.end_i + jump_gap;
	// 			if(this.end_i > this.numOfDrugs)
	// 				this.end_i  = this.numOfDrugs;
	// 		}, 1);
	// }
}

export default tp;