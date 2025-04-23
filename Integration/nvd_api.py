from pydantic import BaseModel
from typing import List, Dict, Any
import re
import requests
import time

API_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0"
API_KEY = "3adffd77-184b-4ccb-91c1-098a994c5243"  # ✅ Put your actual key here
QUERY_DELAY = 4 # Keep low with sleep in main.py

# 👇 Improved regex flexibility
PATTERN_TO_KEYWORDS = {
    r"\bgoto\s+\w+": "goto",
    r"av_log\s*\(.*AV_LOG_ERROR.*\)": "error logging",
    r"\bmemset\s*\(.*\)": "memset",
    r"\bexec\s*\(.*\)": "command injection",
    r"\bsystem\s*\(.*\)": "system call",
    r"\bstrcpy\s*\(.*\)": "buffer overflow - strcpy",
    r"\bstrncpy\s*\(.*\)": "buffer overflow - strncpy",
    r"\bgets\s*\(.*\)": "buffer overflow - gets",
    r"\bscanf\s*\([^,]+,[^\)]+\)": "format string vulnerability",
    r"\beval\s*\(.*\)": "eval injection",
    r"\bnew\s+\w+": "memory allocation - C++",
    r"\bmalloc\s*\(.*\)": "memory allocation - C",
    r"\bfree\s*\(.*\)": "memory free",
    r"\bdelete\s+\w+": "memory delete - C++",
    r"\b(SELECT|UPDATE|DELETE|INSERT)\s+.*\s+FROM\s+.*": "SQL query",
    r"\bprintf\s*\(.*\)": "format string",
    r"\bfopen\s*\(.*\)": "file open",
    r"\bopen\s*\(.*\)": "file open (POSIX)",
}

class CodeRequest(BaseModel):
    code: str

def analyze_code(code_snippet: str) -> List[Dict[str, Any]]:
    detected = []
    lines = code_snippet.splitlines()

    for pattern, keyword in PATTERN_TO_KEYWORDS.items():
        matches = re.findall(pattern, code_snippet)
        if matches:
            matched_lines = [
                (i + 1, line.strip())
                for i, line in enumerate(lines)
                if re.search(pattern, line)
            ]
            detected.append({
                "pattern": pattern,
                "keyword": keyword,
                "lines": matched_lines
            })
    return detected

def query_nvd_api(keyword: str, start_index: int = 0, results_per_page: int = 3) -> List[Dict[str, str]]:
    headers = {
        "Accept": "application/json",
        "apiKey": API_KEY,
    }
    params = {
        "keywordSearch": keyword,
        "startIndex": start_index,
        "resultsPerPage": results_per_page,
    }

    try:
        response = requests.get(API_URL, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()

        vulnerabilities = []
        for item in data.get("vulnerabilities", []):
            cve_data = item.get("cve", {})
            cve_id = cve_data.get("id", "N/A")
            description = next(
                (desc.get("value") for desc in cve_data.get("descriptions", []) if desc.get("lang") == "en"),
                "No description available"
            )
            vulnerabilities.append({
                "cve_id": cve_id,
                "description": description
            })

        return vulnerabilities

    except requests.exceptions.RequestException as e:
        print(f"[ERROR] Failed to query NVD API: {e}")
        return []
