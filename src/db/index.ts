import Realm from 'realm';

class RealmObj {
    db: Realm | null;
    constructor() {
        this.db = null;
    }
    async getDbInstance() {
        await this.init();
        return this.db;
    }
    init() {
        return new Promise((resolve, reject) => {
            Realm.open({
                schema: [{name: 'Dog', properties: {name: 'string'}}]
            }).then(realm => {
                this.db = realm;
                resolve();
            }).catch(err => {
                reject(err);
            });
        });
    }
    close() {
        if (this.db && !this.db.isClosed) { 
            this.db.close();
        }
    }
}
const RealmObjInstance = new RealmObj();
const Db =  RealmObjInstance.getDbInstance();

export default RealmObjInstance;
export RealmObjInstance;
