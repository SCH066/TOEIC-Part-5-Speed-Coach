# PROJECT_CONTEXT.md — 專案協作錨點
版本: 1.0.0
日期: 2026-02-03

---

## 1) 專案基本資訊

| 項目 | 內容 |
|------|------|
| 專案名稱 | TOEIC Part 5 Speed Coach |
| 目前版本 | v1.3.0 → 重構中 → v1.4.0 |
| 專案類型 | Web App（靜態 SPA） |
| 專案階段 | 重構中（MVP 優化） |
| 授權 | MIT License |
| 部署 | GitHub → Zeabur |

---

## 2) 技術架構

### 技術棧
```
前端：Pure Vanilla JavaScript + HTML5 + CSS3（無框架）
資料：localStorage（瀏覽器本地）
部署：靜態網站（Zeabur）
```

### 檔案結構
```
/
├── index.html          # 主頁面（SPA 入口）
├── css/
│   └── style.css       # 樣式表
├── js/
│   └── app.js          # 主程式邏輯
├── data/
│   └── questions.js    # 題庫資料
├── docs/               # 專案文件（本次新增）
│   ├── DOCS_SYSTEM.md
│   ├── ROADMAP.md
│   ├── MVP-SPEC.md
│   ├── PRD.md
│   ├── PROJECT_CONTEXT.md
│   ├── AI_WORKFLOW.md
│   └── STATUS.md
├── README.md
├── CHANGELOG.md
└── LICENSE
```

### 核心資料結構
```javascript
// localStorage key: 'toeicCoachData'
{
  userProfile: { targetScore, recentScore, weakness, startDate },
  quizHistory: [{ questionId, text, userAnswer, correctAnswer, timeTaken, isCorrect, tags, timestamp }],
  mistakeBook: [{ questionId, text, userAnswer, correctAnswer, tags, analysis, timestamp,
                  repetitions, interval, easeFactor, nextReviewDate }],
  vocabulary: [{ word, definition, example, source, timestamp }]
}
```

---

## 3) 技術限制與邊界

### 硬限制
| 限制 | 說明 | 影響 |
|------|------|------|
| localStorage 容量 | 約 5MB | 長期使用可能滿載 |
| 無後端 | 純前端靜態網站 | 無法雲端同步 |
| 無帳號系統 | 無用戶識別 | 換瀏覽器資料不同步 |

### 設計決策
| 決策 | 原因 |
|------|------|
| 使用 Vanilla JS | 輕量、無相依性、練習用 |
| 靜態題庫 | 簡化架構，不需後端 |
| 本地儲存 | 隱私優先，無資料上傳 |

---

## 4) 技術債分析

### 已知技術債

| ID | 問題 | 影響 | 處理方式 |
|----|------|------|----------|
| TD-01 | 抽題演算法無冷卻機制 | 題目感覺重複 | [F-01] 本次修復 |
| TD-02 | localStorage 錯誤處理不完整 | 資料損壞時可能崩潰 | [F-02] 本次修復 |
| TD-03 | 題庫僅 30 題 | 重複感明顯 | [E-02] 本次擴充 |
| TD-04 | 固定 10 題/輪 | 不適合短時間使用 | [E-01] 本次優化 |

### 潛在技術債（暫不處理）

| 問題 | 原因 |
|------|------|
| 單一 app.js 檔案 | 目前規模可接受，未來可考慮模組化 |
| 無自動化測試 | MVP 階段手動測試即可 |
| 無 TypeScript | Vanilla JS 練習專案 |

---

## 5) Current Focus / Next / Blockers

### Current Focus
- Sprint 1: MVP 重構
- 目標：修復已知問題 → 發佈 v1.4.0 到 GitHub

### Next Actions
1. [F-01] 實作抽題冷卻機制
2. [F-02] 強化資料安全
3. [E-01] 實作題數選擇
4. [E-02] 擴充題庫
5. [E-03] 加入 PWA 支援
6. [D-01][D-02][D-03] 更新文件

### Blockers
- 無

---

## 6) Roadmap Reference

完整工作清單請見 [ROADMAP.md](./ROADMAP.md)

### Sprint 1 項目
- [F-01] 抽題演算法優化
- [F-02] 資料安全強化
- [E-01] 題數彈性化
- [E-02] 題庫擴充
- [E-03] PWA 基礎建設
- [D-01] README 更新
- [D-02] LICENSE 確認
- [D-03] CHANGELOG 更新

---

## 7) Decision Log（Append-Only）

| 日期 | 決策 | 原因 | 影響 |
|------|------|------|------|
| 2026-02-03 | 建立 SDD 文件系統 | 規範化專案管理 | 新增 /docs/ 資料夾 |
| 2026-02-03 | MVP 不做雲端同步 | 保持簡單、維護 JSON 備份 | 用戶需手動匯出入 |
| 2026-02-03 | MVP 不做多語系 | 維持繁體中文 | 無國際化支援 |
| 2026-02-03 | 加入 PWA 支援 | 實現「像 App 一樣使用」的願景 | 新增 manifest + SW |
| 2026-02-03 | 題數彈性化（3/5/10） | 適應零碎時間使用場景 | 修改 Quiz 流程 |

---

## 8) 協作規則

### AI 可以做
- 提供程式碼建議與實作
- 整理文件與測試步驟
- 指出潛在問題與優化方向

### AI 不可以做
- 未經確認就修改核心邏輯
- 自行決定功能優先級
- 勾選驗收完成

### Owner 負責
- 決定功能優先級
- 判定驗收是否通過
- 最終發佈決策
