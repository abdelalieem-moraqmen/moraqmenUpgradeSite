/**
 * مرقمن — Bilingual Translation Engine
 * AR (default) ↔ EN toggle · localStorage persistence
 * data-i18n="key"  → textContent
 * data-i18n-ph="key" → placeholder
 */

const TRANSLATIONS = {

  ar: {
    /* ── NAV ────────────────────────────────── */
    "nav.home":     "الرئيسية",
    "nav.services": "الخدمات",
    "nav.projects": "المشاريع",
    "nav.about":    "عن مرقمن",
    "nav.contact":  "تواصل معنا",
    "nav.lang":     "English",
    "nav.cta":      "ناقش مشروعك",

    /* ── HERO ───────────────────────────────── */
    "hero.tag":    "حلول برمجية مخصصة",
    "hero.title1": "حلول برمجية يعتمد عليها،",
    "hero.title2": "مبنية لاحتياجات بيزنس حقيقية.",
    "hero.desc":   "نفهم السياق، نحدد الحل الرقمي الصح، وبعدين نصممه ونبنيه بجودة تقنية تعتمد عليه وتكبر معاك مع تطور الشغل.",
    "hero.cta1":   "استعرض أعمالنا",
    "hero.cta2":   "ناقش مشروعك",
    "hero.badge1": "5 سنوات من تسليم المشاريع البرمجية",
    "hero.badge2": "منتجات على Google Play و Shopify App Store",
    "hero.badge3": "30 يوم دعم مجاني من تاريخ الاستلام",

    /* ── CARDS ──────────────────────────────── */
    "card.sales":  "نمو المبيعات",
    "card.launch": "وقت الإطلاق",
    "card.sat":    "رضا العملاء",

    /* ── TRUSTED ────────────────────────────── */
    "trusted.label": "موثوق بنا من قِبَل 50+ عميل",

    /* ── SERVICES ───────────────────────────── */
    "srv.tag":   "ما الذي نبنيه",
    "srv.title": "احتياجات بيزنس مختلفة تحتاج لأنواع مختلفة من السوفتوير.",
    "srv.desc":  "مرقمن بتشتغل في ستة مجالات تطوير محددة — من أنظمة الأعمال الداخلية والمنتجات الرقمية لتطبيقات الموبايل والتجارة الإلكترونية والمواقع والتكاملات.",
    "srv.cta":   "استعرض كل الخدمات",

    "srv1.title": "تطبيقات الويب والأنظمة المخصصة",
    "srv1.desc":  "أنظمة ويب مخصصة لإدارة الـworkflows والمستخدمين والبيانات والصلاحيات والعمليات اليومية.",
    "srv1.f1": "أنظمة ERP و CRM مخصصة",
    "srv1.f2": "لوحات تحكم متقدمة",
    "srv1.f3": "React / Next.js / Node.js",

    "srv2.title": "منصات SaaS والمنتجات الرقمية",
    "srv2.badge": "الأكثر طلباً",
    "srv2.desc":  "منتجات رقمية متعددة المستخدمين مبنية لدعم الحسابات والصلاحيات والاشتراكات والتوسع عبر العملاء.",
    "srv2.f1": "Multi-tenant architecture",
    "srv2.f2": "نظام اشتراكات وفوترة",
    "srv2.f3": "نشر على Google Play & App Store",

    "srv3.title": "تطوير تطبيقات الموبايل",
    "srv3.desc":  "تطبيقات موبايل متصلة بالـ backend والبيانات والأنظمة، مصممة للاستخدام اليومي الموثوق.",
    "srv3.f1": "React Native / Flutter",
    "srv3.f2": "تكامل كامل مع الـ API",
    "srv3.f3": "نشر على المتاجر",

    "srv4.title": "تطوير ونشر المتاجر الإلكترونية",
    "srv4.desc":  "متاجر إلكترونية مبنية لدعم البيع والعمليات عبر المنتجات والطلبات والمدفوعات والشحن والتكاملات.",
    "srv4.f1": "Shopify / WooCommerce",
    "srv4.f2": "تكامل الدفع والشحن",
    "srv4.f3": "Shopify Apps مخصصة",

    "srv5.title": "مواقع الأعمال وأنظمة إدارة المحتوى",
    "srv5.desc":  "مواقع أعمال تشرح الشركة بوضوح، تجعل المحتوى سهل الإدارة، وتخلق مسار واضح لاستفسارات العملاء.",
    "srv5.f1": "WordPress / Webflow",
    "srv5.f2": "SEO & Performance",
    "srv5.f3": "CMS مرن وسهل",

    "srv6.title": "التكاملات والإضافات والأتمتة",
    "srv6.desc":  "تكاملات وإضافات مخصصة تربط الأنظمة وتزامن البيانات وتقلل العمل اليدوي المتكرر.",
    "srv6.f1": "API Integrations",
    "srv6.f2": "Zapier / Make / Custom",
    "srv6.f3": "أتمتة العمليات",

    /* ── PROJECTS ───────────────────────────── */
    "proj.tag":   "أعمال حقيقية",
    "proj.title": "مشاريع بنيناها وسلّمناها فعلاً.",
    "proj.desc":  "نماذج من مشاريع طورناها وسلمناها لعملاء حقيقيين بنتائج ملموسة في السوق.",
    "proj.view":  "استعرض المشروع",

    "proj1.title": "Mithaq — تطبيق موبايل وWeb App",
    "proj1.desc":  "منتج رقمي مترابط لخدمات الزواج، جمع الـworkflows الخاصة بالمستخدم وولي الأمر والإدارة في تجربة واحدة منظمة عبر الموبايل والويب.",

    "proj2.title": "FulFly — نظام إدارة عمليات الـFulfillment",
    "proj2.desc":  "نظام Fulfillment قائم، طورت مرقمن تجربة استخدامه بإعادة تصميم الـUI/UX، وتنفيذ الواجهات الجديدة، وإعادة هيكلة الـCodebase بالكامل.",

    "proj3.title": "Turn On — متجر إلكتروني وتكامل أنظمة",
    "proj3.desc":  "تطوير متجر إلكتروني متكامل لشركة ألمانية، مع Plugins مخصصة تربط Odoo وWordPress وeBay، وحساب شحن DHL، وترجمة بين الإنجليزي والألماني.",

    "proj4.title": "POS System — نظام إدارة عمليات الـRetail",
    "proj4.desc":  "نظام نقاط بيع مخصص لإدارة المبيعات والمنتجات والمخزون والفواتير وعمليات الـRetail اليومية من مكان واحد.",

    /* ── PROCESS ────────────────────────────── */
    "proc.tag":   "كيف نشتغل",
    "proc.title": "أربع خطوات واضحة من احتياج البيزنس للإطلاق.",

    "proc.1.title": "نفهم",
    "proc.1.desc":  "نبدأ بفهم احتياج البيزنس، الـworkflow الحالي، المستخدمين، والقيود اللي بتشكل الحل.",
    "proc.2.title": "نحدد",
    "proc.2.desc":  "نحول السياق ده لـ scope واضح، أولويات، واتجاه تقني قبل ما يبدأ التطوير.",
    "proc.3.title": "نبني",
    "proc.3.desc":  "نبني في مراحل مرئية، نراجع التقدم في الطريق، ونختبر الحل قبل الإطلاق.",
    "proc.4.title": "نطلق ونتابع",
    "proc.4.desc":  "نطلق ونسلّم الحل المتفق عليه، مع 30 يوم دعم مجاني من تاريخ الاستلام.",

    /* ── STATS ──────────────────────────────── */
    "stat.1": "مشروع منفذ",
    "stat.2": "خبرة في التسليم",
    "stat.2.suffix": " سنوات",
    "stat.3": "مجالات تطوير",
    "stat.4": "دعم مجاني",
    "stat.4.suffix": " يوم",

    /* ── WHY ────────────────────────────────── */
    "why.tag":   "ليه مرقمن؟",
    "why.title": "قرارات أوضح. ملاءمة أفضل. مخاطر تسليم أقل.",

    "why.1.title": "السياق قبل القرار التقني",
    "why.1.desc":  "بننظر في العملية والمستخدمين والقيود والأهداف قبل ما نقرر إيه اللي المفروض يتبنى.",
    "why.2.title": "Scope وتوقعات واضحة",
    "why.2.desc":  "أنت بتعرف إيه اللي بيتبنى، وإيه الأولوية، وإيه المشمول في التسليم قبل ما التطوير يبدأ.",
    "why.3.title": "مبني حول الـworkflow الحقيقي",
    "why.3.desc":  "النظام بيتشكل حول العمليات والأدوار والبيانات اللي عمليتك بتعتمد عليها فعلاً.",
    "why.4.title": "متابعة ما بعد الإطلاق",
    "why.4.desc":  "المتابعة بتكمل بعد التسليم، عشان الأسئلة والمشاكل عندها طريق واضح يرجع للفريق.",
    "why.5.title": "30 يوم دعم مجاني بعد الاستلام",
    "why.5.desc":  "بعد الاستلام، بتاخد 30 يوم دعم مجاني كجزء من التسليم المتفق عليه.",
    "why.cta.label": "جاهز تبدأ؟",
    "why.cta.btn":   "ناقش مشروعك",

    /* ── FAQ ────────────────────────────────── */
    "faq.tag":   "الأسئلة الشائعة",
    "faq.title": "أهم الأسئلة اللي بيتكرر قبل ما نبدأ أي مشروع.",

    "faq.1.q": "مرقمن بتشتغل على أي نوع من المشاريع؟",
    "faq.1.a": "بنشتغل في ستة مجالات: أنظمة أعمال مخصصة، SaaS والمنتجات الرقمية، تطبيقات موبايل، تجارة إلكترونية، مواقع أعمال، وتكاملات. الاتجاه الصح بيتحدد بناءً على احتياج البيزنس والمستخدمين والـworkflow والأنظمة الموجودة.",
    "faq.2.q": "المشروع بياخد قد إيه وقت؟",
    "faq.2.a": "بيعتمد على الـscope، التعقيد، التكاملات، ومتطلبات التسليم. بعد ما الـscope يتوضح، بنتفق على الجدول الزمني والمراحل الرئيسية قبل ما التطوير يبدأ.",
    "faq.3.q": "كيف بيتحدد السعر؟",
    "faq.3.a": "السعر بيبنى على الـscope المتفق عليه، التعقيد، التكاملات، الجدول الزمني، ومتطلبات التسليم. بتاخد عرض سعر واضح قبل ما التطوير يبدأ.",
    "faq.4.q": "مين اللي بيمتلك الكود والنظام؟",
    "faq.4.a": "ملكية الـ source code بتتحدد بناءً على نوع المشروع والاتفاق في البداية. قبل التطوير، بنحدد الملكية والوصول والـcredentials وشروط التسليم بوضوح.",
    "faq.5.q": "ممكن تشتغلوا مع أنظمتنا الموجودة؟",
    "faq.5.a": "أيوه. لو استبدال النظام الحالي مش الخطوة الصح، ممكن نربط الأدوات الموجودة من خلال APIs، تكاملات مخصصة، plugins، أو مزامنة بيانات.",
    "faq.6.q": "الـ 30 يوم دعم مجاني بيشمل إيه؟",
    "faq.6.a": "فترة الدعم المجاني بتبدأ من تاريخ الاستلام. بتغطي المشاكل في الحل المسلَّم والتعديلات الصغيرة ضمن الـscope والهيكل الموجود. الـfeatures الجديدة أو التصميم الجديد أو التغييرات الكبيرة بتتعامل بشكل منفصل.",

    /* ── CTA ────────────────────────────────── */
    "cta.tag":  "ابدأ المحادثة",
    "cta.title": "عندك احتياج بيزنس أو مشروع تبنيه؟\nخلينا نحدد الخطوة الصح.",
    "cta.desc":  "شارك اللي بتحاول تحله أو تبنيه أو تحسنه. هنراجع السياق ونرجع لك بأوضح طريق للأمام.",
    "cta.btn1":  "ابدأ المحادثة",
    "cta.note":  "كل استفسار بيتراجع بناءً على سياق المشروع",

    /* ── CONTACT ────────────────────────────── */
    "contact.tag":   "تواصل معنا",
    "contact.title": "شارك تفاصيل احتياجك.",
    "contact.desc":  "شارك اللي بتحاول تحله أو تبنيه. هنراجع السياق ونرجع لك بأوضح طريق للأمام.",
    "contact.l1": "البريد الإلكتروني",
    "contact.l2": "واتساب / هاتف",
    "contact.l3": "العنوان",
    "contact.l4": "وقت الرد",
    "contact.v4": "خلال 24 ساعة",

    /* ── FORM ───────────────────────────────── */
    "form.name":     "الاسم",
    "form.name.ph":  "اسمك",
    "form.email.ph": "email@example.com",
    "form.type":     "نوع المشروع",
    "form.type.ph":  "اختر نوع المشروع",
    "form.opt1": "تطبيق ويب / نظام مخصص",
    "form.opt2": "منصة SaaS / منتج رقمي",
    "form.opt3": "تطبيق موبايل",
    "form.opt4": "متجر إلكتروني",
    "form.opt5": "موقع أعمال",
    "form.opt6": "تكاملات وأتمتة",
    "form.opt7": "أخرى",
    "form.msg":    "تفاصيل المشروع",
    "form.msg.ph": "اشرح احتياجك أو الـworkflow اللي بتحاول تحله...",
    "form.btn":  "أرسل طلبك",
    "form.note": "كل استفسار بيتراجع بناءً على سياق المشروع · بدون التزام",

    /* ── FOOTER ─────────────────────────────── */
    "footer.desc":    "نرافق مشروعك من فهم احتياجه وتحديد الاتجاه المناسب، إلى التطوير والإطلاق والدعم.",
    "footer.s1":     "الصفحات",
    "footer.s1.l1":  "الرئيسية",
    "footer.s1.l2":  "الخدمات",
    "footer.s1.l3":  "المشاريع",
    "footer.s1.l4":  "عن مرقمن",
    "footer.s1.l5":  "تواصل معنا",
    "footer.s2":     "الخدمات",
    "footer.s2.l1":  "تطبيقات الويب والأنظمة المخصصة",
    "footer.s2.l2":  "منصات SaaS والمنتجات الرقمية",
    "footer.s2.l3":  "تطوير تطبيقات الموبايل",
    "footer.s2.l4":  "تطوير ونشر المتاجر الإلكترونية",
    "footer.s2.l5":  "مواقع الأعمال وأنظمة إدارة المحتوى",
    "footer.s2.l6":  "التكاملات والإضافات والأتمتة",
    "footer.s3":     "تواصل معنا",
    "footer.legal":  "قانوني",
    "footer.privacy":"سياسة الخصوصية",
    "footer.terms":  "الشروط والأحكام",
    "footer.copy":   "© 2026 مرقمن. جميع الحقوق محفوظة.",
  },

  en: {
    /* ── NAV ────────────────────────────────── */
    "nav.home":     "Home",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.about":    "About",
    "nav.contact":  "Contact",
    "nav.lang":     "العربية",
    "nav.cta":      "Discuss Your Project",

    /* ── HERO ───────────────────────────────── */
    "hero.tag":    "Custom Software Solutions",
    "hero.title1": "Reliable software solutions built for",
    "hero.title2": "real business needs.",
    "hero.desc":   "We understand the business context, define the right digital solution, then design and build it to perform reliably and scale as the business evolves.",
    "hero.cta1":   "Explore Our Work",
    "hero.cta2":   "Discuss Your Project",
    "hero.badge1": "5 years of software delivery",
    "hero.badge2": "Products live on Google Play & Shopify App Store",
    "hero.badge3": "30 days of free support from handover",

    /* ── CARDS ──────────────────────────────── */
    "card.sales":  "Sales Growth",
    "card.launch": "Launch Time",
    "card.sat":    "Client Satisfaction",

    /* ── TRUSTED ────────────────────────────── */
    "trusted.label": "Trusted by 50+ Clients",

    /* ── SERVICES ───────────────────────────── */
    "srv.tag":   "What We Build",
    "srv.title": "Different business needs call for different kinds of software.",
    "srv.desc":  "Moraqmen works across six focused development areas — from internal business systems and digital products to mobile apps, e-commerce, websites, and integrations.",
    "srv.cta":   "Explore All Services",

    "srv1.title": "Custom Web Applications & Business Systems",
    "srv1.desc":  "Custom web systems for managing workflows, users, data, permissions, and day-to-day operations.",
    "srv1.f1": "Custom ERP & CRM systems",
    "srv1.f2": "Advanced dashboards",
    "srv1.f3": "React / Next.js / Node.js",

    "srv2.title": "SaaS Platforms & Digital Products",
    "srv2.badge": "Most Popular",
    "srv2.desc":  "Multi-user digital products built to support accounts, permissions, subscriptions, and scale across customers or organizations.",
    "srv2.f1": "Multi-tenant architecture",
    "srv2.f2": "Subscription & billing system",
    "srv2.f3": "Google Play & App Store",

    "srv3.title": "Mobile App Development",
    "srv3.desc":  "Mobile apps connected to the backend, data, and systems behind the experience, designed for reliable everyday use.",
    "srv3.f1": "React Native / Flutter",
    "srv3.f2": "Full API integration",
    "srv3.f3": "Store publishing",

    "srv4.title": "E-commerce Development & Scaling",
    "srv4.desc":  "E-commerce stores built to support selling and operations across products, orders, payments, shipping, and integrations.",
    "srv4.f1": "Shopify / WooCommerce",
    "srv4.f2": "Payment & shipping integration",
    "srv4.f3": "Custom Shopify Apps",

    "srv5.title": "Business Websites & CMS",
    "srv5.desc":  "Business websites that explain the company clearly, make content easy to manage, and create a clear path for customer inquiries.",
    "srv5.f1": "WordPress / Webflow",
    "srv5.f2": "SEO & Performance",
    "srv5.f3": "Flexible CMS",

    "srv6.title": "Integrations, Plugins & Automation",
    "srv6.desc":  "Custom integrations and plugins that connect systems, synchronize data, and reduce repetitive manual work.",
    "srv6.f1": "API Integrations",
    "srv6.f2": "Zapier / Make / Custom",
    "srv6.f3": "Process automation",

    /* ── PROJECTS ───────────────────────────── */
    "proj.tag":   "Real Work",
    "proj.title": "Projects we actually built and delivered.",
    "proj.desc":  "A selection of projects we developed and delivered to real clients with tangible results in the market.",
    "proj.view":  "View Project",

    "proj1.title": "Mithaq — Mobile & Web App",
    "proj1.desc":  "An interconnected digital product for marriage services, merging user, guardian, and admin workflows into one organized experience across mobile and web.",

    "proj2.title": "FulFly — Fulfillment Operations System",
    "proj2.desc":  "An existing fulfillment system where Moraqmen improved the UX through UI/UX redesign, new interface implementation, and full codebase refactoring.",

    "proj3.title": "Turn On — E-commerce & Systems Integration",
    "proj3.desc":  "A full e-commerce build for a German company, with custom plugins connecting Odoo, WordPress, and eBay, DHL shipping calculation, and EN/DE translation.",

    "proj4.title": "POS System — Retail Operations System",
    "proj4.desc":  "A custom point-of-sale system for managing sales, products, inventory, invoices, and daily retail operations from a single place.",

    /* ── PROCESS ────────────────────────────── */
    "proc.tag":   "How We Work",
    "proc.title": "Four clear steps from business need to launch.",

    "proc.1.title": "Understand",
    "proc.1.desc":  "We start by understanding the business need, current workflow, users, and the constraints that shape the solution.",
    "proc.2.title": "Define",
    "proc.2.desc":  "We turn that context into a clear scope, priorities, and technical direction before development begins.",
    "proc.3.title": "Build",
    "proc.3.desc":  "We build in visible stages, review progress along the way, and test the solution before launch.",
    "proc.4.title": "Launch & Support",
    "proc.4.desc":  "We launch and hand over the agreed solution, with 30 days of free support starting from handover.",

    /* ── STATS ──────────────────────────────── */
    "stat.1": "Projects Delivered",
    "stat.2": "Years of Delivery",
    "stat.2.suffix": " years",
    "stat.3": "Development Areas",
    "stat.4": "Free Support",
    "stat.4.suffix": " days",

    /* ── WHY ────────────────────────────────── */
    "why.tag":   "Why Moraqmen?",
    "why.title": "Clearer decisions. Better fit. Less delivery risk.",

    "why.1.title": "Business context before technical decisions",
    "why.1.desc":  "We look at the operation, users, constraints, and goals before deciding what should be built.",
    "why.2.title": "Clear scope & expectations",
    "why.2.desc":  "You know what is being built, what matters first, and what delivery includes before development moves forward.",
    "why.3.title": "Built around the real workflow",
    "why.3.desc":  "The system is shaped around the processes, roles, and data your operation actually depends on.",
    "why.4.title": "Follow-up beyond launch",
    "why.4.desc":  "Follow-up continues after delivery, so questions and issues have a clear path back to the team.",
    "why.5.title": "30 days of free support after handover",
    "why.5.desc":  "After handover, you receive 30 days of free support as part of the agreed delivery.",
    "why.cta.label": "Ready to start?",
    "why.cta.btn":   "Discuss your project",

    /* ── FAQ ────────────────────────────────── */
    "faq.tag":   "FAQ",
    "faq.title": "What clients usually want to know before starting a project.",

    "faq.1.q": "What kind of projects does Moraqmen work on?",
    "faq.1.a": "We work across six focused development areas: custom business systems, SaaS and digital products, mobile apps, e-commerce, business websites, and integrations. The right direction depends on the business need, users, workflow, and existing systems.",
    "faq.2.q": "How long does a project take?",
    "faq.2.a": "It depends on the scope, complexity, integrations, and delivery requirements. Once the scope is clear, we agree on the timeline and key milestones before development begins.",
    "faq.3.q": "How is pricing determined?",
    "faq.3.a": "Pricing is based on the agreed scope, complexity, integrations, timeline, and delivery requirements. You receive a clear quotation before development starts.",
    "faq.4.q": "Who owns the code and the system?",
    "faq.4.a": "Source-code ownership depends on the project type and the agreement made at the beginning. Before development starts, we define ownership, access, credentials, and handover terms clearly.",
    "faq.5.q": "Can you work with our existing systems?",
    "faq.5.a": "Yes. If replacing the current system is not the right move, we can connect existing tools through APIs, custom integrations, plugins, or data synchronization.",
    "faq.6.q": "What does the 30-day support include?",
    "faq.6.a": "The free support period starts from the handover date. It covers issues in the delivered solution and minor adjustments within the agreed scope and existing structure. New features, new design work, or major changes are handled separately.",

    /* ── CTA ────────────────────────────────── */
    "cta.tag":  "Start the Conversation",
    "cta.title": "Have a business need or a project to build?\nLet's define the right next step.",
    "cta.desc":  "Share what you're trying to solve, build, or improve. We'll review the context and come back with the clearest way forward.",
    "cta.btn1":  "Start the conversation",
    "cta.note":  "Every inquiry is reviewed based on the project context",

    /* ── CONTACT ────────────────────────────── */
    "contact.tag":   "Contact",
    "contact.title": "Share the details of your need.",
    "contact.desc":  "Share what you're trying to solve or build. We'll review and come back with the clearest way forward.",
    "contact.l1": "Email",
    "contact.l2": "WhatsApp / Phone",
    "contact.l3": "Address",
    "contact.l4": "Response Time",
    "contact.v4": "Within 24 hours",

    /* ── FORM ───────────────────────────────── */
    "form.name":     "Name",
    "form.name.ph":  "Your name",
    "form.email.ph": "email@example.com",
    "form.type":     "Project Type",
    "form.type.ph":  "Select project type",
    "form.opt1": "Web App / Custom System",
    "form.opt2": "SaaS Platform / Digital Product",
    "form.opt3": "Mobile App",
    "form.opt4": "E-commerce Store",
    "form.opt5": "Business Website",
    "form.opt6": "Integrations & Automation",
    "form.opt7": "Other",
    "form.msg":    "Project Details",
    "form.msg.ph": "Describe your need or the workflow you're trying to solve...",
    "form.btn":  "Send Request",
    "form.note": "Every inquiry is reviewed based on the project context · No commitment",

    /* ── FOOTER ─────────────────────────────── */
    "footer.desc":    "We support your project from understanding its needs and choosing the right direction to development, launch, and ongoing support.",
    "footer.s1":     "Pages",
    "footer.s1.l1":  "Home",
    "footer.s1.l2":  "Services",
    "footer.s1.l3":  "Projects",
    "footer.s1.l4":  "About",
    "footer.s1.l5":  "Contact",
    "footer.s2":     "Services",
    "footer.s2.l1":  "Custom Web Applications & Business Systems",
    "footer.s2.l2":  "SaaS Platforms & Digital Products",
    "footer.s2.l3":  "Mobile App Development",
    "footer.s2.l4":  "E-commerce Development & Scaling",
    "footer.s2.l5":  "Business Websites & CMS",
    "footer.s2.l6":  "Integrations, Plugins & Automation",
    "footer.s3":     "Contact",
    "footer.legal":  "Legal",
    "footer.privacy":"Privacy Policy",
    "footer.terms":  "Terms & Conditions",
    "footer.copy":   "© 2026 Moraqmen. All rights reserved.",
  }
};

/* ── Translation engine ─────────────────────────────────────── */
let currentLang = localStorage.getItem('moraqmen_lang') || 'ar';

const PAGE_META = {
  ar: {
    title: 'مرقمن | حلول برمجية مخصصة للبيزنس',
    description: 'مرقمن شركة تطوير برمجيات متخصصة في بناء أنظمة الأعمال وتطبيقات الويب والموبايل ومنصات SaaS والمتاجر الإلكترونية والتكاملات، بحلول مصممة لاحتياجات كل نشاط.',
    socialTitle: 'مرقمن | حلول برمجية مخصصة للبيزنس',
    socialDescription: 'شركة تطوير برمجيات تبني أنظمة أعمال وتطبيقات ويب وموبايل ومنتجات رقمية مصممة لاحتياجات البيزنس.',
    locale: 'ar_AR'
  },
  en: {
    title: 'Moraqmen | Custom Software Development for Businesses',
    description: 'Moraqmen builds custom business systems, web and mobile apps, SaaS products, e-commerce stores, and integrations tailored to real business needs.',
    socialTitle: 'Moraqmen | Custom Software for Businesses',
    socialDescription: 'Custom business systems, web and mobile apps, SaaS products, e-commerce, and integrations built around your business needs.',
    locale: 'en_US'
  }
};

function applyTranslations(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  // Direction
  document.documentElement.lang = lang;
  document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';

  const pageMeta = PAGE_META[lang];
  document.title = pageMeta.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', pageMeta.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', pageMeta.socialTitle);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', pageMeta.socialDescription);
  document.querySelector('meta[property="og:locale"]')?.setAttribute('content', pageMeta.locale);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', pageMeta.socialTitle);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', pageMeta.socialDescription);

  // Language-specific logos
  document.querySelectorAll('[data-logo-ar][data-logo-en]').forEach(img => {
    img.src = lang === 'ar' ? img.dataset.logoAr : img.dataset.logoEn;
    img.alt = lang === 'ar' ? 'شعار مرقمن' : 'Moraqmen logo';
  });

  // textContent
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // Select options
  document.querySelectorAll('[data-i18n-opt]').forEach(el => {
    const key = el.getAttribute('data-i18n-opt');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Suffix spans
  document.querySelectorAll('[data-i18n-suffix]').forEach(el => {
    const key = el.getAttribute('data-i18n-suffix');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  currentLang = lang;
  localStorage.setItem('moraqmen_lang', lang);
}

function toggleLang() {
  applyTranslations(currentLang === 'ar' ? 'en' : 'ar');
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(currentLang);

  const btn = document.getElementById('langToggle');
  if (btn) btn.addEventListener('click', toggleLang);
});
