const sqlcon = require('./db.js');

// ctor
const Drug = {
    getInstance: function(drug){
        this.name = drug.name || null;
        this.mrp = drug.mrp || 0.0;
        this.quantity = drug.quantity || 0;
        this.date_of_entry = new Date();
        this.date_of_last_purchase = drug.date_of_last_purchase || null;
        this.date_of_last_sale = drug.date_of_last_sale || null;
        this.batch_no = drug.batch_no || null;
        this.name_of_purchasee = drug.name_of_purchasee || null;
        this.purchased_total = drug.purchased_total || 0;
        this.sold_total = drug.sold_total || 0;
        this.date_of_expiry = drug.date_of_expiry || null;
        this.date_of_last_update = drug.date_of_last_update || null;
        return this;
    }
}
// CRUD

Drug.create = (newDrug, result) => {
    sqlcon.query('INSERT INTO drugs SET ?', newDrug, (err, res) => {
        if(err){
            console.log('error inserting a new drug:', err);
            result(err, null);
            return;
        }
        console.log(`created an entry in drug table, ID: ${res.insertId}`);
        result(null, {id: res.insertId, ...newDrug});
    });
};

Drug.findById = (id, result) => {
    sqlcon.query(`SELECT * FROM drugs WHERE id = ${id}`, (err, res) => {
        if(err){
            console.log('error', err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log(`drug with id: ${id}, found`);
            result(null, res[0]);
            return;
        }
        console.log(`drug with id: ${id}, not found`);
        result({kind: 'not_found'}, null);
    });
}

Drug.getAll = result => {
    sqlcon.query('SELECT * FROM drugs', (err, res) => {
        if(err){
            console.log('error:', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Drug.updateById = (id, drug, result) => {
    function getKeys(o){
        let ks = [];
        for(let k in o)
            if(typeof o[k] !== 'function')
                ks.push(k);
        return ks;
    }

    let cols = getKeys(drug)
        set = cols.map(col => `${col} = ?`).join(','),
        param = [...cols.map(col => drug[col]), id];
    console.log('updatebyid:', set, param);    
    sqlcon.query(`UPDATE drugs SET ${set} where id = ?`, param, (err, res) => {
        if(err){
            console.log('error', err);
            result(err, null);
            return;
        }
        if(!res.affectedRows){
            result({kind: 'not_found'}, null);
            return;
        }
        console.log(`updated drug with ID: ${id}`);
        result(null, {id, id, ...drug});
    });
};

Drug.remove = (id, result) => {
  sqlcon.query("DELETE FROM drugs WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted drug with id: ", id);
    result(null, res);
  });
};

Drug.removeAll = result => {
  sqlcon.query("DELETE FROM drugs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} drugs`);
    result(null, res);
  });
};

module.exports = Drug;
