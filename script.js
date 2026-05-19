document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.14 });

    document.querySelectorAll('.hidden').forEach((element) => observer.observe(element));

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    const closeMobileMenu = () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        burger.setAttribute('aria-expanded', 'false');
    };

    burger.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', closeMobileMenu);
    });

    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollHeight > 0 ? (document.documentElement.scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = `${scrollPercent}%`;
    });

    const travelData = [
        {
            id: 'poland',
            fr: { country: 'Pologne', title: 'Cracovie comme point d’ancrage', text: 'Semestre à l’AGH University of Krakow, cours en anglais, autonomie quotidienne et immersion dans une ville étudiante très vivante.' },
            en: { country: 'Poland', title: 'Krakow as a base camp', text: 'Semester at AGH University of Krakow, English-speaking courses, daily independence and immersion in a vibrant student city.' },
            x: 300,
            y: 250
        },
        {
            id: 'slovakia',
            fr: { country: 'Slovaquie', title: 'Une étape entre montagnes et capitales', text: 'Découverte d’un pays proche de la Pologne, avec une autre ambiance d’Europe centrale et de nouveaux repères culturels.' },
            en: { country: 'Slovakia', title: 'A stop between mountains and capitals', text: 'Discovery of a country close to Poland, with another Central European atmosphere and new cultural references.' },
            x: 284,
            y: 296
        },
        {
            id: 'czechia',
            fr: { country: 'Tchéquie', title: 'Architecture, histoire et mobilité', text: 'Passage par la Tchéquie pour explorer une culture voisine et mieux comprendre les liens entre les villes d’Europe centrale.' },
            en: { country: 'Czechia', title: 'Architecture, history and mobility', text: 'A visit to Czechia to explore a neighboring culture and better understand connections between Central European cities.' },
            x: 246,
            y: 280
        },
        {
            id: 'estonia',
            fr: { country: 'Estonie', title: 'Cap au nord numérique', text: 'Découverte d’un pays balte très tourné vers le numérique, avec une culture différente et une atmosphère nordique.' },
            en: { country: 'Estonia', title: 'Northbound and digital', text: 'Discovery of a Baltic country strongly connected to digital culture, with a different rhythm and a Nordic atmosphere.' },
            x: 456,
            y: 110
        },
        {
            id: 'lithuania',
            fr: { country: 'Lituanie', title: 'Étape balte pleine de contrastes', text: 'Entre patrimoine, villes à taille humaine et changement de rythme après l’Europe centrale.' },
            en: { country: 'Lithuania', title: 'A Baltic stop full of contrasts', text: 'Heritage, human-scale cities and a different pace after Central Europe.' },
            x: 378,
            y: 196
        },
        {
            id: 'latvia',
            fr: { country: 'Lettonie', title: 'Riga et l’énergie baltique', text: 'Une étape marquée par les façades, les grands espaces et une autre manière de vivre la ville.' },
            en: { country: 'Latvia', title: 'Riga and Baltic energy', text: 'A stop shaped by architecture, open spaces and another way of experiencing a city.' },
            x: 408,
            y: 158
        },
        {
            id: 'finland',
            fr: { country: 'Finlande', title: 'Ambiance nordique et calme efficace', text: 'Découverte d’un environnement plus minimaliste, organisé et très différent du rythme de Cracovie.' },
            en: { country: 'Finland', title: 'Nordic atmosphere and calm efficiency', text: 'Discovery of a more minimal, organized environment, very different from Krakow’s rhythm.' },
            x: 474,
            y: 76
        },
        {
            id: 'denmark',
            fr: { country: 'Danemark', title: 'Design, mobilité et qualité de vie', text: 'Une étape inspirante pour observer des villes pensées pour les usages quotidiens.' },
            en: { country: 'Denmark', title: 'Design, mobility and quality of life', text: 'An inspiring stop to observe cities designed around everyday uses.' },
            x: 205,
            y: 214
        },
        {
            id: 'sweden',
            fr: { country: 'Suède', title: 'Grand nord accessible', text: 'Une découverte scandinave entre espaces ouverts, organisation urbaine et culture nordique.' },
            en: { country: 'Sweden', title: 'The accessible north', text: 'A Scandinavian discovery between open spaces, urban organization and Nordic culture.' },
            x: 330,
            y: 118
        }
    ];

    const mapPoints = document.querySelector('.map-points');
    const countryList = document.querySelector('.country-list');
    const countryCount = document.getElementById('country-count');
    const travelCountry = document.getElementById('travel-country');
    const travelTitle = document.getElementById('travel-title');
    const travelText = document.getElementById('travel-text');
    let currentLang = localStorage.getItem('language') || 'fr';
    let activeCountry = travelData[0].id;

    function renderTravelControls() {
        mapPoints.innerHTML = '';
        countryList.innerHTML = '';

        travelData.forEach((item) => {
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.classList.add('map-point');
            group.dataset.country = item.id;
            group.setAttribute('tabindex', '0');
            group.setAttribute('role', 'button');
            group.setAttribute('aria-label', item[currentLang].country);
            group.innerHTML = `<circle cx="${item.x}" cy="${item.y}" r="9"></circle><text x="${item.x + 14}" y="${item.y + 5}">${item[currentLang].country}</text>`;
            mapPoints.appendChild(group);

            const chip = document.createElement('button');
            chip.className = 'country-chip';
            chip.type = 'button';
            chip.dataset.country = item.id;
            chip.textContent = item[currentLang].country;
            countryList.appendChild(chip);
        });

        countryCount.textContent = currentLang === 'fr' ? `${travelData.length} pays` : `${travelData.length} countries`;
        updateTravel(activeCountry);
    }

    function updateTravel(countryId) {
        const item = travelData.find((country) => country.id === countryId) || travelData[0];
        activeCountry = item.id;
        travelCountry.textContent = item[currentLang].country;
        travelTitle.textContent = item[currentLang].title;
        travelText.textContent = item[currentLang].text;

        document.querySelectorAll('[data-country]').forEach((element) => {
            element.classList.toggle('active', element.dataset.country === item.id);
        });
    }

    document.addEventListener('click', (event) => {
        const countryTarget = event.target.closest('[data-country]');
        if (countryTarget) {
            updateTravel(countryTarget.dataset.country);
        }
    });

    document.addEventListener('keydown', (event) => {
        const countryTarget = event.target.closest('.map-point');
        if (countryTarget && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            updateTravel(countryTarget.dataset.country);
        }
    });

    const translations = {
        fr: {
            navLogo: 'Matthias LUTZ',
            navAbout: 'Profil',
            navSkills: 'Compétences',
            navErasmus: 'Erasmus',
            navProjects: 'Projets',
            navExperience: 'Parcours',
            navContact: 'Contact',
            heroKicker: 'Étudiant ingénieur, créatif et orienté terrain',
            heroGreeting: 'Bonjour, je suis',
            heroSubtitle: 'Je conçois des projets en C, web, Linux et IoT, avec le goût des interfaces utiles, du travail d’équipe et des expériences internationales.',
            heroProjects: 'Voir mes projets',
            heroContact: 'Me proposer un projet',
            heroCardTitle: 'Profil polyvalent',
            heroCardText: 'Développement, communication digitale, sport collectif et mobilité européenne.',
            statProjects: 'projets',
            statCountries: 'pays visités',
            statSchool: 'ingénierie',
            aboutKicker: 'Profil',
            aboutTitle: 'Un parcours entre informatique, engagement et esprit d’équipe',
            aboutText: 'Étudiant ingénieur à l’UTBM, je développe mes compétences à travers des projets techniques concrets: programmation C, systèmes Linux, web, bases de données et objets connectés. Mon parcours dans le handball et la communication digitale m’a appris à être fiable, clair et à avancer avec une équipe.',
            CSV70Button: 'Gardien de but au CSV70',
            cvButton: 'Consulter mon CV',
            skillsKicker: 'Compétences',
            skillsTitle: 'Des bases techniques solides, appliquées à des projets variés',
            skill1Title: 'Développement & algorithmique',
            skill1Desc: 'Langage C, structures de données, programmation procédurale et résolution de problèmes.',
            skill2Title: 'Web & données',
            skill2Desc: 'HTML, CSS, PHP, SQL, modélisation et conception d’applications web dynamiques.',
            skill3Title: 'Systèmes',
            skill3Desc: 'Linux, processus, scripts Bash, Git, GitHub et programmation système.',
            skill4Title: 'IoT',
            skill4Desc: 'ESP32, Arduino, Node-RED, MQTT et capteurs environnementaux.',
            skill5Title: 'Création digitale',
            skill5Desc: 'Canva, montage photo et vidéo, mailing, réseaux sociaux et supports de communication.',
            skill6Title: 'Langues',
            skill6Desc: 'Anglais professionnel, allemand avancé et aisance en contexte international.',
            erasmusKicker: 'Erasmus & voyages',
            erasmusTitle: 'Une mobilité européenne qui a élargi ma façon de travailler',
            mapLabel: 'Carte interactive',
            erasmusButton: 'Découvrir mon Polarsteps',
            projectsKicker: 'Projets',
            projectsTitle: 'Des réalisations techniques lisibles et concrètes',
            projectsIntro: 'Une sélection de projets qui montre ma progression en programmation, systèmes, infrastructure personnelle et objets connectés.',
            projectTagTeam: 'Équipe',
            p1Title: 'Jeu de lettres en C',
            p1Desc: 'Génération de grille, vérification des mots dans un dictionnaire, timer, score et historique des parties.',
            p5Title: 'Station météo connectée',
            p5Desc: 'ESP32, capteurs environnementaux, dashboard Node-RED et visualisation des données via MQTT.',
            p7Title: 'Gestionnaire de processus Linux',
            p7Desc: 'Développement en C d’un outil inspiré de htop, avec affichage dynamique et interface ncurses.',
            p6Title: 'Système expert automobile',
            p6Desc: 'Moteur d’inférence capable de déduire un modèle de voiture à partir d’une base de connaissances.',
            p4Title: 'Serveur NAS personnel',
            p4Desc: 'Mise en place de TrueNAS Scale pour centraliser et sécuriser documents, photos et vidéos.',
            p3Title: 'Crunch Time 2025',
            p3Desc: 'Projet universitaire intensif d’une semaine, centré sur la résolution de problématiques concrètes en équipe.',
            p8Title: 'Clavier de raccourcis',
            p8Desc: 'Transformation d’un second clavier en console d’actions rapides pour les outils du quotidien.',
            experienceKicker: 'Parcours',
            experienceTitle: 'Formation et expériences',
            f0Date: 'Février à juin 2026',
            f0Title: 'Semestre à l’étranger - Cracovie',
            f0Desc: '<strong>AGH University of Krakow</strong>. Expérience internationale de 6 mois en Pologne.',
            f1Date: 'Septembre 2024 - Juin 2026',
            f1Title: 'Cycle préparatoire d’ingénieur',
            f1Desc: '<strong>UTBM</strong>. Informatique, sciences de l’ingénieur et certification Pix niveau avancé.',
            e1Date: 'Septembre 2025 - Mai 2026',
            e1Title: 'Assistant communication - Service Civique',
            e1Desc: '<strong>CSVesoul70 Partenaires</strong>. Réseaux sociaux, création de visuels et rédaction de contenu.',
            e1Link: 'Voir le rapport',
            e2Date: 'Été & hiver 2025',
            e2Title: 'Opérateur de production & stagiaire',
            e2Desc: '<strong>Stellantis</strong>. Contrôle qualité, gestion de données techniques, étiquetage et emballage.',
            e2Link: 'Voir le rapport',
            f2Date: '2021 - 2024',
            f2Title: 'Baccalauréat général - Mention Bien',
            f2Desc: '<strong>Lycée Edouard Belin</strong>. Mathématiques, physique-chimie et informatique.',
            contactKicker: 'Contact',
            contactTitle: 'Discutons d’un projet, d’une idée ou d’une opportunité',
            contactDesc: 'Je reste ouvert aux échanges autour de projets techniques, créatifs ou associatifs.',
            footerText: '&copy; 2026 - Matthias LUTZ'
        },
        en: {
            navLogo: 'Matthias LUTZ',
            navAbout: 'Profile',
            navSkills: 'Skills',
            navErasmus: 'Erasmus',
            navProjects: 'Projects',
            navExperience: 'Journey',
            navContact: 'Contact',
            heroKicker: 'Engineering student, creative and hands-on',
            heroGreeting: 'Hello, I am',
            heroSubtitle: 'I build projects in C, web, Linux and IoT, with a taste for useful interfaces, teamwork and international experiences.',
            heroProjects: 'View my projects',
            heroContact: 'Suggest a project',
            heroCardTitle: 'Versatile profile',
            heroCardText: 'Development, digital communication, team sport and European mobility.',
            statProjects: 'projects',
            statCountries: 'visited countries',
            statSchool: 'engineering',
            aboutKicker: 'Profile',
            aboutTitle: 'A path between computer science, commitment and team spirit',
            aboutText: 'Engineering student at UTBM, I develop my skills through concrete technical projects: C programming, Linux systems, web, databases and connected objects. Handball and digital communication taught me to be reliable, clear and team-oriented.',
            CSV70Button: 'Goalkeeper at CSV70',
            cvButton: 'View my resume',
            skillsKicker: 'Skills',
            skillsTitle: 'Solid technical foundations applied to varied projects',
            skill1Title: 'Development & algorithms',
            skill1Desc: 'C language, data structures, procedural programming and problem solving.',
            skill2Title: 'Web & data',
            skill2Desc: 'HTML, CSS, PHP, SQL, modelling and dynamic web application design.',
            skill3Title: 'Systems',
            skill3Desc: 'Linux, processes, Bash scripts, Git, GitHub and system programming.',
            skill4Title: 'IoT',
            skill4Desc: 'ESP32, Arduino, Node-RED, MQTT and environmental sensors.',
            skill5Title: 'Digital creation',
            skill5Desc: 'Canva, photo and video editing, mailing, social media and communication assets.',
            skill6Title: 'Languages',
            skill6Desc: 'Professional English, advanced German and ease in international contexts.',
            erasmusKicker: 'Erasmus & travels',
            erasmusTitle: 'European mobility that broadened how I work',
            mapLabel: 'Interactive map',
            erasmusButton: 'Discover my Polarsteps',
            projectsKicker: 'Projects',
            projectsTitle: 'Readable and concrete technical work',
            projectsIntro: 'A selection of projects showing my progress in programming, systems, personal infrastructure and connected objects.',
            projectTagTeam: 'Team',
            p1Title: 'Word game in C',
            p1Desc: 'Grid generation, dictionary word checking, timer, scoring and game history.',
            p5Title: 'Connected weather station',
            p5Desc: 'ESP32, environmental sensors, Node-RED dashboard and MQTT data visualization.',
            p7Title: 'Linux process manager',
            p7Desc: 'C development of a htop-inspired tool, with dynamic display and an ncurses interface.',
            p6Title: 'Car expert system',
            p6Desc: 'Inference engine able to deduce a car model from a knowledge base.',
            p4Title: 'Personal NAS server',
            p4Desc: 'TrueNAS Scale setup to centralize and secure documents, photos and videos.',
            p3Title: 'Crunch Time 2025',
            p3Desc: 'One-week intensive university project focused on solving concrete problems as a team.',
            p8Title: 'Shortcut keyboard',
            p8Desc: 'Turning a second keyboard into a quick action console for everyday tools.',
            experienceKicker: 'Journey',
            experienceTitle: 'Education and experience',
            f0Date: 'February to June 2026',
            f0Title: 'Semester abroad - Krakow',
            f0Desc: '<strong>AGH University of Krakow</strong>. Six-month international experience in Poland.',
            f1Date: 'September 2024 - June 2026',
            f1Title: 'Engineering preparatory cycle',
            f1Desc: '<strong>UTBM</strong>. Computer science, engineering science and advanced Pix certification.',
            e1Date: 'September 2025 - May 2026',
            e1Title: 'Communication assistant - Civic Service',
            e1Desc: '<strong>CSVesoul70 Partenaires</strong>. Social media, visual creation and content writing.',
            e1Link: 'View report',
            e2Date: 'Summer & winter 2025',
            e2Title: 'Production operator & intern',
            e2Desc: '<strong>Stellantis</strong>. Quality control, technical data handling, labelling and packaging.',
            e2Link: 'View report',
            f2Date: '2021 - 2024',
            f2Title: 'High school diploma - With honors',
            f2Desc: '<strong>Lycée Edouard Belin</strong>. Mathematics, physics-chemistry and computer science.',
            contactKicker: 'Contact',
            contactTitle: 'Let’s talk about a project, an idea or an opportunity',
            contactDesc: 'I am open to conversations around technical, creative or association projects.',
            footerText: '&copy; 2026 - Matthias LUTZ'
        }
    };

    const allLangFR = document.querySelectorAll('.lang-fr');
    const allLangEN = document.querySelectorAll('.lang-en');

    function translatePage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-key]').forEach((element) => {
            const value = translations[lang][element.dataset.key];
            if (value) {
                element.innerHTML = value;
            }
        });

        allLangFR.forEach((button) => button.classList.toggle('active', lang === 'fr'));
        allLangEN.forEach((button) => button.classList.toggle('active', lang === 'en'));
        localStorage.setItem('language', lang);
        renderTravelControls();
    }

    allLangFR.forEach((button) => button.addEventListener('click', () => translatePage('fr')));
    allLangEN.forEach((button) => button.addEventListener('click', () => translatePage('en')));

    renderTravelControls();
    translatePage(currentLang);
});
