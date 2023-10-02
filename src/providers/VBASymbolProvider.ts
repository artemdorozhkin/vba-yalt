import {
  CancellationToken,
  DocumentSymbol,
  DocumentSymbolProvider,
  ProviderResult,
  SymbolInformation,
  TextDocument,
} from "vscode";
import TokenParser from "./TokenParser";
import { BaseToken } from "./Tokens";
import { basename, extname } from "path";

export default class VBASymbolProvider implements DocumentSymbolProvider {
  private symbols: DocumentSymbol[] = [];
  private tokens: BaseToken[] = [];

  //TODO: провайдит только проперти
  provideDocumentSymbols(
    document: TextDocument,
    token: CancellationToken
  ): ProviderResult<SymbolInformation[] | DocumentSymbol[]> {
    const text = document.getText();
    const treeParser = new TokenParser(
      text,
      basename(document.fileName, extname(document.fileName))
    );

    this.tokens = [];

    this.tokens.push(...treeParser.tokens);

    this.symbols = [];
    this.symbols.push(...treeParser.getSymbolsFromTokens(this.tokens));

    return this.symbols;
  }
}
