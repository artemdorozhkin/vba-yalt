Property Get Application() As Application
End Property

Property Get Count() As Long
End Property

Property Get Creator() As XlCreator
End Property

Property Get HPageBreaks() As HPageBreaks
End Property

Property Get Item(Index) As Object
End Property

Property Get Parent() As Object
End Property

Property Get Visible() As Variant
End Property
Property Let Visible() As Variant
End Property

Property Get VPageBreaks() As VPageBreaks
End Property

Function Add(Optional Before, Optional After, Optional Count, Optional Type) As Object
End Function

Function Add2(Optional Before, Optional After, Optional Count, Optional NewLayout) As Object
End Function

Sub Copy(Optional Before, Optional After)
End Sub

Sub Delete()
End Sub

Sub FillAcrossSheets(Range As Range, Optional Type As XlFillWith = xlFillWithAll)
End Sub

Sub Move(Optional Before, Optional After)
End Sub

Sub PrintOut(Optional From, Optional To, Optional Copies, Optional Preview, Optional ActivePrinter, Optional PrintToFile, Optional Collate, Optional PrToFileName, Optional IgnorePrintAreas)
End Sub

Sub PrintPreview(Optional EnableChanges)
End Sub

Sub Select(Optional Replace)
End Sub
