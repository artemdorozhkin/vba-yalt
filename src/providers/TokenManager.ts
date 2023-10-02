import { Position, Range } from "vscode";
import { ModuleToken, MethodToken, PropertyToken, BaseToken } from "./Token";

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
}
