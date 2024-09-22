export default class ValidationResult {

    private errors: Array<string>;

    constructor() {
        this.errors = [];
    }

    appendError(error: string):void {
        this.errors.push(error);
    }

    combine(result: ValidationResult): void {
        this.errors.push(...result.errors);
    }

    get valid(): boolean {
        return this.errors.length == 0;
    }

    get errorMessage(): string {
        return this.errors.join('\n');
    }
}