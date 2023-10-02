import {
  CancellationToken,
  DocumentSymbol,
  DocumentSymbolProvider,
  ProviderResult,
  SymbolInformation,
  TextDocument,
} from "vscode";
import { basename, extname } from "path";
import { SymbolManager } from "./SymbolManager";
import TokenParser from "../tokens/TokenParser";
import { BaseToken } from "../tokens/Tokens";

export default class VBASymbolProvider implements DocumentSymbolProvider {
  private symbols: DocumentSymbol[] = [];
  private tokens: BaseToken[] = [];

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
    const symbolsManager = new SymbolManager();
    symbolsManager.getSymbolsFromTokens(this.tokens, this.symbols);

    return this.symbols;
  }
}
