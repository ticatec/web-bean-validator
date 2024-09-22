export default class ValidationResult {

    private readonly _errors: any;
    private _valid: boolean;

    constructor() {
        this._valid = true;
        this._errors = {};
    }

    setError(field: string, errMessage: string | Array<any>) {
        this._valid = false;
        this._errors[field] = errMessage;
    }

    get valid(): boolean {
        return this._valid;
    }

    get errors(): any {
        return this._errors;
    }
}