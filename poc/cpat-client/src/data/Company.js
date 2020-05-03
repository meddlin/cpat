import AbstractTarget from "./AbstractTarget";

/**
 * 
 */
class Company extends AbstractTarget {
    constructor(
        id,

        name,
        relations,

        dateCreated,
        updatedAt,
        lastModifiedBy,
    ) {
        super(id, dateCreated, updatedAt, lastModifiedBy);

        this._name = name;
        this._relations = relations;
    };

    /**
     * Field names.
     * Notice the local fields start with an underscore (_field) while the
     * constructor parameters don't (field). The underscore isn't necessary
     * for ES6 class syntax, but Formik had some weird behavior without it.
     * Formik would recursively call a field's setter if it shared the same
     * name as the field, resulting in recursion overflow.
     */

    get name() {
        return this._name;
    }
    set name(value) {
        if (value) this._name = value;
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
            relations: this._relations,
            dateCreated: this._dateCreated,
            updatedAt: this._updatedAt,
            lastModifiedBy: this._lastModifiedBy,
        }
    }
};

export default Company;