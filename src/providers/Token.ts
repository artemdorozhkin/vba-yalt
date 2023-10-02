import { CompletionItemKind, Position, Range, SymbolKind } from "vscode";
import { ConstantValue, PropertyAccessor } from "./types";

export abstract class BaseToken {
  constructor(
    public readonly label: string,
    public readonly range: Range,
    public readonly returnType?: string
  ) {}

  public abstract get symbol(): SymbolKind;
  public abstract get completion(): CompletionItemKind;

  isClass(): this is ModuleToken {
    return this.symbol == SymbolKind.Class;
  }

  isModule(): this is ModuleToken {
    return this.symbol == SymbolKind.Module;
  }

  isMethod(): this is MethodToken {
    return this.symbol == SymbolKind.Method;
  }

  isProperty(): this is PropertyToken {
    return this.symbol == SymbolKind.Property;
  }

  isVariable(): this is VariableToken {
    return this.symbol == SymbolKind.Variable;
  }

  isConstants(): this is ConstantToken {
    return this.symbol == SymbolKind.Constant;
  }

  isEnum(): this is EnumToken {
    return this.symbol == SymbolKind.Enum;
  }

  isType(): this is TypeToken {
    return this.symbol == SymbolKind.Struct;
  }

  isInModuleContainer(): boolean {
    return (
      this.isEnum() || this.isType() || this.isProperty() || this.isMethod()
    );
  }

  intersectRange(range: Range): boolean {
    return (
      this.range.start.line <= range.start.line &&
      this.range.end.line >= range.end.line
    );
  }

  intersectPosition(position: Position): boolean {
    return (
      this.range.start.line <= position.line &&
      this.range.end.line >= position.line
    );
  }
}

export class VariableToken extends BaseToken {
  public get symbol(): SymbolKind {
    return SymbolKind.Variable;
  }
  public get completion(): CompletionItemKind {
    return CompletionItemKind.Variable;
  }
}

export class ArgToken extends VariableToken {}

export class ConstantToken extends BaseToken {
  private _value: ConstantValue = "";

  public get symbol(): SymbolKind {
    return SymbolKind.Constant;
  }
  public get completion(): CompletionItemKind {
    return CompletionItemKind.Constant;
  }

  public get value(): ConstantValue {
    return this._value;
  }

  public setValue(value: ConstantValue) {
    this._value = value;
  }
}

export class ArrayToken extends BaseToken {
  public get symbol(): SymbolKind {
    return SymbolKind.Array;
  }
  public get completion(): CompletionItemKind {
    return CompletionItemKind.Variable;
  }
}

export class PropertyToken extends BaseToken {
  private readonly _args: ArgToken[] = [];
  private readonly _variables: (VariableToken | ConstantToken)[] = [];
  private readonly _accessors: PropertyAccessor[] = [];

  public get symbol(): SymbolKind {
    return SymbolKind.Property;
  }
  public get completion(): CompletionItemKind {
    return CompletionItemKind.Property;
  }

  public get args(): ArgToken[] {
    return this._args;
  }

  public get variables(): ArgToken[] {
    return this._variables;
  }

  public get isReadOnly(): boolean {
    if (this._accessors.filter((accessor) => accessor != "get")) return false;

    return true;
  }

  public addAccessor(accessor: PropertyAccessor) {
    this._accessors.push(accessor);
  }

  addArg(arg: ArgToken) {
    this._args.push(arg);
  }

  addVariable(variable: VariableToken | ConstantToken) {
    this._variables.push(variable);
  }
}

export class MethodToken extends BaseToken {
  private readonly _args: ArgToken[] = [];
  private readonly _variables: (VariableToken | ConstantToken)[] = [];

  public get symbol(): SymbolKind {
    return SymbolKind.Method;
  }
  public get completion(): CompletionItemKind {
    return CompletionItemKind.Method;
  }

  public get args(): ArgToken[] {
    return this._args;
  }

  public get variables(): ArgToken[] {
    return this._variables;
  }

  addArg(arg: ArgToken) {
    this._args.push(arg);
  }

  addVariable(variable: VariableToken | ConstantToken) {
    this._variables.push(variable);
  }
}

export class EnumMemberToken extends BaseToken {
  private _value: number = 0;

  public get symbol(): SymbolKind {
    return SymbolKind.EnumMember;
  }
  public get completion(): CompletionItemKind {
    return CompletionItemKind.EnumMember;
  }

  public get value(): number {
    return this._value;
  }

  public incrementPrevious(previousValue: number) {
    this._value = previousValue + 1;
  }

  public setValue(value: number) {
    this._value = value;
  }
}

export class EnumToken extends BaseToken {
  private readonly _members: EnumMemberToken[] = [];

  public get symbol(): SymbolKind {
    return SymbolKind.Enum;
  }
  public get completion(): CompletionItemKind {
    return CompletionItemKind.Enum;
  }

  public get members(): EnumMemberToken[] {
    return this._members;
  }

  addMember(enumMember: EnumMemberToken) {
    this._members.push(enumMember);
  }
}

export class TypeToken extends BaseToken {
  private readonly _members: VariableToken[] = [];

  public get symbol(): SymbolKind {
    return SymbolKind.Struct;
  }
  public get completion(): CompletionItemKind {
    return CompletionItemKind.Struct;
  }

  public get members(): VariableToken[] {
    return this._members;
  }

  addMember(typeMember: VariableToken) {
    this._members.push(typeMember);
  }
}

export class ModuleToken extends BaseToken {
  private _symbol: SymbolKind = SymbolKind.Module;
  private _completion: CompletionItemKind = CompletionItemKind.Module;
  private _enums: EnumToken[] = [];
  private _types: TypeToken[] = [];
  private _variables: (VariableToken | ConstantToken)[] = [];
  private _properties: PropertyToken[] = [];
  private _methods: MethodToken[] = [];

  public get symbol(): SymbolKind {
    return this._symbol;
  }
  public get completion(): CompletionItemKind {
    return this._completion;
  }

  public get enums(): EnumToken[] {
    return this._enums;
  }

  public get types(): TypeToken[] {
    return this._types;
  }

  public get variables(): VariableToken[] {
    return this._variables;
  }

  public get properties(): PropertyToken[] {
    return this._properties;
  }

  public get methods(): MethodToken[] {
    return this._methods;
  }

  public changeTypeToClass() {
    this._symbol = SymbolKind.Class;
    this._completion = CompletionItemKind.Class;
  }

  addEnum(enumToken: EnumToken) {
    this._enums.push(enumToken);
  }

  addType(typeToken: TypeToken) {
    this._types.push(typeToken);
  }

  addVariable(variable: VariableToken | ConstantToken) {
    this._variables.push(variable);
  }

  addProperty(propertyToken: PropertyToken) {
    this._properties.push(propertyToken);
  }

  addMethod(methodToken: MethodToken) {
    this._methods.push(methodToken);
  }
}
