# Changelog (更新日誌)

## [v1.4.0] - 2026-02-03

### New Features (新功能)

- **彈性題數選擇 [E-01]**
  - 新增每輪題數選擇功能（3 題 / 5 題 / 10 題）
  - 適應不同零碎時間的練習場景

- **智慧抽題冷卻機制 [F-01]**
  - 同一題在連續 3 輪內不重複出現
  - 同一題型每輪最多出現 3 題
  - SRS 到期題目不受冷卻限制，複習優先

- **PWA 支援 [E-03]**
  - 新增 `manifest.json` 與 `service-worker.js`
  - 支援「加到主畫面」功能
  - 支援離線存取

- **題庫擴充 [E-02]**
  - 題庫從 30 題擴充至 50 題
  - 題型分佈更均衡

### Improvements (改進)

- **資料安全強化 [F-02]**
  - localStorage 讀寫加入完整錯誤處理
  - 資料載入時驗證必要欄位
  - 損壞資料不影響其他正常資料

### Documentation (文件)

- 更新 README.md，新增 PWA 使用說明
- 新增 `/docs/` 資料夾，包含專案規格文件

---

## [v1.3.0] - 2026-01-08

### 🌟 New Features (新功能)

- **Custom UI Modals (自定義彈窗)**
  - 全面移除瀏覽器原生的 `alert()` 與 `confirm()` 視窗。
  - 導入 Apple-style 設計語言的模態視窗，具備磨砂玻璃 (Backdrop Blur) 背景與流暢動畫。
  - 支援 `Promise` 非同步操作，確保使用者體驗不中斷。

- **Safe LocalStorage (資料安全防護)**
  - 新增資料儲存的錯誤處理機制 (Error Handling)。
  - 當瀏覽器本地儲存空間 (LocalStorage) 額滿時，會彈出友善提示，防止應用程式崩潰。

### 🐛 Bug Fixes (錯誤修正)

- **Smart Vocab Rendering**: 修正了在測驗回饋介面中，智慧單字推薦 (Smart Vocab Chips) 錯誤顯示為 `[object Object]` 的問題。現在能正確顯示單字內容。
- **CSS Standardization**: 統一了部分分散的 CSS 顏色變數，確保 Dark Mode 未來擴充的相容性。

### 📝 Documentation & Deployment (文件與部署)

- **Localization**: 專案文件 (`README.md`) 全面中文化，包含詳細的功能介紹與 Zeabur/本地部署教學。
- **Git Optimization**: 新增標準化 `.gitignore` 文件，排除系統暫存檔與 IDE 設定檔，確保 Repo 乾淨整潔。

---

## [v1.2.0] - Previous Version
- Initial release of Bento Grid UI.
- Added Spaced Repetition System (SRS) algorithm.
