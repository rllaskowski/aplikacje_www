import * as sqlite3 from 'sqlite3';

/* Wraping sqlite3 db client to use promises instead of callbacks */

class dbClient {
    db: sqlite3.Database

    constructor(name: string) {
        sqlite3.verbose();
        this.db = new sqlite3.Database(name);
    }

    run(query: string, params: any) {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    all(query: string, params: any) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    close() {
        this.db.close();
    }
}

export {
    dbClient
}