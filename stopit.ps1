# Read job IDs from the file
$jobIds = Get-Content -Path "job_ids.txt"

# Define a regex pattern to match job IDs
$regexPattern = "(\d+)"

# Extract job IDs using the regex pattern
$extractedJobIds = $jobIds | ForEach-Object {
    if ($_ -match $regexPattern) {
        $matches[1]
    }
}

# Stops all ids in jobs_id.txt
foreach ($jobId in $extractedJobIds) {
    Stop-Job -id $jobId
    Write-Host "Stopped job with ID $jobId."
}

# Delete the job_ids.txt file when done
Remove-Item -Path "job_ids.txt"