import Realm from 'realm';

class Realms {
    static db: Realm;
    static run() {
        Realms.init();
        return Realms.db;
    }
    static async init() {
        await Realms.getDbInstance();
        return Realms.db;
    }
    static getDbInstance() {
        return new Promise((resolve, reject) => {
            Realm.open({
                schema: [{name: 'Dog', properties: {name: 'string'}}]
            }).then(realm => {
                console.log('数据库初始化成功')
                Realms.db = realm;
                resolve();
            }).catch(err => {
                reject(err);
            });
        });
    }
    static close() {
        if (Realms.db && !Realms.db.isClosed) { 
            Realms.db.close();
        }
    }
}
Realms.run();

export default Realms;
