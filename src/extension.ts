import * as vscode from "vscode";
import { provider } from "./completions/provideCompletions";

export function activate(context: vscode.ExtensionContext) {
  console.log("VBA IS WORKING");
  context.subscriptions.push(provider);
}
