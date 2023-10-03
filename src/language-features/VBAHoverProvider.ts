import {
  CancellationToken,
  Hover,
  HoverProvider,
  MarkdownString,
  Position,
  ProviderResult,
  TextDocument,
} from "vscode";
import { BaseToken, LibToken } from "../tokens/Tokens";
import { TokenManager } from "../tokens/TokenManager";
import { basename, dirname } from "path";
import TokenParser from "../tokens/TokenParser";

export class VBAHoverProvider implements HoverProvider {
  private readonly tokenManager: TokenManager = new TokenManager();
  private tokens: BaseToken[] = [];

  constructor(private readonly def: { tokens: BaseToken[] }) {}

  provideHover(
    document: TextDocument,
    position: Position,
    token: CancellationToken
  ): ProviderResult<Hover> {
    this.parseTokens(document, position);

    const range = document.getWordRangeAtPosition(position);
    if (!range) return;

    const word = document.getText(range);
    if (!word) return;

    const hovered = this.tokenManager.getTokenByLabel(word, this.tokens);

    if (!hovered) return;

    const markdown = this.buildMarkdown(hovered);
    if (markdown) return new Hover(markdown, range);
  }
  parseTokens(document: TextDocument, position: Position) {
    const text = document.getText();
    const lib = new LibToken(basename(dirname(document.fileName)));
    const treeParser = new TokenParser(text, document.fileName, position);

    this.tokens = [];
    lib.addModule(treeParser.tokens);
    this.tokens.push(lib, ...this.def.tokens);
  }
  buildMarkdown(token: BaseToken) {
    if (token.isLib()) {
      return new MarkdownString(`Lib ${token.label}`);
    }

    if (token.isModule()) {
      return new MarkdownString(`Module ${token.label}`);
    }

    if (token.isClass()) {
      return new MarkdownString(`Class ${token.label}`);
    }

    if (token.isConstants()) {
      return new MarkdownString(
        `\`\`\`vba\nConst ${token.label}${
          token.returnType ? " As " + token.returnType : ""
        }\n\`\`\``
      );
    }

    if (token.isVariable()) {
      return new MarkdownString(
        `\`\`\`vba\nDim ${
          token.label + (token.returnType ? " As " + token.returnType : "")
        }\n\`\`\``
      );
    }

    if (token.isEnum()) {
      return new MarkdownString(
        `\`\`\`vba\nEnum ${token.label}\n${token.members
          .map((member) => "\t" + member.label)
          .join("\n")}\nEnd Enum\n\`\`\``
      );
    }

    if (token.isType()) {
      return new MarkdownString(
        `\`\`\`vba\nType ${token.label}\n${token.members
          .map(
            (member) =>
              "\t" +
              member.label +
              (member.returnType ? " As " + member.returnType : "")
          )
          .join("\n")}\nEnd Type\n\`\`\``
      );
    }

    if (token.isMethod()) {
      return new MarkdownString(
        `\`\`\`vba\nFunction ${token.label}(${token.args
          .map(
            (arg) => arg.label + (arg.returnType ? " As " + arg.returnType : "")
          )
          .join(", ")})${
          token.returnType ? " As " + token.returnType : ""
        }\n\`\`\``
      );
    }

    if (token.isProperty()) {
      return new MarkdownString(
        `\`\`\`vba\nProperty ${token.accessor} ${token.label}(${token.args
          .map(
            (arg) => arg.label + (arg.returnType ? " As " + arg.returnType : "")
          )
          .join(", ")})${
          token.returnType ? " As " + token.returnType : ""
        }\n\`\`\``
      );
    }
  }
}
