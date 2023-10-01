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
import { CompletionItem, CompletionItemKind, Position } from "vscode";
import { MethodStmContext } from "./types";

type PositionRange = {
  start: number;
  end: number;
};

export default class MethodsListener implements VisualBasic6Listener {
  private readonly positionRange: PositionRange = { start: 0, end: 0 };
  private isDeclareStmt: boolean = true;

  constructor(
    private readonly funcNames: CompletionItem[],
    private readonly contextNames: CompletionItem[],
    private readonly position?: Position
  ) {}

  enterVariableSubStmt(ctx: VariableSubStmtContext) {
    if (this.isInPositionRange(ctx) || this.isDeclareStmt) {
      this.contextNames.push(
        new CompletionItem(
          ctx.ambiguousIdentifier().text,
          this.isDeclareStmt
            ? CompletionItemKind.Field
            : CompletionItemKind.Variable
        )
      );
    }
  }

  enterArg(ctx: ArgContext) {
    if (this.isInPositionRange(ctx)) {
      this.contextNames.push(
        new CompletionItem(
          ctx.ambiguousIdentifier().text,
          CompletionItemKind.Variable
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

  addName(ctx: MethodStmContext, isParam = false) {
    this.isDeclareStmt = false;
    this.funcNames.push(
      new CompletionItem(
        ctx.ambiguousIdentifier().text,
        isParam ? CompletionItemKind.Property : CompletionItemKind.Method
      )
    );
    if (this.isInRange(ctx)) {
      const currentLine = this.position?.line || 0;
      this.positionRange.start = ctx.start.line;
      this.positionRange.end = ctx.stop?.line || currentLine + 1;
    }
  }

  isInRange(context: MethodStmContext): boolean {
    const currentLine: number = this.position?.line || 0;
    const startLine: number = context.start.line;
    const stopLine: number = context.stop?.line || currentLine + 1;
    return startLine <= currentLine + 1 && currentLine + 1 <= stopLine;
  }

  isInPositionRange(context: ParserRuleContext): boolean {
    const currentLine = this.position?.line || 0;
    return (
      this.positionRange.start <= context.start.line &&
      this.positionRange.end >= (context.stop?.line || currentLine + 1)
    );
  }
}
