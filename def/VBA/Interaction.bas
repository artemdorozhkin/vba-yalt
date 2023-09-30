Sub AppActivate(Title, Optional Wait)
End Sub

Sub Beep()
End Sub

Function CallByName(Object As Object, ProcName As String, CallType As VbCallType, Args() As Variant)
End Function

Function Choose(Index As Single, ParamArray Choice() As Variant)
End Function

Function Command()
End Function

Function Command$() As String
End Function

Function CreateObject(Class As String, Optional ServerName As String)
End Function

Sub DeleteSetting(AppName As String, Optional Section, Optional Key)
End Sub

Function DoEvents() As Integer
End Function

Function Environ(Expression)
End Function

Function Environ$(Expression) As String
End Function

Function GetAllSettings(AppName As String, Section As String)
End Function

Function GetObject(Optional PathName, Optional Class)
End Function

Function GetSetting(AppName As String, Section As String, Key As String, Optional Default) As String
End Function

Function IIf(Expression, TruePart, FalsePart)
End Function

Function InputBox(Prompt, Optional Title, Optional Default, Optional XPos, Optional YPos, Optional HelpFile, Optional Context) As String
End Function

Function MsgBox(Prompt, Optional Buttons As VbMsgBoxStyle = vbOKOnly, Optional Title, Optional HelpFile, Optional Context) As VbMsgBoxResult
End Function

Function Partition(Number, Start, Stop, Interval)
End Function

Sub SaveSetting(AppName As String, Section As String, Key As String, Setting As String)
End Sub

Sub SendKeys(String As String, Optional Wait)
End Sub

Function Shell(PathName, Optional WindowStyle As VbAppWinStyle = vbMinimizedFocus) As Double
End Function

Function Switch(ParamArray VarExpr() As Variant)
End Function