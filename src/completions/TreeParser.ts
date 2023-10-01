import {
  VisualBasic6Lexer,
  VisualBasic6Parser,
  VisualBasic6Listener,
  StartRuleContext,
} from "vb6-antlr4";
import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeWalker } from "antlr4ts/tree";
import MethodsListener from "./MethodsListener";
import { CompletionItem, CompletionItemKind, Position } from "vscode";

export default class TreeParser {
  private readonly lexer: VisualBasic6Lexer;
  private readonly parser: VisualBasic6Parser;
  private readonly tree: StartRuleContext;
  private readonly listener: VisualBasic6Listener;

  private readonly funcNames: CompletionItem[] = [];
  private readonly contextNames: CompletionItem[] = [];

  constructor(code: string, position?: Position) {
    this.lexer = new VisualBasic6Lexer(CharStreams.fromString(code));
    this.parser = new VisualBasic6Parser(new CommonTokenStream(this.lexer));
    this.tree = this.parser.startRule();
    this.listener = new MethodsListener(
      this.funcNames,
      this.contextNames,
      position
    );
    ParseTreeWalker.DEFAULT.walk(this.listener, this.tree);
  }

  public getCompletions(): CompletionItem[] {
    const completions: CompletionItem[] = [];
    completions.push(...this.funcNames);
    completions.push(...this.contextNames);

    return completions;
  }
}
