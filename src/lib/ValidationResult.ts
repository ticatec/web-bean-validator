export default class ValidationResult {

    private readonly _errors: Record<string, any>;
    private _valid: boolean;

    constructor() {
        this._valid = true;
        this._errors = {};
    }

    setError(field: string, errMessage: any) {
        this._valid = false;
        this._errors[field] = errMessage;
    }

    getError(field: string): any {
        return this._errors[field];
    }

    hasError(field: string): boolean {
        return this._errors[field] !== undefined;
    }

    get valid(): boolean {
        return this._valid;
    }

    get errors(): Record<string, any> {
        return this._errors;
    }
}