document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ANIMATION DES SECTIONS AU DÉFILEMENT ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    // --- 2. MENU BURGER INTERACTIF ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        // Note : .nav-links li inclut maintenant le .mobile-lang
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });


// --- 3. EFFET MACHINE À ÉCRIRE (TYPEWRITER) ---
    const typewriterElement = document.getElementById('typewriter');
    const originalName = typewriterElement ? typewriterElement.innerHTML : ''; // Stocke le nom original
    let typewriterTimeout; // Variable pour gérer le timeout

    function startTypewriter(text) {
        if (!typewriterElement) return; // Sécurité si l'élément n'existe pas

        clearTimeout(typewriterTimeout); // Arrête l'animation précédente si elle existe
        typewriterElement.innerHTML = ''; // Vide le nom actuel
        let i = 0;

        function type() {
            if (i < text.length) {
                typewriterElement.innerHTML += text.charAt(i);
                i++;
                typewriterTimeout = setTimeout(type, 150); // Vitesse de frappe
            }
        }
        // Lance l'animation après un court délai pour que la traduction ait le temps de s'appliquer
        setTimeout(type, 100); 
    }

    
    // --- 4. EFFET 3D SUR LES CARTES ---
    const cards = document.querySelectorAll('.skill-item, .project-card, .timeline-content');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = -y / 20;
            const rotateY = x / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });


    // --- 5. BARRE DE PROGRESSION AU DÉFILEMENT ---
    const progressBar = document.getElementById('progress-bar');
    if(progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        });
    }

    // ===============================================
    // --- 6. SCRIPT DE TRADUCTION (MIS À JOUR) ---
    // ===============================================

    // 6.1. Le dictionnaire de traductions
    const translations = {
        'fr': {
            // Navigation
            'navLogo': 'Bienvenue !',
            'navAbout': 'À propos',
            'navSkills': 'Compétences',
            'navExperience': 'Parcours',
            'navProjects': 'Projets',
            'navContact': 'Contact',
            // Hero
            'heroGreeting': 'Hello, World! Je suis',
            'heroSubtitle': "Étudiant ingénieur de 2e année à l'UTBM, passionné par <em>l'informatique et le sport.</em>",
            'heroButton': 'En apprendre plus sur moi',
            // À propos
            'aboutTitle': 'À propos de moi',
            'aboutText': "Actuellement en Service Civique au sein du CSV70 Handball où je m'occupe d'une partie de la communication digitale, j'ai l'occasion de développer mes compétences en création de contenu pour diverses plateformes. Ancien membre du Conseil Municipal des Jeunes (CMJ) de ma commune et actuellement vice-trésorier de l'association du CMJ, je suis une personne engagée. Ma passion pour le handball m'a appris la discipline et le travail d'équipe, des qualités que je souhaite mettre au service des autres dans le cadre d'une alternance de trois ans dans le domaine de l'informatique.",
            // Compétences
            'skillsTitle': 'Mes Compétences',
            'skill1Title': 'Développement & Algorithmique',
            'skill1Desc': 'Algorithmique, Langage C, structures de données, programmation procédurale et résolution de problèmes.',
            'skill2Title': 'Web & Bases de données',
            'skill2Desc': 'HTML, CSS, PHP, SQL, conception de bases de données et applications web dynamiques.',
            'skill3Title': 'Systèmes & Environnements',
            'skill3Desc': 'Linux, gestion des processus, scripts Bash, Git & GitHub, programmation système.',
            'skill4Title': 'IoT & Projets techniques',
            'skill4Desc': 'Arduino, Node-RED, MQTT, capteurs (CO₂, humidité, température), projets orientés objets connectés.',
            'skill5Title': 'Outils & Logiciels',
            'skill5Desc': 'Pack Office, Visual Studio Code, Canva, outils de prototypage et gestion de projets techniques.',
            'skill6Title': 'Langues & Créativité',
            'skill6Desc': 'Anglais (professionnel), Allemand (avancé), photographie, montage photo et vidéo, réseaux sociaux.',
            // Parcours
            'experienceTitle': 'Mon Parcours Scolaire & Professionnel',
            'formationTitle': 'Formation',
            'f1Title': "Cycle préparatoire d'ingénieur",
            'f1Date': 'Septembre 2024 - Présent',
            'f1Desc': '<strong>Université de Technologie de Belfort-Montbéliard (UTBM)</strong>.<br>Certification Pix niveau avancé (550 pix).',
            'f2Title': 'Baccalauréat Général - Mention Bien',
            'f2Date': '2021 - 2024',
            'f2Desc': '<strong>Lycée Edouard Belin</strong> - Spécialités : Mathématiques, Physique/Chimie et Informatique.',
            'f3Title': 'Brevet des Collèges - Mention Très Bien',
            'f3Date': '2017 - 2020',
            'f3Desc': '<strong>Collège René Cassin</strong>, Noidans-lès-Vesoul.',
            'expTitle': 'Expériences Professionnelles',
            'e1Title': 'Assistant communication - Service Civique',
            'e1Date': 'Septembre 2025 - Présent',
            'e1Desc': '<strong>CSVesoul70 Partenaires</strong> - Gestion des réseaux, création de visuels et rédaction de contenu.',
            'e2Title': 'Opérateur de production & Stagiaire',
            'e2Date': 'Été & Hiver 2025',
            'e2Desc': '<strong>Stellantis</strong> - Missions variées incluant l\'étiquetage, l\'emballage, le contrôle qualité et la gestion de données techniques.',
            'e2Link': 'Voir le rapport',
            'e3Title': 'Préparateur de commandes - Job d\'été (7 semaines)',
            'e3Date': 'Été 2024',
            'e3Desc': '<strong>Mister Auto</strong> - Picking des articles en entrepôt, emballage des colis et préparation pour l\'expédition.',
            'e4Title': 'Aide cuisine & Aide-ménage - Jobs d\'été (3 semaines)',
            'e4Date': 'Étés 2022 & 2023',
            'e4Desc': '<strong>Centre aéré de Vaivre-et-Montoille</strong> - Aide à la préparation des repas et entretien des locaux pour le bien-être des enfants.',
            'e5Title': 'Stages d\'observation (Collège)',
            'e5Date': '2021 & 2022',
            'e5Desc': 'Stage de 3 jours à la <strong>MMC de Vesoul</strong> et de 5 jours au service informatique de <strong>Vesoul Agrocampus</strong>.',
            // Projets
            'projectsTitle': 'Mes Projets',
            'p1Title': 'Jeu de lettres en C',
            'p1Desc': 'Développement d\'un jeu de lettres : génération de grille, vérification des mots dans un dictionnaire, timer, score et historique des parties.',
            'p2Title': 'Site de vocabulaire collaboratif',
            'p2Desc': 'Création d\'un site web inspiré de Quizlet, permettant de réviser le vocabulaire anglais de manière collaborative et interactive.',
            'p2Link': 'Voir le projet',
            'p3Title': 'Crunch Time 2025',
            'p3Desc': 'Participation à un projet universitaire intensif sur une semaine, axé sur la résolution de problématiques concrètes en équipe.',
            'p4Title': 'Création de mon propre NAS',
            'p4Desc': 'Création d\'un serveur NAS, me permettant de stocker à distance mes documents personnels, photos et vidéos en toute sécurité à l\'aide d\'un PC et de l\'OS Truenas Scale.',
            'p1Title_copy': 'Jeu de lettres en C',
            'p1Desc_copy': 'Développement d\'un jeu de lettres : génération de grille, vérification des mots dans un dictionnaire, timer, score et historique des parties.',
            'p2Title_copy': 'Site de vocabulaire collaboratif',
            'p2Desc_copy': 'Création d\'un site web inspiré de Quizlet, permettant de réviser le vocabulaire anglais de manière collaborative et interactive.',
            'p2Link_copy': 'Voir le projet',
            'p3Title_copy': 'Crunch Time 2025',
            'p3Desc_copy': 'Participation à un projet universitaire intensif sur une semaine, axé sur la résolution de problématiques concrètes en équipe.',
            'p4Title_copy': 'Création de mon propre NAS',
            'p4Desc_copy': 'Création d\'un serveur NAS, me permettant de stocker à distance mes documents personnels, photos et vidéos en toute sécurité à l\'aide d\'un PC et de l\'OS Truenas Scale.',
            'p5Title_copy': 'Création d\'une station météo',
            'p5Desc_copy': 'Conception et réalisation d’une station météo connectée basée sur ESP32, intégrant plusieurs capteurs environnementaux, une interface Node-RED interactive et un système de visualisation et de contrôle via MQTT.',
            'p6Title_copy': 'Système expert de déduction de modèles de voitures',
            'p6Desc_copy': 'Ce projet consiste à développer un système expert en langage C capable de déduire un modèle de voiture à partir de caractéristiques fournies par l’utilisateur grâce à une base de connaissances et un moteur d’inférence.',
            'p7Title_copy': 'Gestionnaire de processus Linux',
            'p7Desc_copy': 'Développement en C d’un gestionnaire de processus sous Linux, inspiré de htop, permettant l’affichage dynamique des processus locaux, l’interaction via une interface ncurses et la préparation d’une extension vers la supervision distante.',
            // Contact & Footer
            'contactTitle': 'Entrons en contact',
            'contactDesc': 'À la recherche d\'un apprentissage pour Septembre 2026, je suis disponible sur les secteurs de Vesoul, Belfort et Besançon.',
            'contactLinkedIn': '<i class="fab fa-linkedin"></i> LinkedIn',
            'contactEmail': '<i class="fas fa-envelope"></i> E-mail',
            'footerText': '&copy; 2026 - Matthias LUTZ. Tous droits réservés.'
        },
        'en': {
            // Navigation
            'navLogo': 'Welcome !',
            'navAbout': 'About',
            'navSkills': 'Skills',
            'navExperience': 'Journey',
            'navProjects': 'Projects',
            'navContact': 'Contact',
            // Hero
            'heroGreeting': 'Hello, World! I am',
            'heroSubtitle': "2nd-year engineering student at UTBM, passionate about <em>IT and sports.</em>",
            'heroButton': 'Learn more about me',
            // About
            'aboutTitle': 'About Me',
            'aboutText': "Currently doing a Civic Service at CSV70 Handball where I handle part of the digital communication, I have the opportunity to develop my skills in content creation for various platforms. As a former member of my town's Youth Council (CMJ) and current vice-treasurer of its association, I am a committed person. My passion for handball has taught me discipline and teamwork, qualities I wish to apply in a three-year IT apprenticeship.",
            // Skills
            'skillsTitle': 'My Skills',
            'skill1Title': 'Development & Algorithms',
            'skill1Desc': 'Algorithms, C programming, data structures, procedural programming and problem solving.',
            'skill2Title': 'Web & Databases',
            'skill2Desc': 'HTML, CSS, PHP, SQL, database design and dynamic web applications.',
            'skill3Title': 'Systems & Environments',
            'skill3Desc': 'Linux, process management, Bash scripting, Git & GitHub, system programming.',
            'skill4Title': 'IoT & Technical Projects',
            'skill4Desc': 'Arduino, Node-RED, MQTT, sensors (CO₂, humidity, temperature), connected systems projects.',
            'skill5Title': 'Tools & Software',
            'skill5Desc': 'Microsoft Office, Visual Studio Code, Canva, prototyping tools and technical project management.',
            'skill6Title': 'Languages & Creativity',
            'skill6Desc': 'English (professional), German (advanced), photography, photo and video editing, social media.',
            // Journey
            'experienceTitle': 'My Academic & Professional Journey',
            'formationTitle': 'Education',
            'f1Title': 'Engineering Preparatory Cycle',
            'f1Date': 'September 2024 - Now',
            'f1Desc': '<strong>University of Technology of Belfort-Montbéliard (UTBM)</strong>.',
            'f2Title': 'High School Diploma - With Honors',
            'f2Date': '2021 - 2024',
            'f2Desc': '<strong>Lycée Edouard Belin</strong> - Majors: Mathematics, Physics/Chemistry, and Computer Science.',
            'f3Title': 'Middle School Diploma - With High Honors',
            'f3Date': '2017 - 2020',
            'f3Desc': '<strong>Collège René Cassin</strong>, Noidans-lès-Vesoul.',
            'expTitle': 'Professional Experiences',
            'e1Title': 'Communication Assistant - Civic Service',
            'e1Date': 'September 2025 - Present',
            'e1Desc': '<strong>CSVesoul70 Partenaires</strong> - Social media management, visual creation, and content writing.',
            'e2Title': 'Production Operator & Intern',
            'e2Date': 'Summer & Winter 2025',
            'e2Desc': '<strong>Stellantis</strong> - Various tasks including labeling, packaging, quality control, and technical data management.',
            'e2Link': 'View Report',
            'e3Title': 'Order Picker - Summer Job (7 weeks)',
            'e3Date': 'Summer 2024',
            'e3Desc': '<strong>Mister Auto</strong> - Picking items in the warehouse, packing parcels, and preparing for shipment.',
            'e4Title': 'Kitchen & Cleaning Assistant - Summer Jobs (3 weeks)',
            'e4Date': 'Summers 2022 & 2023',
            'e4Desc': '<strong>Vaivre-et-Montoille Leisure Center</strong> - Assisting with meal preparation and facility maintenance for the children\'s well-being.',
            'e5Title': 'Observation Internships (Middle School)',
            'e5Date': '2021 & 2022',
            'e5Desc': '3-day internship at <strong>MMC de Vesoul</strong> and 5-day internship in the IT department of <strong>Vesoul Agrocampus</strong>.',
            // Projects
            'projectsTitle': 'My Projects',
            'p1Title': 'Word Game in C',
            'p1Desc': 'Development of a word game: grid generation, word validation against a dictionary, timer, scoring, and game history.',
            'p2Title': 'Collaborative Vocabulary Website',
            'p2Desc': 'Creation of a Quizlet-inspired website for collaborative and interactive English vocabulary revision.',
            'p2Link': 'View Project',
            'p3Title': 'Crunch Time 2025',
            'p3Desc': 'Participation in a one-week intensive university project focused on solving concrete problems as a team.',
            'p4Title': 'Custom NAS Server Build',
            'p4Desc': 'Built a NAS server, allowing me to remotely store personal documents, photos, and videos securely using a PC and Truenas Scale OS.',
            'p1Title_copy': 'Word Game in C',
            'p1Desc_copy': 'Development of a word game: grid generation, word validation against a dictionary, timer, scoring, and game history.',
            'p2Title_copy': 'Collaborative Vocabulary Website',
            'p2Desc_copy': 'Creation of a Quizlet-inspired website for collaborative and interactive English vocabulary revision.',
            'p2Link_copy': 'View Project',
            'p3Title_copy': 'Crunch Time 2025',
            'p3Desc_copy': 'Participation in a one-week intensive university project focused on solving concrete problems as a team.',
            'p4Title_copy': 'Custom NAS Server Build',
            'p4Desc_copy': 'Built a NAS server, allowing me to remotely store personal documents, photos, and videos securely using a PC and Truenas Scale OS.',
            'p5Title_copy': 'Creation of a weather station',
            'p5Desc_copy': 'Design and development of a connected weather station based on ESP32, integrating multiple environmental sensors, an interactive Node-RED dashboard, and real-time visualization and control using MQTT.',
            'p6Title_copy': 'Expert system for car model inference',
            'p6Desc_copy': 'This project implements an expert system in C that infers a car model from user-defined characteristics using a knowledge base and a forward-chaining inference engine.',
            'p7Title_copy': 'Linux Process Manager',
            'p7Desc_copy': 'Development in C of a Linux process manager inspired by htop, featuring dynamic local process monitoring, interactive ncurses-based interface, and groundwork for future remote supervision capabilities.',
            // Contact & Footer
            'contactTitle': 'Let\'s connect',
            'contactDesc': 'Looking for an apprenticeship starting September 2026, I am available in the Vesoul, Belfort, and Besançon areas.',
            'contactLinkedIn': '<i class="fab fa-linkedin"></i> LinkedIn',
            'contactEmail': '<i class="fas fa-envelope"></i> Email',
            'footerText': '&copy; 2026 - Matthias LUTZ. All rights reserved.'
        }
    };

    // 6.2. Les sélecteurs de langue (MODIFIÉ pour les classes)
    const allLangFR = document.querySelectorAll('.lang-fr');
    const allLangEN = document.querySelectorAll('.lang-en');

// 6.3. La fonction de traduction (MODIFIÉ)
    const translatePage = (lang) => {
        // Traduction du texte (inchangé)
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.dataset.key;
            if (translations[lang] && translations[lang][key]) {
                // Gestion spéciale pour le H1 (avant le typewriter)
                if (element.tagName === 'SPAN' && element.parentElement.tagName === 'H1') {
                     element.textContent = translations[lang][key]; // Utilise textContent pour éviter les problèmes de HTML
                } else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });

        // Gérer le style actif pour TOUS les sélecteurs (inchangé)
        if (lang === 'en') { /* ... */ } else { /* ... */ }

        // Sauvegarder le choix (inchangé)
        localStorage.setItem('language', lang);

        // Relancer l'animation Typewriter AVEC le nom original (MODIFIÉ)
        startTypewriter(originalName); 
    };

    // 6.4. Les écouteurs d'événements (MODIFIÉ pour les classes)
    allLangFR.forEach(button => {
        button.addEventListener('click', () => translatePage('fr'));
    });
    allLangEN.forEach(button => {
        button.addEventListener('click', () => translatePage('en'));
    });

    // 6.5. (Bonus) Vérifier la langue sauvegardée au chargement de la page
    const savedLang = localStorage.getItem('language') || 'fr';
    translatePage(savedLang);

});