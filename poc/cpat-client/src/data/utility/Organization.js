class Organization {
    constructor(
        name,
        metaInfo
    ) {
        this._name = name;
        this._metaInfo = metaInfo;
    }

    get name() {
        return this._name;
    }
    set name(value) {
        if (value) this._name = value;
    }

    get metaInfo() {
        return this._metaInfo;
    }
    set metaInfo(value) {
        if (value) this._metaInfo = value;
    }

    apiObject() {
        return {
            name: this._name,
            metaInfo: this._metaInfo
        }
    }
};

export default Organization;