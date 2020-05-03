import AbstractTarget from "./AbstractTarget";

class Location extends AbstractTarget {
    constructor(
        id,

        name,
        latitude,
        longitude,
        relations,

        dateCreated,
        updatedAt,
        lastModifiedBy,
    ) {
        super(id, dateCreated, updatedAt, lastModifiedBy);

        this._name = name;
        this._latitude = latitude;
        this._longitude = longitude;
        this._relations = relations;
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

    get relations() {
        return this._relations;
    }
    set relations(value) {
        if (value) this._relations = value;
    }

    apiObject() {
        return {
            id: this._id,
            name: this._name,
            latitude: this._latitude,
            longitude: this._longitude,
            relations: this._relations,
            dateCreated: this._dateCreated,
            updatedAt: this._updatedAt,
            lastModifiedBy: this._lastModifiedBy,
        }
    }
};

export default Location;