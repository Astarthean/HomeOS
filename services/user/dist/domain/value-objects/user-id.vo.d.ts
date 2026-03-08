export declare class UserId {
    private readonly value;
    static generate(): UserId;
    constructor(value: string);
    getValue(): string;
    toString(): string;
}
