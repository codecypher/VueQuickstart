# Set-ReleaseDate.ps1

# PowerShell Date Format
# https://www.sconstantinou.com/powershell-date-format/
# https://stackoverflow.com/questions/45000784/how-to-set-datetime-to-value-of-variable-using-powershell-in-vsts-builds#45008353

# Use a PowerShell script to customize your build pipeline
# https://docs.microsoft.com/en-us/azure/devops/pipelines/scripts/powershell?view=azure-devops&viewFallbackFrom=vsts#use-the-oauth-token-to-access-the-rest-api
# https://nganmenegay.com/2019/04/25/azure-devops-pipelines-set-release-variables-using-release-rest-api-so-that-their-values-will-persist-across-stages/
# https://stackoverflow.com/questions/53042605/how-to-modify-azure-devops-release-definition-variable-from-a-release-task/53060141#53060141
# https://stackoverflow.com/questions/52399076/how-to-increase-update-variable-group-value-using-azure-devops-build-definition

# How to easily and silently obtain AccessToken (Bearer) from an existing Azure PowerShell session
# https://www.codeisahighway.com/how-to-easily-and-silently-obtain-accesstoken-bearer-from-an-existing-azure-powershell-session/
# https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-2.3.2

# Get token from profile.ps1
$token = $AccessToken

# Get current datetime and assign to environment variable
function getDate
{
    Write-Host "Set Release Date"
    $date = $(Get-Date -format 'yyyy-MM-dd HH:mm:ss')
    Write-Host "Date: $date"

    return $date
}

# Update value of pipeline variable
function setPipelineVariable
{
    $date = getDate

    # Set environment variable
    # The overwrite value only works for the current build pipeline.
    # When you use the $(winversion) to get the value, it will still pull the
    # old value from the pipeline variable.
    # To get the current value, you need to use $env:WINVERSION.
    Write-Host "##vso[task.setvariable variable=BuildDate]$date"
    Write-Host "BuildDate: $date"

    $test = @{
        name="FOTODB02-Staging";
        createdOn="2019-05-21T12:35:51.02Z";
    }

    # Update the modified object
    $json = @($test) | ConvertTo-Json -Depth 100

    #Write-Host "json = " $json
}

#getDate $args[0]
setPipelineVariable