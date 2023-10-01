import { languages, ExtensionContext } from "vscode";
import VBACompletionProvider, {
  getDefCompletions,
} from "./completions/provideCompletions";

export function activate(context: ExtensionContext) {
  console.log("VBA IS WORKING");
  const defCompletions = getDefCompletions(context.extensionPath);

  const completionsProvider = languages.registerCompletionItemProvider(
    { pattern: "**/*" }, // Паттерн для всех файлов
    new VBACompletionProvider(defCompletions),
    "." // Триггер символы, например, '.'
  );
  context.subscriptions.push(completionsProvider);
}
