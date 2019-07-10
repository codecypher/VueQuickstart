# ReplaceTokens.ps1
# Replace tokens in file, e.g. __BuildNumber__

function replaceTokens
{
    Param
    (
        [Parameter(Mandatory = $true)]
        [String]$fileWithTokens,

        [Parameter(Mandatory = $false)]
        [String]$tokenRegex = "__(\w+)__"
    )

    $vars = Get-ChildItem -path env:*
    $contents = Get-Content -Path $fileWithTokens
    $newContents = "";
    $contents | % {
        $line = $_
        if ($_ -match $tokenRegex) {
            $setting = Get-ChildItem -path env:* | ? { $_.Name -eq $Matches[1]  }
            if ($setting) {
                Write-Host ("Replacing key {0} with value from environment {1}" -f $setting.Name, $setting.Value)
                $line = $_ -replace $tokenRegex, $setting.Value
            }
        }
        $newContents += $line + [Environment]::NewLine
    }
    Set-Content $fileWithTokens -Value $newContents
}

replaceTokens $args[0]