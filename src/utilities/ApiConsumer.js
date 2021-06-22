let ApiConsumer = {
	apibaseurl: 'http://localhost:4000',
	M: ['GET', 'POST', 'PUT', 'DELETE'],
	c: (e, cbk) => {
		console.log('fetch err:', e);
		cbk(e, null);
	},
	fetcher: function(u, d, m) { 
		if(d || m) return fetch(u, {
		    		method: this.M[m],
		    		headers: {
		      			'Accept': 'application/json',
		      			'Content-Type': 'application/json'
		    		},
		    		body: JSON.stringify(d)
		    	}
	    	).then(d => d.json());
		return fetch(u).then(d => d.json());
	},	
	getAllDrugs: function(cbk) {
		this.fetcher(`${this.apibaseurl}/drugs`)
		.then(d => cbk(null, d))
		.catch(e => this.c(e, cbk));
	},

	getDrugById: function(ID, cbk) {
		this.fetcher(`${this.apibaseurl}/drugs/${ID}`)
		.then(d => cbk(null, d))
		.catch(e => this.c(e, cbk));
	},

	updateDrugById: function(drug, ID, cbk) {
		this.fetcher(`${this.apibaseurl}/drugs/${ID}`, drug, 2)
		.then(d => cbk(null, d))
		.catch(e => this.c(e, cbk));
	},

	saveDrug: function(drug, cbk) {
		this.fetcher(`${this.apibaseurl}/drug`, drug, 1)
		.then(d => cbk(null, d))
		.catch(e => this.c(e, cbk));
	},
	
	deleteDrugById: function(ID, cbk) {
		this.fetcher(`${this.apibaseurl}/drugs/${ID}`, {}, 3)
		.then(d => cbk(null, d))
		.catch(e => this.c(e, cbk));
	},	
}

export default ApiConsumer;
