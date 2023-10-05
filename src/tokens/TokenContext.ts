import { Position, Range, TextDocument } from "vscode";

export enum TokenContextKind {
  NonContext = -1, // ...
  ClauseTypeContext, // TypeMemberContext & new
  ObjectTypeContext, // TypeMemberContext & new
  ChildrensContext,
  ClassContext, // all fields & methods + me.publicMethods|fields
}

export class TokenContext {
  private readonly triggers: string[] = [];
  constructor(
    private readonly document: TextDocument,
    private readonly position: Position
  ) {
    this.triggers.push(...["as", "new"]);
  }

  public getContext(): TokenContextKind {
    if (this.prevCharIsDot()) return TokenContextKind.ChildrensContext;

    const lastChar = this.getLastNonWhitespaceCharNum();
    if (lastChar == 0) return TokenContextKind.NonContext;
    const firstChar = this.getFirstNonWhitespaceCharNum(lastChar);

    const word = this.getWord(firstChar, lastChar);
    let context: TokenContextKind = -1;
    for (let i = 0; i < this.triggers.length; i++) {
      if (this.triggers[i] == word.toLowerCase()) {
        context = i;
        break;
      }
    }

    return context;
  }

  getWord(firstChar: number, lastChar: number) {
    return this.document.getText(
      new Range(
        new Position(this.position.line, firstChar),
        new Position(this.position.line, lastChar)
      )
    );
  }

  prevCharIsDot(): boolean {
    if (this.position.character == 0) return false;

    return (
      this.document.getText(
        new Range(
          this.position.line,
          this.position.character - 1,
          this.position.line,
          this.position.character
        )
      ) == "."
    );
  }

  getFirstNonWhitespaceCharNum(lastChar: number) {
    const line = this.document.lineAt(this.position.line);
    let charNum = 0;

    let i = lastChar;
    let nextChar;
    do {
      charNum = i;
      i--;
      if (i == 0) break;

      nextChar = line.text[i];
    } while (!/\s/.test(nextChar));

    return charNum;
  }

  getLastNonWhitespaceCharNum(): number {
    const line = this.document.lineAt(this.position.line);
    let charNum = 0;
    let wsNum = 0;

    for (let i = this.position.character; i > 0; i--) {
      const char = line.text[i];
      const isChar = /[a-zа-яё]/i.test(char);
      if (/\s/.test(char)) wsNum = i;
      if (isChar && wsNum == 0) {
        let nextChar;
        do {
          i--;
          if (i == 0) break;

          nextChar = line.text[i];
        } while (!/\s/.test(nextChar));
        wsNum = i;
      }

      if (isChar) {
        charNum = i;
        break;
      }
    }

    return charNum;
  }
}
