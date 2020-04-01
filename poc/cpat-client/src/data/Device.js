import AbstractTarget from "./AbstractTarget";

class Company extends AbstractTarget {
    constructor(
        id,

        name,
        organizations,
        relations,

        dateCreated,
        updatedAt,
        lastModifiedBy,
    ) {
        super(id, dateCreated, updatedAt, lastModifiedBy);

        this._name = name;
        this._organizations = organizations;
        this._relations = relations;
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
            organizations: this._organizations,
            relations: this._relations,
            dateCreated: this._dateCreated,
            updatedAt: this._updatedAt,
            lastModifiedBy: this._lastModifiedBy,
        }
    }
};

export default Company;