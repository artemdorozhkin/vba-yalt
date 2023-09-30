Property Get Drives() As Drives
End Property

Function BuildPath(Path As String, Name As String) As String
End Function

Sub CopyFile(Source As String, Destination As String, Optional OverWriteFiles As Boolean = True)
End Sub

Sub CopyFolder(Source As String, Destination As String, Optional OverWriteFiles As Boolean = True)
End Sub

Function CreateFolder(Path As String) As Folder
End Function

Function CreateTextFile(FileName As String, Optional Overwrite As Boolean = True, Optional Unicode As Boolean = False) As TextStream
End Function

Sub DeleteFile(FileSpec As String, Optional Force As Boolean = False)
End Sub

Sub DeleteFolder(FolderSpec As String, Optional Force As Boolean = False)
End Sub

Function DriveExists(DriveSpec As String) As Boolean
End Function

Function FileExists(FileSpec As String) As Boolean
End Function

Function FolderExists(FolderSpec As String) As Boolean
End Function

Function GetAbsolutePathName(Path As String) As String
End Function

Function GetBaseName(Path As String) As String
End Function

Function GetDrive(DriveSpec As String) As Drive
End Function

Function GetDriveName(Path As String) As String
End Function

Function GetExtensionName(Path As String) As String
End Function

Function GetFile(FilePath As String) As File
End Function

Function GetFileName(Path As String) As String
End Function

Function GetFileVersion(FileName As String) As String
End Function

Function GetFolder(FolderPath As String) As Folder
End Function

Function GetParentFolderName(Path As String) As String
End Function

Function GetSpecialFolder(SpecialFolder As SpecialFolderConst) As Folder
End Function

Function GetStandardStream(StandardStreamType As StandardStreamTypes, Optional Unicode As Boolean = False) As TextStream
End Function

Function GetTempName() As String
End Function

Sub MoveFile(Source As String, Destination As String)
End Sub

Sub MoveFolder(Source As String, Destination As String)
End Sub

Function OpenTextFile(FileName As String, Optional IOMode As IOMode = ForReading, Optional Create As Boolean = False, Optional Format As Tristate = TristateFalse) As TextStream
End Function

