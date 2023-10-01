import { languages, ExtensionContext } from "vscode";
import VBACompletionProvider from "./completions/provideCompletions";

export function activate(context: ExtensionContext) {
  console.log("VBA IS WORKING");

  const completionsProvider = languages.registerCompletionItemProvider(
    { pattern: "**/*" }, // Паттерн для всех файлов
    new VBACompletionProvider(context.extensionPath),
    "." // Триггер символы, например, '.'
  );
  context.subscriptions.push(completionsProvider);
}
