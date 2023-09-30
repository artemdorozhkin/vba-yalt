Enum XlCreator
    xlCreatorCode = 1480803660
End Enum

Enum XlReferenceStyle
    xlA1 = 1
    xlR1C1 = -4150
End Enum

Enum XlPasteType
    xlPateAll = -4104
    xlPasteAllExceptBorders = 7
    xlPasteAllMergingConditionalFormats = 14
    xlPasteAllUsingSourceTheme = 13
    xlPasteColumnWidths = 8
    xlPasteComments = -4144
    xlPasteFormats = -4122
    xlPasteFormulas = -4123
    xlPasteFormulasAndNumberFormats = 11
    xlPasteValidation = 6
    xlPasteValues = -4163
    xlPasteValuesAndNumberFormats = 12
End Enum

Property Get ActiveCell() As Range
End Property

Property Get ActiveChart() As Chart
End Property

Property Get ActivePrinter() As String
End Property
Property Let ActivePrinter() As String
End Property

Property Get ActiveSheet() As Object
End Property

Property Get ActiveWindow() As Window
End Property

Property Get ActiveWorkbook() As Workbook
End Property

Property Get AddIns() As AddIns
End Property

Property Get Application() As Application
End Property

Property Get Cells() As Range
End Property

Property Get Charts() As Sheets
End Property

Property Get Columns() As Range
End Property

Property Get CommandBars() As CommandBars
End Property

Property Get Creator() As XlCreator
End Property

Property Get DDEAppReturnCode() As Long
End Property

Property Get Excel4IntlMacroSheets() As Sheets
End Property

Property Get Excel4MacroSheets() As Sheets
End Property

Property Get Names() As Names
End Property

Property Get Parent() As Application
End Property

Property Get Range(Cell1, Optional Cell2) As Range
End Property

Property Get Rows() As Range
End Property

Property Get Selection() As Object
End Property

Property Get Sheets() As Sheets
End Property

Property Get ThisWorkbook() As Workbook
End Property

Property Get Windows() As Windows
End Property

Property Get Workbooks() As Workbooks
End Property

Property Get WorksheetFunction() As WorksheetFunction
End Property

Property Get Worksheets() As Sheets
End Property

Sub Calculate()
End Sub

Sub DDEExecute(Channel As Long, String As String)
End Sub

Function DDEInitiate(App As String, Topic As String) As Long
End Function

Sub DDEPoke(Channel As Long, Item, Data)
End Sub

Function DDERequest(Channel As Long, Item As String)
End Function

Sub DDETerminate(Channel As Long)
End Sub

Function Evaluate(Name)
End Function

Function ExecuteExcel4Macro(String As String)
End Function

Function Intersect(Arg1 As Range, Arg2 As Range, Optional Arg3, Optional Arg4, Optional Arg5, Optional Arg6, Optional Arg7, Optional Arg8, Optional Arg9, Optional Arg10, Optional Arg11, Optional Arg12, Optional Arg13, Optional Arg14, Optional Arg15, Optional Arg16, Optional Arg17, Optional Arg18, Optional Arg19, Optional Arg20, Optional Arg21, Optional Arg22, Optional Arg23, Optional Arg24, Optional Arg25, Optional Arg26, Optional Arg27, Optional Arg28, Optional Arg29, Optional Arg30) As Range
End Function

Function Run(Optional Macro, Optional Arg1, Optional Arg2, Optional Arg3, Optional Arg4, Optional Arg5, Optional Arg6, Optional Arg7, Optional Arg8, Optional Arg9, Optional Arg10, Optional Arg11, Optional Arg12, Optional Arg13, Optional Arg14, Optional Arg15, Optional Arg16, Optional Arg17, Optional Arg18, Optional Arg19, Optional Arg20, Optional Arg21, Optional Arg22, Optional Arg23, Optional Arg24, Optional Arg25, Optional Arg26, Optional Arg27, Optional Arg28, Optional Arg29, Optional Arg30)
End Function

Sub SendKeys(Keys, Optional Wait)
End Sub

Function Union(Arg1 As Range, Arg2 As Range, Optional Arg3, Optional Arg4, Optional Arg5, Optional Arg6, Optional Arg7, Optional Arg8, Optional Arg9, Optional Arg10, Optional Arg11, Optional Arg12, Optional Arg13, Optional Arg14, Optional Arg15, Optional Arg16, Optional Arg17, Optional Arg18, Optional Arg19, Optional Arg20, Optional Arg21, Optional Arg22, Optional Arg23, Optional Arg24, Optional Arg25, Optional Arg26, Optional Arg27, Optional Arg28, Optional Arg29, Optional Arg30) As Range
End Function