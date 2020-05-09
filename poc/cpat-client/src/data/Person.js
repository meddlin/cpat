import AbstractTarget from "./AbstractTarget";

class Person extends AbstractTarget {
    constructor(
        id,

        firstName,
        middleName,
        lastName,
        nickNames,
        phoneNumbers,
        emailAddresses,
        organizations,
        employers,
        socialLinks,
        documentRelation,

        dateCreated,
        updatedAt,
        lastModifiedBy,
    ) {
        super(id, dateCreated, updatedAt, lastModifiedBy);

        this._firstName = firstName;
        this._middleName = middleName;
        this._lastName = lastName;
        this._nickNames = nickNames;
        this._phoneNumbers = phoneNumbers;
        this._emailAddresses = emailAddresses;
        this._organizations = organizations;
        this._employers = employers;
        this._socialLinks = socialLinks;
        this._documentRelation = documentRelation;
    }

    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        if (value) this._firstName = value;
    }

    get middleName() {
        return this._middleName;
    }
    set middleName(value) {
        if (value) this._middleName = value;
    }

    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        if (value) this._lastName = value;
    }

    get nickNames() {
        return this._nickNames;
    }
    set nickNames(value) {
        if (value) this._nickNames = value;
    }

    get phoneNumbers() {
        return this._phoneNumbers;
    }
    set phoneNumbers(value) {
        if (value) this._phoneNumbers = value;
    }

    get emailAddresses() {
        return this._emailAddresses;
    }
    set emailAddresses(value) {
        if (value) this._emailAddresses = value;
    }

    get organizations() {
        return this._organizations;
    }
    set organizations(value) {
        if (value) this._organizations = value;
    }

    get employers() {
        return this._employers;
    }
    set employers(value) {
        if (value) this._employers = value;
    }

    get socialLinks() {
        return this._socialLinks;
    }
    set socialLinks(value) {
        if (value) this._socialLinks = value;
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
            firstName: this._firstName,
            middleName: this._middleName,
            lastName: this._lastName,
            nickNames: this._nickNames,
            phoneNumbers: this._phoneNumbers,
            emailAddresses: this._emailAddresses,
            organizations: this._organizations,
            employers: this._employers,
            socialLinks: this._socialLinks,
            documentRelation: this._documentRelation,
            dateCreated: this._dateCreated,
            updatedAt: this._updatedAt,
            lastModifiedBy: this._lastModifiedBy,
        }
    }
}

export default Person;