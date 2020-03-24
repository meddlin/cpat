import AbstractTarget from "./AbstractTarget";

class Target extends AbstractTarget {
    constructor(
        id,

        name,
        region,
        collectionType,
        selected,
        relations,

        dateCreated,
        updatedAt,
        lastModifiedBy,
    ) {
        super(id, dateCreated, updatedAt, lastModifiedBy);

        this._name = name;
        this._region = region;
        this._collectionType = collectionType;
        this._selected = selected;
        this._relations = relations;
        this._dateCreated = dateCreated;
        this._updatedAt = updatedAt;
        this._lastModifiedBy = lastModifiedBy;
    }

    get name() {
        return this._name;
    }
    set name(value) {
        if (value) this._name = value;
    }

    get region() {
        return this._region;
    }
    set region(value) {
        if (value) this._region = value;
    }

    get collectionType() {
        return this._collectionType;
    }
    set collectionType(value) {
        if (value) this._collectionType = value;
    }

    get selected() {
        return this._selected;
    }
    set selected(value) {
        if (value) this._selected = value;
    }

    get relations() {
        return this._relations;
    }
    set relations(value) {
        if (value) this._relations = value;
    }
};

export default Target;