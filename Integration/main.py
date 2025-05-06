from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from nvd_api import CodeRequest, analyze_code, query_nvd_api
import time


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze-code")
async def analyze_code_api(request: CodeRequest):
    code_snippet = request.code
    start_time = time.time()

    try:
        detected_vulnerabilities = analyze_code(code_snippet)
        all_results = []

        for vuln in detected_vulnerabilities:
            keyword = vuln["keyword"]
            # 👇 Extract line numbers only, to avoid Object Object issues
            lines = [ln for ln, _ in vuln["lines"]]

            cves = query_nvd_api(keyword)
            all_results.append({
                "keyword": keyword,
                "lines": lines,
                "cves": cves
            })

            time.sleep(1)  # Delay to avoid NVD rate limits

        end_time = time.time()
        time_taken = round(end_time - start_time, 2)
        label = 0 if all_results else 1  # 0 = vulnerable, 1 = secure

        result = {
            "label": label,
            "total": len(all_results),
            "vulnerabilities": all_results,
            "analysis_time_sec": time_taken,
            "lines_analyzed": len(code_snippet.splitlines())
        }

        # ✅ Ensure JSON serializable
        clean_result = jsonable_encoder(result)


        return clean_result

    except Exception as e:
        return {
            "error": "Analysis failed",
            "details": str(e)
        }


