# TOEIC Part 5 Speed Coach

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.4.0-green.svg)
![Tech](https://img.shields.io/badge/stack-HTML%20%7C%20JS%20%7C%20CSS-orange.svg)
![PWA](https://img.shields.io/badge/PWA-ready-blueviolet.svg)

**從「答對」到「快速答對」**

TOEIC Part 5 Speed Coach 是一款專為多益 (TOEIC) 考生設計的 PWA 應用程式，旨在解決 Part 5 句子填空題的兩大核心痛點：**答題速度不足**與**模式識別緩慢**。

在 75 分鐘內完成 100 題聽力與 100 題閱讀的挑戰中，Part 5 的 30 題必須成為「得分加速器」。本應用程式透過嚴格的計時與科學化的演算法，將您的訓練目標從「答對」提升到「快速答對」。

---

## 核心訓練目標

| 題型分類 | 目標完成時間 | 訓練目的 |
| :--- | :--- | :--- |
| **文法 (Grammar)** | **< 10 秒** | 訓練對句型結構、時態、詞性等規則的直覺反應 |
| **字彙 (Vocabulary)** | **< 30 秒** | 訓練對詞義、搭配詞 (Collocation) 的快速提取 |

---

## 主要功能

### 彈性練習模式
- **自選題數**：3 題 / 5 題 / 10 題，適應不同的零碎時間
- **智慧抽題**：優先抽取弱點領域與 SRS 到期題目
- **防重複機制**：同一題在連續 3 輪內不重複出現

### SRS 複習系統
- 內建 Spaced Repetition System (SM-2 演算法)
- 根據答題品質自動計算下次複習時間
- 錯題本顯示 SRS 狀態與複習排程

### 全選項分析
- 每題提供 A/B/C/D 四個選項的詳細解析
- 答題後顯示題目標籤，幫助識別題型

### 智慧單字庫
- Smart Vocab 智慧推薦，一鍵收藏生字
- Flip Card 翻轉卡片，互動式複習

### 資料管理
- JSON 完整備份與還原
- CSV 匯出答題記錄
- localStorage 自動儲存，隱私無虞

### PWA 支援
- 可加到手機主畫面，像 App 一樣使用
- 支援離線存取

---

## 技術棧

- **前端**：Pure Vanilla JavaScript, HTML5, CSS3（無框架）
- **儲存**：瀏覽器 localStorage
- **部署**：靜態網站，可部署於 Zeabur、Vercel、GitHub Pages 等

---

## 快速開始

### 方法 1：直接開啟
雙擊 `index.html` 或拖入瀏覽器即可使用。

### 方法 2：本地伺服器（推薦，PWA 需要）
```bash
# 在專案根目錄執行
python3 -m http.server 8000
```
然後開啟瀏覽器訪問 `http://localhost:8000`

### 方法 3：加到手機主畫面
1. 用手機瀏覽器開啟網站
2. 點擊「分享」→「加入主畫面」
3. 從主畫面開啟，享受 App 般的體驗

---

## 專案結構

```
/
├── index.html          # 主頁面
├── manifest.json       # PWA 設定
├── service-worker.js   # 離線快取
├── css/
│   └── style.css       # 樣式表
├── js/
│   └── app.js          # 主程式邏輯
├── data/
│   └── questions.js    # 題庫（50 題）
└── docs/               # 專案文件
```

---

## 授權條款

本專案採用 [MIT License](LICENSE) 授權，歡迎自由使用與修改。
