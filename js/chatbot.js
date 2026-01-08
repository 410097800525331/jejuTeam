/* ========== AI Chatbot Module (Integrated) ========== */

class HotelChatbot {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.messages = [];
        this.isOpen = false;
        this.isLoading = false;
        this.conversationHistory = [];
        
        // System prompt updated with Jeju Air specific benefits
        this.systemPrompt = `당신은 제주항공(Jeju Air)과 연계된 JEJU STAY 예약 상담 AI입니다.

[상담 혜택 및 중요 정보]
1. 제주항공 탑승객 인증 시 전 세계 호텔 7% 추가 할인 혜택이 있습니다.
2. 제주항공 리프레시 포인트(Refresh Point)로 호텔 결제가 가능합니다.
3. 14박 이상 장기 투숙(한 달 살기 등) 시 전용 특별 요금이 적용됩니다.
4. 모든 가격 정보는 KRW(원화) 및 USD(달러)로 안내 가능합니다.

[역할]
- 친절하고 전문적인 톤앤매너 유지.
- 호텔 예약, 위치, 객실 타입, 편의 시설 등 안내.
- 답변은 3~4문장 내외로 간결하게.
- 확실하지 않은 정보는 프론트 데스크(1599-1500) 문의 권장.

[호텔 정보]
- 명칭: JEJU STAY (글로벌 호텔 예약 플랫폼)
- 특징: 전 세계 200만 개 호텔/리조트/펜션 최저가 예약.`;

        this.init();
    }

    init() {
        this.createChatbotUI();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }

    createChatbotUI() {
        // Check if independent toggle is needed (if no FAB)
        // For this project, we primarily use FAB, so we keep the independent toggle hidden by default unless FAB is missing.
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'chatbot-toggle-btn hidden'; // Default hidden
        toggleBtn.innerHTML = '<i data-lucide="message-circle"></i>';
        toggleBtn.setAttribute('aria-label', '챗봇 열기');
        document.body.appendChild(toggleBtn);

        // Create chatbot container
        const container = document.createElement('div');
        container.className = 'chatbot-container';
        container.innerHTML = `
            <div class="chatbot-header">
                <div class="chatbot-header-title">
                   AI 상담사
                </div>
                <button class="chatbot-close-btn" aria-label="챗봇 닫기">
                    <i data-lucide="x" style="width:20px; height:20px;"></i>
                </button>
            </div>
            <div class="chatbot-messages" id="chatbotMessages"></div>
            <div class="chatbot-input-area">
                <div class="chatbot-input-wrapper">
                    <input 
                        type="text" 
                        class="chatbot-input" 
                        id="chatbotInput" 
                        placeholder="문의하실 내용을 입력해주세요..."
                        autocomplete="off"
                    />
                </div>
                <button class="chatbot-send-btn" id="chatbotSendBtn" aria-label="메시지 전송">
                    <i data-lucide="send" style="width:20px; height:20px;"></i>
                </button>
            </div>
        `;
        document.body.appendChild(container);

        this.toggleBtn = toggleBtn;
        this.container = container;
        this.messagesContainer = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.sendBtn = document.getElementById('chatbotSendBtn');
        this.closeBtn = container.querySelector('.chatbot-close-btn');

        // Init icons inside chatbot
        if (window.lucide) lucide.createIcons();
    }

    attachEventListeners() {
        this.toggleBtn.addEventListener('click', () => this.toggleChatbot());
        this.closeBtn.addEventListener('click', () => this.closeChatbot());
        this.sendBtn.addEventListener('click', () => this.sendMessage());

        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeChatbot();
            }
        });
    }

    // Public Methods for FAB integration
    toggleChatbot() {
        if (this.isOpen) {
            this.closeChatbot();
        } else {
            this.openChatbot();
        }
    }

    openChatbot() {
        this.isOpen = true;
        this.container.classList.add('active');
        this.toggleBtn.classList.add('hidden');
        this.input.focus();
        
        // Scroll to bottom on open
        this.scrollToBottom();
    }

    closeChatbot() {
        this.isOpen = false;
        this.container.classList.remove('active');
        // If independent toggle, show it. But if connected to FAB, we rely on FAB button.
        // Logic: if FAB exists, don't show toggle.
        if (!document.getElementById('fabSystem')) {
            this.toggleBtn.classList.remove('hidden');
        }
    }

    addWelcomeMessage() {
        const welcomeMsg = {
            type: 'bot',
            content: '안녕하세요! 👋 제주항공 회원님을 위한 특별한 혜택 상담을 도와드릴까요? (7% 할인, 포인트 결제 등)',
            timestamp: new Date()
        };
        this.messages.push(welcomeMsg);
        this.renderMessage(welcomeMsg, 'welcome');
    }

    async sendMessage() {
        const content = this.input.value.trim();
        if (!content) return;

        this.input.disabled = true;
        this.sendBtn.disabled = true;
        this.isLoading = true;

        const userMsg = {
            type: 'user',
            content: content,
            timestamp: new Date()
        };
        this.messages.push(userMsg);
        this.renderMessage(userMsg);

        this.input.value = '';
        this.showTypingIndicator();

        try {
            const response = await this.getAIResponse(content);
            this.removeTypingIndicator();

            const botMsg = {
                type: 'bot',
                content: response,
                timestamp: new Date()
            };
            this.messages.push(botMsg);
            this.renderMessage(botMsg);

        } catch (error) {
            console.error('Chatbot error:', error);
            this.removeTypingIndicator();

            const errorMsg = {
                type: 'bot',
                content: '죄송합니다. 서비스 연결이 원활하지 않습니다. 잠시 후 1599-1500으로 문의 부탁드립니다.',
                timestamp: new Date()
            };
            this.messages.push(errorMsg);
            this.renderMessage(errorMsg, 'error');
        } finally {
            this.input.disabled = false;
            this.sendBtn.disabled = false;
            this.isLoading = false;
            this.input.focus();
        }
    }

    async getAIResponse(userMessage) {
        this.conversationHistory.push({
            role: 'user',
            content: userMessage
        });
        
        // Dummy Check for API Key if Placeholder
        if (!this.apiKey || this.apiKey === 'YOUR_API_KEY' || this.apiKey.includes('PLACEHOLDER')) {
            // Mock response for UI testing
            await new Promise(r => setTimeout(r, 1000));
            return 'API 키가 설정되지 않아 테스트 모드로 응답합니다. "제주항공 7% 할인" 혜택을 받으시려면 마이페이지에서 예약 확인서를 등록해주세요.';
        }

        try {
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + this.apiKey, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system: { parts: [{ text: this.systemPrompt }] },
                    contents: this.conversationHistory.map(msg => ({
                        role: msg.role === 'user' ? 'user' : 'model',
                        parts: [{ text: msg.content }]
                    }))
                })
            });

            if (!response.ok) throw new Error(`API Error: ${response.status}`);

            const data = await response.json();
            if (!data.candidates?.[0]?.content) throw new Error('Invalid API response');

            const aiResponse = data.candidates[0].content.parts[0].text;

            this.conversationHistory.push({ role: 'assistant', content: aiResponse });
            if (this.conversationHistory.length > 20) this.conversationHistory = this.conversationHistory.slice(-20);

            return aiResponse;

        } catch (error) {
            console.error('API call error:', error);
            throw error;
        }
    }

    renderMessage(message, className = '') {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${message.type} ${className}`;

        const bubbleEl = document.createElement('div');
        bubbleEl.className = 'message-bubble';
        bubbleEl.innerHTML = message.content.replace(/\n/g, '<br>');

        messageEl.appendChild(bubbleEl);

        const timeEl = document.createElement('div');
        timeEl.className = 'message-time';
        timeEl.textContent = this.formatTime(message.timestamp);
        messageEl.appendChild(timeEl);

        this.messagesContainer.appendChild(messageEl);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typingEl = document.createElement('div');
        typingEl.className = 'message bot';
        typingEl.id = 'typingIndicator';
        typingEl.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        this.messagesContainer.appendChild(typingEl);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const typingEl = document.getElementById('typingIndicator');
        if (typingEl) typingEl.remove();
    }

    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 50);
    }

    formatTime(date) {
        return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // 1. Get API Key
    const apiKey = document.documentElement.getAttribute('data-gemini-api-key') || 'YOUR_API_KEY';
    
    // 2. Create Instance
    window.hotelChatbot = new HotelChatbot(apiKey);
});
