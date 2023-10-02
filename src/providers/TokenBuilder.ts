import {
  AmbiguousIdentifierContext,
  ArgContext,
  EnumerationStmtContext,
  EnumerationStmt_ConstantContext,
  FunctionStmtContext,
  PropertyGetStmtContext,
  PropertyLetStmtContext,
  PropertySetStmtContext,
  SubStmtContext,
  TypeStmtContext,
  TypeStmt_ElementContext,
  VariableSubStmtContext,
  VisualBasic6Listener,
} from "vb6-antlr4";
import { ParserRuleContext } from "antlr4ts";
import { Position, Range } from "vscode";
import {
  MethodStmtContext,
  PropertyAccessor,
  PropertyStmtContext,
} from "./types";
import {
  ArgToken,
  BaseToken,
  MethodToken,
  PropertyToken,
  VariableToken,
  ModuleToken,
  EnumToken,
  EnumMemberToken,
  TypeToken,
} from "./Tokens";
import { TokenManager } from "./TokenManager";

type Start = {
  line: number;
  startIndex: number;
};
type Stop = {
  line: number;
  stopIndex: number;
};

export default class TokenBuilder implements VisualBasic6Listener {
  private isDeclareStmt: boolean = true;
  private readonly manager: TokenManager;
  private readonly module: ModuleToken;

  constructor(
    private readonly tokens: BaseToken[],
    private readonly position?: Position
  ) {
    this.manager = new TokenManager();
    if (!this.manager.getModule(this.tokens))
      throw new Error("module not found");
    this.module = this.manager.getModule(this.tokens)!;
  }

  enterTypeStmt(ctx: TypeStmtContext) {
    this.module.addType(
      new TypeToken(
        ctx.ambiguousIdentifier().text,
        this.getRange(ctx.start, ctx.stop || ctx.start)
      )
    );
  }

  getTypeToken(parent: ParserRuleContext | undefined) {
    if (!parent) return;
    if (!parent.children) return;

    let parentName: string | null = null;
    for (const child of parent.children) {
      if (child instanceof AmbiguousIdentifierContext) {
        parentName = child.text;
        break;
      }
    }

    if (!parentName) return;
    return this.module.types.find((typeToken) => typeToken.label == parentName);
  }

  enterTypeStmt_Element(ctx: TypeStmt_ElementContext) {
    const typeToken = this.getTypeToken(ctx.parent);
    if (!typeToken) return;

    const field = new VariableToken(
      ctx.ambiguousIdentifier().text,
      this.getRange(ctx.start, ctx.stop || ctx.start),
      this.getReturnedType(ctx)
    );
    field.changeToField();
    typeToken.addMember(field);
  }

  enterEnumerationStmt(ctx: EnumerationStmtContext) {
    this.module.addEnum(
      new EnumToken(
        ctx.ambiguousIdentifier().text,
        this.getRange(ctx.start, ctx.stop || ctx.start)
      )
    );
  }

  enterEnumerationStmt_Constant(ctx: EnumerationStmt_ConstantContext) {
    const enumToken = this.getEnumToken(ctx.parent);
    if (!enumToken) return;

    enumToken.addMember(
      new EnumMemberToken(
        ctx.ambiguousIdentifier().text,
        this.getRange(ctx.start, ctx.stop || ctx.start)
      )
    );
  }

  getEnumToken(parent: ParserRuleContext | undefined) {
    if (!parent) return;
    if (!parent.children) return;

    let parentName: string | null = null;
    for (const child of parent.children) {
      if (child instanceof AmbiguousIdentifierContext) {
        parentName = child.text;
        break;
      }
    }

    if (!parentName) return;
    return this.module.enums.find((enumToken) => enumToken.label == parentName);
  }

  enterSubStmt(ctx: SubStmtContext) {
    this.addMethod(ctx);
  }

  enterFunctionStmt(ctx: FunctionStmtContext) {
    this.addMethod(ctx, this.getReturnedType(ctx));
  }

  enterPropertyGetStmt(ctx: PropertyGetStmtContext) {
    this.addProp(ctx, "get", this.getReturnedType(ctx));
  }

  enterPropertyLetStmt(ctx: PropertyLetStmtContext) {
    this.addProp(ctx, "let");
  }

  enterPropertySetStmt(ctx: PropertySetStmtContext) {
    this.addProp(ctx, "set");
  }

  addMethod(ctx: MethodStmtContext, returnedType?: string | undefined) {
    this.isDeclareStmt = false;

    this.module.addMethod(
      new MethodToken(
        ctx.ambiguousIdentifier().text,
        this.getRange(ctx.start, ctx.stop || ctx.start),
        returnedType
      )
    );
  }

  enterArg(ctx: ArgContext) {
    if (!this.module) return;

    const argRange = this.getRange(ctx.start, ctx.stop || ctx.start);
    const arg = new ArgToken(
      ctx.ambiguousIdentifier().text,
      argRange,
      this.getReturnedType(ctx)
    );

    const parentToken = this.getParent(argRange);
    if (parentToken) parentToken.addArg(arg);
  }

  enterVariableSubStmt(ctx: VariableSubStmtContext) {
    const varRange = this.getRange(ctx.start, ctx.stop || ctx.start);
    const variable = new VariableToken(
      ctx.ambiguousIdentifier().text,
      this.getRange(ctx.start, ctx.stop || ctx.start),
      this.getReturnedType(ctx)
    );

    if (this.isDeclareStmt) {
      variable.changeToField();
      return this.module.addVariable(variable);
    }

    const parentToken = this.getParent(varRange);

    if (parentToken) parentToken.addVariable(variable);
  }
  getReturnedType(
    ctx:
      | VariableSubStmtContext
      | ArgContext
      | TypeStmt_ElementContext
      | FunctionStmtContext
      | PropertyGetStmtContext
  ): string {
    let returnedType: string = ctx.asTypeClause()?.type().text || "Variant";
    if (
      ctx instanceof TypeStmt_ElementContext ||
      ctx instanceof FunctionStmtContext
    ) {
      return returnedType;
    }
    const typeHint = ctx.typeHint();
    if (!typeHint) return returnedType;

    return returnedType || typeHint.text;
  }

  addProp(
    ctx: PropertyStmtContext,
    accessor: PropertyAccessor,
    returnedType?: string | undefined
  ) {
    this.isDeclareStmt = false;

    const prop = new PropertyToken(
      ctx.ambiguousIdentifier().text,
      this.getRange(ctx.start, ctx.stop || ctx.start),
      returnedType
    );

    prop.setAccessor(accessor);
    this.module.addProperty(prop);
  }

  getParent(range: Range) {
    return (
      this.manager.getParent(this.module.methods, range) ||
      this.manager.getParent(this.module.properties, range)
    );
  }

  getRange(start: Start, stop: Stop) {
    const startPos = new Position(start.line - 1, start.startIndex);
    const stopPos = new Position(stop.line - 1, stop.stopIndex) || startPos;
    return new Range(startPos, stopPos);
  }
}
