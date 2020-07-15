/**
 * 
 */
class AbstractTarget {
    constructor(
        id,
        dateCreated,
        updatedAt,
        lastModifiedBy
    ) {
        this._id = id;
        this._dateCreated = dateCreated;
        this._updatedAt = updatedAt;
        this._lastModifiedBy = lastModifiedBy;
    }

    get id() {
        return this._id;
    }
    set id(value) {
        if (value) this._id = value;
    }

    get dateCreated() {
        return this._dateCreated;
    }
    set dateCreated(value) {
        if (value) this._dateCreated = value;
    }

    get updatedAt() {
        return this._updatedAt;
    }
    set updatedAt(value) {
        if (value) this._updatedAt = value;
    }

    get lastModifiedBy() {
        return this._lastModifiedBy;
    }
    set lastModifiedBy(value) {
        if (value) this._lastModifiedBy = value;
    }
};

export default AbstractTarget;