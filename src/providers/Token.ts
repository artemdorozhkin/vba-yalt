import { CompletionItemKind, Position, Range, SymbolKind } from "vscode";

export default class Token {
  constructor(
    public readonly label: string,
    public readonly symbol: SymbolKind,
    public readonly completion: CompletionItemKind,
    public readonly range: Range,
    public readonly returnType?: string,
    public readonly childrens: Token[] = []
  ) {}

  intersectRange(range: Range): boolean {
    return (
      this.range.start.line <= range.start.line &&
      this.range.end.line >= range.end.line
    );
  }

  intersectPosition(position: Position): boolean {
    return (
      this.range.start.line <= position.line &&
      this.range.end.line >= position.line
    );
  }

  isModule(): boolean {
    return this.symbol == SymbolKind.Module;
  }

  isClass(): boolean {
    return this.symbol == SymbolKind.Class;
  }

  isContainer(): boolean {
    return (
      this.symbol == SymbolKind.Method ||
      this.symbol == SymbolKind.Function ||
      this.symbol == SymbolKind.Struct ||
      this.symbol == SymbolKind.Enum
    );
  }
}
