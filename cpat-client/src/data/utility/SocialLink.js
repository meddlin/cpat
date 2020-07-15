class SocialLink {
    constructor(
        site,
        url
    ) {
        this._site = site;
        this._url = url;
    }

    get site() {
        return this._site;
    }
    set site(value) {
        if (value) this._site = value;
    }

    get url() {
        return this._url;
    }
    set url(value) {
        if (value) this._url = value;
    }

    apiObject() {
        return {
            site: this._site,
            url: this._url
        }
    }
};

export default SocialLink;