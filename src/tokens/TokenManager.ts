import { CompletionItem, Position, Range } from "vscode";
import { ModuleToken, MethodToken, PropertyToken, BaseToken } from "./Tokens";

export class TokenManager {
  public getModule(tokens: BaseToken[]): ModuleToken | undefined {
    const moduleToken = tokens.find((token) => {
      if (token.isClass() || token.isModule()) {
        return token;
      }
    });
    if (moduleToken instanceof ModuleToken) return moduleToken;
  }

  public getParent(
    tokens: BaseToken[],
    position: Position
  ): MethodToken | PropertyToken | undefined;
  public getParent(
    tokens: BaseToken[],
    range: Range
  ): MethodToken | PropertyToken | undefined;
  public getParent(
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

    for (const token of tokens) {
      if (token.isMe(label)) {
        find = token;
        break;
      }

      if (token.isLib()) {
        find = this.findByLabel(label, token.modules);
        if (find) break;
        find = this.getTokenByLabel(label, token.modules);
        if (find) break;
      } else if (token.isClass() || token.isModule()) {
        find = this.findByLabel(label, token.enums);
        if (find) break;
        find = this.getTokenByLabel(label, token.enums);
        if (find) break;

        find = this.findByLabel(label, token.types);
        if (find) break;
        find = this.getTokenByLabel(label, token.types);
        if (find) break;

        find = this.findByLabel(label, token.variables);
        if (find) break;
        find = this.getTokenByLabel(label, token.variables);
        if (find) break;

        find = this.findByLabel(label, token.properties);
        if (find) break;
        find = this.getTokenByLabel(label, token.properties);
        if (find) break;

        find = this.findByLabel(label, token.methods);
        if (find) break;
        find = this.getTokenByLabel(label, token.methods);
      } else if (token.isMethod() || token.isProperty()) {
        find = this.findByLabel(label, token.args);
        if (find) break;
        find = this.getTokenByLabel(label, token.args);
        if (find) break;

        find = this.findByLabel(label, token.variables);
        if (find) break;
        find = this.getTokenByLabel(label, token.variables);
        if (find) break;
      }
    }

    return find;
  }

  private findByLabel(label: string, tokens: BaseToken[]): BaseToken | null {
    let find: BaseToken | null = null;

    for (const token of tokens) {
      if (token.isMe(label)) {
        find = token;
        break;
      }
    }

    return find;
  }

  // TODO: добавить сортировку по релевантности (?)
  public tokensToCompletions(tokens: BaseToken[], output: CompletionItem[]) {
    tokens.map((token) => {
      if (output.find((completion) => completion.label == token.label)) return;

      if (token.isClass() && !token.predeclared) return;
      output.push(new CompletionItem(token.label, token.completion));
    });
  }

  public childrenToCompletions(
    tokens: BaseToken[],
    output: CompletionItem[],
    options?: { forcePredeclared: boolean }
  ) {
    tokens.map((token) => {
      if (token.isLib()) {
        this.addCompletionsFromChildrens(token.modules, output);
      } else if (
        (token.isModule() || token.isClass()) &&
        (token.predeclared || (options && options.forcePredeclared))
      ) {
        this.addCompletionsFromChildrens(token.enums, output);
        this.addCompletionsFromChildrens(token.types, output);
        this.addCompletionsFromChildrens(token.variables, output);
        this.addCompletionsFromChildrens(token.methods, output);
        this.addCompletionsFromChildrens(token.properties, output);
      } else if (token.isEnum()) {
        this.addCompletionsFromChildrens(token.members, output);
      } else if (token.isType()) {
        this.addCompletionsFromChildrens(token.members, output);
      }
    });
  }

  public childrenToCompletionsRecoursive(
    tokens: BaseToken[],
    output: CompletionItem[],
    position?: Position
  ) {
    tokens.map((token) => {
      if (token.isLib()) {
        this.addCompletionsFromChildrens(token.modules, output);
        this.childrenToCompletionsRecoursive(token.modules, output, position);
      } else if ((token.isModule() || token.isClass()) && token.predeclared) {
        this.addCompletionsFromChildrens(token.enums, output);
        this.childrenToCompletionsRecoursive(token.enums, output, position);

        this.addCompletionsFromChildrens(token.methods, output);

        this.childrenToCompletionsRecoursive(token.methods, output, position);
        this.addCompletionsFromChildrens(token.properties, output);
        this.childrenToCompletionsRecoursive(
          token.properties,
          output,
          position
        );

        // this.addCompletionsFromChildrens(token.types, output);
        this.addCompletionsFromChildrens(token.variables, output);
      } else if (token.isEnum()) {
        this.addCompletionsFromChildrens(token.members, output);
      } else if (
        position &&
        (token.isMethod() || token.isProperty()) &&
        token.intersectPosition(position)
      ) {
        this.addCompletionsFromChildrens(token.variables, output);
        this.addCompletionsFromChildrens(token.args, output);
      }
    });
  }

  private addCompletionsFromChildrens(
    childrens: BaseToken[],
    output: CompletionItem[]
  ) {
    childrens.forEach((child) => {
      if (output.find((token) => token.label == child.label)) return;
      if (child.isClass() && !child.predeclared) return;

      const item = new CompletionItem(child.label, child.completion);
      output.push(item);
    });
  }

  public setClauseTypeContextTokens(
    tokens: BaseToken[],
    output: CompletionItem[]
  ) {
    tokens.filter((token) => {
      if (token.isLib()) {
        this.setClauseTypeContextTokens(token.modules, output);
      } else if (token.isModule() || token.isClass()) {
        if (token.isClass() && !token.predeclared)
          output.push(new CompletionItem(token.label, token.completion));

        this.setClauseTypeContextTokens(token.enums, output);
        this.setClauseTypeContextTokens(token.types, output);
      } else if (token.isEnum() || token.isType()) {
        output.push(new CompletionItem(token.label, token.completion));
      } else if (
        token.isKeyword() &&
        token.keyword &&
        (token.keyword.context.includes("builtintype") ||
          token.keyword.context.includes("typeclause"))
      ) {
        output.push(new CompletionItem(token.label, token.completion));
      }
    });
  }

  setObjectTypeContextTokens(tokens: BaseToken[], output: CompletionItem[]) {
    tokens.filter((token) => {
      if (token.isLib()) {
        this.setObjectTypeContextTokens(token.modules, output);
      } else if (token.isClass()) {
        if (token.isClass() && !token.predeclared)
          output.push(new CompletionItem(token.label, token.completion));
      }
    });
  }
}
