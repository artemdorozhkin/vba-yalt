import {
  languages,
  ExtensionContext,
  CompletionItem,
  CompletionItemKind,
} from "vscode";
import * as fs from "fs";
import VBACompletionProvider, {
  getDef as getDef,
} from "./providers/VBACompletionProvider";
import VBASymbolProvider from "./providers/VBASymbolProvider";
import path = require("path");

export function activate(context: ExtensionContext) {
  console.log("VBA IS WORKING");
  const def = getDef(context.extensionPath);
  const data = fs
    .readFileSync(path.join(context.extensionPath, "def", "keywords.json"))
    .toString();

  const keyCompletions: CompletionItem[] = [];
  const keywords = JSON.parse(data);
  for (const keyword in keywords) {
    keyCompletions.push(
      new CompletionItem(keyword, CompletionItemKind.Keyword)
    );
  }

  const completionsProvider = languages.registerCompletionItemProvider(
    { language: "vba", scheme: "file" }, // Паттерн для всех файлов
    new VBACompletionProvider(def.completions, def.tokens, keyCompletions),
    "." // Триггер символы, например, '.'
  );
  const symbolsProvider = languages.registerDocumentSymbolProvider(
    { language: "vba", scheme: "file" }, // Паттерн для всех файлов
    new VBASymbolProvider()
  );
  context.subscriptions.push(completionsProvider, symbolsProvider);
}
