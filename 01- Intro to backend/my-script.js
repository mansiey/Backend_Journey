"use strict";
// function add(a: number, b: number){
//     return (a+b);
// }
class inMemoryDB {
    // private _db: Map<User['id'], User>;
    _db; //good practice
    constructor() {
    }
    insertUser(data) {
        if (this._db.has(data.id)) {
            throw new Error(`User with ID ${data.id} already exists!`);
        }
        this._db.set(data.id, data);
        return data.id;
    }
    updateUser(id, updateData) {
        if (!this._db.has(id)) {
            throw new Error(`User with ID ${id} does not exist!`);
        }
        this._db.set(id, { ...updateData, id });
        return true;
    }
}
const user1 = {
    id: 1,
    fname: 'Mansi',
    lname: 'Singh',
    email: 'XYZ',
    contact: {
        mobile: 'ABC',
    },
    address: {
        street: 23,
        pinCode: 68,
        country: 'india',
    }
};
const myDB = new inMemoryDB();
myDB.insertUser(user1);
