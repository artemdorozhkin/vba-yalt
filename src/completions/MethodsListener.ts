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
  VisualBasic6Lexer,
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
import Token from "./Token";

type Start = {
  line: number;
  startIndex: number;
};
type Stop = {
  line: number;
  stopIndex: number;
};

export default class MethodsListener implements VisualBasic6Listener {
  private isDeclareStmt: boolean = true;

  constructor(
    private readonly tokens: Token[],
    private readonly position?: Position
  ) {}

  enterVariableSubStmt(ctx: VariableSubStmtContext) {
    const varRange = this.getRange(ctx.start, ctx.stop || ctx.start);
    const parentToken = this.tokens.find((token) => {
      if (token.isContainer() && token.intersectRange(varRange)) {
        return token;
      }
    });
    if (parentToken) {
      parentToken.childrens?.push(
        new Token(
          ctx.ambiguousIdentifier().text,
          SymbolKind.Variable,
          CompletionItemKind.Variable,
          varRange,
          ctx.typeHint()?.text || ""
        )
      );
    } else {
      this.tokens.push(
        new Token(
          ctx.ambiguousIdentifier().text,
          this.isDeclareStmt ? SymbolKind.Field : SymbolKind.Variable,
          this.isDeclareStmt
            ? CompletionItemKind.Field
            : CompletionItemKind.Variable,
          this.getRange(ctx.start, ctx.stop || ctx.start),
          ctx.typeHint()?.text || ""
        )
      );
    }
  }

  enterArg(ctx: ArgContext) {
    const argRange = this.getRange(ctx.start, ctx.stop || ctx.start);
    const parentToken = this.tokens.find((token) => {
      if (token.isContainer() && token.intersectRange(argRange)) {
        return token;
      }
    });
    if (parentToken) {
      parentToken.childrens?.push(
        new Token(
          ctx.ambiguousIdentifier().text,
          SymbolKind.Variable,
          CompletionItemKind.Variable,
          argRange,
          ctx.typeHint()?.text || ""
        )
      );
    }
  }

  enterSubStmt(ctx: SubStmtContext) {
    this.addName(ctx);
  }

  enterFunctionStmt(ctx: FunctionStmtContext) {
    this.addName(ctx);
  }

  enterPropertyGetStmt(ctx: PropertyGetStmtContext) {
    this.addName(ctx, true);
  }

  enterPropertyLetStmt(ctx: PropertyLetStmtContext) {
    this.addName(ctx, true);
  }

  enterPropertySetStmt(ctx: PropertySetStmtContext) {
    this.addName(ctx, true);
  }

  getRange(start: Start, stop: Stop) {
    const startPos = new Position(start.line, start.startIndex);
    const stopPos = new Position(stop.line, stop.stopIndex) || startPos;
    return new Range(startPos, stopPos);
  }

  addName(ctx: MethodStmContext, isProp = false) {
    this.isDeclareStmt = false;
    this.tokens.push(
      new Token(
        ctx.ambiguousIdentifier().text,
        isProp ? SymbolKind.Property : SymbolKind.Method,
        isProp ? CompletionItemKind.Property : CompletionItemKind.Method,
        this.getRange(ctx.start, ctx.stop || ctx.start)
      )
    );
  }
}
