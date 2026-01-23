
// State
const PROJECTS = [
    {
        id: 5,
        title: "WEALTH WAY",
        category: "FinTech & AI",
        description: "نظام مالي متكامل لإدارة الثروات الشخصية، يتميز بتحليلات ذكية مدعومة بالذكاء الاصطناعي، تتبع دقيق للميزانيات، وإدارة الأهداف المالية لتحقيق الاستقرار الحقيقي.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
        tags: ["AI Analysis", "Financial OS", "React Native"],
        link: "https://github.com/alomd",
        icon: "wallet"
    },
    {
        id: 6,
        title: "BUILD CALC",
        category: "Engineering Tech",
        description: "أداة هندسية احترافية لحساب تكاليف وكميات مواد البناء بدقة فائقة. تتضمن نظام ذكاء اصطناعي لتعديل الأسعار حسب المنطقة، وتصدير تقارير PDF، وسجل كامل للعمليات الحسابية.",
        image: "https://images.unsplash.com/photo-1503387762-592dea58dd41?auto=format&fit=crop&q=80&w=800",
        tags: ["Engineering", "AI Pricing", "PDF Reports"],
        link: "https://github.com/alomd",
        icon: "calculator"
    }
];

let currentProjectIndex = 0;
// Check system preference or saved preference
let isDark = true;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme or system preference could be added here, currently defaulting to dark as per original
    renderProjects();
    initTheme();
    initScrollListener();
    lucide.createIcons();

    // Preloader Logic
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 700);
        }
    }, 1500); // Minimum 1.5s display time for premium feel
});

// Theme Management
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Initial State Check
    if (isDark) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    themeBtn.addEventListener('click', () => {
        isDark = !isDark;
        if (isDark) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }

        // Ensure Lucide icons update (sun icon toggles via CSS display classes, but good to trigger refresh if needed)
        // actually the sun icon switching is handled by CSS classes (block/hidden) in the HTML
    });
}

// Scroll Handling
function initScrollListener() {
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) {
            nav.classList.add('backdrop-blur-luxury', 'py-3', 'md:py-4', 'border-b', 'shadow-2xl');
            nav.classList.remove('bg-transparent', 'py-6', 'md:py-10');

            // Dynamic bg based on usage of .dark class in parent
            // We use standard tailwind classes that react to parent .dark
            nav.classList.add('dark:bg-black/80', 'dark:border-white/5', 'bg-white/80', 'border-slate-200');
        } else {
            nav.classList.remove('backdrop-blur-luxury', 'py-3', 'md:py-4', 'border-b', 'shadow-2xl',
                'dark:bg-black/80', 'dark:border-white/5', 'bg-white/80', 'border-slate-200');

            nav.classList.add('bg-transparent', 'py-6', 'md:py-10');
        }
    });
}

function scrollToSection(id) {
    toggleMobileMenu(false);
    const element = document.getElementById(id);
    if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Mobile Menu
function toggleMobileMenu(show) {
    const menu = document.getElementById('mobile-menu');
    if (show) {
        menu.classList.remove('hidden');
        menu.classList.add('flex');
    } else {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
    }
}

// Contact Modal
function toggleContactModal(show) {
    const modal = document.getElementById('contact-modal');
    if (show) {
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}

// Projects Carousel
function renderProjects() {
    const container = document.getElementById('projects-container');
    container.innerHTML = PROJECTS.map((project, idx) => `
        <div class="project-card ${idx === currentProjectIndex ? 'active' : ''}">
             <div class="grid lg:grid-cols-2 gap-8 md:gap-20 h-full items-center">
                <div class="relative aspect-video lg:aspect-[16/10] rounded-3xl md:rounded-[5rem] overflow-hidden border-2 transition-all duration-1000 group dark:border-white/5 dark:bg-slate-900/50 border-black/5 bg-white shadow-2xl" style="will-change: transform">
                    <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-90"></div>
                    
                    <div class="absolute bottom-6 md:bottom-16 right-6 md:right-16 left-6 md:left-16 space-y-2 md:space-y-6">
                        <span class="inline-block px-4 md:px-8 py-1.5 md:py-3 rounded-full text-xs md:text-base font-black uppercase tracking-widest shadow-xl dark:bg-white dark:text-black bg-black text-white">${project.category}</span>
                        <h3 class="text-3xl md:text-8xl font-black text-white tracking-tighter flex items-center gap-4">
                            <i data-lucide="${project.icon}" class="text-white w-10 h-10 md:w-16 md:h-16"></i>
                            ${project.title}
                        </h3>
                    </div>

                    <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-100 bg-black/40">
                      <div class="p-6 md:p-10 bg-white text-black rounded-full shadow-2xl">
                        <i data-lucide="external-link" class="w-8 h-8 md:w-12 md:h-12"></i>
                      </div>
                    </a>
                </div>

                <div class="space-y-6 md:space-y-12 px-2 md:px-8">
                    <p class="text-2xl md:text-5xl font-semibold leading-relaxed tracking-tight dark:text-slate-300 text-slate-700">
                      ${project.description}
                    </p>
                    <div class="flex flex-wrap gap-2 md:gap-5">
                      ${project.tags.map(tag => `
                        <span class="px-4 md:px-8 py-2 md:py-4 rounded-xl md:rounded-3xl text-sm md:text-xl font-black border-2 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 border-black/10 bg-black/5 text-slate-700">
                          ${tag}
                        </span>
                      `).join('')}
                    </div>
                    <button onclick="window.open('${project.link}', '_blank')" class="inline-flex items-center gap-2 md:gap-4 text-xl md:text-3xl font-black transition-colors dark:text-white text-black">
                      عرض دراسة الحالة 
                      <i data-lucide="arrow-right" class="rotate-180 w-6 h-6 md:w-8 md:h-8"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

function nextProject() {
    currentProjectIndex = (currentProjectIndex + 1) % PROJECTS.length;
    updateProjectVisibility();
}

function prevProject() {
    currentProjectIndex = (currentProjectIndex - 1 + PROJECTS.length) % PROJECTS.length;
    updateProjectVisibility();
}

function updateProjectVisibility() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, idx) => {
        if (idx === currentProjectIndex) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}
