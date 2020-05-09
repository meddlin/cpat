import AbstractTarget from "./AbstractTarget";

class Location extends AbstractTarget {
    constructor(
        id,

        name,
        latitude,
        longitude,
        documentRelation,

        dateCreated,
        updatedAt,
        lastModifiedBy,
    ) {
        super(id, dateCreated, updatedAt, lastModifiedBy);

        this._name = name;
        this._latitude = latitude;
        this._longitude = longitude;
        this._documentRelation = documentRelation;
    }

    get name() {
        return this._name;
    }
    set name(value) {
        if (value) this._name = value;
    }

    get latitude() {
        return this._latitude;
    }
    set latitude(value) {
        if (value) this._latitude = value;
    }
    
    get longitude() {
        return this._longitude;
    }
    set longitude(value) {
        if (value) this._longitude = value;
    }

    get documentRelation() {
        return this._documentRelation;
    }
    set documentRelation(value) {
        if (value) this._documentRelation = value;
    }

    apiObject() {
        return {
            id: this._id,
            name: this._name,
            latitude: this._latitude,
            longitude: this._longitude,
            documentRelation: this._documentRelation,
            dateCreated: this._dateCreated,
            updatedAt: this._updatedAt,
            lastModifiedBy: this._lastModifiedBy,
        }
    }
};

export default Location;