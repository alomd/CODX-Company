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
        this.initStats();
        this.initEstimator();
        this.initFAQ();
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
                        <div class="text-center py-12 glass rounded-3xl border-dashed border-2 border-gold/20">
                            <i data-lucide="sparkles" class="w-12 h-12 text-gold mx-auto mb-4 opacity-50"></i>
                            <p class="text-slate-400 font-bold" data-ar="كن أول من يشارك فكرة!" data-en="Be the first to share an idea!">
                                ${state.lang === 'ar' ? 'كن أول من يشارك فكرة!' : 'Be the first to share an idea!'}
                            </p>
                        </div>
                    `;
                } else {
                    feed.innerHTML = ideas.map(idea => {
                        const isAdmin = admins.includes(idea.name.toLowerCase().trim());
                        const tagColors = {
                            'Idea': 'bg-[#0EA5E9]/15 text-[#0EA5E9] border border-[#0EA5E9]/30',
                            'Feature': 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30',
                            'UI/UX': 'border border-[#0EA5E9]/40 text-[#0EA5E9]',
                            'Crazy': 'bg-[#0EA5E9] text-[#020617] font-black'
                        };

                        return `
                        <div class="glass p-6 rounded-3xl border-white/10 hover:border-[#0EA5E9]/40 hover-3d transition-all duration-300 group relative overflow-hidden preserve-3d perspective-1000">
                            ${isAdmin ? '<div class="absolute top-0 right-0 w-24 h-24 bg-[#0EA5E9]/10 blur-2xl -z-10"></div>' : ''}
                            <div class="flex justify-between items-start mb-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full ${isAdmin ? 'bg-[#0EA5E9] text-[#020617]' : 'bg-white/5 border border-white/10 text-white'} flex items-center justify-center font-black text-xs shadow-lg tilt-image">
                                        ${isAdmin ? '<i data-lucide="shield-check" class="w-5 h-5"></i>' : idea.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <h5 class="font-black text-sm text-white">${idea.name}</h5>
                                            ${isAdmin ? '<span class="bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Developer</span>' : ''}
                                        </div>
                                        <p class="text-[10px] text-slate-400 font-bold uppercase">${new Date(idea.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="px-3 py-1 ${tagColors[idea.tag] || tagColors['Idea']} text-[9px] font-black rounded-full uppercase">${idea.tag || 'Idea'}</span>
                                    <button onclick="UIManager.ideaManager.toggleLike(${idea.id})" 
                                            class="flex items-center gap-1 text-sm font-bold transition-colors ${idea.liked ? 'text-red-500' : 'text-slate-400 hover:text-red-400'}">
                                        <span class="text-xs">${idea.likes || 0}</span>
                                        <i data-lucide="heart" class="w-4 h-4 ${idea.liked ? 'fill-current' : ''}"></i>
                                    </button>
                                </div>
                            </div>
                            <p class="text-slate-300 font-medium leading-relaxed">${idea.text}</p>
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
            const waNumber = "201223347637";
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
        if (!loader) return;

        // Terminal typing effect
        const typingEl = document.getElementById('loader-typing-text');
        if (typingEl) {
            const messages = [
                'initializing system...',
                'loading modules...',
                'connecting services...',
                'compiling assets...',
                'system ready ✓'
            ];
            let msgIndex = 0;

            const typeMessage = () => {
                if (msgIndex >= messages.length) return;
                const msg = messages[msgIndex];
                let charIndex = 0;
                typingEl.textContent = '';

                const typeChar = () => {
                    if (charIndex < msg.length) {
                        typingEl.textContent += msg[charIndex];
                        charIndex++;
                        setTimeout(typeChar, 35 + Math.random() * 25);
                    } else {
                        msgIndex++;
                        if (msgIndex < messages.length) {
                            setTimeout(typeMessage, 400);
                        }
                    }
                };
                typeChar();
            };
            typeMessage();
        }

        // Dismiss loader after page load + minimum display time
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('loader-exit');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 900);
            }, 2500);
        });
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

    initStats() {
        const counters = document.querySelectorAll('.stat-counter');
        if (!counters.length) return;

        let animated = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        let count = 0;
                        const step = Math.max(1, Math.floor(target / 40));
                        const timer = setInterval(() => {
                            count += step;
                            if (count >= target) {
                                counter.innerText = target;
                                clearInterval(timer);
                            } else {
                                counter.innerText = count;
                            }
                        }, 30);
                    });
                }
            });
        }, { threshold: 0.3 });

        const statsSection = document.getElementById('stats');
        if (statsSection) observer.observe(statsSection);
    },

    initEstimator() {
        const typeCards = document.querySelectorAll('#estimator-type-container .estimator-card');
        const featureCards = document.querySelectorAll('#estimator-features-container .estimator-card');
        const priceEl = document.getElementById('est-price');
        const timeEl = document.getElementById('est-time');
        const sendBtn = document.getElementById('send-estimate-btn');

        if (!priceEl) return;

        let basePrice = 1500;
        let baseDays = 14;
        let selectedTypeName = 'تطبيق موبايل (Mobile App)';

        const calculateTotal = () => {
            let totalCost = basePrice;
            let totalDays = baseDays;

            featureCards.forEach(card => {
                const check = card.querySelector('.feature-check');
                if (check && check.checked) {
                    totalCost += parseInt(card.getAttribute('data-cost') || 0);
                    totalDays += parseInt(card.getAttribute('data-days') || 0);
                    card.classList.add('selected');
                } else {
                    card.classList.remove('selected');
                }
            });

            priceEl.innerText = `$${totalCost.toLocaleString()}`;
            timeEl.innerText = state.lang === 'ar' ? `~ ${totalDays} يوم عمل` : `~ ${totalDays} Working Days`;
        };

        typeCards.forEach(card => {
            card.addEventListener('click', () => {
                typeCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                basePrice = parseInt(card.getAttribute('data-base') || 1500);
                baseDays = parseInt(card.getAttribute('data-days') || 14);
                selectedTypeName = card.querySelector('div').innerText;
                calculateTotal();
            });
        });

        featureCards.forEach(card => {
            const check = card.querySelector('.feature-check');
            card.addEventListener('click', (e) => {
                if (e.target !== check) {
                    check.checked = !check.checked;
                }
                calculateTotal();
            });
        });

        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                const selectedFeatures = [];
                featureCards.forEach(card => {
                    const check = card.querySelector('.feature-check');
                    if (check && check.checked) {
                        selectedFeatures.push(card.querySelector('span').innerText);
                    }
                });

                const featuresText = selectedFeatures.length ? selectedFeatures.join(', ') : 'لا يوجد ميزات إضافية محدده';
                const message = `*طلب تقدير مشروع جديد من حاسبة CODX*\n\n` +
                                `*نوع المنصة:* ${selectedTypeName}\n` +
                                `*الميزات المطلوبة:* ${featuresText}\n` +
                                `*التكلفة المقدرة:* ${priceEl.innerText}\n` +
                                `*المدة التقديرية:* ${timeEl.innerText}`;

                const waUrl = `https://wa.me/201223347637?text=${encodeURIComponent(message)}`;
                window.open(waUrl, '_blank');
            });
        }

        calculateTotal();
    },

    initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
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
