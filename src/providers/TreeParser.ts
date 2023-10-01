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
  DocumentSymbol,
  Position,
  SymbolKind,
} from "vscode";
import Token from "./Token";

export default class TreeParser {
  private readonly lexer: VisualBasic6Lexer;
  private readonly parser: VisualBasic6Parser;
  private readonly tree: StartRuleContext;
  private readonly listener: VisualBasic6Listener;

  private tokens: Token[] = [];

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

  public getSymbolsFromTokens(tokens: Token[]): DocumentSymbol[] {
    const symbols: DocumentSymbol[] = [];

    tokens.forEach((token) => {
      const parent = new DocumentSymbol(
        token.label,
        "",
        token.symbol,
        token.range,
        token.range
      );
      for (const child of token.childrens) {
        parent.children.push(
          new DocumentSymbol(
            child.label,
            "",
            child.symbol,
            child.range,
            child.range
          )
        );
        if (child.childrens.length > 0) {
          for (const child of token.childrens) {
            symbols.push(
              new DocumentSymbol(
                child.label,
                "",
                child.symbol,
                child.range,
                child.range
              )
            );
          }
        }
      }

      symbols.push(parent);
    });

    return symbols;
  }

  public getCompletions(): CompletionItem[] {
    return this.tokensToCompletions(this.tokens, this.position);
  }

  public childrenTokensToCompletions(parent: Token): CompletionItem[] {
    const completions: CompletionItem[] = [];

    parent.childrens.map((token) => {
      if (completions.find((completion) => completion.label == token.label))
        return;

      completions.push(new CompletionItem(token.label, token.completion));
    });

    return completions;
  }

  public tokensToCompletions(
    tokens: Token[],
    position?: Position
  ): CompletionItem[] {
    const completions: CompletionItem[] = [];

    tokens.map((token) => {
      if (completions.find((completion) => completion.label == token.label))
        return;

      completions.push(new CompletionItem(token.label, token.completion));
      if ((position && token.intersectPosition(position)) || token.isModule()) {
        for (const child of token.childrens) {
          completions.push(new CompletionItem(child.label, child.completion));
        }
      }
    });

    return completions;
  }
}
