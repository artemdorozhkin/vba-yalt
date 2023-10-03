import { CompletionItemKind, Position, Range, SymbolKind } from "vscode";
import { ConstantValue, PropertyAccessor } from "./types";
import { KeywordToken } from "../language-features/KeywordsBuilder";
import { TokenContext } from "./TokenContext";

export abstract class BaseToken {
  constructor(
    public readonly label: string,
    public readonly range: Range = new Range(0, 0, 0, 0),
    public readonly returnType?: string
  ) {}

  public abstract get symbol(): SymbolKind;
  public abstract get completion(): CompletionItemKind;

  isMe(label: string): boolean {
    return label.toLowerCase() == this.label.toLowerCase();
  }

  isLib(): this is LibToken {
    return this.symbol == SymbolKind.Namespace;
  }

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

  isKeyword(): this is KeywordToken {
    return this.completion == CompletionItemKind.Keyword;
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

export class LibToken extends BaseToken {
  private _modules: BaseToken[] = [];

  public get symbol(): SymbolKind {
    return SymbolKind.Namespace;
  }
  public get completion(): CompletionItemKind {
    return CompletionItemKind.Folder;
  }

  public get modules(): BaseToken[] {
    return this._modules;
  }

  public addModule(moduleTokens: BaseToken[]): void;
  public addModule(moduleToken: BaseToken): void;
  public addModule(moduleTokenOrTokens: BaseToken | BaseToken[]): void {
    if (Array.isArray(moduleTokenOrTokens))
      this._modules.push(...moduleTokenOrTokens);
    else this._modules.push(moduleTokenOrTokens);
  }
}

export class ModuleToken extends BaseToken {
  public predeclared: boolean = true;
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

  public get variables(): (VariableToken | ConstantToken)[] {
    return this._variables;
  }

  public get properties(): PropertyToken[] {
    return this._properties;
  }

  public get methods(): MethodToken[] {
    return this._methods;
  }

  public parseType(fileExtension: string) {
    switch (fileExtension) {
      case ".bas": {
        this._symbol = SymbolKind.Module;
        this._completion = CompletionItemKind.Module;
        break;
      }
      case ".cls" || ".frm": {
        this._symbol = SymbolKind.Class;
        this._completion = CompletionItemKind.Class;
        break;
      }
    }
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

export class VariableToken extends BaseToken {
  private _symbol: SymbolKind = SymbolKind.Variable;
  private _completion: CompletionItemKind = CompletionItemKind.Variable;

  public get symbol(): SymbolKind {
    return this._symbol;
  }
  public get completion(): CompletionItemKind {
    return this._completion;
  }

  changeToField(): void {
    this._symbol = SymbolKind.Field;
    this._completion = CompletionItemKind.Field;
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

export class PropertyToken extends BaseToken {
  private readonly _args: ArgToken[] = [];
  private readonly _variables: (VariableToken | ConstantToken)[] = [];
  private _accessor: PropertyAccessor = null;

  public get symbol(): SymbolKind {
    return SymbolKind.Property;
  }
  public get completion(): CompletionItemKind {
    return CompletionItemKind.Property;
  }

  public get args(): ArgToken[] {
    return this._args;
  }

  public get variables(): (VariableToken | ConstantToken)[] {
    return this._variables;
  }

  public get accessor(): PropertyAccessor {
    return this._accessor;
  }

  public setAccessor(accessor: PropertyAccessor) {
    this._accessor = accessor;
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

  public get variables(): (VariableToken | ConstantToken)[] {
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
