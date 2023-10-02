import { DocumentSymbol } from "vscode";
import { BaseToken } from "../tokens/Tokens";

export class SymbolManager {
  public getSymbolsFromTokens(tokens: BaseToken[], output: DocumentSymbol[]) {
    tokens.forEach((token) => {
      if (token.isLib()) {
        this.getSymbolsFromTokens(token.modules, output);
      } else if (token.isModule() || token.isClass()) {
        this.getSymbolsFromTokens(token.types, output);
        this.getSymbolsFromTokens(token.enums, output);
        this.getSymbolsFromTokens(token.methods, output);
        this.getSymbolsFromTokens(token.properties, output);
        const variables = token.variables.map(this.buildSymbol);
        output.push(...variables);
      } else if (token.isType()) {
        const typeParent = this.buildSymbol(token);
        const fields = token.members.map(this.buildSymbol);
        typeParent.children.push(...fields);
        output.push(typeParent);
      } else if (token.isEnum()) {
        const enumParent = this.buildSymbol(token);
        const members = token.members.map(this.buildSymbol);
        enumParent.children.push(...members);
        output.push(enumParent);
      } else if (token.isMethod()) {
        const methodParent = this.buildSymbol(token);
        const variables = token.variables.map(this.buildSymbol);
        methodParent.children.push(...variables);
        output.push(methodParent);
      } else if (token.isProperty()) {
        const propParent = this.buildSymbol(token);
        const variables = token.variables.map(this.buildSymbol);
        propParent.children.push(...variables);
        output.push(propParent);
      }
    });
  }

  private buildSymbol(token: BaseToken): DocumentSymbol {
    let label: string = token.label;
    if (token.isProperty()) {
      label = `(${token.accessor}) ${token.label}`;
    }
    return new DocumentSymbol(
      label,
      "",
      token.symbol,
      token.range,
      token.range
    );
  }
}
