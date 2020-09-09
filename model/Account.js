class Account {
    
    constructor(description, valuePayable) {
        this._description = description;
        this._valuePayable = valuePayable;
    }

    get description(){
        return this._description;
    }

    get valuePayable(){
        return this._valuePayable;
    }

}