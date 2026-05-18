// function add(a: number, b: number){
//     return (a+b);
// }

// const ans = add(3, 5);
// console.log(ans);



//In memory DB
//save('user-1', {fnaame, lname})

//HashMap(key : value pair)
//      type? : type?
// 1 -> { fname, lname, email, contact: {mobile}, add: {street, pinCode, country} }


type UserId = number;
interface User {
    id: UserId;
    fname: string;
    lname?: string;
    email: string;
    contact: {
        mobile: string;
    }
    address: {
        street: number;
        pinCode: number;
        country: string;
    }
}

class inMemoryDB {
    // private _db: Map<User['id'], User>;
    //good practice
    private _db!: Map<UserId, User>;   

    constructor() {

    }

    public insertUser(data: User): UserId {
        if (this._db.has(data.id)) {
            throw new Error(`User with ID ${data.id} already exists!`);
        }
        this._db.set(data.id, data);

        return data.id;
    }

    public updateUser(id: UserId, updateData: Omit<User, 'id'>): boolean {
        if (!this._db.has(id)) {
            throw new Error(`User with ID ${id} does not exist!`);
        }

        this._db.set(id, { ...updateData, id });
        return true;
    }

    public getUserById(id: UserId) : User{
        if(!this._db.has(id)){
            throw new Error(`User with ID ${id} does not exist!`);
        }

        return this._db.get(id)!;
    }

}

const user1: User = {
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
}

const myDB = new inMemoryDB();
myDB.insertUser(user1);