import { CompletionItem, Position, Range } from "vscode";
import { ModuleToken, MethodToken, PropertyToken, BaseToken } from "./Tokens";

export class TokenManager {
  getModule(tokens: BaseToken[]): ModuleToken | undefined {
    const moduleToken = tokens.find((token) => {
      if (token.isClass() || token.isModule()) {
        return token;
      }
    });
    if (moduleToken instanceof ModuleToken) return moduleToken;
  }

  getParent(
    tokens: BaseToken[],
    position: Position
  ): MethodToken | PropertyToken | undefined;
  getParent(
    tokens: BaseToken[],
    range: Range
  ): MethodToken | PropertyToken | undefined;
  getParent(
    tokens: BaseToken[],
    positionOrRange: Position | Range
  ): MethodToken | PropertyToken | undefined {
    const parentToken = tokens.find((token) => {
      const condition: boolean =
        token.isInModuleContainer() &&
        (positionOrRange instanceof Position
          ? token.intersectPosition(positionOrRange)
          : token.intersectRange(positionOrRange));
      if (condition) {
        return token;
      }
    });

    if (
      parentToken instanceof MethodToken ||
      parentToken instanceof PropertyToken
    )
      return parentToken;
  }

  public getTokenByLabel(label: string, tokens: BaseToken[]): BaseToken | null {
    let find: BaseToken | null = null;

    console.log(tokens);

    for (const token of tokens) {
      if (token.isMe(label)) {
        find = token;
        break;
      }

      if (token.isLib()) {
        find = this.findInTokens(label, token.modules);
        if (find) break;
      } else if (token.isClass() || token.isModule()) {
        find = this.findInTokens(label, token.enums);
        if (find) break;

        find = this.findInTokens(label, token.types);
        if (find) break;

        find = this.findInTokens(label, token.variables);
        if (find) break;

        find = this.findInTokens(label, token.properties);
        if (find) break;

        find = this.findInTokens(label, token.methods);
        if (find) break;
      }
    }

    return find;
  }

  private findInTokens(label: string, tokens: BaseToken[]): BaseToken | null {
    let find: BaseToken | null = null;

    for (const token of tokens) {
      if (token.isMe(label)) {
        find = token;
        break;
      }
    }

    return find;
  }

  public childrenTokensToCompletions(tokens: BaseToken[]): CompletionItem[] {
    const completions: CompletionItem[] = [];

    tokens.map((token) => {
      if (token.isLib()) {
        this.addCompletionsFromChilder(token.modules, completions);
      } else if (token.isModule() || token.isClass()) {
        this.addCompletionsFromChilder(token.enums, completions);
        this.addCompletionsFromChilder(token.types, completions);
        this.addCompletionsFromChilder(token.variables, completions);
        this.addCompletionsFromChilder(token.methods, completions);
        this.addCompletionsFromChilder(token.properties, completions);
      } else if (token.isEnum()) {
        this.addCompletionsFromChilder(token.members, completions);
      }
    });

    return completions;
  }

  private addCompletionsFromChilder(
    childrens: BaseToken[],
    output: CompletionItem[]
  ) {
    childrens.forEach((child) => {
      if (!output.find((token) => token.label == child.label)) {
        output.push(new CompletionItem(child.label, child.completion));
      }
    });
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
