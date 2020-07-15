import AbstractTarget from "./AbstractTarget";

/**
 * 
 */
class Company extends AbstractTarget {
    constructor(
        id,

        name,
        documentRelation,

        dateCreated,
        updatedAt,
        lastModifiedBy,
    ) {
        super(id, dateCreated, updatedAt, lastModifiedBy);

        this._name = name;
        this._documentRelation = documentRelation;
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
            documentRelation: this._documentRelation,
            dateCreated: this._dateCreated,
            updatedAt: this._updatedAt,
            lastModifiedBy: this._lastModifiedBy,
        }
    }
};

export default Company;