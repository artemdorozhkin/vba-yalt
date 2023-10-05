import { TextDocument, Position } from "vscode";

export function getWordAtPosition(
  document: TextDocument,
  position: Position,
  offset: number = 0
): string | null {
  const totalPosition = new Position(
    position.line,
    position.character + offset
  );
  const wordRange = document.getWordRangeAtPosition(totalPosition);
  if (wordRange) {
    const word = document.getText(wordRange);
    return word;
  }
  return null;
}
