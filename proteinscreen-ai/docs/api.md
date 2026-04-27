# ProteinScreen AI — API 문서

## Base URL
```
http://localhost:3000
```

---

## POST /api/chat

AI 에이전트와 대화합니다.

**Request**
```json
{
  "messages": [
    { "role": "user", "content": "EGFR 결합 포켓의 핵심 잔기를 분석해줘" }
  ],
  "target": "EGFR"
}
```

**Response**
```json
{
  "reply": "EGFR의 ATP 결합 포켓은...",
  "inputTokens": 245,
  "outputTokens": 312
}
```

---

## POST /api/chat/stream

스트리밍 응답 (Server-Sent Events).

**Request** — 동일 형식

**Response Stream**
```
data: {"text": "EGFR의"}
data: {"text": " ATP"}
data: [DONE]
```

---

## POST /api/compound/properties

화합물의 물리화학적 특성 및 ADMET을 계산합니다.

**Request**
```json
{
  "smiles": "CCOc1cc2ncnc(Nc3ccc(F)c(Cl)c3)c2cc1OCC",
  "compoundId": "CPD-2847"
}
```

**Response**
```json
{
  "compoundId": "CPD-2847",
  "smiles": "...",
  "lipinski": {
    "mw": 393.4,
    "logP": 2.8,
    "hDonors": 2,
    "hAcceptors": 7,
    "rotBonds": 8,
    "compliant": true
  },
  "admet": {
    "solubility": 74,
    "permeability": 68,
    "metabolicStability": 82,
    "hergSafety": 88,
    "bbbPermeability": 55,
    "oralBioavailability": 79
  },
  "docking": {
    "score": -9.2,
    "rmsd": 1.3,
    "keyResidues": ["Lys745", "Thr790", "Cys797", "Gly719"]
  }
}
```

---

## GET /api/health

서버 상태 확인.

**Response**
```json
{
  "status": "ok",
  "model": "claude-sonnet-4-20250514",
  "version": "1.0.0"
}
```
