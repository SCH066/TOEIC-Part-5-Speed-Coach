# DOCS_SYSTEM.md — SDD 開發 SOP & 文件責任分工
版本: 1.0.0
日期: 2026-02-03

> 本文件定義 TOEIC Part 5 Speed Coach 專案的文件系統規則與協作流程。

---

## 0) 檔案清單（共 7 份）

| 檔案 | 用途 |
|------|------|
| `ROADMAP.md` | 唯一工作清單 / 命名字典 |
| `STATUS.md` | 當前 Sprint 看板 |
| `PROJECT_CONTEXT.md` | 協作續航錨點；含 Decision Log |
| `PRD.md` | 產品故事 + 範圍 |
| `MVP-SPEC.md` | 可測驗收規格 |
| `AI_WORKFLOW.md` | AI 協作操作手冊 |
| `DOCS_SYSTEM.md` | 本文件；系統規則 |

---

## 1) 文件責任分工

### 1.1 ROADMAP.md（唯一工作清單 / 命名字典）
- 所有工作項目的 **ID 與 Title** 的唯一來源
- Owner 主導；AI 只能提案，不可自行新增項目

### 1.2 STATUS.md（當前 Sprint 看板）
- 只反映「現在這個 Sprint」的進度
- 只引用 ROADMAP 的項目 ID
- AI 不得擅自勾選完成

### 1.3 PROJECT_CONTEXT.md（協作錨點；唯一 Decision Log）
- 專案邊界、技術限制、協作規則
- Decision Log 為 append-only

### 1.4 PRD.md（產品故事 + 範圍）
- 說明產品「為什麼存在、解決什麼問題、MVP 做什麼」
- 區分 Legacy（現有）與 Roadmap（計畫）功能

### 1.5 MVP-SPEC.md（可測驗收規格）
- 放「可測」的行為規格與驗收條件（AC）
- 反映現有系統的真實行為

### 1.6 AI_WORKFLOW.md（操作手冊）
- 定義人機協作流程與禁區

---

## 2) 命名與引用規則

### 2.1 ID 格式
- Legacy 功能：`L-<nn>`（例：`L-01`）
- 修復任務：`F-<nn>`（例：`F-01`）
- 優化任務：`E-<nn>`（例：`E-01`）
- 文件任務：`D-<nn>`（例：`D-01`）

### 2.2 狀態語彙
| 狀態 | 說明 |
|------|------|
| `Done` | 已完成（Legacy 功能） |
| `Now` | 當前 Sprint 進行中 |
| `Next` | 下一個要做 |
| `Candidate` | 候選，尚未排程 |

### 2.3 引用格式
- 所有文件提到任務時，必須使用 `[ID] Title` 格式
- 例：`[F-01] 抽題演算法優化`

---

## 3) 改動順序

1. 先改 ROADMAP（新增/修改項目）
2. 依 ROADMAP 同步更新 PRD / MVP-SPEC
3. 進 Sprint 才更新 STATUS
4. 變更決策記錄到 PROJECT_CONTEXT

---

## 4) 硬規則

- AI 不得：
  - 未經 Owner 允許就勾選完成
  - 在非 ROADMAP 的文件中新增工作項目 ID
  - 宣稱「已驗收」；只能提供測試步驟
- Owner 才能：
  - 判定 Done、勾選完成
  - 修改 ROADMAP 的 ID/Title
