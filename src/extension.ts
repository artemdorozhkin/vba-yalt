import { languages, ExtensionContext } from "vscode";
import VBACompletionProvider, {
  getDefCompletions,
} from "./completions/VBACompletionProvider";

export function activate(context: ExtensionContext) {
  console.log("VBA IS WORKING");
  const def = getDefCompletions(context.extensionPath);

  const completionsProvider = languages.registerCompletionItemProvider(
    { language: "vba", scheme: "file" }, // Паттерн для всех файлов
    new VBACompletionProvider(def.completions, def.tokens),
    "." // Триггер символы, например, '.'
  );
  context.subscriptions.push(completionsProvider);
}
