import {
  VisualBasic6Lexer,
  VisualBasic6Parser,
  VisualBasic6Listener,
  StartRuleContext,
} from "vb6-antlr4";
import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeWalker } from "antlr4ts/tree";
import TokenBuilder from "./TokenBuilder";
import {
  CompletionItem,
  CompletionItemKind,
  DocumentSymbol,
  Position,
  Range,
  SymbolKind,
} from "vscode";
import { BaseToken, ModuleToken } from "./Token";

export default class TreeParser {
  private readonly lexer: VisualBasic6Lexer;
  private readonly parser: VisualBasic6Parser;
  private readonly tree: StartRuleContext;
  private readonly builder: VisualBasic6Listener;

  private _tokens: BaseToken[] = [];

  constructor(
    private readonly code: string,
    private readonly moduleName: string,
    private readonly position?: Position
  ) {
    this.lexer = new VisualBasic6Lexer(CharStreams.fromString(this.code));
    this.parser = new VisualBasic6Parser(new CommonTokenStream(this.lexer));
    this.tree = this.parser.startRule();
    this._tokens.push(new ModuleToken(this.moduleName, new Range(0, 0, 0, 0)));
    this.builder = new TokenBuilder(this._tokens, position);
    ParseTreeWalker.DEFAULT.walk(this.builder, this.tree);
  }

  public get tokens(): BaseToken[] {
    return this._tokens;
  }

  private buildSymbol(token: BaseToken): DocumentSymbol {
    return new DocumentSymbol(
      token.label,
      "",
      token.symbol,
      token.range,
      token.range
    );
  }

  public getSymbolsFromTokens(tokens: BaseToken[]): DocumentSymbol[] {
    const symbols: DocumentSymbol[] = [];

    tokens.forEach((token) => {
      if (token.isModule() || token.isClass()) {
        const parent = this.buildSymbol(token);
        const variables = token.variables.map(this.buildSymbol);
        const methods = token.methods.map(this.buildSymbol);
        const properties = token.properties.map(this.buildSymbol);
        parent.children = variables;
        parent.children = methods;
        parent.children = properties;

        symbols.push(parent);
      }
    });

    return symbols;
  }

  public getCompletions(): CompletionItem[] {
    return this.tokensToCompletions(this._tokens, this.position);
  }

  public childrenTokensToCompletions(childrens: BaseToken[]): CompletionItem[] {
    const completions: CompletionItem[] = [];

    childrens.map((token) => {
      if (completions.find((completion) => completion.label == token.label))
        return;

      completions.push(new CompletionItem(token.label, token.completion));
    });

    return completions;
  }

  public tokensToCompletions(
    tokens: BaseToken[],
    position?: Position
  ): CompletionItem[] {
    const completions: CompletionItem[] = [];

    tokens.map((token) => {
      if (completions.find((completion) => completion.label == token.label))
        return;

      completions.push(new CompletionItem(token.label, token.completion));
    });

    return completions;
  }
}
