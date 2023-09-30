Property Get AddIndent() As Variant
End Property

Property Get Address(Optional RowAbsolute, Optional ColumnAbsolute, Optional ReferenceStyle As XlReferenceStyle = xlA1, Optional External, Optional RelativeTo) As String
End Property

Property Get AddressLocal(Optional RowAbsolute, Optional ColumnAbsolute, Optional ReferenceStyle As XlReferenceStyle = xlA1, Optional External, Optional RelativeTo) As String
End Property

Property Get AllowEdit() As Boolean
End Property

Property Get Application() As Application
End Property

Property Get Areas() As Areas
End Property

Property Get Borders() As Borders
End Property

Property Get Cells() As Range
End Property

Property Get Characters(Optional Start, Optional Length) As Characters
End Property

Property Get Column() As Long
End Property

Property Get Columns() As Range
End Property

Property Get ColumnWidth() As Variant
End Property
Property Let ColumnWidth() As Variant
End Property

Property Get Comment() As Comment
End Property

Property Get Count() As Long
End Property

Property Get CountLarge() As Variant
End Property

Property Get Creator() As XlCreator
End Property

Property Get CurrentArray() As Range
End Property

Property Get CurrentRegion() As Range
End Property

Property Get Dependents() As Range
End Property

Property Get DirectDependents() As Range
End Property

Property Get DirectPrecedents() As Range
End Property

Property Get DisplayFormat() As DisplayFormat
End Property

Property Get End(Direction As XlDirection) As Range
End Property

Property Get EntireColumn() As Range
End Property

Property Get EntireRow() As Range
End Property

Property Get Errors() As Errors
End Property

Property Get Font() As Font
End Property

Property Get FormatConditions() As FormatConditions
End Property

Property Get Formula() As Variant
End Property
Property Let Formula() As Variant
End Property

Property Get FormulaArray() As Variant
End Property
Property Let FormulaArray() As Variant
End Property

Property Get FormulaHidden() As Variant
End Property
Property Let FormulaHidden() As Variant
End Property

Property Get FormulaLocal() As Variant
End Property
Property Let FormulaLocal() As Variant
End Property

Property Get FormulaR1C1() As Variant
End Property
Property Let FormulaR1C1() As Variant
End Property

Property Get FormulaR1C1Local() As Variant
End Property
Property Let FormulaR1C1Local() As Variant
End Property

Property Get HasArray() As Variant
End Property

Property Get HasFormula() As Variant
End Property

Property Get Height() As Variant
End Property

Property Get Hidden() As Variant
End Property
Property Let Hidden() As Variant
End Property

Property Get HorizontalAlignment() As Variant
End Property
Property Let HorizontalAlignment() As Variant
End Property

Property Get Hyperlinks() As Hyperlinks
End Property

Property Get ID() As String
End Property
Property Let ID() As String
End Property

Property Get IndentLevel() As Variant
End Property
Property Let IndentLevel() As Variant
End Property

Property Get Interior() As Interior
End Property

Property Get Item(RowIndex, Optional ColumnIndex)
End Property
Property Let Item(RowIndex, Optional ColumnIndex)
End Property

Property Get Left() As Variant
End Property

Property Get ListHeaderRows() As Long
End Property

Property Get ListObject() As ListObject
End Property

Property Get LocationInTable() As XlLocationInTable
End Property

Property Get Locked() As Variant
End Property
Property Let Locked() As Variant
End Property

Property Get MDX() As String
End Property

Property Get MergeArea() As Range
End Property

Property Get MergeCells() As Variant
End Property
Property Let MergeCells() As Variant
End Property

Property Get Name() As Variant
End Property
Property Let Name() As Variant
End Property

Property Get Next() As Range
End Property

Property Get NumberFormat() As Variant
End Property
Property Let NumberFormat() As Variant
End Property

Property Get NumberFormatLocal() As Variant
End Property
Property Let NumberFormatLocal() As Variant
End Property

Property Get Offset(Optional RowOffset, Optional ColumnOffset) As Range
End Property

Property Get Orientation() As Variant
End Property
Property Let Orientation() As Variant
End Property

Property Get OutlineLevel() As Variant
End Property
Property Let OutlineLevel() As Variant
End Property

Property Get PageBreak() As Long
End Property
Property Let PageBreak() As Long
End Property

Property Get Parent() As Object
End Property

Property Get Phonetic() As Phonetic
End Property

Property Get Phonetics() As Phonetics
End Property

Property Get PivotCell() As PivotCell
End Property

Property Get PivotField() As PivotField
End Property

Property Get PivotItem() As PivotItem
End Property

Property Get PivotTable() As PivotTable
End Property

Property Get Precedents() As Range
End Property

Property Get PrefixCharacter() As Variant
End Property

Property Get Previous() As Range
End Property

Property Get QueryTable() As QueryTable
End Property

Property Get Range(Cell1, Optional Cell2) As Range
End Property

Property Get ReadingOrder() As Long
End Property

Property Get Resize(Optional RowSize, Optional ColumnSize) As Range
End Property

Property Get Row() As Long
End Property

Property Get RowHeight() As Variant
End Property
Property Let RowHeight() As Variant
End Property

Property Get Rows() As Range
End Property

Property Get ServerActions() As Actions
End Property

Property Get ShowDetail() As Variant
End Property
Property Let ShowDetail() As Variant
End Property

Property Get ShrinkToFit() As Variant
End Property
Property Let ShrinkToFit() As Variant
End Property

Property Get SoundNote() As SoundNote
End Property

Property Get SparklineGroups() As SparklineGroups
End Property

Property Get Style() As Variant
End Property
Property Let Style() As Variant
End Property

Property Get Summary() As Variant
End Property

Property Get Text() As Variant
End Property

Property Get Top() As Variant
End Property

Property Get UseStandardHeight() As Variant
End Property
Property Let UseStandardHeight() As Variant
End Property

Property Get UseStandardWidth() As Variant
End Property
Property Let UseStandardWidth() As Variant
End Property

Property Get Validation() As Validation
End Property

Property Get Value(Optional RangeValueDataType)
End Property
Property Let Value(Optional RangeValueDataType)
End Property

Property Get Value2() As Variant
End Property
Property Let Value2() As Variant
End Property

Property Get VerticalAlignment() As Variant
End Property
Property Let VerticalAlignment() As Variant
End Property

Property Get Width() As Variant
End Property

Property Get Worksheet() As Worksheet
End Property

Property Get WrapText() As Variant
End Property
Property Let WrapText() As Variant
End Property

Property Get XPath() As XPath
End Property

Function Activate()
End Function

Function AddComment(Optional Text) As Comment
End Function

Function AdvancedFilter(Action As XlFilterAction, Optional CriteriaRange, Optional CopyToRange, Optional Unique)
End Function

Sub AllocateChanges()
End Sub

Function ApplyNames(Optional Names, Optional IgnoreRelativeAbsolute, Optional UseRowColumnNames, Optional OmitColumn, Optional OmitRow, Optional Order As XlApplyNamesOrder = xlRowThenColumn, Optional AppendLast)
End Function

Function ApplyOutlineStyles()
End Function

Function AutoComplete(String As String) As String
End Function

Function AutoFill(Destination As Range, Optional Type As XlAutoFillType = xlFillDefault)
End Function

Function AutoFilter(Optional Field, Optional Criteria1, Optional Operator As XlAutoFilterOperator = xlAnd, Optional Criteria2, Optional VisibleDropDown)
End Function

Function AutoFit()
End Function

Function AutoOutline()
End Function

Function BorderAround(Optional LineStyle, Optional Weight As XlBorderWeight = xlThin, Optional ColorIndex As XlColorIndex = xlColorIndexAutomatic, Optional Color, Optional ThemeColor)
End Function

Function Calculate()
End Function

Function CalculateRowMajorOrder()
End Function

Function CheckSpelling(Optional CustomDictionary, Optional IgnoreUppercase, Optional AlwaysSuggest, Optional SpellLang)
End Function

Function Clear()
End Function

Sub ClearComments()
End Sub

Function ClearContents()
End Function

Function ClearFormats()
End Function

Sub ClearHyperlinks()
End Sub

Function ClearNotes()
End Function

Function ClearOutline()
End Function

Function ColumnDifferences(Comparison) As Range
End Function

Function Consolidate(Optional Sources, Optional Function, Optional TopRow, Optional LeftColumn, Optional CreateLinks)
End Function

Function Copy(Optional Destination)
End Function

Function CopyFromRecordset(Data As Unknown, Optional MaxRows, Optional MaxColumns) As Long
End Function

Function CopyPicture(Optional Appearance As XlPictureAppearance = xlScreen, Optional Format As XlCopyPictureFormat = xlPicture)
End Function

Function CreateNames(Optional Top, Optional Left, Optional Bottom, Optional Right)
End Function

Function Cut(Optional Destination)
End Function

Function DataSeries(Optional Rowcol, Optional Type As XlDataSeriesType = xlDataSeriesLinear, Optional Date As XlDataSeriesDate = xlDay, Optional Step, Optional Stop, Optional Trend)
End Function

Function Delete(Optional Shift)
End Function

Function DialogBox()
End Function

Sub Dirty()
End Sub

Sub DiscardChanges()
End Sub

Function EditionOptions(Type As XlEditionType, Option As XlEditionOptionsOption, Optional Name, Optional Reference, Optional Appearance As XlPictureAppearance = xlScreen, Optional ChartSize As XlPictureAppearance = xlScreen, Optional Format)
End Function

Sub ExportAsFixedFormat(Type As XlFixedFormatType, Optional Filename, Optional Quality, Optional IncludeDocProperties, Optional IgnorePrintAreas, Optional From, Optional To, Optional OpenAfterPublish, Optional FixedFormatExtClassPtr)
End Sub

Function FillDown()
End Function

Function FillLeft()
End Function

Function FillRight()
End Function

Function FillUp()
End Function

Function Find(What, Optional After, Optional LookIn, Optional LookAt, Optional SearchOrder, Optional SearchDirection As XlSearchDirection = xlNext, Optional MatchCase, Optional MatchByte, Optional SearchFormat) As Range
End Function

Function FindNext(Optional After) As Range
End Function

Function FindPrevious(Optional After) As Range
End Function

Sub FlashFill()
End Sub

Function FunctionWizard()
End Function

Function Group(Optional Start, Optional End, Optional By, Optional Periods)
End Function

Function Insert(Optional Shift, Optional CopyOrigin)
End Function

Sub InsertIndent(InsertAmount As Long)
End Sub

Function Justify()
End Function

Function ListNames()
End Function

Sub Merge(Optional Across)
End Sub

Function NavigateArrow(Optional TowardPrecedent, Optional ArrowNumber, Optional LinkNumber)
End Function

Function NoteText(Optional Text, Optional Start, Optional Length) As String
End Function

Function Parse(Optional ParseLine, Optional Destination)
End Function

Function PasteSpecial(Optional Paste As XlPasteType = xlPasteAll, Optional Operation As XlPasteSpecialOperation = xlPasteSpecialOperationNone, Optional SkipBlanks, Optional Transpose)
End Function

Function PrintOut(Optional From, Optional To, Optional Copies, Optional Preview, Optional ActivePrinter, Optional PrintToFile, Optional Collate, Optional PrToFileName)
End Function

Function PrintPreview(Optional EnableChanges)
End Function

Sub RemoveDuplicates(Optional Columns, Optional Header As XlYesNoGuess = xlNo)
End Sub

Function RemoveSubtotal()
End Function

Function Replace(What, Replacement, Optional LookAt, Optional SearchOrder, Optional MatchCase, Optional MatchByte, Optional SearchFormat, Optional ReplaceFormat) As Boolean
End Function

Function RowDifferences(Comparison) As Range
End Function

Function Run(Optional Arg1, Optional Arg2, Optional Arg3, Optional Arg4, Optional Arg5, Optional Arg6, Optional Arg7, Optional Arg8, Optional Arg9, Optional Arg10, Optional Arg11, Optional Arg12, Optional Arg13, Optional Arg14, Optional Arg15, Optional Arg16, Optional Arg17, Optional Arg18, Optional Arg19, Optional Arg20, Optional Arg21, Optional Arg22, Optional Arg23, Optional Arg24, Optional Arg25, Optional Arg26, Optional Arg27, Optional Arg28, Optional Arg29, Optional Arg30)
End Function

Function Select()
End Function

Sub SetPhonetic()
End Sub

Function Show()
End Function

Function ShowDependents(Optional Remove)
End Function

Function ShowErrors()
End Function

Function ShowPrecedents(Optional Remove)
End Function

Function Sort(Optional Key1, Optional Order1 As XlSortOrder = xlAscending, Optional Key2, Optional Type, Optional Order2 As XlSortOrder = xlAscending, Optional Key3, Optional Order3 As XlSortOrder = xlAscending, Optional Header As XlYesNoGuess = xlNo, Optional OrderCustom, Optional MatchCase, Optional Orientation As XlSortOrientation = xlSortRows, Optional SortMethod As XlSortMethod = xlPinYin, Optional DataOption1 As XlSortDataOption = xlSortNormal, Optional DataOption2 As XlSortDataOption = xlSortNormal, Optional DataOption3 As XlSortDataOption = xlSortNormal)
End Function

Function SortSpecial(Optional SortMethod As XlSortMethod = xlPinYin, Optional Key1, Optional Order1 As XlSortOrder = xlAscending, Optional Type, Optional Key2, Optional Order2 As XlSortOrder = xlAscending, Optional Key3, Optional Order3 As XlSortOrder = xlAscending, Optional Header As XlYesNoGuess = xlNo, Optional OrderCustom, Optional MatchCase, Optional Orientation As XlSortOrientation = xlSortRows, Optional DataOption1 As XlSortDataOption = xlSortNormal, Optional DataOption2 As XlSortDataOption = xlSortNormal, Optional DataOption3 As XlSortDataOption = xlSortNormal)
End Function

Sub Speak(Optional SpeakDirection, Optional SpeakFormulas)
End Sub

Function SpecialCells(Type As XlCellType, Optional Value) As Range
End Function

Function SubscribeTo(Edition As String, Optional Format As XlSubscribeToFormat = xlSubscribeToText)
End Function

Function Subtotal(GroupBy As Long, Function As XlConsolidationFunction, TotalList, Optional Replace, Optional PageBreaks, Optional SummaryBelowData As XlSummaryRow = xlSummaryBelow)
End Function

Function Table(Optional RowInput, Optional ColumnInput)
End Function

Function TextToColumns(Optional Destination, Optional DataType As XlTextParsingType = xlDelimited, Optional TextQualifier As XlTextQualifier = xlTextQualifierDoubleQuote, Optional ConsecutiveDelimiter, Optional Tab, Optional Semicolon, Optional Comma, Optional Space, Optional Other, Optional OtherChar, Optional FieldInfo, Optional DecimalSeparator, Optional ThousandsSeparator, Optional TrailingMinusNumbers)
End Function

Function Ungroup()
End Function

Sub UnMerge()
End Sub