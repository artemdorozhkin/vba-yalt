import {
  AmbiguousIdentifierContext,
  ArgContext,
  ArgListContext,
  BlockContext,
  BlockStmtContext,
  DeclareStmtContext,
  FieldLengthContext,
  FunctionStmtContext,
  ModuleAttributesContext,
  ModuleConfigContext,
  ModuleContext,
  ModuleHeaderContext,
  ModuleOptionContext,
  ModuleReferenceContext,
  PropertyGetStmtContext,
  PropertyLetStmtContext,
  PropertySetStmtContext,
  SubStmtContext,
  TypeStmtContext,
  VariableStmtContext,
  VariableSubStmtContext,
  VisualBasic6Listener,
} from "vb6-antlr4";
import { ParseTree } from "antlr4ts/tree";
import { ParserRuleContext } from "antlr4ts";
import {
  CompletionItem,
  CompletionItemKind,
  Position,
  Range,
  SymbolKind,
} from "vscode";
import { MethodStmContext } from "./types";
import {
  ArgToken,
  BaseToken,
  MethodToken,
  PropertyToken,
  VariableToken,
  ModuleToken,
} from "./Token";
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

  getParent(range: Range) {
    return (
      this.manager.getParent(this.module.methods, range) ||
      this.manager.getParent(this.module.properties, range)
    );
  }

  enterVariableSubStmt(ctx: VariableSubStmtContext) {
    const varRange = this.getRange(ctx.start, ctx.stop || ctx.start);
    const variable = new VariableToken(
      ctx.ambiguousIdentifier().text,
      this.getRange(ctx.start, ctx.stop || ctx.start),
      ctx.typeHint()?.text || ""
    );

    if (this.isDeclareStmt) {
      return this.module.addVariable(variable);
    }

    const parentToken = this.getParent(varRange);

    if (parentToken) parentToken.addVariable(variable);
  }

  enterArg(ctx: ArgContext) {
    if (!this.module) return;

    const argRange = this.getRange(ctx.start, ctx.stop || ctx.start);
    const arg = new ArgToken(
      ctx.ambiguousIdentifier().text,
      argRange,
      ctx.typeHint()?.text || ""
    );

    const parentToken = this.getParent(argRange);
    if (parentToken) parentToken.addArg(arg);
  }

  enterSubStmt(ctx: SubStmtContext) {
    this.addMethod(ctx);
  }

  enterFunctionStmt(ctx: FunctionStmtContext) {
    this.addMethod(ctx);
  }

  enterPropertyGetStmt(ctx: PropertyGetStmtContext) {
    this.addMethod(ctx, true);
  }

  enterPropertyLetStmt(ctx: PropertyLetStmtContext) {
    this.addMethod(ctx, true);
  }

  enterPropertySetStmt(ctx: PropertySetStmtContext) {
    this.addMethod(ctx, true);
  }

  getRange(start: Start, stop: Stop) {
    const startPos = new Position(start.line - 1, start.startIndex);
    const stopPos = new Position(stop.line - 1, stop.stopIndex) || startPos;
    return new Range(startPos, stopPos);
  }

  addMethod(ctx: MethodStmContext, isProp = false) {
    this.isDeclareStmt = false;

    if (isProp) {
      const prop = new PropertyToken(
        ctx.ambiguousIdentifier().text,
        this.getRange(ctx.start, ctx.stop || ctx.start)
      );
      const accessor = /\b([gls]et)\b/i.exec(ctx.text.toLowerCase());
      const token = this.tokens.find((token) => {
        return token.label == ctx.ambiguousIdentifier().text;
      });

      if (!token) {
        return this.module.addProperty(prop);
      }

      if (token && token.isProperty()) {
        if (!accessor) return;

        switch (accessor[0]) {
          case "get":
            token.addAccessor("get");
          case "let":
            token.addAccessor("let");
          case "set":
            token.addAccessor("set");
        }
      }
    }
    this.module.addMethod(
      new MethodToken(
        ctx.ambiguousIdentifier().text,
        this.getRange(ctx.start, ctx.stop || ctx.start)
      )
    );
  }
}
