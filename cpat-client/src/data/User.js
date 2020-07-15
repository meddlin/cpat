/**
 * 
 */
class User {
    constructor(userName, firstName, lastName, dateCreated, updatedAt, lastModifiedBy) {
        this._userName = userName;
        this._firstName = firstName;
        this._lastName = lastName;

        this._dateCreated = dateCreated;
        this._updatedAt = updatedAt;
        this._lastModifiedBy = lastModifiedBy;
    }

    get userName() {
        return this._userName;
    }
    set userName(value) {
        if (value) this._userName = value;
    }

    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        if (value) this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        if (value) this._lastName = value;
    }
}

export default User; 