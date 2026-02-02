/**
 * 主题配置文件
 * 配置驱动的主题定义，消除 CSS/JS 双重定义问题
 */

/**
 * 主题配置
 * 每个主题包含：基础变量、元素样式、元数据
 */
export const THEMES_CONFIG = {
    // ==================== 经典主题 ====================

    /**
     * 晨露 · 极简奶油
     * 温暖柔和，大地色系，圆润质感
     */
    chenlu: {
        name: '晨露 · 极简奶油',
        category: 'classic',
        description: '温暖、柔和、治愈',
        tags: ['极简', '温暖', '生活'],

        // 基础变量
        variables: {
            'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
            'font-size': '16px',
            'line-height': '1.9',
            'color': '#3d3d3d',
            'background': '#fffdfa'
        },

        // 元素样式
        elements: {
            h1: {
                'font-size': '28px',
                'font-weight': '600',
                'color': '#1a1a1a',
                'margin': '48px 0 28px',
                'padding-bottom': '16px',
                'border-bottom': '2px solid #f0ebe3',
                'letter-spacing': '-0.5px',
                'line-height': '1.3'
            },
            h2: {
                'font-size': '21px',
                'font-weight': '600',
                'color': '#2c2c2c',
                'margin': '40px 0 20px',
                'padding-left': '16px',
                'border-left': '3px solid #d4c4b0',
                'letter-spacing': '-0.3px'
            },
            h3: {
                'font-size': '17px',
                'font-weight': '600',
                'color': '#3d3d3d',
                'margin': '28px 0 14px'
            },
            p: {
                'margin': '18px 0',
                'text-align': 'justify',
                'text-justify': 'inter-ideograph'
            },
            strong: {
                'font-weight': '600',
                'color': '#1a1a1a'
            },
            em: {
                'font-style': 'italic',
                'color': '#555'
            },
            blockquote: {
                'margin': '28px 0',
                'padding': '24px 28px',
                'background': '#faf8f5',
                'border-radius': '12px',
                'color': '#5a5a5a',
                'font-style': 'italic'
            },
            img: {
                'max-width': '100%',
                'height': 'auto',
                'display': 'block',
                'margin': '32px auto',
                'border-radius': '12px'
            },
            a: {
                'color': '#8b7355',
                'text-decoration': 'none',
                'border-bottom': '1px solid #d4c4b0'
            },
            code: {
                'font-family': 'SF Mono, Monaco, "Cascadia Code", monospace',
                'background': '#f5f2ed',
                'color': '#8b6914',
                'padding': '3px 8px',
                'border-radius': '5px',
                'font-size': '0.88em'
            },
            pre: {
                'background': '#f8f6f3',
                'padding': '24px',
                'border-radius': '12px',
                'overflow-x': 'auto',
                'margin': '24px 0',
                'border': '1px solid #f0ebe3'
            },
            ul: {
                'margin': '20px 0',
                'padding-left': '2.2em'
            },
            ol: {
                'margin': '20px 0',
                'padding-left': '2.2em'
            },
            li: {
                'margin': '10px 0',
                'padding-left': '4px'
            },
            table: {
                'width': '100%',
                'border-collapse': 'separate',
                'border-spacing': '0',
                'margin': '28px 0',
                'font-size': '14px'
            },
            th: {
                'background': '#f5f2ed',
                'color': '#3d3d3d',
                'font-weight': '600',
                'padding': '14px 16px',
                'text-align': 'left',
                'border-bottom': '2px solid #e8e2d9'
            },
            td: {
                'padding': '12px 16px',
                'border-bottom': '1px solid #f0ebe3'
            },
            hr: {
                'border': 'none',
                'height': '1px',
                'background': '#e8e2d9',
                'margin': '48px 0'
            }
        }
    },

    /**
     * 墨韵 · 东方美学
     * 宣纸质感，书卷气息，首字下沉
     */
    moyun: {
        name: '墨韵 · 东方美学',
        category: 'classic',
        description: '书卷气息，东方韵味',
        tags: ['东方', '文化', '书卷'],

        variables: {
            'font-family': '"PingFang SC", "Hiragino Sans GB", "Noto Serif SC", serif',
            'font-size': '16.5px',
            'line-height': '2',
            'color': '#2c2c2c',
            'background': '#fcfcfa'
        },

        elements: {
            h1: {
                'font-size': '30px',
                'font-weight': '700',
                'color': '#1a1a1a',
                'margin': '52px 0 32px',
                'text-align': 'center',
                'padding-bottom': '24px',
                'border-bottom': '2px solid #8b4513',
                'letter-spacing': '2px'
            },
            h2: {
                'font-size': '22px',
                'font-weight': '600',
                'color': '#2d2d2d',
                'margin': '44px 0 20px',
                'padding-bottom': '10px',
                'border-bottom': '1px solid #e0dcd5',
                'letter-spacing': '1px'
            },
            h3: {
                'font-size': '17px',
                'font-weight': '600',
                'color': '#3d3d3d',
                'margin': '28px 0 16px'
            },
            p: {
                'margin': '20px 0',
                'text-indent': '2em',
                'text-align': 'justify'
            },
            strong: {
                'font-weight': '700',
                'color': '#1a1a1a'
            },
            em: {
                'font-style': 'italic',
                'color': '#555'
            },
            blockquote: {
                'margin': '32px 20px',
                'padding': '24px 28px',
                'background': '#f9f7f4',
                'border': '1px solid #e8e2d9',
                'color': '#555'
            },
            img: {
                'max-width': '100%',
                'height': 'auto',
                'display': 'block',
                'margin': '36px auto'
            },
            a: {
                'color': '#8b4513',
                'text-decoration': 'none',
                'border-bottom': '1px dashed #b8956a'
            },
            code: {
                'font-family': '"Noto Sans SC", monospace',
                'background': '#f2f0ec',
                'color': '#6b5637',
                'padding': '2px 6px',
                'border-radius': '3px',
                'font-size': '0.85em'
            },
            pre: {
                'background': '#f7f5f1',
                'padding': '20px 24px',
                'border-radius': '4px',
                'margin': '24px 0',
                'border': '1px solid #ebe7e0'
            },
            ul: {
                'margin': '20px 0',
                'padding-left': '2.5em'
            },
            ol: {
                'margin': '20px 0',
                'padding-left': '2.5em'
            },
            li: {
                'margin': '8px 0'
            },
            hr: {
                'border': 'none',
                'height': '1px',
                'background': '#d0c8bc',
                'margin': '48px 0'
            }
        }
    },

    /**
     * 都市 · 杂志编辑
     * 黑白对比，荧光标记，强烈层次
     */
    dushi: {
        name: '都市 · 杂志编辑',
        category: 'classic',
        description: '现代、强烈、对比',
        tags: ['现代', '商务', '科技'],

        variables: {
            'font-family': '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
            'font-size': '15.5px',
            'line-height': '1.75',
            'color': '#1a1a1a',
            'background': '#ffffff'
        },

        elements: {
            h1: {
                'font-size': '36px',
                'font-weight': '800',
                'color': '#000',
                'margin': '40px 0 28px',
                'line-height': '1.2',
                'letter-spacing': '-1px',
                'text-transform': 'uppercase'
            },
            h2: {
                'font-size': '22px',
                'font-weight': '700',
                'color': '#000',
                'margin': '40px 0 16px',
                'padding-bottom': '8px',
                'border-bottom': '3px solid #000',
                'display': 'inline-block'
            },
            h3: {
                'font-size': '16px',
                'font-weight': '700',
                'color': '#333',
                'margin': '28px 0 12px',
                'text-transform': 'uppercase',
                'letter-spacing': '0.5px'
            },
            p: {
                'margin': '16px 0'
            },
            strong: {
                'font-weight': '700',
                'color': '#000',
                'background': 'linear-gradient(transparent 60%, #ffeb3b 60%)',
                'padding': '0 2px'
            },
            em: {
                'font-style': 'italic'
            },
            blockquote: {
                'margin': '32px 0',
                'padding': '24px 28px',
                'background': '#000',
                'color': '#fff',
                'font-size': '18px',
                'font-weight': '500',
                'line-height': '1.6'
            },
            img: {
                'max-width': '100%',
                'height': 'auto',
                'display': 'block',
                'margin': '32px auto'
            },
            a: {
                'color': '#000',
                'text-decoration': 'underline',
                'text-decoration-thickness': '2px',
                'text-underline-offset': '3px',
                'font-weight': '600'
            },
            code: {
                'font-family': 'SF Mono, Monaco, monospace',
                'background': '#f0f0f0',
                'color': '#e91e63',
                'padding': '3px 8px',
                'border-radius': '0',
                'font-size': '0.9em',
                'font-weight': '500'
            },
            pre: {
                'background': '#1a1a1a',
                'padding': '24px',
                'margin': '24px 0',
                'color': '#f5f5f5'
            },
            ul: {
                'margin': '20px 0',
                'padding-left': '1.8em'
            },
            ol: {
                'margin': '20px 0',
                'padding-left': '1.8em'
            },
            li: {
                'margin': '8px 0'
            },
            table: {
                'width': '100%',
                'border-collapse': 'collapse',
                'margin': '24px 0',
                'font-size': '14px'
            },
            th: {
                'background': '#000',
                'color': '#fff',
                'font-weight': '600',
                'padding': '14px 16px',
                'text-align': 'left'
            },
            td: {
                'padding': '12px 16px',
                'border-bottom': '1px solid #e0e0e0'
            },
            hr: {
                'border': 'none',
                'height': '4px',
                'background': '#000',
                'margin': '40px 0'
            }
        }
    },

    /**
     * 森系 · 自然治愈
     * 森林绿意，有机圆角，温暖木质
     */
    senxi: {
        name: '森系 · 自然治愈',
        category: 'classic',
        description: '自然、治愈、清新',
        tags: ['自然', '清新', '治愈'],

        variables: {
            'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", sans-serif',
            'font-size': '16px',
            'line-height': '1.9',
            'color': '#2d3a2d',
            'background': '#fafbf7'
        },

        elements: {
            h1: {
                'font-size': '29px',
                'font-weight': '600',
                'color': '#1a3d1a',
                'margin': '44px 0 24px',
                'padding-bottom': '16px',
                'border-bottom': '4px solid #4a7c59',
                'letter-spacing': '-0.5px'
            },
            h2: {
                'font-size': '21px',
                'font-weight': '600',
                'color': '#2d5a3d',
                'margin': '36px 0 18px',
                'padding-left': '14px',
                'border-left': '4px solid #4a7c59'
            },
            h3: {
                'font-size': '17px',
                'font-weight': '600',
                'color': '#3d6b4d',
                'margin': '26px 0 14px'
            },
            p: {
                'margin': '18px 0',
                'text-align': 'justify'
            },
            strong: {
                'font-weight': '600',
                'color': '#1a3d1a'
            },
            em: {
                'font-style': 'italic',
                'color': '#4a5d4a'
            },
            blockquote: {
                'margin': '28px 0',
                'padding': '22px 26px',
                'background': '#f1f5f1',
                'border-radius': '16px',
                'border': '1px solid #d0e0d0',
                'color': '#4a5d4a'
            },
            img: {
                'max-width': '100%',
                'height': 'auto',
                'display': 'block',
                'margin': '32px auto',
                'border-radius': '20px'
            },
            a: {
                'color': '#4a7c59',
                'text-decoration': 'none',
                'border-bottom': '1px solid #b8d4b8'
            },
            code: {
                'font-family': 'SF Mono, Monaco, monospace',
                'background': '#e8f0e8',
                'color': '#2d5a3d',
                'padding': '3px 8px',
                'border-radius': '6px',
                'font-size': '0.88em'
            },
            pre: {
                'background': '#2d4a3d',
                'padding': '22px',
                'border-radius': '16px',
                'margin': '24px 0',
                'color': '#e8f5e8'
            },
            ul: {
                'margin': '20px 0',
                'padding-left': '2.2em'
            },
            ol: {
                'margin': '20px 0',
                'padding-left': '2.2em'
            },
            li: {
                'margin': '10px 0'
            },
            hr: {
                'border': 'none',
                'height': '2px',
                'background': '#b8d4b8',
                'margin': '44px 0'
            }
        }
    },

    /**
     * 极夜 · 深色高级
     * 深色背景，霓虹强调，代码友好
     */
    jiye: {
        name: '极夜 · 深色高级',
        category: 'classic',
        description: '深色、科技、极客',
        tags: ['深色', '科技', '极客'],

        variables: {
            'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            'font-size': '15.5px',
            'line-height': '1.85',
            'color': '#e0e0e0',
            'background': '#0d1117'
        },

        elements: {
            h1: {
                'font-size': '32px',
                'font-weight': '700',
                'color': '#58a6ff',
                'margin': '44px 0 24px',
                'letter-spacing': '-0.5px'
            },
            h2: {
                'font-size': '22px',
                'font-weight': '600',
                'color': '#f0f0f0',
                'margin': '36px 0 16px',
                'padding-bottom': '10px',
                'border-bottom': '1px solid #30363d'
            },
            h3: {
                'font-size': '17px',
                'font-weight': '600',
                'color': '#c9d1d9',
                'margin': '28px 0 12px'
            },
            p: {
                'margin': '16px 0',
                'color': '#b0b8c4'
            },
            strong: {
                'font-weight': '600',
                'color': '#f0f0f0'
            },
            em: {
                'font-style': 'italic',
                'color': '#8b949e'
            },
            blockquote: {
                'margin': '28px 0',
                'padding': '20px 24px',
                'background': '#161b22',
                'border-left': '4px solid #58a6ff',
                'color': '#8b949e'
            },
            img: {
                'max-width': '100%',
                'height': 'auto',
                'display': 'block',
                'margin': '28px auto',
                'border-radius': '12px'
            },
            a: {
                'color': '#58a6ff',
                'text-decoration': 'none',
                'border-bottom': '1px solid #58a6ff'
            },
            code: {
                'font-family': 'SF Mono, Monaco, "Cascadia Code", monospace',
                'background': '#161b22',
                'color': '#ff7b72',
                'padding': '3px 8px',
                'border-radius': '6px',
                'font-size': '0.88em'
            },
            pre: {
                'background': '#0d1117',
                'padding': '20px',
                'border-radius': '8px',
                'margin': '24px 0',
                'border': '1px solid #30363d'
            },
            ul: {
                'margin': '20px 0',
                'padding-left': '2em'
            },
            ol: {
                'margin': '20px 0',
                'padding-left': '2em'
            },
            li: {
                'margin': '10px 0',
                'color': '#b0b8c4'
            },
            table: {
                'width': '100%',
                'border-collapse': 'collapse',
                'margin': '24px 0',
                'font-size': '14px'
            },
            th: {
                'background': '#161b22',
                'color': '#f0f0f0',
                'font-weight': '600',
                'padding': '12px 16px',
                'text-align': 'left',
                'border-bottom': '1px solid #30363d'
            },
            td: {
                'padding': '12px 16px',
                'border-bottom': '1px solid #21262d'
            },
            hr: {
                'border': 'none',
                'height': '1px',
                'background': '#30363d',
                'margin': '40px 0'
            }
        }
    },

    // 注意：其他主题（国潮、侘寂、赛博等）将逐步添加
    // 这里先展示5个经典主题的配置格式
};

/**
 * 默认样式（用于继承和扩展）
 */
export const DEFAULT_STYLES = {
    h1: {
        'font-size': '28px',
        'font-weight': '600',
        'margin': '40px 0 24px'
    },
    h2: {
        'font-size': '21px',
        'font-weight': '600',
        'margin': '36px 0 18px'
    },
    h3: {
        'font-size': '17px',
        'font-weight': '600',
        'margin': '28px 0 14px'
    },
    p: {
        'margin': '16px 0'
    },
    ul: {
        'margin': '20px 0',
        'padding-left': '2em'
    },
    ol: {
        'margin': '20px 0',
        'padding-left': '2em'
    }
};

/**
 * 主题分类
 */
export const THEME_CATEGORIES = {
    classic: '经典主题',
    special: '特色风格',
    svg: 'SVG 装饰'
};

/**
 * 获取所有主题列表
 */
export function getAllThemes() {
    return Object.entries(THEMES_CONFIG).map(([key, theme]) => ({
        key,
        name: theme.name,
        category: theme.category,
        description: theme.description,
        tags: theme.tags || []
    }));
}

/**
 * 根据分类获取主题
 */
export function getThemesByCategory(category) {
    return getAllThemes().filter(theme => theme.category === category);
}

/**
 * 获取主题配置
 */
export function getThemeConfig(themeKey) {
    return THEMES_CONFIG[themeKey] || null;
}

export default THEMES_CONFIG;
