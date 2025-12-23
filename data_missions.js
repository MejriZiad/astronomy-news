// data_missions.js - Mission data for Astronomy News

// Missions data
const AN_missions_data = [
    {
        id: 'mission-001',
        type: 'mission',
        status: 'completed',
        category: 'moon',
        agency: 'NASA',
        date: '1969-07-20',
        image: 'assets2/images/missions/apollo11.jpg',
        en: {
            title: 'Apollo 11',
            subtitle: 'First crewed mission to land on the Moon',
            body: 'Apollo 11 was the American spaceflight that first landed humans on the Moon. Commander Neil Armstrong and lunar module pilot Buzz Aldrin landed the Apollo Lunar Module Eagle on July 20, 1969. Armstrong became the first person to step onto the lunar surface six hours and 39 minutes later on July 21 at 02:56 UTC; Aldrin joined him 19 minutes later. They spent about two and a quarter hours together outside the spacecraft, and they collected 47.5 pounds (21.5 kg) of lunar material to bring back to Earth. Command module pilot Michael Collins flew the command module Columbia alone in lunar orbit while they were on the Moon\'s surface.',
            agency: 'National Aeronautics and Space Administration (NASA)'
        },
        fr: {
            title: 'Apollo 11',
            subtitle: 'Première mission habitée à se poser sur la Lune',
            body: 'Apollo 11 était le vol spatial américain qui a fait atterrir pour la première fois des humains sur la Lune. Le commandant Neil Armstrong et le pilote du module lunaire Buzz Aldrin ont fait atterrir le module lunaire Apollo Eagle le 20 juillet 1969. Armstrong est devenu la première personne à poser le pied sur la surface lunaire six heures et 39 minutes plus tard, le 21 juillet à 02h56 UTC ; Aldrin l\'a rejoint 19 minutes plus tard. Ils ont passé environ deux heures et quart ensemble à l\'extérieur du vaisseau spatial et ont collecté 47,5 livres (21,5 kg) de matériau lunaire à ramener sur Terre. Le pilote du module de commande Michael Collins a piloté le module de commande Columbia seul en orbite lunaire pendant qu\'ils étaient à la surface de la Lune.',
            agency: 'Administration nationale de l\'aéronautique et de l\'espace (NASA)'
        },
        ar: {
            title: 'أبولو 11',
            subtitle: 'أول مهمة مأهولة تهبط على القمر',
            body: 'كانت أبولو 11 رحلة الفضاء الأمريكية التي هبطت لأول مرة بالبشر على القمر. هبط القائد نيل أرمسترونج وطيار الوحدة القمرية باز ألدرين بالوحدة القمرية أبولو إيغل في 20 يوليو 1969. أصبح أرمسترونج أول شخص يطأ سطح القمر بعد ست ساعات و 39 دقيقة في 21 يوليو الساعة 02:56 بالتوقيت العالمي؛ وانضم إليه ألدرين بعد 19 دقيقة. أمضيا حوالي ساعتين وربع معًا خارج المركبة الفضائية، وجمعا 47.5 رطلاً (21.5 كجم) من المواد القمرية لإعادتها إلى الأرض. طار طيار وحدة القيادة مايكل كولينز بوحدة القيادة كولومبيا بمفرده في مدار القمر بينما كانا على سطح القمر.',
            agency: 'الإدارة الوطنية للملاحة الجوية والفضاء (ناسا)'
        }
    },
    {
        id: 'mission-002',
        type: 'mission',
        status: 'active',
        category: 'mars',
        agency: 'NASA',
        date: '2021-02-18',
        image: 'assets2/images/missions/perseverance.jpg',
        en: {
            title: 'Mars 2020: Perseverance Rover',
            subtitle: 'Searching for signs of ancient life on Mars',
            body: 'Perseverance rover landed on Mars on February 18, 2021. Its mission is to seek signs of ancient life and collect rock and soil samples for possible return to Earth. The rover carries seven primary science instruments, 23 cameras, and two microphones. It also transported the Ingenuity helicopter, which completed the first powered flight on another planet. Perseverance is exploring Jezero Crater, a 28-mile-wide (45 kilometers) crater that once held a lake and a river delta billions of years ago.',
            agency: 'National Aeronautics and Space Administration (NASA)'
        },
        fr: {
            title: 'Mars 2020 : Rover Perseverance',
            subtitle: 'Recherche de signes de vie ancienne sur Mars',
            body: 'Le rover Perseverance a atterri sur Mars le 18 février 2021. Sa mission est de rechercher des signes de vie ancienne et de collecter des échantillons de roche et de sol pour un éventuel retour sur Terre. Le rover transporte sept instruments scientifiques principaux, 23 caméras et deux microphones. Il a également transporté l\'hélicoptère Ingenuity, qui a réalisé le premier vol motorisé sur une autre planète. Perseverance explore le cratère Jezero, un cratère de 28 miles de large (45 kilomètres) qui abritait autrefois un lac et un delta fluvial il y a des milliards d\'années.',
            agency: 'Administration nationale de l\'aéronautique et de l\'espace (NASA)'
        },
        ar: {
            title: 'المريخ 2020: روفر المثابرة',
            subtitle: 'البحث عن علامات الحياة القديمة على المريخ',
            body: 'هبطت مركبة المثابرة على المريخ في 18 فبراير 2021. مهمتها هي البحث عن علامات الحياة القديمة وجمع عينات من الصخور والتربة لإعادتها المحتملة إلى الأرض. تحمل المركبة سبعة أدوات علمية رئيسية و 23 كاميرا وميكروفونين. كما نقلت مروحية إنجينيويتي، التي أكملت أول رحلة تعمل بالطاقة على كوكب آخر. تستكشف المثابرة فوهة جيزيرو، وهي فوهة بعرض 28 ميلاً (45 كيلومتراً) كانت تحتوي ذات يوم على بحيرة ودلتا نهرية منذ مليارات السنين.',
            agency: 'الإدارة الوطنية للملاحة الجوية والفضاء (ناسا)'
        }
    },
    {
        id: 'mission-003',
        type: 'mission',
        status: 'active',
        category: 'deep-space',
        agency: 'ESA/NASA',
        date: '2021-12-25',
        image: 'assets2/images/missions/james-webb.jpg',
        en: {
            title: 'James Webb Space Telescope',
            subtitle: 'Next-generation space observatory',
            body: 'The James Webb Space Telescope is the largest, most powerful space telescope ever built. It was launched on December 25, 2021, and reached its destination at the second Lagrange point (L2) about 1.5 million kilometers from Earth. Webb will allow scientists to look at what our universe was like about 200 million years after the Big Bang. It can observe objects 100 times fainter than Hubble can see, and will study every phase of cosmic history: from the first luminous glows after the Big Bang to the formation of galaxies, stars, and planets.',
            agency: 'European Space Agency / NASA'
        },
        fr: {
            title: 'Télescope spatial James Webb',
            subtitle: 'Observatoire spatial de nouvelle génération',
            body: 'Le télescope spatial James Webb est le plus grand et le plus puissant télescope spatial jamais construit. Il a été lancé le 25 décembre 2021 et a atteint sa destination au deuxième point de Lagrange (L2) à environ 1,5 million de kilomètres de la Terre. Webb permettra aux scientifiques de voir à quoi ressemblait notre univers environ 200 millions d\'années après le Big Bang. Il peut observer des objets 100 fois plus faibles que ce que Hubble peut voir, et étudiera chaque phase de l\'histoire cosmique : des premières lueurs lumineuses après le Big Bang à la formation des galaxies, des étoiles et des planètes.',
            agency: 'Agence spatiale européenne / NASA'
        },
        ar: {
            title: 'تلسكوب جيمس ويب الفضائي',
            subtitle: 'مرصد فضائي من الجيل التالي',
            body: 'تلسكوب جيمس ويب الفضائي هو أكبر وأقوى تلسكوب فضائي تم بناؤه على الإطلاق. تم إطلاقه في 25 ديسمبر 2021، ووصل إلى وجهته عند نقطة لاغرانج الثانية (L2) على بعد حوالي 1.5 مليون كيلومتر من الأرض. سيسمح ويب للعلماء بالنظر إلى ما كان عليه كوننا قبل حوالي 200 مليون سنة بعد الانفجار العظيم. يمكنه مراقبة أجرام أضعف 100 مرة مما يمكن أن يراه هابل، وسيدرس كل مرحلة من تاريخ الكون: من الومضات المضيئة الأولى بعد الانفجار العظيم إلى تشكل المجرات والنجوم والكواكب.',
            agency: 'الوكالة الفضائية الأوروبية / ناسا'
        }
    },
    {
        id: 'mission-004',
        type: 'mission',
        status: 'upcoming',
        category: 'moon',
        agency: 'NASA',
        date: '2025-11-01',
        image: 'assets2/images/missions/artemis.jpg',
        en: {
            title: 'Artemis Program',
            subtitle: 'Returning humans to the Moon',
            body: 'Artemis is NASA\'s program to return astronauts to the lunar surface by 2026. The program will land the first woman and first person of color on the Moon. Artemis I, an uncrewed test flight, was successfully completed in 2022. Artemis II will carry astronauts around the Moon in 2026, and Artemis III will land astronauts on the lunar surface in 2026. The program aims to establish a sustainable human presence on the Moon by the end of the decade, serving as a stepping stone for future Mars missions.',
            agency: 'National Aeronautics and Space Administration (NASA)'
        },
        fr: {
            title: 'Programme Artemis',
            subtitle: 'Retour des humains sur la Lune',
            body: 'Artemis est le programme de la NASA pour ramener des astronautes à la surface lunaire d\'ici 2026. Le programme fera atterrir la première femme et la première personne de couleur sur la Lune. Artemis I, un vol d\'essai sans équipage, a été achevé avec succès en 2022. Artemis II transportera des astronautes autour de la Lune en 2026, et Artemis III fera atterrir des astronautes sur la surface lunaire en 2026. Le programme vise à établir une présence humaine durable sur la Lune d\'ici la fin de la décennie, servant de tremplin pour les futures missions vers Mars.',
            agency: 'Administration nationale de l\'aéronautique et de l\'espace (NASA)'
        },
        ar: {
            title: 'برنامج أرتميس',
            subtitle: 'عودة البشر إلى القمر',
            body: 'أرتميس هو برنامج ناسا لإعادة رواد الفضاء إلى سطح القمر بحلول عام 2026. سيهبط البرنامج بأول امرأة وأول شخص من ذوي البشرة الملونة على القمر. تم الانتهاء بنجاح من أرتميس الأول، وهي رحلة تجريبية بدون طاقم، في عام 2022. ستحمل أرتميس الثاني رواد فضاء حول القمر في عام 2026، وستهبط أرتميس الثالث برواد فضاء على سطح القمر في عام 2025. يهدف البرنامج إلى إنشاء وجود بشري مستدام على القمر بحلول نهاية العقد، ليكون بمثابة نقطة انطلاق للبعثات المستقبلية إلى المريخ.',
            agency: 'الإدارة الوطنية للملاحة الجوية والفضاء (ناسا)'
        }
    },
    {
    id: 'mission-005',
    type: 'mission',
    status: 'completed',
    category: 'tunisia',
    agency: 'Telnet',
    date: '2021-03-22',
    image: 'assets2/images/missions/tunisia-satellite.jpg',
    en: {
        title: 'Challenge One',
        subtitle: 'First Tunisian-built satellite for IoT communications',
        body: 'Challenge One is the first Tunisian-built satellite, developed by Telnet Group. It was successfully launched on March 22, 2021, aboard a Russian Soyuz-2 rocket from the Baikonur Cosmodrome in Kazakhstan. The satellite is designed for Internet of Things (IoT) communications using LoRaWAN protocol, marking Tunisia\'s entry into space technology. Built entirely by Tunisian engineers, the satellite represents a milestone in the country\'s technological development and is part of a broader project to deploy a constellation of 30 satellites by 2023. The mission faced several delays, initially planned for 2020 but postponed due to technical and pandemic-related issues.',
        agency: 'Telnet Group'
    },
    fr: {
        title: 'Challenge One',
        subtitle: 'Premier satellite tunisien pour les communications IoT',
        body: 'Challenge One est le premier satellite construit en Tunisie, développé par le groupe Telnet. Il a été lancé avec succès le 22 mars 2021 à bord d\'une fusée russe Soyouz-2 depuis le cosmodrome de Baïkonour au Kazakhstan. Le satellite est conçu pour les communications Internet des objets (IoT) utilisant le protocole LoRaWAN, marquant l\'entrée de la Tunisie dans la technologie spatiale. Construit entièrement par des ingénieurs tunisiens, le satellite représente une étape importante dans le développement technologique du pays et fait partie d\'un projet plus large visant à déployer une constellation de 30 satellites d\'ici 2023. La mission a connu plusieurs retards, initialement prévue pour 2020 mais reportée en raison de problèmes techniques et de la pandémie.',
        agency: 'Groupe Telnet'
    },
    ar: {
        title: 'تحدي واحد',
        subtitle: 'أول قمر صناعي تونسي الصنع لاتصالات إنترنت الأشياء',
        body: 'تحدي واحد هو أول قمر صناعي تونسي الصنع، طورته مجموعة تلنات. تم إطلاقه بنجاح في 22 مارس 2021 على متن الصاروخ الروسي سويوز 2 من ميناء بايكونور الفضائي في كازاخستان. تم تصميم القمر الصناعي لاتصالات إنترنت الأشياء باستخدام بروتوكول LoRaWAN، مما يمثل دخول تونس إلى تكنولوجيا الفضاء. تم بناء القمر الصناعي بالكامل بواسطة مهندسين تونسيين، وهو يمثل علامة فارقة في التطور التكنولوجي للبلاد وهو جزء من مشروع أوسع لنشر كوكبة من 30 قمراً صناعياً بحلول عام 2023. واجهت المهمة عدة تأخيرات، حيث كان مخططاً لها في الأصل عام 2020 ولكن تم تأجيلها بسبب مشاكل تقنية وجائحة كورونا.',
        agency: 'مجموعة تلنات'
    }
},
    {
        id: 'mission-006',
        type: 'mission',
        status: 'upcoming',
        category: 'mars',
        agency: 'ESA',
        date: '2028-09-01',
        image: 'assets2/images/missions/exomars.jpg',
        en: {
            title: 'ExoMars Rover',
            subtitle: 'European search for life on Mars',
            body: 'The ExoMars rover, named Rosalind Franklin, is designed to search for evidence of past life on Mars. It will drill down to 2 meters below the surface to analyze soil samples protected from Mars\' harsh surface conditions. The rover carries a sophisticated suite of instruments called Pasteur that will perform organic and geochemical analysis. Originally scheduled for 2022, the mission was postponed due to geopolitical considerations and is now planned for launch in 2028. ExoMars is a joint program between the European Space Agency and Roscosmos.',
            agency: 'European Space Agency (ESA)'
        },
        fr: {
            title: 'Rover ExoMars',
            subtitle: 'Recherche européenne de la vie sur Mars',
            body: 'Le rover ExoMars, nommé Rosalind Franklin, est conçu pour rechercher des preuves de vie passée sur Mars. Il forera jusqu\'à 2 mètres sous la surface pour analyser des échantillons de sol protégés des conditions de surface difficiles de Mars. Le rover transporte une suite sophistiquée d\'instruments appelée Pasteur qui effectuera une analyse organique et géochimique. Initialement prévue pour 2022, la mission a été reportée pour des considérations géopolitiques et est maintenant prévue pour un lancement en 2028. ExoMars est un programme conjoint entre l\'Agence spatiale européenne et Roscosmos.',
            agency: 'Agence spatiale européenne (ESA)'
        },
        ar: {
            title: 'روبر إكسومارس',
            subtitle: 'البحث الأوروبي عن الحياة على المريخ',
            body: 'تم تصميم مركبة إكسومارس، المسماة روزاليند فرانكلين، للبحث عن أدلة على الحياة السابقة على المريخ. ستحفر حتى عمق مترين تحت السطح لتحليل عينات التربة المحمية من الظروف السطحية القاسية للمريخ. تحمل المركبة مجموعة متطورة من الأدوات تسمى باستور ستقوم بإجراء تحليل عضوي وجيوكيميائي. تم تأجيل المهمة، التي كانت مقررة أصلاً لعام 2022، بسبب اعتبارات جيوسياسية ومن المقرر إطلاقها الآن في عام 2028. إكسومارس هو برنامج مشترك بين الوكالة الفضائية الأوروبية وروسكوسموس.',
            agency: 'الوكالة الفضائية الأوروبية (ESA)'
        }
    },
	{
    id: 'mission-007',
    type: 'mission',
    status: 'active',
    category: 'deep-space',
    agency: 'NASA',
    date: '1977-09-05',
    image: 'assets2/images/missions/voyager.jpg',
    en: {
        title: 'Voyager Program',
        subtitle: 'Exploring the outer planets and interstellar space',
        body: 'Voyager 1 and Voyager 2 were launched in 1977 to explore the outer planets. They provided the first detailed images of Jupiter, Saturn, Uranus, and Neptune, and discovered many of their moons. Voyager 1 entered interstellar space in 2012, followed by Voyager 2 in 2018. Both spacecraft continue to send data about magnetic fields, plasma, and particles from beyond the heliosphere. Each carries a Golden Record with sounds and images representing Earth.',
        agency: 'National Aeronautics and Space Administration (NASA)'
    },
    fr: {
        title: 'Programme Voyager',
        subtitle: 'Exploration des planètes externes et de l’espace interstellaire',
        body: 'Voyager 1 et Voyager 2 ont été lancés en 1977 pour explorer les planètes externes. Ils ont fourni les premières images détaillées de Jupiter, Saturne, Uranus et Neptune, et ont découvert de nombreuses lunes. Voyager 1 est entré dans l’espace interstellaire en 2012, suivi de Voyager 2 en 2018. Les deux sondes continuent d’envoyer des données sur les champs magnétiques, le plasma et les particules au-delà de l’héliosphère. Chacune transporte un disque d’or contenant des sons et des images représentant la Terre.',
        agency: 'Administration nationale de l’aéronautique et de l’espace (NASA)'
    },
    ar: {
        title: 'برنامج فوييجر',
        subtitle: 'استكشاف الكواكب الخارجية والفضاء بين النجوم',
        body: 'تم إطلاق فوييجر 1 وفوييجر 2 في عام 1977 لاستكشاف الكواكب الخارجية. قدما أول صور مفصلة للمشتري وزحل وأورانوس ونبتون، واكتشفا العديد من أقمارها. دخل فوييجر 1 الفضاء بين النجوم في عام 2012، وتبعه فوييجر 2 في عام 2018. لا تزال المركبتان ترسلان بيانات عن المجالات المغناطيسية والبلازما والجسيمات من خارج الغلاف الشمسي. يحمل كل منهما سجلًا ذهبيًا يحتوي على أصوات وصور تمثل الأرض.',
        agency: 'الإدارة الوطنية للملاحة الجوية والفضاء (ناسا)'
    }
},
{
    id: 'mission-008',
    type: 'mission',
    status: 'active',
    category: 'space-observatory',
    agency: 'NASA/ESA',
    date: '1990-04-24',
    image: 'assets2/images/missions/hubble.jpg',
    en: {
        title: 'Hubble Space Telescope',
        subtitle: 'Revolutionizing our view of the universe',
        body: 'The Hubble Space Telescope was launched on April 24, 1990, aboard Space Shuttle Discovery. Orbiting Earth at about 547 km altitude, Hubble has captured iconic images of galaxies, nebulae, and exoplanets. It provided deep-field views revealing thousands of galaxies in tiny patches of sky and measured the expansion rate of the universe with great precision. Hubble remains operational and continues to complement the James Webb Space Telescope.',
        agency: 'National Aeronautics and Space Administration (NASA) / European Space Agency (ESA)'
    },
    fr: {
        title: 'Télescope spatial Hubble',
        subtitle: 'Révolutionnant notre vision de l’univers',
        body: 'Le télescope spatial Hubble a été lancé le 24 avril 1990 à bord de la navette spatiale Discovery. En orbite autour de la Terre à environ 547 km d’altitude, Hubble a capturé des images emblématiques de galaxies, de nébuleuses et d’exoplanètes. Il a fourni des vues profondes révélant des milliers de galaxies dans de minuscules zones du ciel et a mesuré avec précision le taux d’expansion de l’univers. Hubble reste opérationnel et continue de compléter le télescope spatial James Webb.',
        agency: 'Administration nationale de l’aéronautique et de l’espace (NASA) / Agence spatiale européenne (ESA)'
    },
    ar: {
        title: 'تلسكوب هابل الفضائي',
        subtitle: 'ثورة في رؤيتنا للكون',
        body: 'تم إطلاق تلسكوب هابل الفضائي في 24 أبريل 1990 على متن مكوك الفضاء ديسكفري. يدور حول الأرض على ارتفاع حوالي 547 كم، وقد التقط هابل صورًا أيقونية للمجرات والسدم والكواكب الخارجية. قدم مشاهد عميقة كشفت آلاف المجرات في بقع صغيرة من السماء وقاس معدل تمدد الكون بدقة كبيرة. لا يزال هابل يعمل ويكمل تلسكوب جيمس ويب الفضائي.',
        agency: 'الإدارة الوطنية للملاحة الجوية والفضاء (ناسا) / وكالة الفضاء الأوروبية (ESA)'
    }
}
];

// Timeline data - Expanded with more events
const AN_timeline_data = [
    { 
        year: '1957', 
        en: { title: 'Sputnik 1', desc: 'First artificial satellite launched by the Soviet Union, marking the beginning of the Space Age' },
        fr: { title: 'Spoutnik 1', desc: 'Premier satellite artificiel lancé par l\'Union Soviétique, marquant le début de l\'Ère Spatiale' },
        ar: { title: 'سبوتنك 1', desc: 'أول قمر صناعي أطلقته الاتحاد السوفييتي، مما يمثل بداية عصر الفضاء' },
        icon: 'fa-satellite' 
    },
    { 
        year: '1958', 
        en: { title: 'NASA Founded', desc: 'National Aeronautics and Space Administration established in the United States' },
        fr: { title: 'Fondation de la NASA', desc: 'Administration nationale de l\'aéronautique et de l\'espace créée aux États-Unis' },
        ar: { title: 'تأسيس ناسا', desc: 'تم تأسيس الإدارة الوطنية للملاحة الجوية والفضاء في الولايات المتحدة' },
        icon: 'fa-building' 
    },
    { 
        year: '1961', 
        en: { title: 'Vostok 1', desc: 'Yuri Gagarin becomes the first human in space, completing one orbit of Earth' },
        fr: { title: 'Vostok 1', desc: 'Youri Gagarine devient le premier humain dans l\'espace, accomplissant une orbite de la Terre' },
        ar: { title: 'فوستوك 1', desc: 'يوري غاغارين يصبح أول إنسان في الفضاء، ويكمل دورة واحدة حول الأرض' },
        icon: 'fa-user-astronaut' 
    },
    { 
        year: '1963', 
        en: { title: 'Valentina Tereshkova', desc: 'First woman in space aboard Vostok 6' },
        fr: { title: 'Valentina Terechkova', desc: 'Première femme dans l\'espace à bord de Vostok 6' },
        ar: { title: 'فالنتينا تيريشكوفا', desc: 'أول امرأة في الفضاء على متن فوستوك 6' },
        icon: 'fa-user-astronaut' 
    },
    { 
        year: '1965', 
        en: { title: 'First Spacewalk', desc: 'Alexei Leonov performs first extravehicular activity (spacewalk)' },
        fr: { title: 'Première sortie spatiale', desc: 'Alexeï Leonov effectue la première activité extravéhiculaire (sortie spatiale)' },
        ar: { title: 'أول نشاط خارج المركبة', desc: 'ألكسي ليونوف يؤدي أول نشاط خارج المركبة (سير في الفضاء)' },
        icon: 'fa-walking' 
    },
    { 
        year: '1969', 
        en: { title: 'Apollo 11', desc: 'First crewed Moon landing - "That\'s one small step for man, one giant leap for mankind"' },
        fr: { title: 'Apollo 11', desc: 'Premier alunissage habité - "Un petit pas pour l\'homme, un bond de géant pour l\'humanité"' },
        ar: { title: 'أبولو 11', desc: 'أول هبوط مأهول على القمر - "خطوة صغيرة للإنسان، قفزة عملاقة للبشرية"' },
        icon: 'fa-moon' 
    },
    { 
        year: '1971', 
        en: { title: 'Salyut 1', desc: 'First space station launched, beginning era of long-term human presence in space' },
        fr: { title: 'Saliout 1', desc: 'Première station spatiale lancée, début de l\'ère de la présence humaine à long terme dans l\'espace' },
        ar: { title: 'ساليوت 1', desc: 'أول محطة فضائية تطلق، بداية عصر الوجود البشري طويل الأمد في الفضاء' },
        icon: 'fa-space-station' 
    },
    { 
        year: '1975', 
        en: { title: 'Apollo-Soyuz', desc: 'First international crewed space mission between US and Soviet Union' },
        fr: { title: 'Apollo-Soyouz', desc: 'Première mission spatiale habitée internationale entre les États-Unis et l\'Union Soviétique' },
        ar: { title: 'أبولو-سويوز', desc: 'أول مهمة فضائية مأهولة دولية بين الولايات المتحدة والاتحاد السوفييتي' },
        icon: 'fa-handshake' 
    },
    { 
        year: '1977', 
        en: { title: 'Voyager 1 & 2', desc: 'Interstellar space probes launched, carrying Golden Records with sounds and images from Earth' },
        fr: { title: 'Voyager 1 & 2', desc: 'Sondes spatiales interstellaires lancées, transportant des Disques d\'Or avec des sons et des images de la Terre' },
        ar: { title: 'فوياجر 1 و 2', desc: 'أطلقت مسابير الفضاء بين النجوم، تحمل أقراصاً ذهبية تحتوي على أصوات وصور من الأرض' },
        icon: 'fa-satellite-dish' 
    },
    { 
        year: '1981', 
        en: { title: 'Space Shuttle Columbia', desc: 'First reusable spacecraft launched, beginning the Space Shuttle program' },
        fr: { title: 'Navette spatiale Columbia', desc: 'Premier vaisseau spatial réutilisable lancé, début du programme de la navette spatiale' },
        ar: { title: 'مكوك الفضاء كولومبيا', desc: 'أول مركبة فضائية قابلة لإعادة الاستخدام تطلق، بداية برنامج مكوك الفضاء' },
        icon: 'fa-space-shuttle' 
    },
    { 
        year: '1986', 
        en: { title: 'Mir Space Station', desc: 'First modular space station launched, remained in orbit for 15 years' },
        fr: { title: 'Station spatiale Mir', desc: 'Première station spatiale modulaire lancée, restée en orbite pendant 15 ans' },
        ar: { title: 'محطة مير الفضائية', desc: 'أول محطة فضائية معيارية تطلق، بقيت في المدار لمدة 15 عاماً' },
        icon: 'fa-dharmachakra' 
    },
    { 
        year: '1990', 
        en: { title: 'Hubble Telescope', desc: 'Space telescope deployed from Space Shuttle, revolutionizing astronomy' },
        fr: { title: 'Télescope Hubble', desc: 'Télescope spatial déployé depuis la navette spatiale, révolutionnant l\'astronomie' },
        ar: { title: 'تلسكوب هابل', desc: 'تلسكوب فضائي تم نشره من مكوك الفضاء، أحدث ثورة في علم الفلك' },
        icon: 'fa-telescope' 
    },
    { 
        year: '1998', 
        en: { title: 'ISS Construction Begins', desc: 'International Space Station assembly begins, largest human-made object in space' },
        fr: { title: 'Début construction ISS', desc: 'Début de l\'assemblage de la Station Spatiale Internationale, plus grand objet artificiel dans l\'espace' },
        ar: { title: 'بداية بناء محطة الفضاء الدولية', desc: 'بداية تجميع محطة الفضاء الدولية، أكبر جسم من صنع الإنسان في الفضاء' },
        icon: 'fa-network-wired' 
    },
    { 
        year: '2000', 
        en: { title: 'ISS Permanent Crew', desc: 'First long-term residents arrive at International Space Station' },
        fr: { title: 'Équipage permanent ISS', desc: 'Premiers résidents à long terme arrivent à la Station Spatiale Internationale' },
        ar: { title: 'طاقم دائم لمحطة الفضاء الدولية', desc: 'وصول أول مقيمين على المدى الطويل إلى محطة الفضاء الدولية' },
        icon: 'fa-users' 
    },
    { 
        year: '2004', 
        en: { title: 'SpaceShipOne', desc: 'First privately funded crewed spaceflight wins Ansari X Prize' },
        fr: { title: 'SpaceShipOne', desc: 'Premier vol spatial habité financé par des fonds privés remporte le prix Ansari X' },
        ar: { title: 'سفينة الفضاء واحد', desc: 'أول رحلة فضائية مأهولة ممولة من القطاع الخاص تفوز بجائزة إكس أنصاري' },
        icon: 'fa-rocket' 
    },
    { 
        year: '2012', 
        en: { title: 'Curiosity Rover', desc: 'NASA rover lands on Mars, begins search for habitable conditions' },
        fr: { title: 'Rover Curiosity', desc: 'Le rover de la NASA atterrit sur Mars, commence la recherche de conditions habitables' },
        ar: { title: 'مركبة كيوريوسيتي', desc: 'مركبة ناسا تهبط على المريخ، وتبدأ البحث عن ظروف قابلة للسكن' },
        icon: 'fa-robot' 
    },
    { 
        year: '2014', 
        en: { title: 'Rosetta Mission', desc: 'First spacecraft to orbit and land on a comet' },
        fr: { title: 'Mission Rosetta', desc: 'Premier vaisseau spatial à orbiter et atterrir sur une comète' },
        ar: { title: 'مهمة روزيتا', desc: 'أول مركبة فضائية تدور وتهبط على مذنب' },
        icon: 'fa-comet' 
    },
    { 
        year: '2015', 
        en: { title: 'New Horizons', desc: 'First spacecraft to fly by Pluto, revealing its complex surface' },
        fr: { title: 'New Horizons', desc: 'Premier vaisseau spatial à survoler Pluton, révélant sa surface complexe' },
        ar: { title: 'آفاق جديدة', desc: 'أول مركبة فضائية تحلق بالقرب من بلوتو، تكشف عن سطحه المعقد' },
        icon: 'fa-globe-americas' 
    },
    { 
        year: '2018', 
        en: { title: 'Falcon Heavy', desc: 'Most powerful operational rocket by SpaceX launches with Tesla Roadster payload' },
        fr: { title: 'Falcon Heavy', desc: 'Fusée opérationnelle la plus puissante de SpaceX lancée avec une charge utile Tesla Roadster' },
        ar: { title: 'فالكون هيفي', desc: 'أقوى صاروخ تشغيلي من سبيس إكس يطلق بحمولة تسلا رودستر' },
        icon: 'fa-rocket' 
    },
    { 
        year: '2020', 
        en: { title: 'Crew Dragon', desc: 'First commercial crewed mission to ISS by SpaceX' },
        fr: { title: 'Crew Dragon', desc: 'Première mission habitée commerciale vers l\'ISS par SpaceX' },
        ar: { title: 'دراجون كرو', desc: 'أول مهمة مأهولة تجارية إلى محطة الفضاء الدولية من قبل سبيس إكس' },
        icon: 'fa-space-shuttle' 
    },
    { 
        year: '2021', 
        en: { title: 'Perseverance Rover', desc: 'NASA rover with Ingenuity helicopter lands on Mars, begins sample collection' },
        fr: { title: 'Rover Perseverance', desc: 'Le rover de la NASA avec l\'hélicoptère Ingenuity atterrit sur Mars, commence la collecte d\'échantillons' },
        ar: { title: 'مركبة المثابرة', desc: 'مركبة ناسا مع مروحية إنجينيويتي تهبط على المريخ، وتبدأ جمع العينات' },
        icon: 'fa-helicopter' 
    },
    { 
        year: '2021', 
        en: { title: 'James Webb Telescope', desc: 'Next-generation space telescope launched, successor to Hubble' },
        fr: { title: 'Télescope James Webb', desc: 'Télescope spatial de nouvelle génération lancé, successeur de Hubble' },
        ar: { title: 'تلسكوب جيمس ويب', desc: 'أطلق تلسكوب الفضاء من الجيل التالي، خليفة هابل' },
        icon: 'fa-satellite' 
    },
    { 
        year: '2022', 
        en: { title: 'Artemis I', desc: 'First uncrewed test flight of NASA\'s Moon return program' },
        fr: { title: 'Artemis I', desc: 'Premier vol d\'essai sans équipage du programme de retour sur la Lune de la NASA' },
        ar: { title: 'أرتميس الأول', desc: 'أول رحلة تجريبية بدون طاقم لبرنامج عودة ناسا إلى القمر' },
        icon: 'fa-moon' 
    },
    { 
        year: '2023', 
        en: { title: 'Chandrayaan-3', desc: 'India successfully lands spacecraft on the Moon\'s south pole' },
        fr: { title: 'Chandrayaan-3', desc: 'L\'Inde atterrit avec succès un vaisseau spatial sur le pôle sud de la Lune' },
        ar: { title: 'تشاندرايان-3', desc: 'الهند تهبط بنجاح بمركبة فضائية على القطب الجنوبي للقمر' },
        icon: 'fa-globe-asia' 
    },
  { 
    year: '2025', 
    en: { 
      title: 'Blue Ghost Mission 1', 
      desc: 'Firefly Aerospace successfully lands on the Moon and transmits over 110 GB of scientific data' 
    },
    fr: { 
      title: 'Blue Ghost Mission 1', 
      desc: 'Firefly Aerospace atterrit avec succès sur la Lune et transmet plus de 110 Go de données scientifiques' 
    },
    ar: { 
      title: 'بلو غوست المهمة 1', 
      desc: 'شركة فايرفلاي تهبط بنجاح على القمر وتنقل أكثر من 110 جيجابايت من البيانات العلمية' 
    },
    icon: 'fa-moon' 
  },
  { 
    year: '2024', 
    en: { title: 'Europa Clipper', desc: 'NASA launches mission to study Jupiter’s moon Europa for signs of habitability' },
    fr: { title: 'Europa Clipper', desc: 'La NASA lance une mission pour étudier la lune Europe de Jupiter à la recherche d’habitabilité' },
    ar: { title: 'مسبار أوروبا كليبر', desc: 'ناسا تطلق مهمة لدراسة قمر المشتري أوروبا بحثًا عن قابلية السكن' },
    icon: 'fa-space-shuttle' 
  },
  { 
    year: '2024', 
    en: { title: 'Hera', desc: 'ESA launches mission to study asteroid Dimorphos after DART impact for planetary defense' },
    fr: { title: 'Hera', desc: 'L’ESA lance une mission pour étudier l’astéroïde Dimorphos après l’impact de DART pour la défense planétaire' },
    ar: { title: 'هيرا', desc: 'وكالة الفضاء الأوروبية تطلق مهمة لدراسة الكويكب ديمورفوس بعد اصطدام DART لأغراض الدفاع الكوكبي' },
    icon: 'fa-meteor' 
  },
  { 
    year: '2024', 
    en: { title: 'Chang’e 6', desc: 'China returns first-ever lunar samples from the far side of the Moon' },
    fr: { title: 'Chang’e 6', desc: 'La Chine rapporte les premiers échantillons lunaires de la face cachée de la Lune' },
    ar: { title: 'تشانغ آه-6', desc: 'الصين تعيد أول عينات قمرية من الجانب البعيد للقمر' },
    icon: 'fa-moon' 
  },
  { 
    year: '2025', 
    en: { 
      title: 'Solar Orbiter Venus Flyby', 
      desc: 'ESA spacecraft uses Venus gravity assist to capture first-ever images of the Sun’s south pole' 
    },
    fr: { 
      title: 'Survol de Vénus par Solar Orbiter', 
      desc: 'La sonde de l’ESA utilise l’assistance gravitationnelle de Vénus pour capturer les premières images du pôle sud du Soleil' 
    },
    ar: { 
      title: 'مركبة سولار أوربيتر - تحليق قرب الزهرة', 
      desc: 'مركبة وكالة الفضاء الأوروبية تستخدم جاذبية الزهرة لالتقاط أول صور لقطب الشمس الجنوبي' 
    },
    icon: 'fa-sun' 
  },
  { 
    year: '2025', 
    en: { 
      title: 'Lucy Flyby of Donaldjohanson', 
      desc: 'NASA’s Lucy spacecraft performs first close-up study of asteroid Donaldjohanson in the main belt' 
    },
    fr: { 
      title: 'Survol de Donaldjohanson par Lucy', 
      desc: 'La sonde Lucy de la NASA réalise la première étude rapprochée de l’astéroïde Donaldjohanson dans la ceinture principale' 
    },
    ar: { 
      title: 'تحليق لوسي قرب الكويكب دونالدجوهانسون', 
      desc: 'مركبة ناسا لوسي تقوم بأول دراسة عن قرب للكويكب دونالدجوهانسون في الحزام الرئيسي' 
    },
    icon: 'fa-asterisk' 
  }
];