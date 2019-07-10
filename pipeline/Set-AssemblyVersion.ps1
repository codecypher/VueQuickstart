# Script to update assembly version numbers
# https://mohitgoyal.co/2017/09/08/auto-assembly-versioning-in-visual-studio-team-services-or-vsts-build/

# Use a PowerShell script to customize your build pipeline
# https://docs.microsoft.com/en-us/azure/devops/pipelines/scripts/powershell?view=azure-devops&viewFallbackFrom=vsts#use-the-oauth-token-to-access-the-rest-api

function Update-AssemblyInfoVersionFile
{
    Param
    (
	[Parameter(Mandatory=$true)]
        [string]$productVersion
    )

    $buildNumber = $env:BUILD_BUILDNUMBER
    if ($buildNumber -eq $null)
    {
        $buildIncrementalNumber = 0
    }
    else
    {
        $splitted = $buildNumber.Split('.')
        $buildIncrementalNumber = $splitted[$splitted.Length - 1]
    }

    $SrcPath = $env:BUILD_SOURCESDIRECTORY
    Write-Host "Executing Update-AssemblyInfoVersionFiles in path $SrcPath for product version $productVersion"

    $AllVersionFiles = Get-ChildItem $SrcPath AssemblyInfo.cs -recurse

    $versions = $productVersion.Split('.')
    $major = $versions[0]
    $minor = $versions[1]
    $patch = $versions[2]

    $assemblyVersion = $productVersion
    #$assemblyFileVersion = "$major.$minor.$patch.$buildIncrementalNumber"
    #$assemblyFileVersion = "$major.$minor.$patch.$env:BUILD_BUILDID"
    $assemblyFileVersion = "$env:BUILD_BUILDNUMBER"
    #$assemblyInformationalVersion = "$env:BUILD_NUMBER"  # This does not work

    Write-Host "Transformed Assembly Version is $assemblyVersion"
    Write-Host "Transformed Assembly File Version is $assemblyFileVersion"
    Write-Host "Transformed Assembly Informational Version is $assemblyInformationalVersion"

    # Update environment variable
    Write-Host "##vso[task.setvariable variable=ReleaseBuildNumber;]$assemblyFileVersion"

    foreach ($file in $AllVersionFiles)
    {
        (Get-Content $file.FullName) |
        %{$_ -replace 'AssemblyVersion\("[0-9]+(\.([0-9]+|\*)){1,3}"\)', "AssemblyVersion(""$assemblyVersion"")" } |
        %{$_ -replace 'AssemblyFileVersion\("[0-9]+(\.([0-9]+|\*)){1,3}"\)', "AssemblyFileVersion(""$assemblyFileVersion"")" } |
	%{$_ -replace 'AssemblyInformationalVersion\("[0-9]+(\.([0-9]+|\*)){1,3}"\)', "AssemblyInformationalVersion(""$assemblyInformationalVersion"")" } |
	Set-Content $file.FullName -Force
    }

    return $assemblyFileVersion
}

Update-AssemblyInfoVersionFile $args[0]