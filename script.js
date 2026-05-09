/**
 * CODX - Core Website Logic
 * Handles Theme, Translation, Animations, and Interactivity
 */

const state = {
    theme: localStorage.getItem('theme') || 'dark',
    lang: localStorage.getItem('lang') || 'ar'
};

// --- Theme Management ---
const ThemeManager = {
    init() {
        this.apply(state.theme);
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                state.theme = state.theme === 'dark' ? 'light' : 'dark';
                this.apply(state.theme);
            });
        }
    },
    apply(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }
};

// --- Translation Management ---
const TranslationManager = {
    init() {
        this.apply(state.lang);
        const toggle = document.getElementById('lang-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                state.lang = state.lang === 'ar' ? 'en' : 'ar';
                this.apply(state.lang);
                // Dispatch event for components that need to re-run (like typing effect)
                window.dispatchEvent(new CustomEvent('langChanged', { detail: state.lang }));
            });
        }
    },
    apply(lang) {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('lang', lang);

        // Update Text Elements
        document.querySelectorAll('[data-ar], [data-en]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else {
                    el.innerText = text;
                }
            }
        });

        // Update Language Toggle Label
        const langLabel = document.getElementById('lang-label');
        if (langLabel) {
            langLabel.innerText = lang === 'ar' ? 'EN' : 'AR';
        }
    }
};

// --- Animation & UI Logic ---
const UIManager = {
    init() {
        this.initReveal();
        this.initTyping();
        this.initNavbar();
        this.initLoader();
        this.initForm();
        this.initIdeas();
        lucide.createIcons();
    },

    initIdeas() {
        const IdeaManager = {
            storageKey: 'codx_community_ideas',
            defaultIdeas: [],
            
            init() {
                this.render();
                const btn = document.getElementById('post-idea-btn');
                if (btn) {
                    btn.addEventListener('click', () => this.post());
                }
            },

            getIdeas() {
                const stored = localStorage.getItem(this.storageKey);
                return stored ? JSON.parse(stored) : this.defaultIdeas;
            },

            post() {
                const nameInput = document.getElementById('idea-name');
                const textInput = document.getElementById('idea-text');
                const tagInput = document.getElementById('idea-tag');
                const name = nameInput.value.trim();
                const text = textInput.value.trim();
                const tag = tagInput.value;

                if (!name || !text) {
                    alert(state.lang === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
                    return;
                }

                // Send Email Notification via Formspree
                fetch('https://formspree.io/f/mqkvrvqy', {
                    method: 'POST',
                    body: JSON.stringify({ name, idea: text, tag: tag, type: 'Community Idea' }),
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
                });

                const ideas = this.getIdeas();
                const newIdea = { 
                    id: Date.now(), 
                    name, 
                    text, 
                    tag,
                    date: new Date().toISOString(), 
                    likes: 0, 
                    liked: false 
                };
                ideas.unshift(newIdea);
                localStorage.setItem(this.storageKey, JSON.stringify(ideas));

                nameInput.value = '';
                textInput.value = '';
                this.render();
            },

            toggleLike(id) {
                const ideas = this.getIdeas();
                const idea = ideas.find(i => i.id === id);
                if (idea) {
                    idea.liked = !idea.liked;
                    idea.likes = idea.liked ? (idea.likes || 0) + 1 : (idea.likes || 1) - 1;
                    localStorage.setItem(this.storageKey, JSON.stringify(ideas));
                    this.render();
                }
            },

            render() {
                const feed = document.getElementById('idea-feed');
                if (!feed) return;

                const admins = ['abdulraouf', 'codx', 'alomda', 'عبدالرؤوف', 'العمده', 'عبد الرءوف'];
                const ideas = this.getIdeas();

                if (ideas.length === 0) {
                    feed.innerHTML = `
                        <div class="text-center py-12 glass rounded-3xl border-dashed border-2 border-slate-200 dark:border-white/10">
                            <i data-lucide="sparkles" class="w-12 h-12 text-blue-500 mx-auto mb-4 opacity-50"></i>
                            <p class="text-slate-500 font-bold" data-ar="كن أول من يشارك فكرة!" data-en="Be the first to share an idea!">
                                ${state.lang === 'ar' ? 'كن أول من يشارك فكرة!' : 'Be the first to share an idea!'}
                            </p>
                        </div>
                    `;
                } else {
                    feed.innerHTML = ideas.map(idea => {
                        const isAdmin = admins.includes(idea.name.toLowerCase().trim());
                        const tagColors = {
                            'Idea': 'bg-blue-500/10 text-blue-500',
                            'Feature': 'bg-purple-500/10 text-purple-500',
                            'UI/UX': 'bg-emerald-500/10 text-emerald-500',
                            'Crazy': 'bg-orange-500/10 text-orange-500'
                        };

                        return `
                        <div class="glass p-6 rounded-3xl border-white/10 hover:border-blue-500/30 transition-all duration-300 group relative overflow-hidden">
                            ${isAdmin ? '<div class="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-2xl -z-10"></div>' : ''}
                            <div class="flex justify-between items-start mb-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full ${isAdmin ? 'bg-blue-600' : 'bg-gradient-to-tr from-slate-200 to-slate-400 dark:from-slate-700 dark:to-slate-800'} flex items-center justify-center text-white font-black text-xs shadow-lg">
                                        ${isAdmin ? '<i data-lucide="shield-check" class="w-5 h-5"></i>' : idea.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <h5 class="font-black text-sm">${idea.name}</h5>
                                            ${isAdmin ? '<span class="bg-blue-600/10 text-blue-500 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Developer</span>' : ''}
                                        </div>
                                        <p class="text-[10px] text-slate-500 font-bold uppercase">${new Date(idea.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="px-3 py-1 ${tagColors[idea.tag] || tagColors['Idea']} text-[9px] font-black rounded-full uppercase">${idea.tag || 'Idea'}</span>
                                    <button onclick="UIManager.ideaManager.toggleLike(${idea.id})" 
                                            class="flex items-center gap-1 text-sm font-bold transition-colors ${idea.liked ? 'text-red-500' : 'text-slate-500 hover:text-red-400'}">
                                        <span class="text-xs">${idea.likes || 0}</span>
                                        <i data-lucide="heart" class="w-4 h-4 ${idea.liked ? 'fill-current' : ''}"></i>
                                    </button>
                                </div>
                            </div>
                            <p class="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">${idea.text}</p>
                        </div>
                    `}).join('');
                }
                lucide.createIcons();
            }
        };

        UIManager.ideaManager = IdeaManager; // Expose for onclick
        IdeaManager.init();
    },

    initForm() {
        const form = document.getElementById('contact-form');
        const submitBtn = document.getElementById('submit-btn');
        const formContent = document.getElementById('form-content');
        const successScreen = document.getElementById('success-screen');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // WhatsApp Redirection
            const waNumber = "201144453259";
            const waText = encodeURIComponent(`*طلب تواصل جديد*\n\n*الاسم:* ${name}\n*الإيميل:* ${email}\n*الرسالة:* ${message}`);
            const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

            // Show Success Screen First
            formContent.classList.add('hidden');
            successScreen.classList.remove('hidden');
            form.reset();
            lucide.createIcons();

            // Redirect to WhatsApp after a short delay
            setTimeout(() => {
                window.open(waUrl, '_blank');
            }, 1000);
            
            // Also send to Formspree in background for records
            fetch('https://formspree.io/f/mqkvrvqy', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
        });
    },

    initLoader() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loader.classList.add('hidden');
                }, 800);
            });
        }
    },

    initNavbar() {
        const nav = document.getElementById('navbar');
        if (!nav) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('py-2');
                nav.querySelector('.container')?.classList.add('shadow-xl');
            } else {
                nav.classList.remove('py-2');
                nav.querySelector('.container')?.classList.remove('shadow-xl');
            }
        });
    },

    initReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    if (entry.target.classList.contains('stagger-reveal')) {
                        entry.target.classList.add('active');
                    }
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.reveal, .stagger-reveal').forEach(el => observer.observe(el));
    },

    initTyping() {
        const typingElements = document.querySelectorAll('.typing-cursor');
        
        const runTyping = (el) => {
            const text = el.getAttribute(`data-text-${state.lang}`) || el.getAttribute('data-text');
            if (!text) return;
            
            let i = 0;
            el.innerText = '';
            const type = () => {
                if (i < text.length) {
                    el.innerText += text.charAt(i);
                    i++;
                    setTimeout(type, 100);
                }
            };
            type();
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runTyping(entry.target);
                    // observer.unobserve(entry.target); // Optional: only type once
                }
            });
        });

        typingElements.forEach(el => observer.observe(el));

        // Re-run on language change
        window.addEventListener('langChanged', () => {
            typingElements.forEach(el => runTyping(el));
        });
    }
};

// --- Gallery Management ---
const GalleryManager = {
    currentIndex: 0,
    images: [],
    
    init() {
        const container = document.getElementById('gallery-container');
        if (!container) return;
        
        this.images = Array.from(container.querySelectorAll('img')).map(img => img.src);
        
        // Keydown support
        window.addEventListener('keydown', (e) => {
            if (document.getElementById('lightbox').classList.contains('hidden')) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowRight') this.prev();
            if (e.key === 'ArrowLeft') this.next();
        });
    },
    
    open(index) {
        this.currentIndex = index;
        this.update();
        document.getElementById('lightbox').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    },
    
    close() {
        document.getElementById('lightbox').classList.add('hidden');
        document.body.style.overflow = '';
    },
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.update();
    },
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.update();
    },
    
    update() {
        const img = document.getElementById('lightbox-img');
        const counter = document.getElementById('lightbox-counter');
        if (img) img.src = this.images[this.currentIndex];
        if (counter) counter.innerText = `${this.currentIndex + 1} / ${this.images.length}`;
    }
};

// --- Source Code Protection ---
const SecurityManager = {
    init() {
        this.disableRightClick();
        this.disableDevTools();
        this.disablePrint();
    },

    disableRightClick() {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    },

    disableDevTools() {
        document.addEventListener('keydown', (e) => {
            // F12
            if (e.keyCode === 123) {
                e.preventDefault();
            }
            // Ctrl + Shift + I (Inspect)
            if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
                e.preventDefault();
            }
            // Ctrl + Shift + J (Console)
            if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
                e.preventDefault();
            }
            // Ctrl + U (View Source)
            if (e.ctrlKey && e.keyCode === 85) {
                e.preventDefault();
            }
        });
    },

    disablePrint() {
        document.addEventListener('keydown', (e) => {
            // Ctrl + P
            if (e.ctrlKey && e.keyCode === 80) {
                e.preventDefault();
            }
        });
    }
};

// --- Initialize Everything ---
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    TranslationManager.init();
    UIManager.init();
    GalleryManager.init();
    SecurityManager.init();
    UIManager.galleryManager = GalleryManager;
});
