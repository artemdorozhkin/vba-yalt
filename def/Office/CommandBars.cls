Property Get ActionControl() As CommandBarControl
End Property

Property Get ActiveMenuBar() As CommandBar
End Property

Property Get AdaptiveMenus() As Boolean
End Property
Property Let AdaptiveMenus()
End Property

Property Get Application() As Object
End Property

Property Get Count() As Long
End Property

Property Get Creator() As Long
End Property

Property Get DisableAskAQuestionDropdown() As Boolean
End Property
Property Let DisableAskAQuestionDropdown()
End Property

Property Get DisableCustomize() As Boolean
End Property
Property Let DisableCustomize()
End Property

Property Get DisplayFonts() As Boolean
End Property
Property Let DisplayFonts()
End Property

Property Get DisplayKeysInTooltips() As Boolean
End Property
Property Let DisplayKeysInTooltips()
End Property

Property Get DisplayTooltips() As Boolean
End Property
Property Let DisplayTooltips()
End Property

Property Get Item(Index) As CommandBar
End Property

Property Get LargeButtons() As Boolean
End Property
Property Let LargeButtons()
End Property

Property Get MenuAnimationStyle() As MsoMenuAnimation
End Property
Property Let MenuAnimationStyle()
End Property

Property Get Parent() As Object
End Property

Function Add(Optional Name, Optional Position, Optional MenuBar, Optional Temporary) As CommandBar
End Function

Sub CommitRenderingTransaction(hwnd As Long)
End Sub

Sub ExecuteMso(idMso As String)
End Sub

Function FindControl(Optional Type, Optional Id, Optional Tag, Optional Visible) As CommandBarControl
End Function

Function FindControls(Optional Type, Optional Id, Optional Tag, Optional Visible) As CommandBarControls
End Function

Function GetEnabledMso(idMso As String) As Boolean
End Function

Function GetImageMso(idMso As String, Width As Long, Height As Long) As IPictureDisp
End Function

Function GetLabelMso(idMso As String) As String
End Function

Function GetPressedMso(idMso As String) As Boolean
End Function

Function GetScreentipMso(idMso As String) As String
End Function

Function GetSupertipMso(idMso As String) As String
End Function

Function GetVisibleMso(idMso As String) As Boolean
End Function

Sub ReleaseFocus()
End Sub