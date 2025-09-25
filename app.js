// 彩票号码生成器主逻辑
class LotteryGenerator {
    constructor() {
        this.currentType = 'ssq'; // 当前选中的彩票类型
        this.init();
    }

    init() {
        this.bindEvents();
        this.generateAndDisplayNumbers();
    }

    // 绑定事件监听器
    bindEvents() {
        // 标签切换事件
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.type);
            });
        });

        // 刷新按钮事件
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.generateAndDisplayNumbers();
        });

        // 再次生成按钮事件
        document.getElementById('generateBtn').addEventListener('click', () => {
            this.generateAndDisplayNumbers();
        });

        // 复制按钮事件
        document.getElementById('copyBtn').addEventListener('click', () => {
            this.copyToClipboard();
        });
    }

    // 切换彩票类型
    switchTab(type) {
        if (this.currentType === type) return;

        // 更新按钮状态
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-type="${type}"]`).classList.add('active');

        this.currentType = type;
        this.generateAndDisplayNumbers();
    }

    // 生成不重复的随机号码
    generateNumbers(count, max) {
        const nums = [];
        while (nums.length < count) {
            const n = Math.floor(Math.random() * max) + 1;
            if (!nums.includes(n)) {
                nums.push(n);
            }
        }
        return nums.sort((a, b) => a - b).map(n => n.toString().padStart(2, '0'));
    }

    // 生成双色球号码
    generateSSQ() {
        const red = this.generateNumbers(6, 33);
        const blue = this.generateNumbers(1, 16);
        return { red, blue };
    }

    // 生成大乐透号码
    generateDLT() {
        const front = this.generateNumbers(5, 35);
        const back = this.generateNumbers(2, 12);
        return { front, back };
    }

    // 生成5注号码并显示
    generateAndDisplayNumbers() {
        const allNumbers = document.getElementById('allNumbers');
        const cardTitle = document.getElementById('cardTitle');
        const numberCard = document.getElementById('numberCard');

        // 更新标题
        const typeName = this.currentType === 'ssq' ? '双色球' : '大乐透';
        cardTitle.textContent = `${typeName} - 5注号码`;

        // 更新卡片样式类
        numberCard.className = `number-card ${this.currentType}`;

        // 清空并重新生成号码
        allNumbers.innerHTML = '';

        for (let i = 0; i < 5; i++) {
            const row = this.createNumberRow(i + 1);
            allNumbers.appendChild(row);
        }
    }

    // 创建号码行
    createNumberRow(index) {
        const row = document.createElement('div');
        row.className = 'number-row';

        // 行标签
        const label = document.createElement('span');
        label.className = 'row-label';
        label.textContent = `第${index}注:`;
        row.appendChild(label);

        if (this.currentType === 'ssq') {
            const ssqData = this.generateSSQ();

            // 红球
            ssqData.red.forEach(num => {
                const ball = this.createNumberBall(num, 'red-ball');
                row.appendChild(ball);
            });

            // 分隔符
            const separator = document.createElement('span');
            separator.className = 'separator';
            separator.textContent = '+';
            row.appendChild(separator);

            // 蓝球
            ssqData.blue.forEach(num => {
                const ball = this.createNumberBall(num, 'blue-ball');
                row.appendChild(ball);
            });

        } else if (this.currentType === 'dlt') {
            const dltData = this.generateDLT();

            // 前区
            dltData.front.forEach(num => {
                const ball = this.createNumberBall(num, 'front-ball');
                row.appendChild(ball);
            });

            // 分隔符
            const separator = document.createElement('span');
            separator.className = 'separator';
            separator.textContent = '+';
            row.appendChild(separator);

            // 后区
            dltData.back.forEach(num => {
                const ball = this.createNumberBall(num, 'back-ball');
                row.appendChild(ball);
            });
        }

        return row;
    }

    // 创建数字球
    createNumberBall(number, className) {
        const ball = document.createElement('div');
        ball.className = `number ${className}`;
        ball.textContent = number;
        return ball;
    }

    // 复制结果到剪贴板
    async copyToClipboard() {
        const rows = document.querySelectorAll('.number-row');
        let result = '';

        const typeName = this.currentType === 'ssq' ? '双色球' : '大乐透';
        result += `${typeName}号码：\n\n`;

        rows.forEach((row, index) => {
            const numbers = row.querySelectorAll('.number');

            if (this.currentType === 'ssq') {
                const redNumbers = Array.from(numbers).slice(0, 6).map(num => num.textContent);
                const blueNumbers = Array.from(numbers).slice(6).map(num => num.textContent);
                result += `第${index + 1}注: ${redNumbers.join(' ')} + ${blueNumbers.join(' ')}\n`;
            } else {
                const frontNumbers = Array.from(numbers).slice(0, 5).map(num => num.textContent);
                const backNumbers = Array.from(numbers).slice(5).map(num => num.textContent);
                result += `第${index + 1}注: ${frontNumbers.join(' ')} + ${backNumbers.join(' ')}\n`;
            }
        });

        result += `\n生成时间: ${new Date().toLocaleString('zh-CN')}\n`;
        result += '祝您好运！🍀';

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(result);
                this.showCopySuccess();
            } else {
                // 兼容老浏览器的复制方式
                this.fallbackCopyToClipboard(result);
            }
        } catch (err) {
            console.error('复制失败:', err);
            this.fallbackCopyToClipboard(result);
        }
    }

    // 兼容老浏览器的复制方法
    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            this.showCopySuccess();
        } catch (err) {
            console.error('复制失败:', err);
            alert('复制失败，请手动复制');
        } finally {
            document.body.removeChild(textArea);
        }
    }

    // 显示复制成功提示
    showCopySuccess() {
        const existingToast = document.querySelector('.copy-success');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'copy-success';
        toast.textContent = '复制成功！';
        document.body.appendChild(toast);

        setTimeout(() => {
            if (toast && toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 2000);
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new LotteryGenerator();
});

// 防止页面刷新时的闪烁
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
});