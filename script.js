// 获取DOM元素
const textInput = document.getElementById('textInput');
const styleSelect = document.getElementById('styleSelect');
const previewBtn = document.getElementById('previewBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const previewArea = document.getElementById('previewArea');
const copyNotice = document.getElementById('copyNotice');

// 样式配置
const styleConfigs = {
    style1: {
        name: '橙色经典',
        className: 'style1'
    },
    style2: {
        name: '橙色渐变',
        className: 'style2'
    },
    style3: {
        name: '橙色简约',
        className: 'style3'
    },
    style4: {
        name: '橙色商务',
        className: 'style4'
    }
};

// 解析Markdown文本
function parseMarkdown(text) {
    if (!text.trim()) {
        return '<p class="placeholder">请输入内容</p>';
    }

    let html = text
        .split('\n')
        .map(line => {
            line = line.trim();
            
            // 处理一级标题
            if (line.startsWith('# ')) {
                return `<h1>${line.substring(2)}</h1>`;
            }
            
            // 处理二级标题
            if (line.startsWith('## ')) {
                return `<h2>${line.substring(3)}</h2>`;
            }
            
            // 处理空行
            if (line === '') {
                return '';
            }
            
            // 处理普通段落
            return `<p>${line}</p>`;
        })
        .join('\n');

    // 清理多余的空行
    html = html.replace(/\n{3,}/g, '\n\n');
    
    return html;
}

// 生成微信公众号样式的HTML
function generateStyledHTML(content, styleClass) {
    const container = document.createElement('div');
    container.className = styleClass;
    // 为h1添加包装器以确保居中
    const wrappedContent = wrapH1ForCenter(content);
    container.innerHTML = wrappedContent;
    
    // 为微信公众号生成内联样式
    const styledHTML = generateInlineStyles(container, styleClass);
    return styledHTML;
}

// 生成h2装饰元素
function getH2Decoration(styleClass) {
    const decorations = {
        style1: '<span style="display: inline-block; width: 20px; height: 20px; background: linear-gradient(135deg, #ff7043, #ff9800); border-radius: 4px; margin-right: 6px; vertical-align: middle;"></span><span style="display: inline-block; width: 3px; height: 16px; background: #ff7043; margin-right: 11px; vertical-align: middle;"></span>',
        style2: '<span style="display: inline-block; width: 20px; height: 20px; background: linear-gradient(45deg, #ff6b35, #f7931e); border-radius: 6px; margin-right: 6px; vertical-align: middle;"></span><span style="display: inline-block; width: 3px; height: 16px; background: #ff6b35; margin-right: 11px; vertical-align: middle;"></span>',
        style3: '<span style="display: inline-block; width: 20px; height: 20px; background: linear-gradient(135deg, #ffb74d, #ff9800); border-radius: 50%; margin-right: 6px; vertical-align: middle;"></span><span style="display: inline-block; width: 3px; height: 16px; background: #ffb74d; margin-right: 11px; vertical-align: middle;"></span>',
        style4: '<span style="display: inline-block; width: 20px; height: 20px; background: linear-gradient(135deg, #d84315, #ff5722); border-radius: 2px; margin-right: 6px; vertical-align: middle;"></span><span style="display: inline-block; width: 3px; height: 16px; background: #d84315; margin-right: 11px; vertical-align: middle;"></span>'
    };
    
    return decorations[styleClass] || decorations.style1;
}

// 生成内联样式（用于复制到微信公众号）
function generateInlineStyles(container, styleClass) {
    const elements = container.querySelectorAll('*');
    
    // 样式映射
    const styleMap = {
        style1: {
            h1: 'background: linear-gradient(135deg, #ff7043, #ff9800); color: white; padding: 16px 24px; text-align: center; font-size: 18px; font-weight: 600; border-radius: 12px; margin: 20px auto 16px auto; box-shadow: 0 3px 8px rgba(255, 112, 67, 0.25); display: block; width: fit-content; max-width: 90%; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;',
            h2: 'color: #333; font-size: 18px; font-weight: 600; margin: 16px 0 12px 0; padding: 8px 0; text-align: left; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;',
            p: 'line-height: 1.8; color: #333; margin: 12px 0; text-indent: 2em; text-align: left; font-size: 15px; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;'
        },
        style2: {
            h1: 'background: linear-gradient(45deg, #ff6b35, #f7931e, #ff9a56); color: white; padding: 16px 24px; text-align: center; font-size: 18px; font-weight: 600; border-radius: 12px; margin: 20px auto 16px auto; box-shadow: 0 3px 8px rgba(255, 107, 53, 0.25); display: block; width: fit-content; max-width: 90%; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;',
            h2: 'color: #333; font-size: 18px; font-weight: 600; margin: 16px 0 12px 0; padding: 8px 0; text-align: left; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;',
            p: 'line-height: 1.8; color: #444; margin: 12px 0; text-align: left; font-size: 15px; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;'
        },
        style3: {
            h1: 'background: linear-gradient(135deg, #ffb74d, #ff9800); color: white; padding: 16px 24px; text-align: center; font-size: 18px; font-weight: 600; border-radius: 12px; margin: 20px auto 16px auto; box-shadow: 0 3px 8px rgba(255, 183, 77, 0.25); display: block; width: fit-content; max-width: 90%; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;',
            h2: 'color: #333; font-size: 18px; font-weight: 600; margin: 16px 0 12px 0; padding: 8px 0; text-align: left; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;',
            p: 'line-height: 1.8; color: #333; margin: 12px 0; text-align: left; font-size: 15px; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;'
        },
        style4: {
            h1: 'background: linear-gradient(135deg, #d84315, #ff5722); color: white; padding: 16px 24px; text-align: center; font-size: 18px; font-weight: 600; border-radius: 12px; margin: 20px auto 16px auto; box-shadow: 0 3px 8px rgba(216, 67, 21, 0.25); display: block; width: fit-content; max-width: 90%; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;',
            h2: 'color: #333; font-size: 18px; font-weight: 600; margin: 16px 0 12px 0; padding: 8px 0; text-align: left; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;',
            p: 'line-height: 1.8; color: #333; margin: 12px 0; text-align: left; font-size: 15px; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;'
        }
    };

    const currentStyles = styleMap[styleClass] || styleMap.style1;

    // 应用内联样式
    container.querySelectorAll('h1').forEach(el => {
        el.style.cssText = currentStyles.h1;
        // 确保父容器有居中样式
        if (el.parentNode && el.parentNode.tagName === 'DIV') {
            el.parentNode.style.cssText = 'text-align: center; margin: 0; padding: 0;';
        }
    });

    container.querySelectorAll('h2').forEach(el => {
        el.style.cssText = currentStyles.h2;
        
        // 为每种样式添加对应的装饰元素
        const decorationHTML = getH2Decoration(styleClass);
        el.innerHTML = decorationHTML + el.innerHTML;
    });

    container.querySelectorAll('p').forEach(el => {
        el.style.cssText = currentStyles.p;
    });

    return container.innerHTML;
}

// 预览功能
function updatePreview() {
    const text = textInput.value;
    const selectedStyle = styleSelect.value;
    
    if (!text.trim()) {
        previewArea.innerHTML = '<p class="placeholder">在左侧输入内容后点击"预览效果"查看样式</p>';
        previewArea.className = 'preview-content';
        return;
    }
    
    const parsedHTML = parseMarkdown(text);
    // 为h1添加包装器以确保居中
    const wrappedHTML = wrapH1ForCenter(parsedHTML);
    previewArea.innerHTML = wrappedHTML;
    previewArea.className = `preview-content ${styleConfigs[selectedStyle].className}`;
}

// 为h1添加居中包装器
function wrapH1ForCenter(html) {
    // 为微信编辑器使用更兼容的居中方式
    return html.replace(/<h1>(.*?)<\/h1>/g, '<div style="text-align: center; margin: 0; padding: 0;"><h1>$1</h1></div>');
}

// 复制到剪贴板功能
async function copyToClipboard() {
    const text = textInput.value;
    const selectedStyle = styleSelect.value;
    
    if (!text.trim()) {
        alert('请先输入内容');
        return;
    }
    
    try {
        const parsedHTML = parseMarkdown(text);
        const styledHTML = generateStyledHTML(parsedHTML, selectedStyle);
        
        // 创建临时容器用于复制
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = styledHTML;
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.width = '800px'; // 给一个固定宽度以便测试
        document.body.appendChild(tempDiv);
        
        // 输出调试信息
        console.log('复制的HTML内容:', styledHTML);
        
        // 选择内容
        const range = document.createRange();
        range.selectNodeContents(tempDiv);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        
        // 复制到剪贴板
        const successful = document.execCommand('copy');
        
        // 清理
        document.body.removeChild(tempDiv);
        selection.removeAllRanges();
        
        if (successful) {
            showCopyNotice();
        } else {
            // 尝试新的Clipboard API
            await navigator.clipboard.writeText(styledHTML);
            showCopyNotice();
        }
    } catch (err) {
        console.error('复制失败:', err);
        
        // 备用方案：显示内容让用户手动复制
        const text = textInput.value;
        const parsedHTML = parseMarkdown(text);
        const styledHTML = generateStyledHTML(parsedHTML, selectedStyle);
        
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <html>
                <head>
                    <title>复制内容</title>
                    <meta charset="UTF-8">
                </head>
                <body>
                    <h3>请选择下面的内容，然后按 Ctrl+C (或 Cmd+C) 复制：</h3>
                    <div style="border: 2px solid #ff9a56; padding: 20px; margin: 20px 0; width: 800px;">
                        ${styledHTML}
                    </div>
                    <p><strong>提示：</strong>复制后可以直接粘贴到微信公众号编辑器中</p>
                    <p><strong>调试信息：</strong></p>
                    <textarea style="width: 100%; height: 200px;">${styledHTML}</textarea>
                </body>
            </html>
        `);
        newWindow.document.close();
    }
}

// 显示复制成功提示
function showCopyNotice() {
    copyNotice.classList.add('show');
    setTimeout(() => {
        copyNotice.classList.remove('show');
    }, 3000);
}

// 清空内容
function clearContent() {
    if (confirm('确定要清空所有内容吗？')) {
        textInput.value = '';
        previewArea.innerHTML = '<p class="placeholder">在左侧输入内容后点击"预览效果"查看样式</p>';
        previewArea.className = 'preview-content';
    }
}

// 事件监听器
previewBtn.addEventListener('click', updatePreview);
copyBtn.addEventListener('click', copyToClipboard);
clearBtn.addEventListener('click', clearContent);

// 样式选择变化时自动更新预览
styleSelect.addEventListener('change', () => {
    if (textInput.value.trim()) {
        updatePreview();
    }
});

// 输入框内容变化时自动更新预览（防抖）
let debounceTimer;
textInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        if (textInput.value.trim()) {
            updatePreview();
        }
    }, 500);
});

// 初始化：设置默认示例内容
window.addEventListener('load', () => {
    textInput.value = `# 欢迎使用微信公众号样式工具

## 功能特点

这是一个专为微信公众号内容创作者设计的样式工具，具有以下特点：

支持一级和二级标题的自动识别，让您的文章结构更清晰。

提供多种橙色系样式选择，满足不同的设计需求。

## 使用方法

只需要按照Markdown格式输入内容，选择喜欢的样式，然后一键复制到微信公众号编辑器即可。

希望这个工具能够帮助您创作出更加美观的公众号文章！`;
    
    // 自动显示预览
    updatePreview();
});

// 快捷键支持
document.addEventListener('keydown', (e) => {
    // Ctrl+Enter 或 Cmd+Enter 预览
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        updatePreview();
    }
    
    // Ctrl+Shift+C 或 Cmd+Shift+C 复制
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        copyToClipboard();
    }
});

// 添加键盘快捷键提示
document.querySelector('.footer').innerHTML = `
    <p>提示：复制后的内容可以直接粘贴到微信公众号编辑器中，保持样式不变<br>
    <small>快捷键：Ctrl+Enter 预览 | Ctrl+Shift+C 复制</small></p>
    <p>欢迎关注作者 小红书/公众号/视频号/即刻/知乎/bilibili @栗噔噔</p>
`;

// 图片样式转换器功能
class ImageStyleConverter {
    constructor() {
        this.modal = document.getElementById('imageStyleModal');
        this.uploadArea = document.getElementById('uploadArea');
        this.imageInput = document.getElementById('imageInput');
        this.styleOptions = document.getElementById('styleOptions');
        this.imagePreviewSection = document.getElementById('imagePreviewSection');
        this.previewCanvas = document.getElementById('previewCanvas');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.addWatermark = document.getElementById('addWatermark');
        
        this.currentImage = null;
        this.selectedStyle = 'style1';
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        // 打开模态框
        document.getElementById('imageStyleBtn').addEventListener('click', () => {
            this.showModal();
        });
        
        // 关闭模态框
        document.querySelector('.close').addEventListener('click', () => {
            this.hideModal();
        });
        
        // 点击模态框外部关闭
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });
        
        // 上传区域点击
        this.uploadArea.addEventListener('click', () => {
            this.imageInput.click();
        });
        
        // 文件选择
        this.imageInput.addEventListener('change', (e) => {
            this.handleFileSelect(e.target.files[0]);
        });
        
        // 拖拽上传
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        });
        
        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('dragover');
        });
        
        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleFileSelect(file);
            }
        });
        
        // 样式选择
        document.querySelectorAll('.style-option').forEach(option => {
            option.addEventListener('click', () => {
                this.selectStyle(option.dataset.style);
            });
        });
        
        // 下载按钮
        this.downloadBtn.addEventListener('click', () => {
            this.downloadImage();
        });
        
        // 水印选项变化
        this.addWatermark.addEventListener('change', () => {
            if (this.currentImage) {
                this.generatePreview();
            }
        });
    }
    
    showModal() {
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    hideModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.resetModal();
    }
    
    resetModal() {
        this.currentImage = null;
        this.styleOptions.style.display = 'none';
        this.imagePreviewSection.style.display = 'none';
        this.uploadArea.style.display = 'block';
        this.imageInput.value = '';
        
        // 重置样式选择
        document.querySelectorAll('.style-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector('[data-style="style1"]').classList.add('selected');
        this.selectedStyle = 'style1';
    }
    
    handleFileSelect(file) {
        if (!file || !file.type.startsWith('image/')) {
            alert('请选择有效的图片文件！');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.currentImage = img;
                this.showStyleOptions();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    
    showStyleOptions() {
        this.uploadArea.style.display = 'none';
        this.styleOptions.style.display = 'block';
        
        // 默认选择第一个样式
        document.querySelector('[data-style="style1"]').classList.add('selected');
        this.generatePreview();
    }
    
    selectStyle(styleName) {
        // 更新选择状态
        document.querySelectorAll('.style-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector(`[data-style="${styleName}"]`).classList.add('selected');
        
        this.selectedStyle = styleName;
        this.generatePreview();
    }
    
    generatePreview() {
        if (!this.currentImage) return;
        
        const canvas = this.previewCanvas;
        const ctx = canvas.getContext('2d');
        
        // 计算合适的画布尺寸
        const maxSize = 400;
        const outerBorderWidth = 8;  // 外边框宽度（更细）
        const whiteBorderWidth = 6;  // 白色内边框宽度
        const totalBorderWidth = outerBorderWidth + whiteBorderWidth;
        const cornerRadius = 12;
        const innerCornerRadius = 8;
        
        let { width, height } = this.currentImage;
        
        // 保持比例缩放
        if (width > height) {
            if (width > maxSize) {
                height = (height * maxSize) / width;
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width = (width * maxSize) / height;
                height = maxSize;
            }
        }
        
        // 设置画布尺寸（包含边框和阴影）
        const shadowOffset = 4;
        canvas.width = width + totalBorderWidth * 2 + shadowOffset;
        canvas.height = height + totalBorderWidth * 2 + shadowOffset;
        
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制立体阴影
        this.drawShadow(ctx, shadowOffset, shadowOffset, width + totalBorderWidth * 2, height + totalBorderWidth * 2, cornerRadius);
        
        // 绘制外边框背景
        this.drawBorder(ctx, 0, 0, width + totalBorderWidth * 2, height + totalBorderWidth * 2, cornerRadius);
        
        // 绘制白色内边框
        this.drawWhiteBorder(ctx, outerBorderWidth, outerBorderWidth, width + whiteBorderWidth * 2, height + whiteBorderWidth * 2, innerCornerRadius + 2);
        
        // 绘制圆角图片
        this.drawRoundedImage(ctx, this.currentImage, totalBorderWidth, totalBorderWidth, width, height, innerCornerRadius);
        
        // 添加水印（如果选中）
        if (this.addWatermark.checked) {
            this.drawWatermark(ctx, canvas.width, canvas.height);
        }
        
        // 显示预览区域
        this.imagePreviewSection.style.display = 'block';
    }
    
    drawShadow(ctx, x, y, width, height, cornerRadius) {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.roundRect(ctx, x, y, width, height, cornerRadius);
        ctx.fill();
        
        ctx.restore();
    }

    drawBorder(ctx, x, y, width, height, cornerRadius) {
        // 根据选择的样式绘制边框
        const borderStyles = {
            style1: { colors: ['#ff7043', '#ff9800'] },
            style2: { colors: ['#ff6b35', '#f7931e', '#ff9a56'] },
            style3: { colors: ['#ffb74d', '#ff9800'] },
            style4: { colors: ['#d84315', '#ff5722'] }
        };
        
        const style = borderStyles[this.selectedStyle];
        
        // 创建渐变
        let gradient;
        if (style.colors.length === 2) {
            gradient = ctx.createLinearGradient(x, y, x + width, y + height);
            gradient.addColorStop(0, style.colors[0]);
            gradient.addColorStop(1, style.colors[1]);
        } else {
            gradient = ctx.createLinearGradient(x, y, x + width, y + height);
            gradient.addColorStop(0, style.colors[0]);
            gradient.addColorStop(0.5, style.colors[1]);
            gradient.addColorStop(1, style.colors[2]);
        }
        
        // 绘制圆角矩形边框
        ctx.fillStyle = gradient;
        this.roundRect(ctx, x, y, width, height, cornerRadius);
        ctx.fill();
        
        // 添加内部高光效果
        const highlightGradient = ctx.createLinearGradient(x, y, x, y + height / 3);
        highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = highlightGradient;
        this.roundRect(ctx, x, y, width, height, cornerRadius);
        ctx.fill();
    }
    
    drawWhiteBorder(ctx, x, y, width, height, cornerRadius) {
        // 绘制白色内边框
        ctx.fillStyle = '#ffffff';
        this.roundRect(ctx, x, y, width, height, cornerRadius);
        ctx.fill();
        
        // 添加轻微的内阴影效果
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.lineWidth = 1;
        this.roundRect(ctx, x + 0.5, y + 0.5, width - 1, height - 1, cornerRadius);
        ctx.stroke();
    }
    
    drawRoundedImage(ctx, img, x, y, width, height, radius) {
        ctx.save();
        
        // 创建圆角裁剪路径
        this.roundRect(ctx, x, y, width, height, radius);
        ctx.clip();
        
        // 绘制图片
        ctx.drawImage(img, x, y, width, height);
        
        ctx.restore();
    }
    
    drawWatermark(ctx, canvasWidth, canvasHeight) {
        ctx.save();
        
        // 设置水印样式
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '12px PingFang SC, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        
        // 添加水印阴影效果
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        // 绘制水印（考虑阴影偏移）
        const watermarkText = '微信公众号样式工具';
        const shadowOffset = 4;
        ctx.fillText(watermarkText, canvasWidth - shadowOffset - 8, canvasHeight - shadowOffset - 8);
        
        ctx.restore();
    }
    
    roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }
    
    downloadImage() {
        if (!this.currentImage) return;
        
        // 创建高分辨率画布用于下载
        const downloadCanvas = document.createElement('canvas');
        const downloadCtx = downloadCanvas.getContext('2d');
        
        // 使用更高的分辨率
        const scale = 2; // 2倍分辨率
        const maxSize = 800; // 更大的最大尺寸
        const outerBorderWidth = 16;
        const whiteBorderWidth = 12;
        const totalBorderWidth = outerBorderWidth + whiteBorderWidth;
        const cornerRadius = 24;
        const innerCornerRadius = 16;
        
        let { width, height } = this.currentImage;
        
        // 保持比例缩放到更高分辨率
        if (width > height) {
            if (width > maxSize) {
                height = (height * maxSize) / width;
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width = (width * maxSize) / height;
                height = maxSize;
            }
        }
        
        const shadowOffset = 8;
        downloadCanvas.width = width + totalBorderWidth * 2 + shadowOffset;
        downloadCanvas.height = height + totalBorderWidth * 2 + shadowOffset;
        
        // 清除画布
        downloadCtx.clearRect(0, 0, downloadCanvas.width, downloadCanvas.height);
        
        // 使用相同的绘制逻辑但参数更大
        this.drawShadowHD(downloadCtx, shadowOffset, shadowOffset, width + totalBorderWidth * 2, height + totalBorderWidth * 2, cornerRadius);
        this.drawBorderHD(downloadCtx, 0, 0, width + totalBorderWidth * 2, height + totalBorderWidth * 2, cornerRadius);
        this.drawWhiteBorderHD(downloadCtx, outerBorderWidth, outerBorderWidth, width + whiteBorderWidth * 2, height + whiteBorderWidth * 2, innerCornerRadius + 4);
        this.drawRoundedImageHD(downloadCtx, this.currentImage, totalBorderWidth, totalBorderWidth, width, height, innerCornerRadius);
        
        if (this.addWatermark.checked) {
            this.drawWatermarkHD(downloadCtx, downloadCanvas.width, downloadCanvas.height);
        }
        
        // 创建下载链接
        const link = document.createElement('a');
        link.download = `styled-image-${this.selectedStyle}-${Date.now()}.png`;
        link.href = downloadCanvas.toDataURL('image/png', 1.0);
        
        // 触发下载
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 显示成功提示
        this.showDownloadSuccess();
    }
    
    // 高清版本的绘制方法
    drawShadowHD(ctx, x, y, width, height, cornerRadius) {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 16;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.roundRect(ctx, x, y, width, height, cornerRadius);
        ctx.fill();
        
        ctx.restore();
    }
    
    drawBorderHD(ctx, x, y, width, height, cornerRadius) {
        const borderStyles = {
            style1: { colors: ['#ff7043', '#ff9800'] },
            style2: { colors: ['#ff6b35', '#f7931e', '#ff9a56'] },
            style3: { colors: ['#ffb74d', '#ff9800'] },
            style4: { colors: ['#d84315', '#ff5722'] }
        };
        
        const style = borderStyles[this.selectedStyle];
        
        let gradient;
        if (style.colors.length === 2) {
            gradient = ctx.createLinearGradient(x, y, x + width, y + height);
            gradient.addColorStop(0, style.colors[0]);
            gradient.addColorStop(1, style.colors[1]);
        } else {
            gradient = ctx.createLinearGradient(x, y, x + width, y + height);
            gradient.addColorStop(0, style.colors[0]);
            gradient.addColorStop(0.5, style.colors[1]);
            gradient.addColorStop(1, style.colors[2]);
        }
        
        ctx.fillStyle = gradient;
        this.roundRect(ctx, x, y, width, height, cornerRadius);
        ctx.fill();
        
        const highlightGradient = ctx.createLinearGradient(x, y, x, y + height / 3);
        highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = highlightGradient;
        this.roundRect(ctx, x, y, width, height, cornerRadius);
        ctx.fill();
    }
    
    drawWhiteBorderHD(ctx, x, y, width, height, cornerRadius) {
        ctx.fillStyle = '#ffffff';
        this.roundRect(ctx, x, y, width, height, cornerRadius);
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.lineWidth = 2;
        this.roundRect(ctx, x + 1, y + 1, width - 2, height - 2, cornerRadius);
        ctx.stroke();
    }
    
    drawRoundedImageHD(ctx, img, x, y, width, height, radius) {
        ctx.save();
        this.roundRect(ctx, x, y, width, height, radius);
        ctx.clip();
        ctx.drawImage(img, x, y, width, height);
        ctx.restore();
    }
    
    drawWatermarkHD(ctx, canvasWidth, canvasHeight) {
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '24px PingFang SC, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        const watermarkText = '微信公众号样式工具';
        const shadowOffset = 8;
        ctx.fillText(watermarkText, canvasWidth - shadowOffset - 16, canvasHeight - shadowOffset - 16);
        ctx.restore();
    }
    
    showDownloadSuccess() {
        const originalText = this.downloadBtn.textContent;
        this.downloadBtn.textContent = '✅ 下载成功！';
        this.downloadBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        
        setTimeout(() => {
            this.downloadBtn.textContent = originalText;
            this.downloadBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        }, 2000);
    }
}

// 初始化图片样式转换器
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ImageStyleConverter();
    });
} else {
    new ImageStyleConverter();
} 