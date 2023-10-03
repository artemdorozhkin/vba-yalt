VERSION 1.0 CLASS
BEGIN
MultiUse = -1  'True
END
Attribute VB_Name = "Worksheet"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = False

Property Get Application() As Application
End Property

Property Get AutoFilter() As AutoFilter
End Property

Property Get AutoFilterMode() As Boolean
End Property
Property Let AutoFilterMode()
End Property

Property Get Cells() As Range
End Property

Property Get CircularReference() As Range
End Property

Property Get CodeName() As String
End Property

Property Get Columns() As Range
End Property

Property Get Comments() As Comments
End Property

Property Get ConsolidationFunction() As XlConsolidationFunction
End Property
Property Get ConsolidationOptions() As Variant
End Property

Property Get ConsolidationSources() As Variant
End Property

Property Get Creator() As XlCreator
End Property

Property Get CustomProperties() As CustomProperties
End Property

Property Get DisplayPageBreaks() As Boolean
End Property
Property Let DisplayPageBreaks()
End Property

Property Get DisplayRightToLeft() As Boolean
End Property
Property Let DisplayRightToLeft()
End Property

Property Get EnableAutoFilter() As Boolean
End Property
Property Let EnableAutoFilter()
End Property

Property Get EnableCalculation() As Boolean
End Property
Property Let EnableCalculation()
End Property

Property Get EnableFormatConditionsCalculation() As Boolean
End Property
Property Let EnableFormatConditionsCalculation()
End Property

Property Get EnableOutlining() As Boolean
End Property
Property Let EnableOutlining()
End Property

Property Get EnablePivotTable() As Boolean
End Property
Property Let EnablePivotTable()
End Property

Property Get EnableSelection() As XlEnableSelection
End Property
Property Let EnableSelection()
End Property

Property Get FilterMode() As Boolean
End Property

Property Get HPageBreaks() As HPageBreaks
End Property

Property Get Hyperlinks() As Hyperlinks
End Property

Property Get Index() As Long
End Property

Property Get ListObjects() As ListObjects
End Property

Property Get MailEnvelope() As MsoEnvelope
End Property

Property Get Name() As String
End Property
Property Let Name()
End Property

Property Get Names() As Names
End Property

Property Get Next() As Object
End Property

Property Get Outline() As Outline
End Property

Property Get PageSetup() As PageSetup
End Property

Property Get Parent() As Object
End Property

Property Get Previous() As Object
End Property

Property Get PrintedCommentPages() As Long
End Property

Property Get ProtectContents() As Boolean
End Property

Property Get ProtectDrawingObjects() As Boolean
End Property

Property Get Protection() As Protection
End Property

Property Get ProtectionMode() As Boolean
End Property

Property Get ProtectScenarios() As Boolean
End Property

Property Get QueryTables() As QueryTables
End Property

Property Get Range(Cell1, Optional Cell2) As Range
End Property

Property Get Rows() As Range
End Property

Property Get ScrollArea() As String
End Property
Property Let ScrollArea()
End Property

Property Get Shapes() As Shapes
End Property

Property Get Sort() As Sort
End Property

Property Get StandardHeight() As Double
End Property

Property Get StandardWidth() As Double
End Property
Property Let StandardWidth()
End Property

Property Get Tab() As Tab
End Property

Property Get TransitionExpEval() As Boolean
End Property
Property Let TransitionExpEval()
End Property

Property Get TransitionFormEntry() As Boolean
End Property
Property Let TransitionFormEntry()
End Property

Property Get Type() As XlSheetType
End Property

Property Get UsedRange() As Range
End Property

Property Get Visible() As XlSheetVisibility
End Property
Property Let Visible()
End Property

Property Get VPageBreaks() As VPageBreaks
End Property

Sub Activate()
End Sub

Sub Calculate()
End Sub

Function ChartObjects(Optional Index) As Object
End Function

Sub CheckSpelling(Optional CustomDictionary, Optional IgnoreUppercase, Optional AlwaysSuggest, Optional SpellLang)
End Sub

Sub CircleInvalid()
End Sub

Sub ClearArrows()
End Sub

Sub ClearCircles()
End Sub

Sub Copy(Optional Before, Optional After)
End Sub

Sub Delete()
End Sub

Function Evaluate(Name)
End Function

Sub ExportAsFixedFormat(Type As XlFixedFormatType, Optional Filename, Optional Quality, Optional IncludeDocProperties, Optional IgnorePrintAreas, Optional From, Optional To, Optional OpenAfterPublish, Optional FixedFormatExtClassPtr)
End Sub

Sub Move(Optional Before, Optional After)
End Sub

Function OLEObjects(Optional Index) As Object
End Function

Sub Paste(Optional Destination, Optional Link)
End Sub

Sub PasteSpecial(Optional Format, Optional Link, Optional DisplayAsIcon, Optional IconFileName, Optional IconIndex, Optional IconLabel, Optional NoHTMLFormatting)
End Sub

Function PivotTables(Optional Index) As Object
End Function

Function PivotTableWizard(Optional SourceType, Optional SourceData, Optional TableDestination, Optional TableName, Optional RowGrand, Optional ColumnGrand, Optional SaveData, Optional HasAutoFormat, Optional AutoPage, Optional Reserved, Optional BackgroundQuery, Optional OptimizeCache, Optional PageFieldOrder, Optional PageFieldWrapCount, Optional ReadData, Optional Connection) As PivotTable
End Function

Sub PrintOut(Optional From, Optional To, Optional Copies, Optional Preview, Optional ActivePrinter, Optional PrintToFile, Optional Collate, Optional PrToFileName, Optional IgnorePrintAreas)
End Sub

Sub PrintPreview(Optional EnableChanges)
End Sub

Sub Protect(Optional Password, Optional DrawingObjects, Optional Contents, Optional Scenarios, Optional UserInterfaceOnly, Optional AllowFormattingCells, Optional AllowFormattingColumns, Optional AllowFormattingRows, Optional AllowInsertingColumns, Optional AllowInsertingRows, Optional AllowInsertingHyperlinks, Optional AllowDeletingColumns, Optional AllowDeletingRows, Optional AllowSorting, Optional AllowFiltering, Optional AllowUsingPivotTables)
End Sub

Sub ResetAllPageBreaks()
End Sub

Sub SaveAs(Filename As String, Optional FileFormat, Optional Password, Optional WriteResPassword, Optional ReadOnlyRecommended, Optional CreateBackup, Optional AddToMru, Optional TextCodepage, Optional TextVisualLayout, Optional Local)
End Sub

Function Scenarios(Optional Index) As Object
End Function

Sub Select(Optional Replace)
End Sub

Sub SetBackgroundPicture(Filename As String)
End Sub

Sub ShowAllData()
End Sub

Sub ShowDataForm()
End Sub

Sub Unprotect(Optional Password)
End Sub

Function XmlDataQuery(XPath As String, Optional SelectionNamespaces, Optional Map) As Range
End Function

Function XmlMapQuery(XPath As String, Optional SelectionNamespaces, Optional Map) As Range
End Function