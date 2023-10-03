import {
  languages,
  ExtensionContext,
  CompletionItem,
  CompletionItemKind,
  DocumentSelector,
  Position,
  commands,
  window,
} from "vscode";
import VBACompletionProvider, {
  getDef as getDef,
  getKeywords,
} from "./language-features/VBACompletionProvider";
import VBASymbolProvider from "./language-features/VBASymbolProvider";
import path = require("path");
import { VBAHoverProvider } from "./language-features/VBAHoverProvider";

export function activate(context: ExtensionContext) {
  console.log("VBA IS WORKING");
  const vbaScheme: DocumentSelector = { language: "vba", scheme: "file" };

  console.log("def loading");
  const def = getDef(context.extensionPath);
  console.log("def loading: ok");
  console.log("keywords loading");
  const keywords = getKeywords(context.extensionPath);
  console.log("keywords loading: ok");

  console.log("completions registration");
  const completionsProvider = languages.registerCompletionItemProvider(
    vbaScheme,
    new VBACompletionProvider(def, keywords),
    "."
  );
  console.log("completions registration: ok");

  console.log("symbols registration");
  const symbolsProvider = languages.registerDocumentSymbolProvider(
    vbaScheme,
    new VBASymbolProvider()
  );
  console.log("symbols registration: ok");

  console.log("hovers registration");
  const hoversProvider = languages.registerHoverProvider(
    vbaScheme,
    new VBAHoverProvider(def)
  );
  console.log("hovers registration: ok");

  context.subscriptions.push(
    completionsProvider,
    symbolsProvider,
    hoversProvider
  );
}
