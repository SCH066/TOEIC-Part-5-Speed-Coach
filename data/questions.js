// ===== 題庫資料 (30 題 - 高擬真 TOEIC Part 5) =====
const questionsDatabase = [
    {
        id: 1,
        text: "Ms. Tanaka ____ the keynote speech at the international conference last Tuesday.",
        options: ["delivered", "delivers", "will deliver", "delivering"],
        correctIndex: 0,
        tags: ["Tense", "Past_Simple"],
        vocab: [
            { word: "keynote speech", def: "主題演講", example: "The CEO gave an inspiring keynote speech." },
            { word: "conference", def: "會議", example: "She attended a medical conference in London." },
            { word: "delivered", def: "發表 (演講)", example: "He delivered a powerful presentation." }
        ],
        analysis: {
            A: "delivered - 正確。時間副詞 'last Tuesday' 指示過去時間，應使用過去式。",
            B: "delivers - 現在單數，與過去時間不符。",
            C: "will deliver - 未來式，與過去時間不符。",
            D: "delivering - 現在分詞無法單獨作謂語。"
        }
    },
    {
        id: 2,
        text: "All employees are required to review the safety guidelines ____ operating the new machinery.",
        options: ["during", "before", "so", "that"],
        correctIndex: 1,
        tags: ["Preposition", "Process"],
        vocab: [
            { word: "safety guidelines", def: "安全守則", example: "Please follow the safety guidelines strictly." },
            { word: "operating", def: "操作", example: "He is experienced in operating heavy machinery." },
            { word: "required", def: "必須的", example: "Attendance at the meeting is required." }
        ],
        analysis: {
            A: "during - 表示在...期間，雖然語法可通，但邏輯上應是先看守則再操作。",
            B: "before - 正確。表示在操作機器「之前」必須先檢閱安全守則，符合邏輯。",
            C: "so - 連接詞，位置不正確。",
            D: "that - 關係代名詞或連接詞，在此無法連接 V-ing。"
        }
    },
    {
        id: 3,
        text: "The marketing director is ____ optimistic about the launch of the new product line.",
        options: ["cautious", "cautiously", "caution", "cautionary"],
        correctIndex: 1,
        tags: ["PartOfSpeech", "Adverb"],
        vocab: [
            { word: "optimistic", def: "樂觀的", example: "They are optimistic about the sales figures." },
            { word: "launch", def: "發布/上市", example: "The product launch is scheduled for May." },
            { word: "cautiously", def: "謹慎地", example: "She smiled cautiously at the stranger." }
        ],
        analysis: {
            A: "cautious - 形容詞，不能修飾另一個形容詞 (optimistic)。",
            B: "cautiously - 正確。副詞修飾形容詞 'optimistic'，表示「審慎樂觀」。",
            C: "caution - 名詞/動詞，不符合詞性。",
            D: "cautionary - 形容詞，意為「警告的」，不符合語意。"
        }
    },
    {
        id: 4,
        text: "Despite the budget cuts, the renovation project is proceeding ____ planned.",
        options: ["as", "like", "so", "than"],
        correctIndex: 0,
        tags: ["Conjunction", "Comparison"],
        vocab: [
            { word: "budget cuts", def: "預算刪減", example: "The school faced severe budget cuts." },
            { word: "renovation", def: "整修/翻新", example: "The office is closed for renovation." },
            { word: "proceeding", def: "繼續進行", example: "The meeting is proceeding as scheduled." }
        ],
        analysis: {
            A: "as - 正確。'as planned' (按計畫) 是固定搭配，省略了 'it was'。",
            B: "like - 介系詞，後面通常接名詞，不接分詞。",
            C: "so - 不符合此句型。",
            D: "than - 用於比較級，此處無比較意涵。"
        }
    },
    {
        id: 5,
        text: "Please distinctively label the boxes ____ contain fragile items.",
        options: ["who", "whose", "which", "where"],
        correctIndex: 2,
        tags: ["Conjunction", "Relative_Clause"],
        vocab: [
            { word: "distinctively", def: "清楚地/獨特地", example: "The cafe is distinctively decorated." },
            { word: "fragile", def: "易碎的", example: "Handle this box with care; it's fragile." },
            { word: "contain", def: "包含", example: "Does this dish contain nuts?" }
        ],
        analysis: {
            A: "who - 先行詞是指人時使用。",
            B: "whose - 表示所有格。",
            C: "which - 正確。先行詞 'boxes' 是物，且在子句中作主詞。",
            D: "where - 關係副詞，後面需接完整子句，不能直接接動詞 'contain'。"
        }
    },
    {
        id: 6,
        text: "The CEO emphasizes that innovation is essential for the company's ____ growth.",
        options: ["continue", "continued", "continuing", "continuation"],
        correctIndex: 1,
        tags: ["PartOfSpeech", "Adjective"],
        vocab: [
            { word: "emphasizes", def: "強調", example: "The report emphasizes the need for change." },
            { word: "innovation", def: "創新", example: "Technological innovation is key to success." },
            { word: "essential", def: "必要的", example: "Water is essential for life." },
            { word: "continued", def: "持續的", example: "We appreciate your continued support." }
        ],
        analysis: {
            A: "continue - 動詞原形，不能修飾名詞 'growth'。",
            B: "continued - 正確。過去分詞作形容詞，表示「持續的」狀態。",
            C: "continuing - 現在分詞也可作形容詞，但 'continued growth' 是更常見的商務搭配。",
            D: "continuation - 名詞，變成 'company's continuation growth' 語意重複且不順。"
        }
    },
    {
        id: 7,
        text: "Customers who wish to return a defective item must present a valid ____.",
        options: ["receipt", "recipe", "reception", "recipient"],
        correctIndex: 0,
        tags: ["Vocabulary", "Business_Nouns"],
        vocab: [
            { word: "defective", def: "有瑕疵的", example: "The toy was defective and had to be returned." },
            { word: "valid", def: "有效的", example: "You need a valid passport to travel." },
            { word: "receipt", def: "收據", example: "Keep your receipt as proof of purchase." },
            { word: "present", def: "出示/提交", example: "He had to present his ID at the gate." }
        ],
        analysis: {
            A: "receipt - 正確。意為「收據」，退貨必須出示文件。",
            B: "recipe - 食譜。",
            C: "reception - 接待處或接收。",
            D: "recipient - 收件人。"
        }
    },
    {
        id: 8,
        text: "The contract allows either party to terminate the agreement ____ a 30-day written notice.",
        options: ["by", "with", "on", "as"],
        correctIndex: 1,
        tags: ["Preposition", "Condition"],
        vocab: [
            { word: "terminate", def: "終止", example: "They decided to terminate the contract." },
            { word: "agreement", def: "協議", example: "We reached a mutual agreement." },
            { word: "written notice", def: "書面通知", example: "Please submit a written notice two weeks prior." }
        ],
        analysis: {
            A: "by - 通常加時間點或方法，'by a notice' 不自然。",
            B: "with - 正確。表示「附帶」或「藉由」某個條件。",
            C: "on - 不符合此搭配。",
            D: "as - 作為，不符合語意。"
        }
    },
    {
        id: 9,
        text: "Due to the inclement weather, the flight to Chicago has been ____ until further notice.",
        options: ["delayed", "relayed", "played", "decayed"],
        correctIndex: 0,
        tags: ["Vocabulary", "Transportation"],
        vocab: [
            { word: "inclement weather", def: "惡劣天氣", example: "The game was cancelled due to inclement weather." },
            { word: "delayed", def: "延誤", example: "The train was delayed by an hour." },
            { word: "further notice", def: "另行通知", example: "The office is closed until further notice." }
        ],
        analysis: {
            A: "delayed - 正確。意為「延遲」，符合天氣不佳的情境。",
            B: "relayed - 轉播/轉達。",
            C: "played - 玩/播放。",
            D: "decayed - 腐爛/衰退。"
        }
    },
    {
        id: 10,
        text: "Ms. Lee has extensive experience in ____ financial analysis and risk management.",
        options: ["both", "either", "neither", "not only"],
        correctIndex: 0,
        tags: ["Conjunction", "Paired"],
        vocab: [
            { word: "extensive", def: "廣泛的/豐富的", example: "She has extensive knowledge of art." },
            { word: "financial analysis", def: "財務分析", example: "The report includes a detailed financial analysis." },
            { word: "risk management", def: "風險管理", example: "Risk management is crucial for investment banks." }
        ],
        analysis: {
            A: "both - 正確。配合後面的 'and'，構成 'both A and B'。",
            B: "either - 搭配 'or'。",
            C: "neither - 搭配 'nor'。",
            D: "not only - 搭配 'but also'。"
        }
    },
    {
        id: 11,
        text: "The updated software operates much more ____ than the previous version.",
        options: ["efficiency", "efficient", "efficiently", "efficiencies"],
        correctIndex: 2,
        tags: ["PartOfSpeech", "Adverb"],
        vocab: [
            { word: "operates", def: "運作", example: "The machine operates smoothly." },
            { word: "efficiently", def: "有效率地", example: "We need to work more efficiently." },
            { word: "previous version", def: "舊版本", example: "The new model is faster than the previous version." }
        ],
        analysis: {
            A: "efficiency - 名詞。",
            B: "efficient - 形容詞。",
            C: "efficiently - 正確。修飾動詞 'operates' 需用副詞。",
            D: "efficiencies - 名詞複數。"
        }
    },
    {
        id: 12,
        text: "____ inquiries regarding the merger should be directed to the Public Relations department.",
        options: ["Any", "Every", "Each", "One"],
        correctIndex: 0,
        tags: ["Vocabulary", "Quantifiers"],
        vocab: [
            { word: "inquiries", def: "詢問", example: "We received many inquiries about the job." },
            { word: "merger", def: "合併", example: "The merger between the two banks was announced." },
            { word: "directed", def: "轉交/指向", example: "All questions should be directed to the manager." },
            { word: "Public Relations", def: "公共關係 (PR)", example: "She works in Public Relations." }
        ],
        analysis: {
            A: "Any - 正確。可用於肯定句表示「任何」，接複數名詞 'inquiries'。",
            B: "Every - 接單數名詞。",
            C: "Each - 接單數名詞。",
            D: "One - 接單數名詞。"
        }
    },
    {
        id: 13,
        text: "The factory is capable of producing 5,000 units ____ day.",
        options: ["a", "the", "one", "some"],
        correctIndex: 0,
        tags: ["Preposition", "Frequency"],
        vocab: [
            { word: "capable", def: "有能力的", example: "He is capable of doing better work." },
            { word: "producing", def: "生產", example: "The region is famous for producing wine." },
            { word: "units", def: "單位/個", example: "They sold over a million units." }
        ],
        analysis: {
            A: "a - 正確。表示「每一」，相當於 'per day'。",
            B: "the - 特指某一天，不符語意。",
            C: "one - 雖然是一天，但慣用語是 'a day' 或 'per day'。",
            D: "some - 一些，不符語意。"
        }
    },
    {
        id: 14,
        text: "We are pleased to announce the ____ of our new branch office in Seattle.",
        options: ["open", "opening", "opened", "opens"],
        correctIndex: 1,
        tags: ["PartOfSpeech", "Noun"],
        vocab: [
            { word: "announce", def: "宣布", example: "They announced their engagement." },
            { word: "opening", def: "開幕", example: "The grand opening is next week." },
            { word: "branch office", def: "分公司", example: "I work at the Tokyo branch office." }
        ],
        analysis: {
            A: "open - 形容詞或動詞，不能接在 'the' 之後。",
            B: "opening - 正確。動名詞/名詞，表示「開幕」這件事。",
            C: "opened - 過去式。",
            D: "opens - 現在單數。"
        }
    },
    {
        id: 15,
        text: "If you have not received your itinerary ____ Friday, please contact our support team.",
        options: ["by", "until", "for", "to"],
        correctIndex: 0,
        tags: ["Preposition", "Deadline"],
        vocab: [
            { word: "itinerary", def: "行程表", example: "Check your itinerary for flight details." },
            { word: "contact", def: "聯繫", example: "Please contact us if you have questions." },
            { word: "support team", def: "支援團隊", example: "Our support team is available 24/7." }
        ],
        analysis: {
            A: "by - 正確。表示「不遲於」Friday。",
            B: "until - 表示持續動作直到 Friday，'receive' 是瞬間動作，不合邏輯。",
            C: "for - 表一段時間。",
            D: "to - 不表期限。"
        }
    },
    {
        id: 16,
        text: "The annual report offers a detailed ____ of the company's fiscal performance.",
        options: ["analyzing", "analyze", "analysis", "analyst"],
        correctIndex: 2,
        tags: ["PartOfSpeech", "Noun"],
        vocab: [
            { word: "annual report", def: "年度報告", example: "The annual report showed strong profits." },
            { word: "fiscal performance", def: "財政表現", example: "Investors are worried about fiscal performance." },
            { word: "analysis", def: "分析", example: "His analysis of the situation was correct." },
            { word: "detailed", def: "詳細的", example: "Please give a detailed explanation." }
        ],
        analysis: {
            A: "analyzing - 動名詞，通常前不加 indefinite article 'a' 除非特定用法。",
            B: "analyze - 動詞。",
            C: "analysis - 正確。名詞，受 'a detailed' 修飾。",
            D: "analyst - 分析師 (人)，不符語意。"
        }
    },
    {
        id: 17,
        text: "Guests are kindly asked to ____ from using mobile phones during the performance.",
        options: ["reject", "refrain", "remove", "return"],
        correctIndex: 1,
        tags: ["Vocabulary", "Verbs"],
        vocab: [
            { word: "kindly asked", def: "被懇請", example: "You are kindly asked to remove your shoes." },
            { word: "refrain", def: "克制/避免", example: "Please refrain from smoking here." },
            { word: "performance", def: "表演/演出", example: "The band gave a live performance." }
        ],
        analysis: {
            A: "reject - 拒絕。",
            B: "refrain - 正確。'refrain from' (避免/克制) 是固定搭配。",
            C: "remove - 移除。",
            D: "return - 返回。"
        }
    },
    {
        id: 18,
        text: "____ the technician arrived late, he fixed the problem in record time.",
        options: ["Therefore", "However", "Although", "Despite"],
        correctIndex: 2,
        tags: ["Conjunction", "Contrast"],
        vocab: [
            { word: "technician", def: "技術人員", example: "We called a technician to fix the AC." },
            { word: "arrived late", def: "遲到", example: "The bus arrived late due to traffic." },
            { word: "record time", def: "創紀錄的時間", example: "She finished the race in record time." }
        ],
        analysis: {
            A: "Therefore - 副詞，需用分號連接。",
            B: "However - 副詞，需用分號連接。",
            C: "Although - 正確。連接詞，引導讓步子句，「雖然...但是...」。",
            D: "Despite - 介系詞，後接名詞，不能接子句 (arrived late)。"
        }
    },
    {
        id: 19,
        text: "It is imperative that the password ____ changed every three months for security reasons.",
        options: ["be", "is", "was", "are"],
        correctIndex: 0,
        tags: ["Tense", "Subjunctive"],
        vocab: [
            { word: "imperative", def: "極重要的", example: "It is imperative that we leave now." },
            { word: "security reasons", def: "安全理由", example: "The area is closed for security reasons." },
            { word: "changed", def: "更換", example: "I changed my clothes before dinner." }
        ],
        analysis: {
            A: "be - 正確。'It is imperative that...' 句型使用假設語氣 (should + V)，省略 should 後接原形 be。",
            B: "is - 常用口語，但在正式文法或考試中，假設語氣用原形。",
            C: "was - 過去式。",
            D: "are - 複數。"
        }
    },
    {
        id: 20,
        text: "Mr. Henderson has decided to retire ____ nearly 40 years of service.",
        options: ["after", "behind", "next", "later"],
        correctIndex: 0,
        tags: ["Preposition", "Time"],
        vocab: [
            { word: "retire", def: "退休", example: "He plans to retire at age 65." },
            { word: "service", def: "服務/任職", example: "She received an award for her service." },
            { word: "decided", def: "決定", example: "We decided to stay home." }
        ],
        analysis: {
            A: "after - 正確。表示在...之後。",
            B: "behind - 在...後面 (空間)。",
            C: "next - 下一個。",
            D: "later - 稍後 (副詞)。"
        }
    },
    {
        id: 21,
        text: "The committee will ____ the proposal once all the necessary documents are submitted.",
        options: ["review", "reviews", "reviewed", "reviewing"],
        correctIndex: 0,
        tags: ["Tense", "Future_Simple"],
        vocab: [
            { word: "committee", def: "委員會", example: "The committee approved the plan." },
            { word: "proposal", def: "提案", example: "She presented her budget proposal." },
            { word: "submitted", def: "提交", example: "Assignments must be submitted by Friday." },
            { word: "documents", def: "文件", example: "Please sign these documents." }
        ],
        analysis: {
            A: "review - 正確。助動詞 'will' 後接原形動詞。",
            B: "reviews - 單數。",
            C: "reviewed - 過去式。",
            D: "reviewing - 進行式。"
        }
    },
    {
        id: 22,
        text: "We specialize in creating ____ designed furniture for modern offices.",
        options: ["custom", "customer", "customary", "customize"],
        correctIndex: 0,
        tags: ["Vocabulary", "Adjectives"],
        vocab: [
            { word: "specialize", def: "專精於", example: "This restaurant specializes in seafood." },
            { word: "custom", def: "客製化的", example: "He ordered a custom suit." },
            { word: "furniture", def: "傢俱", example: "We need to buy new furniture for the living room." }
        ],
        analysis: {
            A: "custom - 正確。'custom designed' (客製化設計) 是常見複合形容詞。",
            B: "customer - 顧客。",
            C: "customary - 習慣的。",
            D: "customize - 動詞。"
        }
    },
    {
        id: 23,
        text: "____ of the qualified applicants will be contacted for an interview within two weeks.",
        options: ["Anyone", "Who", "All", "Other"],
        correctIndex: 2,
        tags: ["Vocabulary", "Pronouns"],
        vocab: [
            { word: "qualified", def: "符合資格的", example: "She is highly qualified for the job." },
            { word: "applicants", def: "申請人", example: "There were over 100 applicants." },
            { word: "contacted", def: "被聯繫", example: "Winners will be contacted by email." }
        ],
        analysis: {
            A: "Anyone - 通常不接 'of'，直接說 'Anyone who...'。",
            B: "Who - 疑問詞，不符語意。",
            C: "All - 正確。'All of the...' 表示全部。",
            D: "Other - 通常接複數名詞，不接 'of' (除非 'Others of...')。"
        }
    },
    {
        id: 24,
        text: "Product availability is subject to change without prior ____.",
        options: ["notice", "noticing", "noticed", "notable"],
        correctIndex: 0,
        tags: ["Vocabulary", "Nouns"],
        vocab: [
            { word: "availability", def: "供應狀況/可得性", example: "Check the website for seat availability." },
            { word: "subject to", def: "受...支配/以...為準", example: "Prices are subject to change." },
            { word: "prior notice", def: "事先通知", example: "The schedule changed without prior notice." }
        ],
        analysis: {
            A: "notice - 正確。'without prior notice' (恕不先行通知) 是固定用法。",
            B: "noticing - 動名詞。",
            C: "noticed - 過去式。",
            D: "notable - 形容詞。"
        }
    },
    {
        id: 25,
        text: "The manufacturing costs have risen ____ over the last quarter due to raw material shortages.",
        options: ["signify", "significant", "significance", "significantly"],
        correctIndex: 3,
        tags: ["PartOfSpeech", "Adverb"],
        vocab: [
            { word: "manufacturing costs", def: "製造成本", example: "Lowering manufacturing costs is our goal." },
            { word: "shortages", def: "短缺", example: "There is a shortage of skilled workers." },
            { word: "significantly", def: "顯著地", example: "Her English has improved significantly." }
        ],
        analysis: {
            A: "signify - 動詞。",
            B: "significant - 形容詞。",
            C: "significance - 名詞。",
            D: "significantly - 正確。副詞修飾動詞 'risen'，表示「顯著地」上升。"
        }
    },
    {
        id: 26,
        text: "Ms. Garcia remains ____ to finding a solution that benefits both parties.",
        options: ["committing", "committed", "commitment", "commits"],
        correctIndex: 1,
        tags: ["PartOfSpeech", "Adjective"],
        vocab: [
            { word: "remains", def: "維持/保持", example: "The shop remains open until 9 PM." },
            { word: "committed", def: "致力於/堅定的", example: "We are committed to quality." },
            { word: "solution", def: "解決方案", example: "There is no easy solution to this problem." },
            { word: "benefits", def: "造福/利益", example: "The new policy benefits everyone." }
        ],
        analysis: {
            A: "committing - 主動進行，語意不合。",
            B: "committed - 正確。'committed to' (致力於) 片語，此處作形容詞補語。",
            C: "commitment - 名詞。",
            D: "commits - 動詞。"
        }
    },
    {
        id: 27,
        text: "The hotel is conveniently ____ near the convention center and the subway station.",
        options: ["locate", "located", "location", "locating"],
        correctIndex: 1,
        tags: ["Tense", "Passive_Voice"],
        vocab: [
            { word: "conveniently", def: "便利地", example: "The house is conveniently located near the park." },
            { word: "located", def: "位於", example: "Our office is located in the city center." },
            { word: "convention center", def: "會議中心", example: "The expo is at the convention center." }
        ],
        analysis: {
            A: "locate - 原形。",
            B: "located - 正確。'is located' (位於) 被動語態表示位置。",
            C: "location - 名詞。",
            D: "locating - 主動進行。"
        }
    },
    {
        id: 28,
        text: "For technical support, please call the number listed ____ the back of your user manual.",
        options: ["on", "in", "to", "of"],
        correctIndex: 0,
        tags: ["Preposition", "Place"],
        vocab: [
            { word: "technical support", def: "技術支援", example: "Contact technical support for help." },
            { word: "listed", def: "列出的", example: "Prices are listed on the menu." },
            { word: "manual", def: "手冊", example: "Read the instruction manual first." }
        ],
        analysis: {
            A: "on - 正確。在平面上 (背面) 用 on。",
            B: "in - 在內部。",
            C: "to - 對著。",
            D: "of - ...的。"
        }
    },
    {
        id: 29,
        text: "The new interns are learning how to ____ difficult customer inquiries.",
        options: ["handle", "hand", "handling", "handled"],
        correctIndex: 0,
        tags: ["PartOfSpeech", "Verb"],
        vocab: [
            { word: "interns", def: "實習生", example: "The company hired three summer interns." },
            { word: "handle", def: "處理", example: "He knows how to handle difficult situations." },
            { word: "inquiries", def: "詢問", example: "We receive many inquiries daily." }
        ],
        analysis: {
            A: "handle - 正確。'how to' 後接原形動詞。",
            B: "hand - 手 / 遞交。",
            C: "handling - 動名詞。",
            D: "handled - 過去式。"
        }
    },
    {
        id: 30,
        text: "____ higher sales, the company's profits decreased due to operational inefficiencies.",
        options: ["Although", "Even", "Despite", "However"],
        correctIndex: 2,
        tags: ["Conjunction", "Contrast"],
        vocab: [
            { word: "profits", def: "利潤", example: "Profits are up this quarter." },
            { word: "decreased", def: "減少", example: "Sales decreased by 10%." },
            { word: "operational", def: "營運的", example: "There were some operational issues." },
            { word: "inefficiencies", def: "效率低落", example: "We need to fix the inefficiencies in the system." }
        ],
        analysis: {
            A: "Although - 連接詞，後需接子句 (S + V)。",
            B: "Even - 副詞，通常配合 'if' 或 'though'。",
            C: "Despite - 正確。介系詞，後接名詞片語 'higher sales'。",
            D: "However - 副詞，不符合此結構。"
        }
    },
    // ===== [E-02] 新增題目 (31-50) =====
    {
        id: 31,
        text: "The shareholders ____ about the proposed merger at next week's meeting.",
        options: ["will be informed", "informed", "have informed", "informing"],
        correctIndex: 0,
        tags: ["Tense", "Future_Passive"],
        vocab: [
            { word: "shareholders", def: "股東", example: "The shareholders voted to approve the deal." },
            { word: "proposed", def: "提議的", example: "The proposed changes were rejected." },
            { word: "merger", def: "合併", example: "The merger created the largest company in the industry." }
        ],
        analysis: {
            A: "will be informed - 正確。未來被動式，表示股東將被告知。",
            B: "informed - 過去式，與 'next week' 不符。",
            C: "have informed - 現在完成式主動，語意不合。",
            D: "informing - 現在分詞，無法單獨作謂語。"
        }
    },
    {
        id: 32,
        text: "Employees must submit their expense reports ____ the end of each month.",
        options: ["by", "until", "since", "from"],
        correctIndex: 0,
        tags: ["Preposition", "Deadline"],
        vocab: [
            { word: "expense reports", def: "費用報告", example: "Please attach all receipts to your expense report." },
            { word: "submit", def: "提交", example: "Submit your application before the deadline." }
        ],
        analysis: {
            A: "by - 正確。表示「不遲於」某個時間點。",
            B: "until - 表示持續到某時間點，不適用於瞬間動作 'submit'。",
            C: "since - 表示從某時間開始，不符語意。",
            D: "from - 表示起始點，不表截止。"
        }
    },
    {
        id: 33,
        text: "The conference room is ____ equipped with the latest audiovisual technology.",
        options: ["full", "fully", "fulfill", "fullness"],
        correctIndex: 1,
        tags: ["PartOfSpeech", "Adverb"],
        vocab: [
            { word: "equipped", def: "配備的", example: "The gym is well equipped with modern machines." },
            { word: "audiovisual", def: "視聽的", example: "We need audiovisual equipment for the presentation." }
        ],
        analysis: {
            A: "full - 形容詞，不能修飾動詞 'equipped'。",
            B: "fully - 正確。副詞修飾過去分詞 'equipped'。",
            C: "fulfill - 動詞，意為「履行」。",
            D: "fullness - 名詞，意為「充實」。"
        }
    },
    {
        id: 34,
        text: "The manager asked the team to work overtime ____ they could meet the deadline.",
        options: ["so that", "in case", "even if", "as if"],
        correctIndex: 0,
        tags: ["Conjunction", "Purpose"],
        vocab: [
            { word: "overtime", def: "加班", example: "She worked overtime to finish the project." },
            { word: "deadline", def: "截止日期", example: "The deadline for submissions is Friday." }
        ],
        analysis: {
            A: "so that - 正確。表示目的，「以便」。",
            B: "in case - 表示「以防萬一」，語意不合。",
            C: "even if - 表示「即使」，語意不合。",
            D: "as if - 表示「好像」，語意不合。"
        }
    },
    {
        id: 35,
        text: "The new policy has been ____ implemented across all departments.",
        options: ["success", "successful", "successfully", "succeed"],
        correctIndex: 2,
        tags: ["PartOfSpeech", "Adverb"],
        vocab: [
            { word: "policy", def: "政策", example: "The company introduced a new policy on remote work." },
            { word: "implemented", def: "實施", example: "The plan was implemented last month." }
        ],
        analysis: {
            A: "success - 名詞。",
            B: "successful - 形容詞。",
            C: "successfully - 正確。副詞修飾動詞 'implemented'。",
            D: "succeed - 動詞。"
        }
    },
    {
        id: 36,
        text: "Ms. Park will be ____ for the marketing department while the director is on leave.",
        options: ["responsible", "responsibility", "responsibly", "respond"],
        correctIndex: 0,
        tags: ["Vocabulary", "Adjectives"],
        vocab: [
            { word: "responsible", def: "負責的", example: "Who is responsible for this project?" },
            { word: "on leave", def: "休假中", example: "She is currently on maternity leave." }
        ],
        analysis: {
            A: "responsible - 正確。'be responsible for' 是固定搭配。",
            B: "responsibility - 名詞，需改句型為 'have responsibility for'。",
            C: "responsibly - 副詞，不能接在 be 動詞後作補語。",
            D: "respond - 動詞，意為「回應」。"
        }
    },
    {
        id: 37,
        text: "The report ____ by the research team last week contained several errors.",
        options: ["preparing", "prepared", "prepares", "to prepare"],
        correctIndex: 1,
        tags: ["Tense", "Past_Participle"],
        vocab: [
            { word: "research team", def: "研究團隊", example: "The research team published their findings." },
            { word: "contained", def: "包含", example: "The box contained important documents." }
        ],
        analysis: {
            A: "preparing - 現在分詞表主動進行，語意不合。",
            B: "prepared - 正確。過去分詞作後位修飾，表示「被準備的報告」。",
            C: "prepares - 現在式動詞，不能修飾名詞。",
            D: "to prepare - 不定詞，不符此句型。"
        }
    },
    {
        id: 38,
        text: "____ the rain, the outdoor concert proceeded as scheduled.",
        options: ["Although", "Despite", "Because", "Since"],
        correctIndex: 1,
        tags: ["Conjunction", "Contrast"],
        vocab: [
            { word: "proceeded", def: "繼續進行", example: "The meeting proceeded without interruption." },
            { word: "scheduled", def: "預定的", example: "The flight departed as scheduled." }
        ],
        analysis: {
            A: "Although - 連接詞，後需接完整子句。",
            B: "Despite - 正確。介系詞，後接名詞 'the rain'。",
            C: "Because - 表原因，語意相反。",
            D: "Since - 表原因或時間，語意不合。"
        }
    },
    {
        id: 39,
        text: "The warranty covers ____ defects in materials and workmanship.",
        options: ["both", "either", "neither", "whether"],
        correctIndex: 0,
        tags: ["Conjunction", "Paired"],
        vocab: [
            { word: "warranty", def: "保固", example: "The product comes with a two-year warranty." },
            { word: "defects", def: "瑕疵", example: "The item was returned due to defects." },
            { word: "workmanship", def: "工藝", example: "The furniture is known for its fine workmanship." }
        ],
        analysis: {
            A: "both - 正確。'both A and B' 的固定搭配。",
            B: "either - 搭配 'or'。",
            C: "neither - 搭配 'nor'。",
            D: "whether - 表示「是否」，用於引導名詞子句。"
        }
    },
    {
        id: 40,
        text: "Applicants are required to have at least five years of ____ experience.",
        options: ["relevance", "relevant", "relevantly", "relevancy"],
        correctIndex: 1,
        tags: ["PartOfSpeech", "Adjective"],
        vocab: [
            { word: "applicants", def: "申請人", example: "Over 200 applicants applied for the position." },
            { word: "relevant", def: "相關的", example: "Please provide relevant documentation." }
        ],
        analysis: {
            A: "relevance - 名詞，不能修飾名詞 'experience'。",
            B: "relevant - 正確。形容詞修飾名詞 'experience'。",
            C: "relevantly - 副詞，不能修飾名詞。",
            D: "relevancy - 名詞，同 relevance。"
        }
    },
    {
        id: 41,
        text: "The client requested that the shipment ____ delivered by Friday.",
        options: ["be", "is", "was", "being"],
        correctIndex: 0,
        tags: ["Tense", "Subjunctive"],
        vocab: [
            { word: "requested", def: "要求", example: "He requested a meeting with the CEO." },
            { word: "shipment", def: "貨物", example: "The shipment arrived on time." }
        ],
        analysis: {
            A: "be - 正確。'request that' 後用假設語氣，動詞用原形。",
            B: "is - 直述語氣，在正式文法中不正確。",
            C: "was - 過去式，不符假設語氣用法。",
            D: "being - 進行式，不符此句型。"
        }
    },
    {
        id: 42,
        text: "Please ensure that all documents are filed ____ in the cabinet.",
        options: ["proper", "properly", "property", "properness"],
        correctIndex: 1,
        tags: ["PartOfSpeech", "Adverb"],
        vocab: [
            { word: "ensure", def: "確保", example: "Please ensure the door is locked." },
            { word: "filed", def: "歸檔", example: "The documents were filed alphabetically." }
        ],
        analysis: {
            A: "proper - 形容詞。",
            B: "properly - 正確。副詞修飾動詞 'filed'。",
            C: "property - 名詞，意為「財產」。",
            D: "properness - 非標準用詞。"
        }
    },
    {
        id: 43,
        text: "The seminar will focus ____ the latest trends in digital marketing.",
        options: ["at", "in", "on", "for"],
        correctIndex: 2,
        tags: ["Preposition", "Collocation"],
        vocab: [
            { word: "seminar", def: "研討會", example: "I attended a seminar on leadership." },
            { word: "trends", def: "趨勢", example: "Keep up with the latest market trends." }
        ],
        analysis: {
            A: "at - 不與 focus 搭配。",
            B: "in - 不與 focus 搭配。",
            C: "on - 正確。'focus on' 是固定搭配。",
            D: "for - 不與 focus 搭配。"
        }
    },
    {
        id: 44,
        text: "The company offers a ____ range of products to meet customer needs.",
        options: ["comprehend", "comprehensive", "comprehension", "comprehensively"],
        correctIndex: 1,
        tags: ["Vocabulary", "Adjectives"],
        vocab: [
            { word: "comprehensive", def: "全面的", example: "We provide comprehensive training for new employees." },
            { word: "range", def: "範圍", example: "We offer a wide range of services." }
        ],
        analysis: {
            A: "comprehend - 動詞，意為「理解」。",
            B: "comprehensive - 正確。形容詞修飾名詞 'range'。",
            C: "comprehension - 名詞，意為「理解力」。",
            D: "comprehensively - 副詞，不能修飾名詞。"
        }
    },
    {
        id: 45,
        text: "Mr. Chen has been working for this company ____ he graduated from university.",
        options: ["when", "while", "since", "during"],
        correctIndex: 2,
        tags: ["Conjunction", "Time"],
        vocab: [
            { word: "graduated", def: "畢業", example: "She graduated with honors." },
            { word: "university", def: "大學", example: "He studied economics at university." }
        ],
        analysis: {
            A: "when - 表示「當...時」，不與完成式連用。",
            B: "while - 表示「當...的同時」，不與完成式連用。",
            C: "since - 正確。表示「自從」，與現在完成進行式搭配。",
            D: "during - 介系詞，後接名詞，不接子句。"
        }
    },
    {
        id: 46,
        text: "The board of directors will ____ the budget proposal tomorrow.",
        options: ["discuss", "discusses", "discussing", "discussed"],
        correctIndex: 0,
        tags: ["Tense", "Future_Simple"],
        vocab: [
            { word: "board of directors", def: "董事會", example: "The board of directors approved the plan." },
            { word: "budget proposal", def: "預算提案", example: "The budget proposal was reviewed carefully." }
        ],
        analysis: {
            A: "discuss - 正確。'will' 後接原形動詞。",
            B: "discusses - 第三人稱單數現在式。",
            C: "discussing - 現在分詞。",
            D: "discussed - 過去式。"
        }
    },
    {
        id: 47,
        text: "The instructions should be followed ____ to avoid any accidents.",
        options: ["care", "careful", "carefully", "carefulness"],
        correctIndex: 2,
        tags: ["PartOfSpeech", "Adverb"],
        vocab: [
            { word: "instructions", def: "說明", example: "Read the instructions before use." },
            { word: "avoid", def: "避免", example: "We should avoid making the same mistake." }
        ],
        analysis: {
            A: "care - 名詞或動詞。",
            B: "careful - 形容詞。",
            C: "carefully - 正確。副詞修飾動詞 'followed'。",
            D: "carefulness - 名詞。"
        }
    },
    {
        id: 48,
        text: "The restaurant is known ____ its excellent seafood dishes.",
        options: ["as", "by", "for", "with"],
        correctIndex: 2,
        tags: ["Preposition", "Collocation"],
        vocab: [
            { word: "known for", def: "以...聞名", example: "Japan is known for its technology." },
            { word: "excellent", def: "優秀的", example: "She did an excellent job." }
        ],
        analysis: {
            A: "as - 'known as' 意為「被稱為」，語意不同。",
            B: "by - 不與 known 搭配此語意。",
            C: "for - 正確。'known for' 意為「以...聞名」。",
            D: "with - 不與 known 搭配。"
        }
    },
    {
        id: 49,
        text: "The sales figures for this quarter are ____ higher than expected.",
        options: ["significant", "significantly", "significance", "signify"],
        correctIndex: 1,
        tags: ["PartOfSpeech", "Adverb"],
        vocab: [
            { word: "sales figures", def: "銷售數字", example: "The sales figures exceeded our targets." },
            { word: "quarter", def: "季度", example: "Profits increased in the third quarter." }
        ],
        analysis: {
            A: "significant - 形容詞，不能修飾 'higher'。",
            B: "significantly - 正確。副詞修飾比較級 'higher'。",
            C: "significance - 名詞。",
            D: "signify - 動詞。"
        }
    },
    {
        id: 50,
        text: "All participants must register ____ the conference begins.",
        options: ["after", "before", "while", "during"],
        correctIndex: 1,
        tags: ["Conjunction", "Time"],
        vocab: [
            { word: "participants", def: "參與者", example: "All participants received a certificate." },
            { word: "register", def: "註冊", example: "Please register online before attending." }
        ],
        analysis: {
            A: "after - 表示「在...之後」，語意不合（必須先註冊才能參加）。",
            B: "before - 正確。表示「在...之前」。",
            C: "while - 表示「當...時」，語意不合。",
            D: "during - 介系詞，後接名詞，不接子句。"
        }
    }
];
