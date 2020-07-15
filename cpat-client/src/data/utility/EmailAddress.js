class EmailAddress {
    constructor(
        type,
        address
    ) {
        this._type = type;
        this._address = address;
    }

    get type() {
        return this._type;
    }
    set type(value) {
        if (value) this._type = value;
    }

    get address() {
        return this._address;
    }
    set address(value) {
        if (value) this._address = value;
    }

    apiObject() {
        return {
            type: this._type,
            address: this._address
        }
    }
}

export default EmailAddress;