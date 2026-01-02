# 🚀 TOEIC Part 5 Speed Coach

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Tech](https://img.shields.io/badge/stack-HTML%20%7C%20JS%20%7C%20CSS-orange.svg)

**🌟 專案簡介：從「答對」到「快速答對」**

TOEIC Part 5 Speed Coach 是一款專為多益 (TOEIC) 考生設計的單頁應用程式 (SPA)，旨在解決 Part 5 句子填空題的兩大核心痛點：**答題速度不足**與**模式識別緩慢**。

我們相信，在 75 分鐘內完成 100 題聽力與 100 題閱讀的挑戰中，Part 5 的 30 題必須成為「得分加速器」。本應用程式透過嚴格的計時與科學化的演算法，將您的訓練目標從「答對」提升到「快速答對」。

🔗 **實時演示 (Live Demo):** https://toeiccoach.zeabur.app

---

## 💡 核心產品哲學：速度與模式識別

本工具的教學設計遵循嚴格的計時標準，旨在訓練考生在壓力下快速識別題型。在測驗過程中，**題目類型會被隱藏**，只有在作答後才會揭露，模擬真實考場的壓力與情境。

| 題型分類 | 目標完成時間 | 訓練目的 |
| :--- | :--- | :--- |
| **文法 (Grammar)** | **< 10 秒** | 訓練對句型結構、時態、詞性等規則的直覺反應。 |
| **字彙 (Vocabulary)** | **< 30 秒** | 訓練對詞義、搭配詞 (Collocation) 的快速提取。 |

## ✨ 主要功能特色

### 🎨 Apple-Style UI
* 採用 Apple iOS/Health App 的極簡主義設計，搭配 **Bento Grid** (便當盒) 卡片式佈局。
* 具備柔和陰影、流暢圓角與系統級色彩，提供優雅且專注的學習體驗。

### 🤖 Adaptive Quiz Algorithm (自適應演算法)
* **動態加權隨機抽題**：不再是隨機出題！每次測驗的 10 題會優先抽取使用者設定的「弱點領域」與「錯題本」中的題目。
* 確保訓練資源集中在最需要加強的部分。

### 📖 Mistake Notebook (錯題本)
* 自動記錄所有答錯的題目。
* 新增**標籤過濾器**，可依「時態」、「介系詞」等主題進行針對性複習。
* 實現科學化的「間隔重複 (Spaced Repetition)」複習機制。

### 🔍 Full-Option Analysis (全選項分析)
* 每題解析不再僅限於正確答案，而是提供 **A, B, C, D 四個選項**的詳細錯誤分析。
* 幫助使用者理解錯誤原因，避免下次再犯。

### 🗂️ Word Bank (單字庫)
* 測驗中可一鍵收藏關鍵單字。
* 提供 **Flip Card (翻轉卡片)** 介面，以互動方式複習收藏的字彙，強化記憶效率。

### 💾 Data Management (數據管理)
* 支援將學習記錄匯出為 **CSV 格式** (含 BOM 編碼，Excel 可直接開啟)。
* 方便使用者在 Excel 或 Google Sheets 中進行深度分析。

## 💻 技術棧 (Tech Stack)

本專案是一個極致輕量化的靜態單頁應用程式 (SPA)，追求最高效能與最低部署成本：

* **前端 (Frontend)**: Pure Vanilla JavaScript, HTML5, CSS3 (無任何框架或函式庫)。
* **資料持久化 (Persistence)**: 瀏覽器 `localStorage` (所有數據皆儲存在本地，保護用戶隱私)。
* **架構 (Architecture)**: Single-File HTML (所有程式碼、樣式、數據皆打包在一個 `index.html` 檔案中)。

## 🚀 快速開始 (How to Use)

### 1. 部署與運行
本專案是一個靜態 HTML 檔案，您可以透過以下任一方式運行：

**A. 本地運行 (Local Run)**
1. 下載本專案的 `index.html` 檔案。
2. 使用任何現代瀏覽器 (Chrome, Safari, Edge) 直接開啟該檔案即可。

**B. 部署至雲端 (Deployment)**
只需將整個儲存庫上傳至 **Zeabur**、**Netlify** 或 **GitHub Pages** 即可自動部署。
*(注意：請確保主檔案名稱為 `index.html`)*

### 2. 使用步驟
1. **Onboarding**：首次進入，設定您的目標分數與弱點領域。
2. **Start Quiz**：點擊「開始測驗」，系統將根據您的弱點動態生成 10 題。
3. **Review**：作答後，查看詳細的 A-D 選項分析，並將答錯的題目自動存入錯題本。
4. **Reinforce**：定期進入「錯題本」與「單字庫」進行針對性複習。

## 🤝 貢獻與反饋

歡迎所有形式的貢獻與反饋！如果您發現任何 Bug 或有新的功能建議，請隨時提交 Issue 或 Pull Request。

## 📜 授權條款

本專案採用 [MIT License](LICENSE) 授權。詳情請見 LICENSE 文件。
