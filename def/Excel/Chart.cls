VERSION 1.0 CLASS
BEGIN
MultiUse = -1  'True
END
Attribute VB_Name = "Chart"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = False

Property Get Application() As Application
End Property

Property Get AutoScaling() As Boolean
End Property
Property Let AutoScaling()
End Property

Property Get BackWall() As Walls
End Property

Property Get BarShape() As XlBarShape
End Property
Property Let BarShape()
End Property

Property Get CategoryLabelLevel() As XlCategoryLabelLevel
End Property
Property Let CategoryLabelLevel()
End Property

Property Get ChartArea() As ChartArea
End Property

Property Get ChartColor() As Variant
End Property
Property Let ChartColor()
End Property

Property Get ChartStyle() As Variant
End Property
Property Let ChartStyle()
End Property

Property Get ChartTitle() As ChartTitle
End Property

Property Get ChartType() As XlChartType
End Property
Property Let ChartType()
End Property

Property Get CodeName() As String
End Property

Property Get Creator() As XlCreator
End Property

Property Get DataTable() As DataTable
End Property

Property Get DepthPercent() As Long
End Property
Property Let DepthPercent()
End Property

Property Get DisplayBlanksAs() As XlDisplayBlanksAs
End Property
Property Let DisplayBlanksAs()
End Property

Property Get Elevation() As Long
End Property
Property Let Elevation()
End Property

Property Get Floor() As Floor
End Property

Property Get GapDepth() As Long
End Property
Property Let GapDepth()
End Property

Property Get HasAxis(Optional Index1, Optional Index2)
End Property
Property Let HasAxis(Optional Index1, Optional Index2)
End Property

Property Get HasDataTable() As Boolean
End Property
Property Let HasDataTable()
End Property

Property Get HasLegend() As Boolean
End Property
Property Let HasLegend()
End Property

Property Get HasTitle() As Boolean
End Property
Property Let HasTitle()
End Property

Property Get HeightPercent() As Long
End Property
Property Let HeightPercent()
End Property

Property Get Hyperlinks() As Hyperlinks
End Property

Property Get Index() As Long
End Property

Property Get Legend() As Legend
End Property

Property Get MailEnvelope() As MsoEnvelope
End Property

Property Get Name() As String
End Property
Property Let Name()
End Property

Property Get Next() As Object
End Property

Property Get PageSetup() As PageSetup
End Property

Property Get Parent() As Object
End Property

Property Get Perspective() As Long
End Property
Property Let Perspective()
End Property

Property Get PivotLayout() As PivotLayout
End Property

Property Get PlotArea() As PlotArea
End Property

Property Get PlotBy() As XlRowCol
End Property
Property Let PlotBy()
End Property

Property Get PlotVisibleOnly() As Boolean
End Property
Property Let PlotVisibleOnly()
End Property

Property Get Previous() As Object
End Property

Property Get PrintedCommentPages() As Long
End Property

Property Get ProtectContents() As Boolean
End Property

Property Get ProtectData() As Boolean
End Property
Property Let ProtectData()
End Property

Property Get ProtectDrawingObjects() As Boolean
End Property

Property Get ProtectFormatting() As Boolean
End Property
Property Let ProtectFormatting()
End Property

Property Get ProtectionMode() As Boolean
End Property

Property Get ProtectSelection() As Boolean
End Property
Property Let ProtectSelection()
End Property

Property Get RightAngleAxes() As Variant
End Property
Property Let RightAngleAxes()
End Property

Property Get Rotation() As Variant
End Property
Property Let Rotation()
End Property

Property Get SeriesNameLevel() As XlSeriesNameLevel
End Property
Property Let SeriesNameLevel()
End Property

Property Get Shapes() As Shapes
End Property

Property Get ShowAllFieldButtons() As Boolean
End Property
Property Let ShowAllFieldButtons()
End Property

Property Get ShowAxisFieldButtons() As Boolean
End Property
Property Let ShowAxisFieldButtons()
End Property

Property Get ShowDataLabelsOverMaximum() As Boolean
End Property
Property Let ShowDataLabelsOverMaximum()
End Property

Property Get ShowExpandCollapseEntireFieldButtons() As Boolean
End Property
Property Let ShowExpandCollapseEntireFieldButtons()
End Property

Property Get ShowLegendFieldButtons() As Boolean
End Property
Property Let ShowLegendFieldButtons()
End Property

Property Get ShowReportFilterFieldButtons() As Boolean
End Property
Property Let ShowReportFilterFieldButtons()
End Property

Property Get ShowValueFieldButtons() As Boolean
End Property
Property Let ShowValueFieldButtons()
End Property

Property Get SideWall() As Walls
End Property

Property Get Tab() As Tab
End Property

Property Get Visible() As XlSheetVisibility
End Property
Property Let Visible()
End Property

Property Get Walls() As Walls
End Property

Sub Activate()
End Sub

Sub ApplyChartTemplate(Filename As String)
End Sub

Sub ApplyDataLabels(Optional Type As XlDataLabelsType = xlDataLabelsShowValue, Optional LegendKey, Optional AutoText, Optional HasLeaderLines, Optional ShowSeriesName, Optional ShowCategoryName, Optional ShowValue, Optional ShowPercentage, Optional ShowBubbleSize, Optional Separator)
End Sub

Sub ApplyLayout(Layout As Long, Optional ChartType)
End Sub

Function Axes(Optional Type, Optional AxisGroup As XlAxisGroup = xlPrimary) As Object
End Function

Function ChartGroups(Optional Index) As Object
End Function

Function ChartObjects(Optional Index) As Object
End Function

Sub ChartWizard(Optional Source, Optional Gallery, Optional Format, Optional PlotBy, Optional CategoryLabels, Optional SeriesLabels, Optional HasLegend, Optional Title, Optional CategoryTitle, Optional ValueTitle, Optional ExtraTitle)
End Sub

Sub CheckSpelling(Optional CustomDictionary, Optional IgnoreUppercase, Optional AlwaysSuggest, Optional SpellLang)
End Sub

Sub ClearToMatchColorStyle()
End Sub

Sub ClearToMatchStyle()
End Sub

Sub Copy(Optional Before, Optional After)
End Sub

Sub CopyPicture(Optional Appearance As XlPictureAppearance = xlScreen, Optional Format As XlCopyPictureFormat = xlPicture, Optional Size As XlPictureAppearance = xlPrinter)
End Sub

'TODO: repaire missing method

Function Evaluate(Name)
End Function

Function Export(Filename As String, Optional FilterName, Optional Interactive) As Boolean
End Function

Sub ExportAsFixedFormat(Type As XlFixedFormatType, Optional Filename, Optional Quality, Optional IncludeDocProperties, Optional IgnorePrintAreas, Optional From, Optional To, Optional OpenAfterPublish, Optional FixedFormatExtClassPtr)
End Sub

Function FullSeriesCollection(Optional Index) As Object
End Function

Sub GetChartElement(x As Long, y As Long, ElementID As Long, Arg1 As Long, Arg2 As Long)
End Sub

Function Location(Where As XlChartLocation, Optional Name) As Chart
End Function

Sub Move(Optional Before, Optional After)
End Sub

Function OLEObjects(Optional Index) As Object
End Function

Sub Paste(Optional Type)
End Sub

Sub PrintOut(Optional From, Optional To, Optional Copies, Optional Preview, Optional ActivePrinter, Optional PrintToFile, Optional Collate, Optional PrToFileName)
End Sub

Sub PrintPreview(Optional EnableChanges)
End Sub

Sub Protect(Optional Password, Optional DrawingObjects, Optional Contents, Optional Scenarios, Optional UserInterfaceOnly)
End Sub

Sub Refresh()
End Sub

Sub SaveAs(Filename As String, Optional FileFormat, Optional Password, Optional WriteResPassword, Optional ReadOnlyRecommended, Optional CreateBackup, Optional AddToMru, Optional TextCodepage, Optional TextVisualLayout, Optional Local)
End Sub

Sub SaveChartTemplate(Filename As String)
End Sub

Sub Select(Optional Replace)
End Sub

Function SeriesCollection(Optional Index) As Object
End Function

Sub SetBackgroundPicture(Filename As String)
End Sub

Sub SetDefaultChart(Name)
End Sub

Sub SetElement(Element As MsoChartElementType)
End Sub

Sub SetSourceData(Source As Range, Optional PlotBy)
End Sub

Sub Unprotect(Optional Password)
End Sub