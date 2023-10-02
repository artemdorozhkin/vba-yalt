import {
  CancellationToken,
  DocumentSymbol,
  DocumentSymbolProvider,
  ProviderResult,
  SymbolInformation,
  TextDocument,
} from "vscode";
import TreeParser from "./TreeParser";
import Token from "./Token";

export default class VBASymbolProvider implements DocumentSymbolProvider {
  private symbols: DocumentSymbol[] = [];
  private tokens: Token[] = [];

  provideDocumentSymbols(
    document: TextDocument,
    token: CancellationToken
  ): ProviderResult<SymbolInformation[] | DocumentSymbol[]> {
    const text = document.getText();
    const treeParser = new TreeParser(text);

    this.tokens = [];

    this.tokens.push(...treeParser.parsedTokens);

    this.symbols = [];
    this.symbols.push(...treeParser.getSymbolsFromTokens(this.tokens));

    return this.symbols;
  }
}
