//   let disposable = commands.registerCommand("VBA.autoEndSub", () => {
//     const editor = window.activeTextEditor;

//     if (editor) {
//       const document = editor.document;
//       const line = editor.selection.active.line;
//       console.log(document.lineAt(line).text);

//       if (line > 0 && /\bpublic\s+sub\b/i.test(document.lineAt(line).text)) {
//         // Вставьте "End Sub" после "Public Sub"
//         editor.edit((editBuilder) => {
//           const newPosition = new Position(line, 0);
//           editBuilder.insert(newPosition, "\nEnd Sub");
//         });
//       }
//     }
//   });

// "keybindings": [
//     {
//       "command": "VBA.autoEndSub",
//       "key": "space",
//       "when": "editorTextFocus && editorLangId == 'vba'"
//     }
//   ],

// ,
//     "onEnterRules": [
//       {
//         "beforeText": "Public Sub",
//         "action": {
//             "indent": "none",
//           "indentAction": "insert",
//           "appendText": "End Sub"
//         }
//       }
//     ]
