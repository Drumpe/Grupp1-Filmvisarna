# Ange sökväg till den första projektmappen
$projekt1Sokvag = ".\WebReact"

# Byt arbetsmapp till den första projektmappen
Set-Location -Path $projekt1Sokvag

# Starta det första projektet
$job1 = Start-Job -ScriptBlock { npm run dev }

# Återgå till ursprunglig arbetsmapp
Set-Location -Path $PSScriptRoot

# Ange sökväg till den andra projektmappen
$projekt2Sokvag = ".\webapi"

# Byt arbetsmapp till den andra projektmappen
Set-Location -Path $projekt2Sokvag

# Starta det andra projektet
$job2 = Start-Job -ScriptBlock { dotnet run }

# Återgå till ursprunglig arbetsmapp
Set-Location -Path $PSScriptRoot

Write-Host "Running jobs with ID $($job1.Id) och $($job2.Id)."

# Lagra id i job_ids.txt
"$($job1.Id)" | Out-File -Append -FilePath "job_ids.txt"
"$($job2.Id)" | Out-File -Append -FilePath "job_ids.txt"