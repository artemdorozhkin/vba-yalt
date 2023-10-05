import { KeywordToken } from "../tokens/Tokens";
import { readFileSync } from "fs";

export class KeywordsBuilder {
  private readonly _keywords: KeywordToken[] = [];
  constructor(keywordsPath: string) {
    const data = readFileSync(keywordsPath);
    const json = JSON.parse(data.toString());

    for (const label in json) {
      const keyword = new KeywordToken(label);
      keyword.setKeyword(json[label]);
      this._keywords.push(keyword);
    }
  }

  public get keywords(): KeywordToken[] {
    return this._keywords;
  }
}
