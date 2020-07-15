class PhoneNumber {
    constructor(
        type,
        number
    ) {
        this._type = type;
        this._number = number;
    }

    get type() {
        return this._type;
    }
    set type(value) {
        if (value) this._type = value;
    }

    get number() {
        return this._number;
    }
    set number(value) {
        if (value) this._number = value;
    }

    apiObject() {
        return {
            type: this._type,
            number: this._number
        }
    }
};

export default PhoneNumber;