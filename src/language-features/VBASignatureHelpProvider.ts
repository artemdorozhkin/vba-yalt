import {
  CancellationToken,
  CompletionItem,
  MarkdownString,
  ParameterInformation,
  Position,
  ProviderResult,
  SignatureHelp,
  SignatureHelpContext,
  SignatureHelpProvider,
  SignatureInformation,
  TextDocument,
} from "vscode";
import { getWordAtPosition } from "../common/utils";
import { TokenManager } from "../tokens/TokenManager";
import { BaseToken, LibToken, MethodToken } from "../tokens/Tokens";
import { basename, dirname } from "path";
import TokenParser from "../tokens/TokenParser";

export class VBASignatureHelpProvider implements SignatureHelpProvider {
  private tokens: BaseToken[] = [];

  constructor(
    private readonly def: {
      completions: CompletionItem[];
      tokens: BaseToken[];
    }
  ) {}

  provideSignatureHelp(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: SignatureHelpContext
  ): ProviderResult<SignatureHelp> {
    this.parseTokens(document, position);
    const word = getWordAtPosition(document, position, -1);

    if (!word) return;

    const tokenManager = new TokenManager();
    const currentToken = tokenManager.getTokenByLabel(
      word,
      this.tokens
    ) as MethodToken;
    if (!currentToken) return;

    const signature = new SignatureInformation(
      `${currentToken.label} ${currentToken.argsToString()}`
    );
    for (const arg of currentToken.args) {
      const parameter = new ParameterInformation(arg.label);

      signature.parameters.push(parameter);
    }

    const signatureHelp = new SignatureHelp();
    signatureHelp.signatures.push(signature);
    signatureHelp.activeParameter = 0;
    signatureHelp.activeSignature = 0;

    return signatureHelp;
  }

  parseTokens(document: TextDocument, position: Position) {
    const text = document.getText();
    const lib = new LibToken(basename(dirname(document.fileName)));
    const treeParser = new TokenParser(text, document.fileName, true, position);

    this.tokens = [];
    lib.addModule(treeParser.tokens);
    this.tokens.push(lib, ...this.def.tokens);
  }
}
