
// ===== 翻譯對照表 =====
const tagTranslations = {
    'Tense': '時態',
    'Preposition': '介系詞',
    'Conjunction': '連接詞',
    'PartOfSpeech': '詞性',
    'Vocabulary': '字彙',
    'All': '全方位'
};

// ===== 全局變數 =====
let userProfile = {};
let quizHistory = [];
let mistakeBook = []; // 現在每個項目包含 SRS 數據: { ..., nextReviewDate, interval, repetitions, easeFactor }
let vocabulary = [];
let currentQuizQueue = [];
let currentQuestionIndex = 0;
let quizStartTime = 0;
let questionStartTime = 0;
let currentFeedback = null;

// ===== [F-01] 抽題冷卻機制 =====
let recentQuestionIds = []; // 儲存最近幾輪的題目 ID（二維陣列，每輪一個子陣列）
const COOLDOWN_ROUNDS = 3;  // 冷卻輪數：同一題在連續 N 輪內不重複
const MAX_SAME_TAG_PER_ROUND = 3; // 同題型每輪上限

// ===== [E-01] 題數彈性化 =====
let selectedQuizLength = 5; // 預設 5 題

// ===== 計時器控制 =====
let timerInterval = null; // 計時器 ID（用於暫停）

// ===== Modal 控制 =====
let modalResolve = null;

function showModal(title, message, isConfirm = false) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;

    const cancelBtn = document.getElementById('modalCancelBtn');

    if (isConfirm) {
        cancelBtn.style.display = 'inline-block';
    } else {
        cancelBtn.style.display = 'none';
    }

    document.getElementById('customModal').classList.add('show');

    return new Promise((resolve) => {
        modalResolve = resolve;
    });
}

function hideModal() {
    document.getElementById('customModal').classList.remove('show');
    modalResolve = null;
}

// ===== SRS 演算法 (SM-2 Simplified) =====
function calculateSRS(item, grade) {
    // grade: 0-5 (0=complete failure, 5=perfect)
    // 我們將使用: 答錯=0, 答對慢=3, 答對快=5

    let { repetitions, interval, easeFactor } = item;

    if (grade >= 3) {
        if (repetitions === 0) {
            interval = 1;
        } else if (repetitions === 1) {
            interval = 6;
        } else {
            interval = Math.round(interval * easeFactor);
        }
        repetitions++;
        easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    } else {
        repetitions = 0;
        interval = 1;
    }

    if (easeFactor < 1.3) easeFactor = 1.3;

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + interval);
    nextDate.setHours(0, 0, 0, 0); // Normalize to start of day

    return {
        repetitions,
        interval, // days
        easeFactor,
        nextReviewDate: nextDate.toISOString()
    };
}

// ===== 初始化 =====
function init() {
    loadDataFromLocalStorage();
    setupEventListeners();
    showPage('onboardingPage');
}

// ===== 事件監聽 =====
function setupEventListeners() {
    document.getElementById('startLearningBtn').addEventListener('click', startLearning);
    document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
    document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);
    // document.getElementById('saveWordBtn').addEventListener('click', saveWord); // 移除舊的按鈕事件，改用動態生成的 chips
    document.getElementById('backToDashboardBtn').addEventListener('click', () => {
        showPage('dashboardPage');
        updateDashboard();
    });
    document.getElementById('viewMistakesBtn').addEventListener('click', showMistakeBook);
    document.getElementById('viewVocabBtn').addEventListener('click', showWordBank);
    document.getElementById('settingsBtn').addEventListener('click', () => showPage('settingsPage'));
    document.getElementById('backFromMistakesBtn').addEventListener('click', () => showPage('dashboardPage'));
    document.getElementById('backFromVocabBtn').addEventListener('click', () => showPage('dashboardPage'));
    document.getElementById('backFromSettingsBtn').addEventListener('click', () => showPage('dashboardPage'));
    document.getElementById('exportCSVBtn').addEventListener('click', exportToCSV);
    document.getElementById('exportJSONBtn').addEventListener('click', exportToJSON);
    document.getElementById('importJSONBtn').addEventListener('click', () => document.getElementById('importFile').click());
    document.getElementById('importFile').addEventListener('change', importFromJSON);
    document.getElementById('resetBtn').addEventListener('click', resetAllData);

    // Modal Listeners
    document.getElementById('modalConfirmBtn').addEventListener('click', () => {
        if (modalResolve) modalResolve(true);
        hideModal();
    });
    document.getElementById('modalCancelBtn').addEventListener('click', () => {
        if (modalResolve) modalResolve(false);
        hideModal();
    });

    // [E-01] Quiz Length Selector
    document.querySelectorAll('.quiz-length-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.quiz-length-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedQuizLength = parseInt(btn.dataset.length, 10);
        });
    });
}

// ===== 頁面切換 =====
function showPage(pageName) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageName).classList.add('active');
}

// ===== 開始學習 =====
function startLearning() {
    const targetScore = document.getElementById('targetScore').value;
    const recentScore = document.getElementById('recentScore').value;
    const weakness = document.getElementById('weaknessFocus').value;

    if (!targetScore || !recentScore) {
        showModal('提示', '請填寫所有欄位');
        return;
    }

    userProfile = {
        targetScore: parseInt(targetScore),
        recentScore: parseInt(recentScore),
        weakness: weakness,
        startDate: new Date().toISOString()
    };

    saveDataToLocalStorage();
    updateDashboard();
    showPage('dashboardPage');
}

// ===== 更新 Dashboard =====
function updateDashboard() {
    const weaknessText = userProfile.weakness === 'All' ? '全方位' : tagTranslations[userProfile.weakness] || userProfile.weakness;
    document.getElementById('dashboardGreeting').textContent = `歡迎回來，專注於 ${weaknessText} 訓練！`;
    document.getElementById('dashboardStats').textContent = `目標分數：${userProfile.targetScore} | 最近成績：${userProfile.recentScore}`;

    if (quizHistory.length > 0) {
        const avgSpeed = (quizHistory.reduce((sum, q) => sum + q.timeTaken, 0) / quizHistory.length).toFixed(1);
        const correctCount = quizHistory.filter(q => q.isCorrect).length;
        const accuracy = ((correctCount / quizHistory.length) * 100).toFixed(1);
        document.getElementById('avgSpeed').textContent = avgSpeed;
        document.getElementById('correctRate').textContent = accuracy + '%';
    } else {
        document.getElementById('avgSpeed').textContent = '-';
        document.getElementById('correctRate').textContent = '-';
    }

    document.getElementById('completedQuizzes').textContent = Math.floor(quizHistory.length / 10);

    // 計算今日需複習數量
    const today = new Date();
    const dueCount = mistakeBook.filter(m => {
        if (!m.nextReviewDate) return true; // 如果沒有日期，視為需要複習
        return new Date(m.nextReviewDate) <= today;
    }).length;

    // 更新「錯題數」顯示為「待複習」
    document.getElementById('mistakeCount').textContent = dueCount;
    // 這裡我們稍微修改 UI 文字，讓它顯示更像 SRS
    const mistakeLabel = document.querySelector('#mistakeCount + div');
    if (mistakeLabel) mistakeLabel.textContent = "今日待複習"; // 修改 Label

    document.getElementById('vocabCount').textContent = vocabulary.length;
}

// ===== 開始測驗 (動態題庫邏輯) =====
function startQuiz() {
    // [E-01] 使用用戶選擇的題數
    currentQuizQueue = generateQuizQueue(selectedQuizLength);
    currentQuestionIndex = 0;
    quizStartTime = Date.now();
    loadQuestion();
    showPage('quizPage');
}

// ===== 生成測驗隊列 (加權隨機 + 冷卻機制) =====
function generateQuizQueue(quizLength = 10) {
    const queue = [];
    const weakness = userProfile.weakness;
    const today = new Date();
    const tagCount = {}; // [F-01] 追蹤本輪各題型數量

    // [F-01] 取得冷卻中的題目 ID（攤平最近 N 輪的記錄）
    const coolingIds = recentQuestionIds.flat();

    // 1. 優先加入「到期」的錯題 (SRS Due Review)
    // [F-01] SRS 到期題目不受冷卻限制，複習優先
    const dueQuestions = mistakeBook.filter(m => {
        if (!m.nextReviewDate) return true;
        return new Date(m.nextReviewDate) <= today;
    });

    // 依據到期時間排序 (越早過期的越優先)
    dueQuestions.sort((a, b) => {
        if (!a.nextReviewDate) return -1;
        if (!b.nextReviewDate) return 1;
        return new Date(a.nextReviewDate) - new Date(b.nextReviewDate);
    });

    // 取出最多 5 題複習題（但不超過本輪題數的一半）
    const maxReviewCount = Math.min(5, Math.floor(quizLength / 2));
    dueQuestions.slice(0, maxReviewCount).forEach(mistake => {
        const question = questionsDatabase.find(q => q.id === mistake.questionId);
        if (question) {
            question.isReview = true;
            question.srsData = mistake;
            queue.push(question);
            // [F-01] 更新題型計數
            question.tags.forEach(tag => {
                tagCount[tag] = (tagCount[tag] || 0) + 1;
            });
        }
    });

    // 2. 剩餘題目從題庫篩選 (新題)

    // 從弱點領域篩選題目
    let candidateQuestions = questionsDatabase.filter(q => {
        if (weakness === 'All') return true;
        return q.tags.includes(weakness);
    });

    // 移除已在隊列中的題目
    candidateQuestions = candidateQuestions.filter(q => !queue.find(qq => qq.id === q.id));

    // [F-01] 移除冷卻中的題目
    candidateQuestions = candidateQuestions.filter(q => !coolingIds.includes(q.id));

    // [F-01] 隨機選擇填滿，但要檢查題型上限
    shuffleArray(candidateQuestions);
    for (const question of candidateQuestions) {
        if (queue.length >= quizLength) break;

        // [F-01] 檢查此題的題型是否已達上限
        const canAdd = question.tags.every(tag =>
            (tagCount[tag] || 0) < MAX_SAME_TAG_PER_ROUND
        );

        if (canAdd) {
            queue.push(question);
            question.tags.forEach(tag => {
                tagCount[tag] = (tagCount[tag] || 0) + 1;
            });
        }
    }

    // 如果題目不足，放寬題型限制再補充
    if (queue.length < quizLength) {
        let remainingQuestions = questionsDatabase.filter(q =>
            !queue.find(qq => qq.id === q.id) && !coolingIds.includes(q.id)
        );
        shuffleArray(remainingQuestions);

        while (queue.length < quizLength && remainingQuestions.length > 0) {
            queue.push(remainingQuestions.shift());
        }
    }

    // [F-01] 如果還是不足（題庫太小或冷卻太多），允許使用冷卻中的題目
    if (queue.length < quizLength) {
        let coolingQuestions = questionsDatabase.filter(q =>
            !queue.find(qq => qq.id === q.id) && coolingIds.includes(q.id)
        );
        shuffleArray(coolingQuestions);

        while (queue.length < quizLength && coolingQuestions.length > 0) {
            queue.push(coolingQuestions.shift());
        }
    }

    // 打亂順序
    return shuffleArray(queue);
}

// [F-01] Fisher-Yates 洗牌演算法
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ===== 載入題目 =====
function loadQuestion() {
    if (currentQuestionIndex >= currentQuizQueue.length) {
        endQuiz();
        return;
    }

    const question = currentQuizQueue[currentQuestionIndex];
    questionStartTime = Date.now();

    // [E-01] 動態顯示題數
    document.getElementById('quizProgress').textContent = `第 ${currentQuestionIndex + 1} / ${currentQuizQueue.length} 題`;
    document.getElementById('questionText').textContent = question.text;

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.addEventListener('click', () => selectOption(index, question));
        optionsContainer.appendChild(btn);
    });

    document.getElementById('feedbackBox').classList.remove('show');
    document.getElementById('nextQuestionBtn').style.display = 'none';
    const oldSaveBtn = document.getElementById('saveWordBtn');
    if (oldSaveBtn) oldSaveBtn.style.display = 'none'; // 隱藏舊按鈕
    startTimer();
}

// ===== 計時器 =====
function startTimer() {
    // 清除之前的計時器（如果有）
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - questionStartTime) / 1000);
        document.getElementById('quizTimer').textContent = elapsed;
        if (elapsed > 60) clearInterval(timerInterval);
    }, 100);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// ===== 選擇選項 =====
function selectOption(selectedIndex, question) {
    // 停止計時器
    stopTimer();

    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
    const isCorrect = selectedIndex === question.correctIndex;
    const targetTime = question.tags.includes('Tense') || question.tags.includes('Conjunction') ? 10 : 30;
    const isTooSlow = timeTaken > targetTime;

    // SRS 評分: 對+快=5, 對+慢=3, 錯=0
    let grade = 0;
    if (isCorrect) {
        grade = isTooSlow ? 3 : 5;
    }

    // 處理錯題本 / SRS 數據更新
    const existingMistakeIndex = mistakeBook.findIndex(m => m.questionId === question.id);

    if (existingMistakeIndex !== -1) {
        // 更新現有錯題的 SRS 狀態
        const updatedSRS = calculateSRS(mistakeBook[existingMistakeIndex], grade);
        mistakeBook[existingMistakeIndex] = {
            ...mistakeBook[existingMistakeIndex],
            ...updatedSRS,
            userAnswer: question.options[selectedIndex], // 更新最後一次答案
            timestamp: new Date().toISOString()
        };
        // 如果這次答對且 grade >= 4 (熟練)，其實可以考慮從錯題本暫時隱藏，但 SRS 通常是保留並拉長區間
    } else if (!isCorrect) {
        // 新錯題，加入錯題本並初始化 SRS
        const newMistake = {
            questionId: question.id,
            text: question.text,
            userAnswer: question.options[selectedIndex],
            correctAnswer: question.options[question.correctIndex],
            tags: question.tags,
            analysis: question.analysis,
            timestamp: new Date().toISOString(),
            // SRS 初始化
            repetitions: 0,
            interval: 1,
            easeFactor: 2.5,
            nextReviewDate: new Date().toISOString() // 立即需要複習 (或者明天)
        };
        // 計算第一次 SRS (grade = 0)
        const initSRS = calculateSRS(newMistake, 0);
        Object.assign(newMistake, initSRS);

        mistakeBook.push(newMistake);
    }

    // 記錄答題歷史 (保持不變)
    const record = {
        questionId: question.id,
        text: question.text,
        userAnswer: question.options[selectedIndex],
        correctAnswer: question.options[question.correctIndex],
        timeTaken: timeTaken,
        isCorrect: isCorrect,
        tags: question.tags,
        timestamp: new Date().toISOString()
    };
    quizHistory.push(record);

    // 顯示回饋
    showFeedback(isCorrect, isTooSlow, timeTaken, targetTime, question, selectedIndex);
    saveDataToLocalStorage();
}

// ===== 顯示回饋 =====
function showFeedback(isCorrect, isTooSlow, timeTaken, targetTime, question, selectedIndex) {
    const feedbackBox = document.getElementById('feedbackBox');
    const feedbackText = document.getElementById('feedbackText');
    const analysisBox = document.getElementById('analysisBox');

    let feedbackClass = '';
    let feedbackMessage = '';

    if (isCorrect && !isTooSlow) {
        feedbackClass = 'feedback-correct';
        feedbackMessage = `✓ 完美！ (${timeTaken}秒)`;
    } else if (isCorrect && isTooSlow) {
        feedbackClass = 'feedback-slow';
        feedbackMessage = `✓ 正確，但有點慢 (${timeTaken}秒，目標 ${targetTime}秒)`;
    } else {
        feedbackClass = 'feedback-incorrect';
        feedbackMessage = `✗ 錯誤 (${timeTaken}秒)`;
    }

    feedbackBox.className = `feedback-box show ${feedbackClass}`;
    feedbackText.innerHTML = feedbackMessage;

    // 顯示全選項分析
    analysisBox.innerHTML = '';
    question.options.forEach((option, index) => {
        const analysisItem = document.createElement('div');
        analysisItem.className = 'analysis-item';
        const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
        const isSelected = index === selectedIndex;
        const isCorrectOption = index === question.correctIndex;
        const analysis = question.analysis[optionLabel] || '';
        analysisItem.innerHTML = `<strong>${optionLabel}. ${option}</strong> ${isSelected ? '(您的選擇)' : ''} ${isCorrectOption ? '(正確答案)' : ''}<br>${analysis}`;
        analysisBox.appendChild(analysisItem);
    });

    // 顯示標籤
    const tagsHtml = question.tags.map(tag => `<span class="tag">${tagTranslations[tag] || tag}</span>`).join('');
    analysisBox.innerHTML += `<div style="margin-top: 10px; margin-bottom: 10px;">${tagsHtml}</div>`;

    // ===== Smart Vocab 推薦區 =====
    if (question.vocab && question.vocab.length > 0) {
        const vocabContainer = document.createElement('div');
        vocabContainer.style.marginTop = '15px';
        vocabContainer.style.paddingTop = '10px';
        vocabContainer.style.borderTop = '1px dashed #eee';
        vocabContainer.innerHTML = '<div style="font-size:12px; color:var(--apple-text-secondary); margin-bottom:8px;">💡 智慧單字推薦 (點擊收藏):</div>';

        const chipsContainer = document.createElement('div');
        chipsContainer.style.display = 'flex';
        chipsContainer.style.flexWrap = 'wrap';
        chipsContainer.style.gap = '8px';

        question.vocab.forEach(vocabItem => {
            const chip = document.createElement('span');
            chip.textContent = vocabItem.word;
            chip.style.padding = '6px 12px';
            chip.style.backgroundColor = 'white';
            chip.style.border = '1px solid var(--apple-blue)';
            chip.style.borderRadius = '20px';
            chip.style.color = 'var(--apple-blue)';
            chip.style.fontSize = '14px';
            chip.style.cursor = 'pointer';
            chip.style.transition = 'all 0.2s';

            // 檢查是否已收藏
            if (vocabulary.find(v => v.word === vocabItem.word)) {
                chip.style.backgroundColor = 'var(--apple-blue)';
                chip.style.color = 'white';
                chip.textContent = `${vocabItem.word} (已收錄)`;
            }

            chip.onclick = () => {
                saveSmartVocab(vocabItem, question, chip);
            };

            chipsContainer.appendChild(chip);
        });

        vocabContainer.appendChild(chipsContainer);
        analysisBox.appendChild(vocabContainer);
    }

    document.getElementById('nextQuestionBtn').style.display = 'inline-block';
    // document.getElementById('saveWordBtn').style.display = 'inline-block'; // 移除舊按鈕顯示
    currentFeedback = { question, selectedIndex, isCorrect };
}

// ===== 下一題 =====
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// ===== 結束測驗 =====
function endQuiz() {
    const quizLength = currentQuizQueue.length;
    const recentHistory = quizHistory.slice(-quizLength);
    const correctCount = recentHistory.filter(q => q.isCorrect).length;
    const avgTime = (recentHistory.reduce((sum, q) => sum + q.timeTaken, 0) / quizLength).toFixed(1);
    const accuracy = ((correctCount / quizLength) * 100).toFixed(1);

    document.getElementById('finalScore').textContent = `${correctCount}/${quizLength}`;
    document.getElementById('finalAvgTime').textContent = avgTime;
    document.getElementById('finalAccuracy').textContent = accuracy;

    // [F-01] 更新冷卻記錄
    updateCooldownRecord();

    saveDataToLocalStorage();
    showPage('resultsPage');
}

// [F-01] 更新題目冷卻記錄
function updateCooldownRecord() {
    // 取得本輪所有題目的 ID
    const currentRoundIds = currentQuizQueue.map(q => q.id);

    // 加入最近的冷卻記錄
    recentQuestionIds.push(currentRoundIds);

    // 只保留最近 N 輪的記錄
    while (recentQuestionIds.length > COOLDOWN_ROUNDS) {
        recentQuestionIds.shift();
    }
}

// ===== 收藏單字 (Smart Vocab) =====
function saveSmartVocab(vocabItem, question, chipElement) {
    let word = vocabItem;
    let definition = '';
    let example = '';

    if (typeof vocabItem === 'object') {
        word = vocabItem.word;
        definition = vocabItem.def;
        example = vocabItem.example;
    } else {
        // Fallback for string-only calls (legacy)
        definition = `[${tagTranslations[question.tags[0]] || question.tags[0]}] 來源題目：${question.text.substring(0, 30)}...`;
        example = question.text;
    }

    if (!vocabulary.find(v => v.word === word)) {
        vocabulary.push({
            word: word,
            definition: definition,
            example: example,
            source: 'Quiz',
            timestamp: new Date().toISOString()
        });
        saveDataToLocalStorage();

        // 更新 UI 狀態
        chipElement.style.backgroundColor = 'var(--apple-blue)';
        chipElement.style.color = 'white';
        chipElement.textContent = `${word} (已收錄)`;
    } else {
        showModal('提示', '這個單字已經在您的單字庫囉！');
    }
}

// 為了相容性保留舊函數，但不開放 UI
function saveWord() {
    if (!currentFeedback || !currentFeedback.question) return;
    saveSmartVocab(currentFeedback.question.options[currentFeedback.question.correctIndex], currentFeedback.question);
}

// ===== 顯示錯題本 =====
function showMistakeBook() {
    const container = document.getElementById('mistakeBookContainer');
    container.innerHTML = '';

    if (mistakeBook.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--apple-text-secondary);">目前沒有錯題，繼續加油！</p>';
        showPage('mistakeBookPage');
        return;
    }

    // 生成標籤過濾器
    const allTags = [...new Set(mistakeBook.flatMap(m => m.tags))];
    const tagFilter = document.getElementById('tagFilter');
    tagFilter.innerHTML = '';
    const allBtn = document.createElement('button');
    allBtn.textContent = '全部';
    allBtn.className = 'active';
    allBtn.addEventListener('click', () => {
        document.querySelectorAll('#tagFilter button').forEach(b => b.classList.remove('active'));
        allBtn.classList.add('active');
        displayMistakes(mistakeBook);
    });
    tagFilter.appendChild(allBtn);

    allTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.textContent = tagTranslations[tag] || tag;
        btn.addEventListener('click', () => {
            document.querySelectorAll('#tagFilter button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filtered = mistakeBook.filter(m => m.tags.includes(tag));
            displayMistakes(filtered);
        });
        tagFilter.appendChild(btn);
    });

    displayMistakes(mistakeBook);
    showPage('mistakeBookPage');
}

// ===== 顯示錯題 =====
function displayMistakes(mistakes) {
    const container = document.getElementById('mistakeBookContainer');
    container.innerHTML = '';
    mistakes.forEach((mistake, index) => {
        const card = document.createElement('div');
        card.className = 'bento-card bento-card-large';
        const tagsHtml = mistake.tags.map(tag => `<span class="tag">${tagTranslations[tag] || tag}</span>`).join('');
        card.innerHTML = `
            <h4>第 ${index + 1} 題</h4>
            <p style="margin: 10px 0;">${mistake.text}</p>
            <div style="margin: 10px 0;">${tagsHtml}</div>
            <p style="color: var(--apple-red);">您的答案：${mistake.userAnswer}</p>
            <p style="color: var(--apple-green);">正確答案：${mistake.correctAnswer}</p>
            <div class="analysis-section">
                ${Object.entries(mistake.analysis).map(([key, value]) => `<div class="analysis-item"><strong>${key}.</strong> ${value}</div>`).join('')}
            </div>
            <div style="margin-top:10px; font-size: 12px; color: var(--apple-text-secondary); border-top: 1px solid #eee; padding-top: 5px;">
                SRS 狀態: 下次複習 ${mistake.nextReviewDate ? new Date(mistake.nextReviewDate).toLocaleDateString() : '尚未排程'} 
                (間隔: ${mistake.interval}天)
            </div>
        `;
        container.appendChild(card);
    });
}

// ===== 顯示單字庫 =====
function showWordBank() {
    const container = document.getElementById('wordBankContainer');
    container.innerHTML = '';

    if (vocabulary.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--apple-text-secondary); width: 100%;">目前沒有收藏單字，在測驗中點擊「收藏單字」來新增！</p>';
        showPage('wordBankPage');
        return;
    }

    vocabulary.forEach((word, index) => {
        const card = document.createElement('div');
        card.className = 'flip-card';
        card.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <div>${word.word}</div>
                </div>
                <div class="flip-card-back">
                    <div style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">${word.definition}</div>
                    <div style="font-size: 12px; font-style: italic; opacity: 0.9;">"${word.example}"</div>
                    <div style="font-size: 10px; margin-top: 10px; opacity: 0.7;">來源: ${word.source || 'Quiz'}</div>
                </div>
            </div>
        `;
        card.addEventListener('click', () => card.classList.toggle('flipped'));
        container.appendChild(card);
    });

    showPage('wordBankPage');
}

// ===== CSV 匯出 =====
function exportToCSV() {
    const BOM = '\uFEFF';
    let csv = BOM + '日期,題目,正確答案,您的答案,用時(秒),結果\n';
    quizHistory.forEach(record => {
        const result = record.isCorrect ? '正確' : '錯誤';
        csv += `"${record.timestamp}","${record.text}","${record.correctAnswer}","${record.userAnswer}",${record.timeTaken},"${result}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'TOEIC_Speed_Coach_Data.csv';
    link.click();
}

// ===== JSON 匯出 =====
function exportToJSON() {
    const data = {
        userProfile,
        quizHistory,
        mistakeBook,
        vocabulary,
        exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'TOEIC_Speed_Coach_Backup.json';
    link.click();
}

// ===== JSON 匯入 =====
function importFromJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            userProfile = data.userProfile || {};
            quizHistory = data.quizHistory || [];
            mistakeBook = data.mistakeBook || [];
            vocabulary = data.vocabulary || [];
            saveDataToLocalStorage();
            updateDashboard();
            showModal('成功', '資料匯入成功！');
        } catch (error) {
            showModal('錯誤', '匯入失敗：' + error.message);
        }
    };
    reader.readAsText(file);
}

// ===== 重置所有資料 =====
async function resetAllData() {
    const confirmed = await showModal('警告', '確定要重置所有資料嗎？此操作無法撤銷。', true);
    if (confirmed) {
        userProfile = {};
        quizHistory = [];
        mistakeBook = [];
        vocabulary = [];
        localStorage.removeItem('toeicCoachData');
        await showModal('通知', '已重置所有資料');
        showPage('onboardingPage');
    }
}

// ===== localStorage 操作 =====
function saveDataToLocalStorage() {
    const data = {
        userProfile,
        quizHistory,
        mistakeBook,
        vocabulary,
        recentQuestionIds // [F-01] 儲存冷卻記錄
    };
    try {
        localStorage.setItem('toeicCoachData', JSON.stringify(data));
    } catch (e) {
        console.error('Storage failed:', e);
        // [F-02] 區分錯誤類型提供更友善的訊息
        if (e.name === 'QuotaExceededError') {
            showModal('儲存空間已滿', '瀏覽器儲存空間不足，建議匯出備份後清除部分歷史記錄。');
        } else {
            showModal('儲存失敗', '資料儲存時發生錯誤，請稍後再試。');
        }
    }
}

// [F-02] 資料載入與驗證
function loadDataFromLocalStorage() {
    const rawData = localStorage.getItem('toeicCoachData');

    if (!rawData) {
        // 沒有資料，使用預設值
        initDefaultData();
        return;
    }

    try {
        const parsed = JSON.parse(rawData);

        // [F-02] 驗證並載入各資料欄位，損壞的欄位使用預設值
        userProfile = validateUserProfile(parsed.userProfile);
        quizHistory = validateQuizHistory(parsed.quizHistory);
        mistakeBook = validateMistakeBook(parsed.mistakeBook);
        vocabulary = validateVocabulary(parsed.vocabulary);
        recentQuestionIds = validateRecentQuestionIds(parsed.recentQuestionIds);

    } catch (e) {
        console.error('Data parsing failed:', e);
        showModal('資料讀取警告', '部分資料損壞，已重置為預設值。您的設定可能需要重新配置。');
        initDefaultData();
    }
}

// [F-02] 初始化預設資料
function initDefaultData() {
    userProfile = {};
    quizHistory = [];
    mistakeBook = [];
    vocabulary = [];
    recentQuestionIds = [];
}

// [F-02] 驗證 userProfile
function validateUserProfile(data) {
    if (!data || typeof data !== 'object') {
        return {};
    }
    return {
        targetScore: typeof data.targetScore === 'number' ? data.targetScore : undefined,
        recentScore: typeof data.recentScore === 'number' ? data.recentScore : undefined,
        weakness: typeof data.weakness === 'string' ? data.weakness : 'All',
        startDate: typeof data.startDate === 'string' ? data.startDate : undefined
    };
}

// [F-02] 驗證 quizHistory
function validateQuizHistory(data) {
    if (!Array.isArray(data)) {
        return [];
    }
    return data.filter(item => {
        // 必要欄位檢查
        return item &&
            typeof item === 'object' &&
            typeof item.questionId === 'number' &&
            typeof item.isCorrect === 'boolean' &&
            typeof item.timeTaken === 'number';
    });
}

// [F-02] 驗證 mistakeBook
function validateMistakeBook(data) {
    if (!Array.isArray(data)) {
        return [];
    }
    return data.filter(item => {
        // 必要欄位檢查
        return item &&
            typeof item === 'object' &&
            typeof item.questionId === 'number' &&
            typeof item.text === 'string';
    });
}

// [F-02] 驗證 vocabulary
function validateVocabulary(data) {
    if (!Array.isArray(data)) {
        return [];
    }
    return data.filter(item => {
        return item &&
            typeof item === 'object' &&
            typeof item.word === 'string';
    });
}

// [F-02] 驗證 recentQuestionIds
function validateRecentQuestionIds(data) {
    if (!Array.isArray(data)) {
        return [];
    }
    // 確保是二維陣列，且內部元素是數字
    return data.filter(round => {
        return Array.isArray(round) && round.every(id => typeof id === 'number');
    });
}

// ===== 啟動應用 =====
init();
