# 🧬 ProteinScreen AI

**신약 개발을 위한 단백질 스크리닝 AI 에이전트**
*An AI Agent for Drug Discovery Protein Screening*

오픈 사이언스와 공익적 목적으로 개발된 약물 발견 자동화 도구입니다.
Claude AI를 기반으로 가상 스크리닝, 분자 도킹 분석, ADMET 예측 등을 지원합니다.

*An open-science drug discovery automation tool built for public benefit.
Powered by Claude AI — supports virtual screening, molecular docking, and ADMET prediction.*

---

## ⚖️ 사용 정책 / Usage Policy

> **🇰🇷 한국어**
>
> 이 소프트웨어는 **공익적 목적**으로 자유롭게 사용할 수 있습니다.
>
> - ✅ 학술 연구, 교육, 비영리 연구기관에서의 사용 — **무료, 제한 없음**
> - ✅ 개인 학습 및 오픈소스 프로젝트 기여 — **무료, 제한 없음**
> - ⚠️ **영리 목적 사용 (상업적 활용, 사내 도구, 유료 서비스 포함 등)** — 사전 문의 필요
>
> 사익 추구 목적으로 사용하시려는 경우, 반드시 아래 연락처로 먼저 문의해 주세요.

> **🇺🇸 English**
>
> This software is freely available for **public benefit purposes**.
>
> - ✅ Academic research, education, and non-profit institutions — **free, no restrictions**
> - ✅ Personal learning and open-source contributions — **free, no restrictions**
> - ⚠️ **Commercial use (including internal business tools, paid services, or for-profit applications)** — prior inquiry required
>
> If you intend to use this for commercial or for-profit purposes, please contact us before doing so.

📩 **문의 / Contact**: GitHub Issues 탭에서 문의해 주세요 / Please reach out via the GitHub Issues tab

---

## ✨ 주요 기능 / Features

| 기능 / Feature | 설명 / Description |
|---|---|
| 🔬 **가상 스크리닝** Virtual Screening | 대용량 화합물 라이브러리 고처리량 스크리닝 / High-throughput screening of large compound libraries |
| 🧲 **분자 도킹** Molecular Docking | 결합 친화도 및 포즈 예측 / Binding affinity and pose prediction |
| 💊 **ADMET 분석** ADMET Analysis | 흡수/분포/대사/배설/독성 평가 / Absorption, distribution, metabolism, excretion & toxicity |
| 📊 **SAR 분석** SAR Analysis | 구조-활성 관계 분석 및 리드 최적화 / Structure-activity relationship & lead optimization |
| 🎯 **선택성 프로파일** Selectivity Profiling | 키놈/프로테옴 대비 선택성 분석 / Selectivity analysis across kinome/proteome |

---

## 🚀 빠른 시작 / Quick Start

### 1. 저장소 클론 / Clone

```bash
git clone https://github.com/YOUR_USERNAME/proteinscreen-ai.git
cd proteinscreen-ai
```

### 2. 의존성 설치 / Install Dependencies

```bash
npm install
```

### 3. 환경 변수 설정 / Set Environment Variables

```bash
cp .env.example .env
# .env 파일을 열고 ANTHROPIC_API_KEY 설정
# Open .env and set your ANTHROPIC_API_KEY
```

[Anthropic Console](https://console.anthropic.com)에서 API 키를 발급받으세요.
*Get your API key at the Anthropic Console.*

### 4. 서버 실행 / Run Server

```bash
# 프로덕션 / Production
npm start

# 개발 모드 (자동 재시작) / Development (auto-restart)
npm run dev
```

### 5. 브라우저 접속 / Open Browser

```
http://localhost:3000
```

---

## 🏗 프로젝트 구조 / Project Structure

```
proteinscreen-ai/
├── frontend/
│   └── index.html          # Single-page UI (HTML/CSS/JS, zero dependencies)
├── backend/
│   └── server.js           # Express + Anthropic SDK proxy
├── docs/
│   └── api.md              # API 문서 / API Documentation
├── .env.example            # 환경 변수 템플릿 / Environment variable template
├── .gitignore
├── package.json
└── README.md
```

---

## 🔌 API 엔드포인트 / API Endpoints

### `POST /api/chat`
AI 에이전트와 대화 / Chat with the AI agent

```json
{
  "messages": [
    { "role": "user", "content": "EGFR 타겟 화합물 분석해줘" }
  ],
  "target": "EGFR"
}
```

### `POST /api/chat/stream`
스트리밍 응답 / Streaming response (Server-Sent Events)

### `POST /api/compound/properties`
화합물 물성 계산 / Compound property calculation

```json
{
  "smiles": "CCOc1cc2ncnc(Nc3ccc(F)c(Cl)c3)c2cc1OCC",
  "compoundId": "CPD-2847"
}
```

### `GET /api/health`
서버 상태 확인 / Server health check

---

## 🧬 지원 타겟 단백질 / Supported Target Proteins

- **EGFR** — Epidermal Growth Factor Receptor (Tyrosine Kinase)
- **KRAS G12C** — 종양 유발 GTPase / Oncogenic GTPase (mutation-selective inhibitor)
- **ACE2** — Angiotensin-Converting Enzyme 2 (Metalloprotease)
- **CDK4/6** — 세포 주기 조절 키나아제 / Cell Cycle Regulatory Kinase
- **BCL-2** — 항세포사멸 단백질 / Anti-apoptotic Protein

---

## 🔮 로드맵 / Roadmap

- [ ] RDKit.js 연동 — 실시간 2D/3D 구조 시각화 / Real-time 2D/3D structure visualization
- [ ] ChEMBL API 연동 — 실제 화합물 데이터베이스 / Live compound database integration
- [ ] AutoDock Vina WASM — 브라우저 내 분자 도킹 / In-browser molecular docking
- [ ] SwissADME API — ADMET 실제 예측 / Real ADMET prediction
- [ ] PDB 구조 뷰어 — 3D 단백질 구조 렌더링 / 3D protein structure rendering
- [ ] 사용자 인증 및 스크리닝 히스토리 저장 / User auth & screening history
- [ ] CSV 결과 내보내기 / CSV export of results

---

## 🤝 기여 / Contributing

이 프로젝트는 공익적 목적의 오픈 사이언스를 위해 만들어졌습니다. Pull Request와 Issue를 환영합니다!
*This project is built for open science and public benefit. PRs and Issues are welcome!*

1. Fork the repository
2. Feature branch 생성 / Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit (`git commit -m 'feat: add amazing feature'`)
4. Push (`git push origin feat/amazing-feature`)
5. Pull Request 오픈 / Open a Pull Request

---

## 📄 라이선스 / License

**수정된 MIT 라이선스 / Modified MIT License**

- 공익적 사용: 자유롭게 사용, 수정, 배포 가능 / Public use: free to use, modify, and distribute
- 영리적 사용: 사전 문의 필요 / Commercial use: prior contact required

자세한 내용은 [LICENSE](./LICENSE) 파일을 참고하세요.
*See the [LICENSE](./LICENSE) file for details.*

---

## 💡 사용 기술 / Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML/CSS/JS (zero dependencies) |
| Backend | Node.js, Express |
| AI Engine | Anthropic Claude (claude-sonnet-4) |
| Purpose | 공익적 신약 개발 지원 / Public-benefit drug discovery |

---

<div align="center">

**공익을 위해, 과학을 위해.**
*For the public good. For science.*

</div>
