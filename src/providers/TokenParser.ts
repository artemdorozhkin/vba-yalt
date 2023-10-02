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
import { BaseToken, LibToken, ModuleToken } from "./Tokens";
import { basename, extname } from "path";

export default class TokenParser {
  private readonly lexer: VisualBasic6Lexer;
  private readonly parser: VisualBasic6Parser;
  private readonly tree: StartRuleContext;
  private readonly builder: VisualBasic6Listener;

  private _tokens: BaseToken[] = [];

  constructor(
    private readonly code: string,
    filePath: string,
    private readonly position?: Position
  ) {
    this.lexer = new VisualBasic6Lexer(CharStreams.fromString(this.code));
    this.parser = new VisualBasic6Parser(new CommonTokenStream(this.lexer));
    this.tree = this.parser.startRule();

    const module = this.buildModule(filePath);
    this._tokens.push(module);

    this.builder = new TokenBuilder(this._tokens, position);
    ParseTreeWalker.DEFAULT.walk(this.builder, this.tree);
  }

  public get tokens(): BaseToken[] {
    return this._tokens;
  }

  private buildModule(filePath: string): ModuleToken {
    const moduleType = extname(filePath);
    const moduleName = basename(filePath, moduleType);
    const module = new ModuleToken(moduleName);
    module.parseType(moduleType);

    return module;
  }

  // TODO: убрать методы в отдельный класс
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
}
