import {
  VisualBasic6Lexer,
  VisualBasic6Parser,
  VisualBasic6Listener,
  StartRuleContext,
} from "vb6-antlr4";
import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeWalker } from "antlr4ts/tree";
import MethodsListener from "./MethodsListener";
import {
  CompletionItem,
  CompletionItemKind,
  Position,
  SymbolKind,
} from "vscode";
import Token from "./Token";

export default class TreeParser {
  private readonly lexer: VisualBasic6Lexer;
  private readonly parser: VisualBasic6Parser;
  private readonly tree: StartRuleContext;
  private readonly listener: VisualBasic6Listener;

  private readonly tokens: Token[] = [];

  constructor(
    private readonly code: string,
    private readonly position?: Position
  ) {
    this.lexer = new VisualBasic6Lexer(CharStreams.fromString(this.code));
    this.parser = new VisualBasic6Parser(new CommonTokenStream(this.lexer));
    this.tree = this.parser.startRule();
    this.listener = new MethodsListener(this.tokens);
    ParseTreeWalker.DEFAULT.walk(this.listener, this.tree);
  }

  public get parsedTokens(): Token[] {
    return this.tokens;
  }

  public getCompletions(): CompletionItem[] {
    return this.tokensToCompletions(this.tokens, this.position);
  }

  public tokensToCompletions(
    tokens: Token[],
    position?: Position
  ): CompletionItem[] {
    const completions: CompletionItem[] = [];

    tokens.map((token) => {
      completions.push(new CompletionItem(token.label, token.completion));
      if (position && token.intersectPosition(position)) {
        for (const child of token.childrens) {
          completions.push(new CompletionItem(child.label, child.completion));
        }
      }
    });

    return completions;
  }
}
