Enum FormShowConstants
    vbModeless = 0
    vbModal = 1
End Enum

Enum VbDayOfWeek
    vbUseSystemDayOfWeek = 0
    vbSunday = 1
    vbMonday = 2
    vbTuesday = 3
    vbWednesday = 4
    vbThursday = 5
    vbFriday = 6
    vbSaturday = 7
End Enum

Enum VbFirstWeekOfYear
    vbUseSystem = 0
    vbFirstJan1 = 1
    vbFirstFourDays = 2
    vbFirstFullWeek = 3
End Enum

Enum VbMsgBoxResult
    vbOK = 1
    vbCancel = 2
    vbAbort = 3
    vbRetry = 4
    vbIgnore = 5
    vbYes = 6
    vbNo = 7
End Enum

Enum VbMsgBoxStyle
    vbApplicationModal = 0
    vbSystemModal = 4096
    vbDefaultButton1 = 0
    vbDefaultButton2 = 256
    vbDefaultButton3 = 512
    vbDefaultButton4 = 768
    vbAbortRetryIgnore = 2
    vbCritical = 16
    vbExclamation = 48
    vbInformation = 64
    vbMsgBoxHelpButton = 16384
    vbMsgBoxRight = 524288
    vbMsgBoxRtlReading = 1048576
    vbMsgBoxSetForeground = 65536
    vbQuestion = 32
    vbOKOnly = 0
    vbOKCancel = 1
    vbYesNoCancel = 3
    vbYesNo = 4
    vbRetryCancel = 5
End Enum

Enum VbVarType
    vbArray = 8192
    vbBoolean = 11
    vbByte = 17
    vbCurrency = 6
    vbDataObject = 13
    vbDate = 7
    vbDecimal = 14
    vbDouble = 5
    vbEmpty = 0
    vbError = 10
    vbInteger = 2
    vbLong = 3
    vbNull = 1
    vbObject = 9
    vbSingle = 4
    vbString = 8
    vbUserDefinedType = 36
    vbVariant = 12
End Enum


Property Get UserForms() As Object
End Property

Function Array(ParamArray ArgList() As Variant)

Function Input(Number As Long, FileNumber As Integer)

Function Input$(Number As Long, FileNumber As Integer) As String

Function InputB(Number As Long, FileNumber As Integer)

Function InputB$(Number As Long, FileNumber As Integer) As String

Function LBound(Arg) As Long

Sub Load(Object As Object)
End Sub

Function ObjPtr(Ptr As Unknown) As LongPtr

Function StrPtr(Ptr As String) As LongPtr

Function UBound(Arg) As Long

Sub Unload(Object As Object)
End Sub

Function VarPtr(Ptr As Any) As LongPtr

Sub Width(FileNumber As Integer, Width As Integer)