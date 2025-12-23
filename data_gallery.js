// data_gallery.js - Gallery data for Astronomy News

// Gallery data with different astronomical images
const AN_gallery_data = [
    // Galaxies
    {
        id: 'galaxy-001',
        category: 'galaxies',
        image: 'assets2/images/gallery/andromeda.jpg',
        date: '2022-08-15',
        en: {
            title: 'Andromeda Galaxy (M31)',
            description: 'The Andromeda Galaxy is our nearest spiral galaxy neighbor, located about 2.5 million light-years away. It is on a collision course with the Milky Way and will merge with our galaxy in about 4.5 billion years.',
            telescope: 'Hubble Space Telescope',
            location: 'Andromeda Constellation',
            category: 'Spiral Galaxy'
        },
        fr: {
            title: 'Galaxie d\'Andromède (M31)',
            description: 'La galaxie d\'Andromède est notre plus proche voisine spirale, située à environ 2,5 millions d\'années-lumière. Elle est en collision avec la Voie Lactée et fusionnera avec notre galaxie dans environ 4,5 milliards d\'années.',
            telescope: 'Télescope spatial Hubble',
            location: 'Constellation d\'Andromède',
            category: 'Galaxie Spirale'
        },
        ar: {
            title: 'مجرة المرأة المسلسلة (M31)',
            description: 'مجرة المرأة المسلسلة هي أقرب مجرة حلزونية لنا، تقع على بعد حوالي 2.5 مليون سنة ضوئية. وهي في مسار تصادمي مع درب التبانة وستندمج مع مجرتنا في حوالي 4.5 مليار سنة.',
            telescope: 'تلسكوب هابل الفضائي',
            location: 'كوكبة المرأة المسلسلة',
            category: 'مجرة حلزونية'
        }
    },
    {
        id: 'galaxy-002',
        category: 'galaxies',
        image: 'assets2/images/gallery/sombrero.jpg',
        date: '2021-11-20',
        en: {
            title: 'Sombrero Galaxy (M104)',
            description: 'The Sombrero Galaxy is an unbarred spiral galaxy in the constellation Virgo. Its prominent dust lane and large central bulge give it the appearance of a sombrero hat.',
            telescope: 'Hubble Space Telescope',
            location: 'Virgo Constellation',
            category: 'Spiral Galaxy'
        },
        fr: {
            title: 'Galaxie du Sombrero (M104)',
            description: 'La galaxie du Sombrero est une galaxie spirale non barrée dans la constellation de la Vierge. Sa bande de poussière proéminente et son grand bulbe central lui donnent l\'apparence d\'un chapeau sombrero.',
            telescope: 'Télescope spatial Hubble',
            location: 'Constellation de la Vierge',
            category: 'Galaxie Spirale'
        },
        ar: {
            title: 'مجرة السومبريرو (M104)',
            description: 'مجرة السومبريرو هي مجرة حلزونية غير مقيدة في كوكبة العذراء. حزام الغبار البارز والانتفاخ المركزي الكبير يمنحها مظهر قبعة السومبريرو.',
            telescope: 'تلسكوب هابل الفضائي',
            location: 'كوكبة العذراء',
            category: 'مجرة حلزونية'
        }
    },
    {
        id: 'galaxy-003',
        category: 'galaxies',
        image: 'assets2/images/gallery/whirlpool.jpg',
        date: '2025-03-10',
        en: {
            title: 'Whirlpool Galaxy (M51)',
            description: 'The Whirlpool Galaxy is a classic spiral galaxy that is interacting with a smaller companion galaxy. This interaction triggers star formation in both galaxies.',
            telescope: 'Hubble Space Telescope',
            location: 'Canes Venatici Constellation',
            category: 'Interacting Galaxies'
        },
        fr: {
            title: 'Galaxie du Tourbillon (M51)',
            description: 'La galaxie du Tourbillon est une galaxie spirale classique qui interagit avec une galaxie compagne plus petite. Cette interaction déclenche la formation d\'étoiles dans les deux galaxies.',
            telescope: 'Télescope spatial Hubble',
            location: 'Constellation des Chiens de Chasse',
            category: 'Galaxies en Interaction'
        },
        ar: {
            title: 'مجرة الدوامة (M51)',
            description: 'مجرة الدوامة هي مجرة حلزونية كلاسيكية تتفاعل مع مجرة مصاحبة أصغر. هذا التفاعل يحفز تكوين النجوم في كلا المجرتين.',
            telescope: 'تلسكوب هابل الفضائي',
            location: 'كوكبة السلوقيان',
            category: 'المجرات المتفاعلة'
        }
    },
    
    // Nebulae
    {
        id: 'nebula-001',
        category: 'nebulae',
        image: 'assets2/images/gallery/orion-nebula.jpg',
        date: '2022-12-05',
        en: {
            title: 'Orion Nebula (M42)',
            description: 'The Orion Nebula is a diffuse nebula situated in the Milky Way, south of Orion\'s Belt. It is one of the brightest nebulae and is visible to the naked eye in the night sky.',
            telescope: 'Hubble Space Telescope',
            location: 'Orion Constellation',
            category: 'Diffuse Nebula'
        },
        fr: {
            title: 'Nébuleuse d\'Orion (M42)',
            description: 'La nébuleuse d\'Orion est une nébuleuse diffuse située dans la Voie Lactée, au sud de la ceinture d\'Orion. C\'est l\'une des nébuleuses les plus brillantes et est visible à l\'œil nu dans le ciel nocturne.',
            telescope: 'Télescope spatial Hubble',
            location: 'Constellation d\'Orion',
            category: 'Nébuleuse Diffuse'
        },
        ar: {
            title: 'سديم الجبار (M42)',
            description: 'سديم الجبار هو سديم منتشر يقع في درب التبانة، جنوب حزام الجبار. وهو أحد ألمع السدم ويمكن رؤيته بالعين المجردة في سماء الليل.',
            telescope: 'تلسكوب هابل الفضائي',
            location: 'كوكبة الجبار',
            category: 'سديم منتشر'
        }
    },
    {
        id: 'nebula-002',
        category: 'nebulae',
        image: 'assets2/images/gallery/crab-nebula.jpg',
        date: '2025-01-15',
        en: {
            title: 'Crab Nebula (M1)',
            description: 'The Crab Nebula is a supernova remnant and pulsar wind nebula in the constellation Taurus. It corresponds to a bright supernova recorded by Chinese astronomers in 1054.',
            telescope: 'Chandra X-ray Observatory',
            location: 'Taurus Constellation',
            category: 'Supernova Remnant'
        },
        fr: {
            title: 'Nébuleuse du Crabe (M1)',
            description: 'La nébuleuse du Crabe est un rémanent de supernova et une nébuleuse de vent de pulsar dans la constellation du Taureau. Elle correspond à une supernova brillante enregistrée par des astronomes chinois en 1054.',
            telescope: 'Observatoire Chandra en rayons X',
            location: 'Constellation du Taureau',
            category: 'Rémanent de Supernova'
        },
        ar: {
            title: 'سديم السرطان (M1)',
            description: 'سديم السرطان هو بقايا مستعر أعظم وريح نجم نابض في كوكبة الثور. وهو يتوافق مع مستعر أعظم ساطع سجله الفلكيون الصينيون في عام 1054.',
            telescope: 'مرصد شاندرا للأشعة السينية',
            location: 'كوكبة الثور',
            category: 'بقايا مستعر أعظم'
        }
    },
    {
        id: 'nebula-003',
        category: 'nebulae',
        image: 'assets2/images/gallery/eagle-nebula.jpg',
        date: '2022-11-30',
        en: {
            title: 'Eagle Nebula (M16)',
            description: 'The Eagle Nebula is a young open cluster of stars in the constellation Serpens. It is famous for the "Pillars of Creation" region where new stars are being formed.',
            telescope: 'Hubble Space Telescope',
            location: 'Serpens Constellation',
            category: 'Emission Nebula'
        },
        fr: {
            title: 'Nébuleuse de l\'Aigle (M16)',
            description: 'La nébuleuse de l\'Aigle est un jeune amas ouvert d\'étoiles dans la constellation du Serpent. Elle est célèbre pour la région des "Piliers de la Création" où de nouvelles étoiles se forment.',
            telescope: 'Télescope spatial Hubble',
            location: 'Constellation du Serpent',
            category: 'Nébuleuse en Émission'
        },
        ar: {
            title: 'سديم النسر (M16)',
            description: 'سديم النسر هو عنقود نجمي مفتوح شاب في كوكبة الحية. وهو مشهور بمنطقة "أعمدة الخلق" حيث تتشكل نجوم جديدة.',
            telescope: 'تلسكوب هابل الفضائي',
            location: 'كوكبة الحية',
            category: 'سديم إشعاعي'
        }
    },
    {
        id: 'nebula-004',
        category: 'nebulae',
        image: 'assets2/images/gallery/helix-nebula.jpg',
        date: '2025-02-28',
        en: {
            title: 'Helix Nebula (NGC 7293)',
            description: 'The Helix Nebula is a planetary nebula located in the constellation Aquarius. It is one of the closest planetary nebulae to Earth and has a distinctive ring shape.',
            telescope: 'Spitzer Space Telescope',
            location: 'Aquarius Constellation',
            category: 'Planetary Nebula'
        },
        fr: {
            title: 'Nébuleuse de l\'Hélice (NGC 7293)',
            description: 'La nébuleuse de l\'Hélice est une nébuleuse planétaire située dans la constellation du Verseau. C\'est l\'une des nébuleuses planétaires les plus proches de la Terre et a une forme annulaire distinctive.',
            telescope: 'Télescope spatial Spitzer',
            location: 'Constellation du Verseau',
            category: 'Nébuleuse Planétaire'
        },
        ar: {
            title: 'سديم الحلزون (NGC 7293)',
            description: 'سديم الحلزون هو سديم كوكبي يقع في كوكبة الدلو. وهو أحد أقرب السدم الكوكبية إلى الأرض وله شكل حلقي مميز.',
            telescope: 'تلسكوب سبيتزر الفضائي',
            location: 'كوكبة الدلو',
            category: 'سديم كوكبي'
        }
    },
    
    // Planets
    {
        id: 'planet-001',
        category: 'planets',
        image: 'assets2/images/gallery/jupiter.jpg',
        date: '2025-04-12',
        en: {
            title: 'Jupiter and Its Great Red Spot',
            description: 'Jupiter, the largest planet in our solar system, with its famous Great Red Spot - a giant storm that has been raging for at least 400 years. The image shows Jupiter\'s intricate cloud bands and atmospheric features.',
            telescope: 'Hubble Space Telescope',
            location: 'Solar System',
            category: 'Gas Giant'
        },
        fr: {
            title: 'Jupiter et sa Grande Tache Rouge',
            description: 'Jupiter, la plus grande planète de notre système solaire, avec sa célèbre Grande Tache Rouge - une tempête géante qui fait rage depuis au moins 400 ans. L\'image montre les bandes nuageuses complexes de Jupiter et ses caractéristiques atmosphériques.',
            telescope: 'Télescope spatial Hubble',
            location: 'Système Solaire',
            category: 'Géante Gazeuse'
        },
        ar: {
            title: 'المشتق والبقعة الحمراء العظمى',
            description: 'المشتري، أكبر كوكب في نظامنا الشمسي، مع بقبته الحمراء العظمى الشهيرة - عاصفة عملاقة مستمرة منذ 400 عام على الأقل. تظهر الصورة نطاقات السحب المعقدة والميزات الجوية للمشتري.',
            telescope: 'تلسكوب هابل الفضائي',
            location: 'النظام الشمسي',
            category: 'عملاق غازي'
        }
    },
    {
        id: 'planet-002',
        category: 'planets',
        image: 'assets2/images/gallery/saturn.jpg',
        date: '2025-05-18',
        en: {
            title: 'Saturn and Its Rings',
            description: 'Saturn with its spectacular ring system, composed of ice particles, rocky debris, and dust. The Cassini spacecraft captured this detailed view during its mission to the Saturn system.',
            telescope: 'Cassini Spacecraft',
            location: 'Solar System',
            category: 'Gas Giant'
        },
        fr: {
            title: 'Saturne et ses Anneaux',
            description: 'Saturne avec son spectaculaire système d\'anneaux, composé de particules de glace, de débris rocheux et de poussière. La sonde spatiale Cassini a capturé cette vue détaillée lors de sa mission vers le système de Saturne.',
            telescope: 'Sonde spatiale Cassini',
            location: 'Système Solaire',
            category: 'Géante Gazeuse'
        },
        ar: {
            title: 'زحل وحلقاته',
            description: 'زحل مع نظام حلقاته الرائع، المكون من جزيئات الجليد والحطام الصخري والغبار. التقطت مركبة كاسيني الفضائية هذا المنظر التفصيلي خلال مهمتها إلى نظام زحل.',
            telescope: 'مركبة كاسيني الفضائية',
            location: 'النظام الشمسي',
            category: 'عملاق غازي'
        }
    },
    {
        id: 'planet-003',
        category: 'planets',
        image: 'assets2/images/gallery/mars-surface.jpg',
        date: '2025-06-22',
        en: {
            title: 'Mars Surface from Perseverance',
            description: 'Detailed view of the Martian surface captured by NASA\'s Perseverance rover. The image shows layered rocks that may contain evidence of ancient microbial life on Mars.',
            telescope: 'Perseverance Rover',
            location: 'Jezero Crater, Mars',
            category: 'Rocky Planet'
        },
        fr: {
            title: 'Surface de Mars depuis Perseverance',
            description: 'Vue détaillée de la surface martienne capturée par le rover Perseverance de la NASA. L\'image montre des roches stratifiées qui pourraient contenir des preuves d\'une ancienne vie microbienne sur Mars.',
            telescope: 'Rover Perseverance',
            location: 'Cratère Jezero, Mars',
            category: 'Planète Rocheuse'
        },
        ar: {
            title: 'سطح المريخ من مركبة المثابرة',
            description: 'منظر تفصيلي لسطح المريخ التقطه روفر المثابرة التابع لناسا. تظهر الصورة صخوراً متطبقة قد تحتوي على دليل على حياة ميكروبية قديمة على المريخ.',
            telescope: 'مركبة المثابرة',
            location: 'فوهة جيزيرو، المريخ',
            category: 'كوكب صخري'
        }
    },
    {
        id: 'planet-004',
        category: 'planets',
        image: 'assets2/images/gallery/earth-from-space.jpg',
        date: '2025-07-10',
        en: {
            title: 'Earth from the International Space Station',
            description: 'Stunning view of Earth from the International Space Station, showing continents, oceans, and atmospheric layers. The curvature of the Earth and the thin blue line of the atmosphere are clearly visible.',
            telescope: 'ISS Cameras',
            location: 'Low Earth Orbit',
            category: 'Blue Planet'
        },
        fr: {
            title: 'Terre depuis la Station Spatiale Internationale',
            description: 'Vue époustouflante de la Terre depuis la Station Spatiale Internationale, montrant les continents, les océans et les couches atmosphériques. La courbure de la Terre et la mince ligne bleue de l\'atmosphère sont clairement visibles.',
            telescope: 'Caméras de l\'ISS',
            location: 'Orbite Terrestre Basse',
            category: 'Planète Bleue'
        },
        ar: {
            title: 'الأرض من محطة الفضاء الدولية',
            description: 'منظر مذهل للأرض من محطة الفضاء الدولية، يظهر القارات والمحيطات والطبقات الجوية. انحناء الأرض والخط الأزرق الرقيق للغلاف الجوي مرئيان بوضوح.',
            telescope: 'كاميرات محطة الفضاء الدولية',
            location: 'المدار الأرضي المنخفض',
            category: 'الكوكب الأزرق'
        }
    },
    
    // Stars
    {
        id: 'star-001',
        category: 'stars',
        image: 'assets2/images/gallery/betelgeuse.jpg',
        date: '2025-03-25',
        en: {
            title: 'Betelgeuse - Red Supergiant Star',
            description: 'Betelgeuse is a red supergiant star in the constellation Orion. It is one of the largest and most luminous stars visible to the naked eye and is expected to explode as a supernova within the next 100,000 years.',
            telescope: 'Very Large Telescope',
            location: 'Orion Constellation',
            category: 'Red Supergiant'
        },
        fr: {
            title: 'Bételgeuse - Étoile Supergéante Rouge',
            description: 'Bételgeuse est une étoile supergéante rouge dans la constellation d\'Orion. C\'est l\'une des plus grandes et des plus lumineuses étoiles visibles à l\'œil nu et devrait exploser en supernova dans les 100 000 prochaines années.',
            telescope: 'Très Grand Télescope',
            location: 'Constellation d\'Orion',
            category: 'Supergéante Rouge'
        },
        ar: {
            title: 'بيت الجوزاء - نجم عملاق أحمر',
            description: 'بيت الجوزاء هو نجم عملاق أحمر في كوكبة الجبار. وهو أحد أكبر وألمع النجوم المرئية بالعين المجردة ومن المتوقع أن ينفجر كمستعر أعظم خلال 100,000 سنة القادمة.',
            telescope: 'التلسكوب الكبير جداً',
            location: 'كوكبة الجبار',
            category: 'عملاق أحمر'
        }
    },
    {
        id: 'star-002',
        category: 'stars',
        image: 'assets2/images/gallery/sirius.jpg',
        date: '2025-02-14',
        en: {
            title: 'Sirius - The Dog Star',
            description: 'Sirius is the brightest star in the night sky, located in the constellation Canis Major. It is actually a binary star system consisting of a main-sequence star and a white dwarf companion.',
            telescope: 'Hubble Space Telescope',
            location: 'Canis Major Constellation',
            category: 'Binary Star System'
        },
        fr: {
            title: 'Sirius - L\'Étoile du Chien',
            description: 'Sirius est l\'étoile la plus brillante du ciel nocturne, située dans la constellation du Grand Chien. C\'est en fait un système d\'étoiles binaires composé d\'une étoile de la séquence principale et d\'une compagne naine blanche.',
            telescope: 'Télescope spatial Hubble',
            location: 'Constellation du Grand Chien',
            category: 'Système d\'Étoiles Binaires'
        },
        ar: {
            title: 'الشعرى اليمانية - النجم الكلب',
            description: 'الشعرى اليمانية هو ألمع نجم في سماء الليل، يقع في كوكبة الكلب الأكبر. إنه في الواقع نظام نجمي ثنائي يتكون من نجم تسلسل رئيسي ورفيق قزم أبيض.',
            telescope: 'تلسكوب هابل الفضائي',
            location: 'كوكبة الكلب الأكبر',
            category: 'نظام نجمي ثنائي'
        }
    },
    {
        id: 'star-003',
        category: 'stars',
        image: 'assets2/images/gallery/pleiades.jpg',
        date: '2022-12-20',
        en: {
            title: 'Pleiades Star Cluster (M45)',
            description: 'The Pleiades, also known as the Seven Sisters, is an open star cluster containing hot, middle-aged stars. The cluster is dominated by hot blue stars that formed within the last 100 million years.',
            telescope: 'Subaru Telescope',
            location: 'Taurus Constellation',
            category: 'Open Star Cluster'
        },
        fr: {
            title: 'Amas des Pléiades (M45)',
            description: 'Les Pléiades, également connues sous le nom des Sept Sœurs, est un amas ouvert contenant des étoiles chaudes d\'âge moyen. L\'amas est dominé par des étoiles bleues chaudes qui se sont formées au cours des 100 derniers millions d\'années.',
            telescope: 'Télescope Subaru',
            location: 'Constellation du Taureau',
            category: 'Amas Stellaire Ouvert'
        },
        ar: {
            title: 'عنقود الثريا النجمي (M45)',
            description: 'الثريا، المعروفة أيضاً باسم الأخوات السبع، هي عنقود نجمي مفتوح يحتوي على نجوم ساخنة في منتصف العمر. يهيمن على العنقود نجوم زرقاء ساخنة تشكلت خلال الـ100 مليون سنة الماضية.',
            telescope: 'تلسكوب سوبارو',
            location: 'كوكبة الثور',
            category: 'عنقود نجمي مفتوح'
        }
    },
    
    // Tunisia Related
    {
    id: 'tunisia-002',
    category: 'tunisia',
    image: 'assets2/images/gallery/tunisia-science-city.jpg',
    date: '2025-08-05',
    en: {
        title: 'Cité des sciences (Science City of Tunis)',
        description: 'The Science City of Tunis is a Tunisian establishment specializing in the dissemination of scientific and technical culture on a national scale. Located in northern Tunis, it features a planetarium with HD fulldome projection, interactive exhibitions on the universe and life, a multimedia library, and temporary exhibition spaces. Its mission is to promote scientific knowledge to the public through demonstrations, exhibitions and educational programs.',
        telescope: 'Planetarium (HD fulldome projection system)',
        location: 'Tunis, Tunisia',
        category: 'Science Museum & Planetarium'
    },
    fr: {
        title: 'Cité des sciences à Tunis',
        description: 'La Cité des sciences à Tunis est un établissement tunisien spécialisé dans la diffusion de la culture scientifique et technique à l\'échelle nationale. Située au nord de Tunis, elle comprend un planétarium avec projection HD fulldome, des expositions interactives sur l\'univers et la vie, une médiathèque et des espaces d\'expositions temporaires. Sa mission est de promouvoir le savoir scientifique auprès du public à travers des démonstrations, expositions et programmes éducatifs.',
        telescope: 'Planétarium (système de projection HD fulldome)',
        location: 'Tunis, Tunisie',
        category: 'Musée des Sciences & Planétarium'
    },
    ar: {
        title: 'مدينة العلوم بتونس',
        description: 'مدينة العلوم بتونس هي مؤسسة تونسية متخصصة في نشر الثقافة العلمية والتقنية على الصعيد الوطني. تقع في شمال تونس، وتضم قبة فلكية بنظام إسقاط عالي الوضوح، ومعارض تفاعلية حول الكون والحياة، ومكتبة وسائط متعددة، ومساحات للمعارض المؤقتة. تتمثل مهمتها في تعزيز المعرفة العلمية لدى الجمهور من خلال العروض التوضيحية والمعارض والبرامج التعليمية.',
        telescope: 'القبة الفلكية (نظام إسقاط عالي الوضوح)',
        location: 'تونس، تونس',
        category: 'متحف العلوم والقبة الفلكية'
    }
},
    {
        id: 'tunisia-002',
        category: 'tunisia',
        image: 'assets2/images/gallery/tunisia-desert-stars.jpg',
        date: '2025-09-12',
        en: {
            title: 'Starry Night in the Tunisian Sahara',
            description: 'The Tunisian Sahara offers some of the clearest night skies in North Africa, with minimal light pollution. This makes it an ideal location for astronomical observations and astrophotography.',
            telescope: 'Camera',
            location: 'Sahara Desert, Tunisia',
            category: 'Astrophotography'
        },
        fr: {
            title: 'Nuit Étoilée dans le Sahara Tunisien',
            description: 'Le Sahara tunisien offre certains des ciels nocturnes les plus clairs d\'Afrique du Nord, avec une pollution lumineuse minimale. Cela en fait un endroit idéal pour les observations astronomiques et l\'astrophotographie.',
            telescope: 'Appareil photo',
            location: 'Désert du Sahara, Tunisie',
            category: 'Astrophotographie'
        },
        ar: {
            title: 'ليلة مرصعة بالنجوم في الصحراء التونسية',
            description: 'تقدم الصحراء التونسية بعض من أكثر سماوات الليل صفاءً في شمال إفريقيا، مع الحد الأدنى من التلوث الضوئي. وهذا يجعلها موقعاً مثالياً للملاحظات الفلكية والتصوير الفلكي.',
            telescope: 'DSLR',
            location: 'الصحراء الكبرى، تونس',
            category: 'التصوير الفلكي'
        }
    },
    {
    id: 'tunisia-003',
    category: 'tunisia',
    image: 'assets2/images/gallery/tunisia-star-night.jpg',
    date: '2025-08-01',
    en: {
        title: 'Nuit des Étoiles (Starry Night)',
        description: 'The "Nuit des Étoiles" (Starry Night) is a popular public astronomy event organized by associations like the Association Jeunes Science de Tunisie (AJST) and institutions including the Cité des Sciences de Tunis. This free event, typically held in August, aims to share astronomy with the general public, youth, and families through telescope observations, workshops on space AI and robotics, and educational activities about the cosmos. It offers accessible and educational cosmic experiences for all ages.',
        telescope: 'Multiple telescopes for public observation',
        location: 'Tunis, Tunisia (various locations including Cité des Sciences)',
        category: 'Astronomy Public Event'
    },
    fr: {
        title: 'Nuit des Étoiles',
        description: 'La "Nuit des Étoiles" est un événement populaire d\'observation du ciel, organisé par des associations comme l\'Association Jeunes Science de Tunisie (AJST) et des institutions telles que la Cité des Sciences de Tunis. Cet événement gratuit, généralement en août, vise à partager l\'astronomie avec le grand public, les jeunes et les familles à travers des observations aux télescopes, des ateliers sur l\'IA spatiale et la robotique, et des activités éducatives sur le cosmos. Il offre des expériences cosmiques accessibles et éducatives pour tous les âges.',
        telescope: 'Plusieurs télescopes pour l\'observation publique',
        location: 'Tunis, Tunisie (divers lieux dont la Cité des Sciences)',
        category: 'Événement Public d\'Astronomie'
    },
    ar: {
        title: 'ليلة النجوم',
        description: '"ليلة النجوم" هو حدث فلكي شعبي للجمهور تنظمه جمعيات مثل جمعية شباب العلوم التونسية ومؤسسات من بينها مدينة العلوم بتونس. يهدف هذا الحدث المجاني، الذي يُعقد عادة في أغسطس، إلى مشاركة علم الفلك مع الجمهور العام والشباب والعائلات من خلال ملاحظات التلسكوبات وورشات عمل حول الذكاء الاصطناعي الفضائي والروبوتات وأنشطة تعليمية حول الكون. يقدم تجارب كونية سهلة الوصول وتعليمية لجميع الأعمار.',
        telescope: 'عدة تلسكوبات للمراقبة العامة',
        location: 'تونس، تونس (مواقع متعددة بما في ذلك مدينة العلوم)',
        category: 'حدث فلكي للجمهور'
    }
},
	{
    id: 'tunisia-004',
    category: 'tunisia',
    image: 'assets2/images/gallery/tunisia-monastir-science-palace.jpg',
    date: '2025-04-29',
    en: {
        title: 'Palais des Sciences de Monastir (Monastir Science Palace)',
        description: 'The Monastir Science Palace is a public non-administrative institution under the Ministry of Higher Education and Scientific Research, established by law in 2007. Its mission is to create intellectual, cultural, and scientific engagement among citizens. It organizes scientific clubs, workshops, and the annual Science Festival which attracts over 15,000 visitors. The institution focuses on stimulating youth research and innovation through hands-on activities in robotics, astronomy, physics, and other scientific fields.',
        telescope: 'Educational programs and workshops',
        location: 'Monastir, Tunisia',
        category: 'Science Education Center'
    },
    fr: {
        title: 'Palais des Sciences de Monastir',
        description: 'Le Palais des Sciences de Monastir est un établissement public à caractère non administratif placé sous la tutelle du Ministère de l\'Enseignement Supérieur et de la Recherche Scientifique, créé par la loi en 2007. Sa mission principale est de créer une dynamique intellectuelle, culturelle et scientifique auprès des différentes catégories de citoyens. Il organise des clubs scientifiques, des ateliers et le Festival des Sciences annuel qui attire plus de 15 000 visiteurs. L\'institution se concentre sur la stimulation de la recherche et de l\'innovation chez les jeunes à travers des activités pratiques en robotique, astronomie, physique et autres domaines scientifiques.',
        telescope: 'Programmes éducatifs et ateliers',
        location: 'Monastir, Tunisie',
        category: 'Centre d\'Éducation Scientifique'
    },
    ar: {
        title: 'قصر العلوم بالمنستير',
        description: 'قصر العلوم بالمنستير هو مؤسسة عمومية ذات صبغة غير إدارية تحت وصاية وزارة التعليم العالي والبحث العلمي، تم إنشاؤها بموجب القانون سنة 2007. تتمثل مهمته الرئيسية في خلق ديناميكية فكرية وثقافية وعلمية لدى مختلف فئات المواطنين. ينظم أندية علمية وورشات ومهرجان العلوم السنوي الذي يجذب أكثر من 15 ألف زائر. تركز المؤسسة على تحفيز البحث والابتكار لدى الشباب من خلال أنشطة عملية في الروبوتات والفلك والفيزياء وغيرها من المجالات العلمية.',
        telescope: 'برامج تعليمية وورشات عمل',
        location: 'المنستير، تونس',
        category: 'مركز التربية العلمية'
    }
},
    
    // Telescopes
    {
        id: 'telescope-001',
        category: 'telescopes',
        image: 'assets2/images/gallery/hubble-telescope.jpg',
        date: '2025-11-08',
        en: {
            title: 'Hubble Space Telescope Deployment',
            description: 'The Hubble Space Telescope being deployed from the Space Shuttle Discovery in 1990. Hubble has revolutionized astronomy with its clear views of the universe, unobstructed by Earth\'s atmosphere.',
            telescope: 'Space Shuttle Cameras',
            location: 'Low Earth Orbit',
            category: 'Space Telescope'
        },
        fr: {
            title: 'Déploiement du Télescope Spatial Hubble',
            description: 'Le télescope spatial Hubble étant déployé depuis la navette spatiale Discovery en 1990. Hubble a révolutionné l\'astronomie avec ses vues claires de l\'univers, non obstruées par l\'atmosphère terrestre.',
            telescope: 'Caméras de la Navette Spatiale',
            location: 'Orbite Terrestre Basse',
            category: 'Télescope Spatial'
        },
        ar: {
            title: 'نشر تلسكوب هابل الفضائي',
            description: 'تلسكوب هابل الفضائي يتم نشره من مكوك الفضاء ديسكفري في عام 1990. أحدث هابل ثورة في علم الفلك بمناظره الواضحة للكون، دون عوائق من الغلاف الجوي للأرض.',
            telescope: 'كاميرات مكوك الفضاء',
            location: 'المدار الأرضي المنخفض',
            category: 'تلسكوب فضائي'
        }
    },
    {
        id: 'telescope-002',
        category: 'telescopes',
        image: 'assets2/images/gallery/james-webb-telescope.jpg',
        date: '2025-12-25',
        en: {
            title: 'James Webb Space Telescope',
            description: 'The James Webb Space Telescope, the most powerful space telescope ever built. It observes the universe in infrared light and can see back in time to the first galaxies that formed after the Big Bang.',
            telescope: 'James Webb Space Telescope',
            location: 'Lagrange Point 2',
            category: 'Infrared Telescope'
        },
        fr: {
            title: 'Télescope Spatial James Webb',
            description: 'Le télescope spatial James Webb, le télescope spatial le plus puissant jamais construit. Il observe l\'univers en lumière infrarouge et peut remonter dans le temps jusqu\'aux premières galaxies qui se sont formées après le Big Bang.',
            telescope: 'Télescope Spatial James Webb',
            location: 'Point de Lagrange 2',
            category: 'Télescope Infrarouge'
        },
        ar: {
            title: 'تلسكوب جيمس ويب الفضائي',
            description: 'تلسكوب جيمس ويب الفضائي، أقوى تلسكوب فضائي تم بناؤه على الإطلاق. يلاحظ الكون في ضوء الأشعة تحت الحمراء ويمكنه النظر إلى الوراء في الزمن إلى المجرات الأولى التي تشكلت بعد الانفجار العظيم.',
            telescope: 'تلسكوب جيمس ويب الفضائي',
            location: 'نقطة لاغرانج 2',
            category: 'تلسكوب الأشعة تحت الحمراء'
        }
    },
    {
        id: 'telescope-003',
        category: 'telescopes',
        image: 'assets2/images/gallery/vlt-telescope.jpg',
        date: '2025-10-30',
        en: {
            title: 'Very Large Telescope (VLT)',
            description: 'The Very Large Telescope in Chile\'s Atacama Desert, one of the world\'s most advanced optical telescopes. It consists of four separate 8.2-meter telescopes that can work together.',
            telescope: 'Very Large Telescope',
            location: 'Atacama Desert, Chile',
            category: 'Ground Telescope'
        },
        fr: {
            title: 'Très Grand Télescope (VLT)',
            description: 'Le Très Grand Télescope dans le désert d\'Atacama au Chili, l\'un des télescopes optiques les plus avancés du monde. Il se compose de quatre télescopes séparés de 8,2 mètres qui peuvent travailler ensemble.',
            telescope: 'Très Grand Télescope',
            location: 'Désert d\'Atacama, Chili',
            category: 'Télescope Terrestre'
        },
        ar: {
            title: 'التلسكوب الكبير جداً (VLT)',
            description: 'التلسكوب الكبير جداً في صحراء أتاكاما في تشيلي، أحد أكثر التلسكوبات البصرية تطوراً في العالم. يتكون من أربعة تلسكوبات منفصلة بحجم 8.2 متر يمكنها العمل معاً.',
            telescope: 'التلسكوب الكبير جداً',
            location: 'صحراء أتاكاما، تشيلي',
            category: 'تلسكوب أرضي'
        }
    }
];