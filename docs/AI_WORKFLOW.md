# AI_WORKFLOW.md — AI 協作操作手冊
版本: 1.0.0
日期: 2026-02-03

---

## 1) 協作模式概述

本專案採用 SDD（Spec-Driven Development）流程，AI 作為協作夥伴協助開發與維護。

### 核心原則
- **文件先行**：修改程式碼前先確認 ROADMAP 與 MVP-SPEC
- **規格驅動**：所有功能必須對應可測的驗收條件（AC）
- **Owner 決策**：AI 提供建議，Owner 做最終決定

---

## 2) 工作流程

### Phase 1: PRIME（啟動）
1. AI 讀取 PROJECT_CONTEXT.md 了解專案現況
2. AI 讀取 ROADMAP.md 確認當前任務
3. AI 讀取 STATUS.md 了解 Sprint 進度

### Phase 2: LOOP（開發迴圈）
```
選取任務 → 確認 AC → 實作 → 測試 → 回報結果
     ↑                              |
     └──────────────────────────────┘
```

1. 從 STATUS.md 選取 `Now` 狀態的任務
2. 查閱 MVP-SPEC.md 確認驗收條件
3. 實作程式碼變更
4. 執行 Smoke Test 驗證
5. 回報結果給 Owner

### Phase 3: COMMIT & REFLECT（收尾）
1. Owner 確認驗收通過
2. AI 協助更新 CHANGELOG.md
3. AI 協助更新 STATUS.md（由 Owner 勾選完成）
4. 重大決策記錄到 PROJECT_CONTEXT.md Decision Log

---

## 3) 檔案操作規則

### 可以自由修改
- `js/app.js` - 主程式邏輯
- `css/style.css` - 樣式表
- `data/questions.js` - 題庫資料
- `index.html` - 頁面結構

### 需確認後修改
- `docs/*.md` - 專案文件（需 Owner 確認內容）
- `README.md` - 專案說明
- `CHANGELOG.md` - 版本記錄

### 不可自行修改
- `LICENSE` - 授權檔案（除非 Owner 要求）

---

## 4) 任務執行指南

### 開始任務時
```markdown
我現在要開始 [F-01] 抽題演算法優化。

根據 MVP-SPEC，驗收條件是：
- [ ] 同一題在連續 3 輪內不重複出現
- [ ] 同一題型在同一輪內最多出現 3 題
- [ ] 冷卻機制不影響 SRS 到期題目的優先抽取

我的實作計畫是：...
```

### 完成任務時
```markdown
[F-01] 抽題演算法優化 已完成實作。

變更摘要：
- 修改 generateQuizQueue() 函數
- 新增 questionCooldown Map 追蹤最近出現的題目
- 新增 typeLimitPerRound 控制同題型數量

測試結果：
- [x] 連續 3 輪測試，無題目重複
- [x] 單輪內同題型最多 3 題
- [x] SRS 到期題目仍優先出現

請 Owner 驗收。
```

---

## 5) 禁區（Hard Rules）

### AI 不得
- 未經確認刪除或覆蓋用戶資料
- 自行判定任務完成並勾選 checkbox
- 在 ROADMAP 之外自創工作項目 ID
- 宣稱「已驗收」或「測試全過」
- 未讀取相關程式碼就提出修改建議

### AI 應該
- 修改前先讀取目標檔案
- 提供測試步驟供 Owner 驗證
- 遇到不確定的地方先詢問
- 保持程式碼簡潔，避免過度工程

---

## 6) 常用指令模板

### 查看當前進度
```
請讀取 STATUS.md，告訴我目前 Sprint 的進度。
```

### 開始特定任務
```
請開始 [F-01] 抽題演算法優化，先告訴我你的實作計畫。
```

### 請求程式碼審查
```
請檢查 app.js 的 generateQuizQueue 函數，看有沒有潛在問題。
```

### 更新文件
```
[F-01] 已完成，請幫我更新 STATUS.md 和 CHANGELOG.md。
```

---

## 7) 部署流程

### 本地測試
1. 使用 Live Server 或 `python3 -m http.server 8000`
2. 開啟 `http://localhost:8000`
3. 執行 MVP-SPEC 的 Smoke Test

### 發佈到 GitHub
```bash
git add .
git commit -m "feat: [任務ID] 任務描述"
git push origin main
```

### Zeabur 自動部署
- Push 到 GitHub 後 Zeabur 會自動部署
- 確認 Demo 網址可正常存取

---

## 8) Commit Message 規範

```
<type>: [ID] <description>

type:
- feat: 新功能
- fix: 錯誤修復
- docs: 文件更新
- style: 樣式調整（不影響邏輯）
- refactor: 重構（不新增功能或修復錯誤）
- chore: 雜項（建置、設定等）

範例:
feat: [E-01] 新增題數選擇功能（3/5/10題）
fix: [F-01] 修復題目重複出現的問題
docs: [D-01] 更新 README 說明與 Demo 連結
```
