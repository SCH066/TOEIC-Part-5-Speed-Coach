# ROADMAP.md — 工作清單與命名字典
版本: 1.0.0
日期: 2026-02-03

> 本文件是所有工作項目的唯一來源。其他文件必須引用此處的 ID 與 Title。

---

## Legacy Features（既有功能，已完成）

| ID | Title | 狀態 | 說明 |
|----|-------|------|------|
| L-01 | Onboarding 流程 | Done | 設定目標分數、最近成績、弱點領域 |
| L-02 | Dashboard 總覽 | Done | 顯示統計數據：平均速度、正確率、已完成測驗數 |
| L-03 | Quiz 測驗系統 | Done | 10 題一輪、計時答題、即時回饋、全選項分析 |
| L-04 | 錯題本 (Mistake Book) | Done | 錯題記錄、標籤過濾、SRS 狀態顯示 |
| L-05 | SRS 演算法 | Done | SM-2 簡化版，管理錯題複習間隔 |
| L-06 | 單字庫 (Word Bank) | Done | Smart Vocab 收藏、Flip Card 複習 |
| L-07 | 資料管理 | Done | JSON/CSV 匯出入、重置功能 |
| L-08 | Custom Modal | Done | Apple-style 彈窗，取代原生 alert |
| L-09 | Bento Grid UI | Done | Apple-style 卡片式佈局 |
| L-10 | localStorage 容量保護 | Done | try-catch 防止儲存滿載崩潰 |

---

## Sprint 1: MVP 重構（Now）

### Bug Fix（修復）

| ID | Title | 狀態 | 說明 |
|----|-------|------|------|
| F-01 | 抽題演算法優化 | Now | 加入同題冷卻機制，避免短期內重複抽到相同題目 |
| F-02 | 資料安全強化 | Now | localStorage 讀寫加入更完整的錯誤處理與資料驗證 |

### Enhancement（優化）

| ID | Title | 狀態 | 說明 |
|----|-------|------|------|
| E-01 | 題數彈性化 | Now | 用戶可選擇每輪題數（3/5/10 題） |
| E-02 | 題庫擴充 | Now | 增加更多題目（目前 30 題） |
| E-03 | PWA 基礎建設 | Now | 加入 manifest.json + service worker，支援加到主畫面 |

### Documentation（文件）

| ID | Title | 狀態 | 說明 |
|----|-------|------|------|
| D-01 | README 更新 | Now | 確保說明清楚、Demo 連結正確 |
| D-02 | LICENSE 確認 | Now | 確認 MIT 授權檔案完整 |
| D-03 | CHANGELOG 更新 | Now | 記錄本次重構的版本變更（v1.4.0） |

---

## Out of Scope（明確排除）

| 項目 | 原因 |
|------|------|
| 雲端同步 | MVP 不做，維持 localStorage |
| 多語系 | MVP 不做，維持繁體中文 |
| 用戶資料收集 | 不收集，隱私優先 |
| 帳號登入系統 | 維持無帳號設計 |
| 用戶自訂題庫匯入 | 維持靜態題庫 |

---

## Future Candidates（未來候選）

| ID | Title | 說明 |
|----|-------|------|
| C-01 | 深色模式 | 支援 Dark Mode |
| C-02 | 更多題型標籤 | 細分題型分類 |
| C-03 | 學習數據視覺化 | 圖表呈現進步曲線 |
