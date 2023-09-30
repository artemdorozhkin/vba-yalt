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
    private readonly position: Position
  ) {}

  enterModuleReference(ctx: ModuleReferenceContext) {
    console.log(`${ctx.start.line}:${ctx.stop?.line}`);
  }

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
    this.addName(ctx);
  }

  enterPropertyLetStmt(ctx: PropertyLetStmtContext) {
    this.addName(ctx);
  }

  enterPropertySetStmt(ctx: PropertySetStmtContext) {
    this.addName(ctx);
  }

  addName(ctx: MethodStmContext) {
    this.isDeclareStmt = false;
    this.funcNames.push(
      new CompletionItem(
        ctx.ambiguousIdentifier().text,
        CompletionItemKind.Method
      )
    );
    if (this.isInRange(ctx)) {
      this.positionRange.start = ctx.start.line;
      this.positionRange.end = ctx.stop?.line || this.position.line + 1;
    }
  }

  isInRange(context: MethodStmContext): boolean {
    const currentLine: number = this.position.line + 1;
    const startLine: number = context.start.line;
    const stopLine: number = context.stop?.line || currentLine;
    return startLine <= currentLine && currentLine <= stopLine;
  }

  isInPositionRange(context: ParserRuleContext): boolean {
    return (
      this.positionRange.start <= context.start.line &&
      this.positionRange.end >= (context.stop?.line || this.position.line + 1)
    );
  }
}