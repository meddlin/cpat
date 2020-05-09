import AbstractTarget from "./AbstractTarget";

class Company extends AbstractTarget {
    constructor(
        id,

        name,
        organizations,
        documentRelation,

        dateCreated,
        updatedAt,
        lastModifiedBy,
    ) {
        super(id, dateCreated, updatedAt, lastModifiedBy);

        this._name = name;
        this._organizations = organizations;
        this._documentRelation = documentRelation;
    };

    get name() {
        return this._name;
    }
    set name(value) {
        if (value) this._name = value;
    }

    get organizations() {
        return this._organizations;
    }
    set organizations(value) {
        if (value) this._organizations = value;
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
            organizations: this._organizations,
            documentRelation: this._documentRelation,
            dateCreated: this._dateCreated,
            updatedAt: this._updatedAt,
            lastModifiedBy: this._lastModifiedBy,
        }
    }
};

export default Company;