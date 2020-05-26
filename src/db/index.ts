import Realm from 'realm';

class RealmObj {
    db: Realm | null;
    constructor() {
        this.init();
        this.db = null;
    }
    init() {
        Realm.open({
            schema: [{name: 'Dog', properties: {name: 'string'}}]
        }).then(realm => {
            this.db = realm;
        });
    }
    close() {
        if (this.db && !this.db.isClosed) { 
            this.db.close();
        }
    }
}