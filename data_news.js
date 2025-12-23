// data.js - Updated with categories and Tunisian data
const AN_data = [
    // Global News
    {
		id: 'news-001',
		type: 'news',
		category: 'global',
		image: 'assets2/images/news/gamma-ray-burst.jpg',
		date: '2025-12-10',
		en: {
			title: 'Record-Breaking Gamma-Ray Burst Stuns Astronomers',
			subtitle: 'Unprecedented seven-hour event challenges existing astrophysical models',
			body: 'On July 2, 2025, astronomers detected GRB 250702B, a gamma-ray burst that lasted over seven hours instead of the typical seconds to minutes. Observations from NASA\'s Fermi satellite, ground-based telescopes including the Víctor M. Blanco and Gemini instruments, and the James Webb Space Telescope revealed a relativistic jet in a dusty, massive galaxy 8 billion light-years away. The event\'s extraordinary duration challenges current collapsar models, with scientists considering alternative explanations like tidal disruption events involving intermediate-mass black holes.'
		},
		ar: {
			title: 'انفجار أشعة غاما قياسي يُحيّر الفلكيين',
			subtitle: 'حدث غير مسبوق يستمر لسبع ساعات يتحدى النماذج الفيزيائية الفلكية الحالية',
			body: 'في 2 جويلية 2025، رصد الفلكيون انفجار أشعة غاما GRB 250702B الذي استمر لأكثر من سبع ساعات بدلاً من الثواني أو الدقائق المعتادة. كشفت عمليات الرصد من قمر فيرمي التابع لناسا، والتلسكوبات الأرضية بما فيها تلسكوبات Víctor M. Blanco وGemini، وتلسكوب جيمس ويب الفضائي عن نفث نسبي في مجرة غبارية ضخمة تبعد 8 مليارات سنة ضوئية. تتحدى المدة غير المسبوقة للحدث النماذج الحالية لانفجارات المستعرات العظمى الضخمة، مما دفع العلماء لبحث تفسيرات بديلة مثل أحداث تمزق المد والجزر المتضمنة ثقوباً سوداء متوسطة الكتلة.'
		},
		fr: {
			title: 'Un sursaut gamma record stupéfie les astronomes',
			subtitle: 'Un événement sans précédent de sept heures remet en question les modèles astrophysiques existants',
			body: 'Le 2 juillet 2025, les astronomes ont détecté GRB 250702B, un sursaut gamma qui a duré plus de sept heures au lieu des secondes ou minutes habituelles. Les observations du satellite Fermi de la NASA, des télescopes terrestres dont les instruments Víctor M. Blanco et Gemini, et du télescope spatial James Webb ont révélé un jet relativiste dans une galaxie poussiéreuse massive à 8 milliards d\'années-lumière. La durée extraordinaire de l\'événement remet en cause les modèles actuels de collapsar, poussant les scientifiques à envisager des explications alternatives comme des événements de disruption par effet de marée impliquant des trous noirs de masse intermédiaire.'
		}
	},
    {
		id: 'news-002',
		type: 'news',
		category: 'global',
		image: 'assets2/images/news/comet-3i-atlas.jpg',
		date: '2025-12-05',
		en: {
			title: 'Juice and Hubble Observe Interstellar Comet 3I/Atlas',
			subtitle: 'Spacecraft and telescope provide unique data on the mysterious visitor before its closest approach to Earth',
			body: 'The Jupiter-bound spacecraft Juice and the Hubble Space Telescope have successfully observed the interstellar comet 3I/Atlas. Juice used five instruments, including its NavCam, to capture the comet\'s plasma and dust tails just days before its perihelion. Hubble provided additional images on November 30th. The comet, the third confirmed interstellar visitor after \'Oumuamua and Borisov, will make its closest approach to Earth on December 19th, coming within 273 million kilometers, becoming visible with amateur telescopes.'
		},
		ar: {
			title: 'مسبار جويس وتلسكوب هابل يدرسان المذنب بين النجوم 3I/أطلس',
			subtitle: 'مركبة فضائية وتلسكوب يقدمان بيانات فريدة عن الزائر الغامق قبل اقترابه الأقصى من الأرض',
			body: 'تمكن المسبار جويس المتجه نحو المشتري وتلسكوب هابل الفضائي من رصد المذنب بين النجوم 3I/أطلس. استخدم جويس خمسة أدوات، بما فيها كاميرا الملاحة، لالتقاط ذيول البلازما والغبار الخاصة بالمذنب قبل أيام فقط من وصوله إلى الحضيض الشمسي. وفر هابل صوراً إضافية في 30 نوفمبر. سيصل المذنب، وهو الزائر بين النجوم الثالث المؤكد بعد أومواموا وبوريسوف، إلى أقرب نقطة من الأرض في 19 ديسمبر، ليصبح على بعد 273 مليون كيلومتر، ومرئياً بالتلسكوبات الهواة.'
		},
		fr: {
			title: 'Juice et Hubble observent la comète interstellaire 3I/Atlas',
			subtitle: 'Une sonde spatiale et un télescope fournissent des données uniques sur le mystérieux visiteur avant son approche la plus proche de la Terre',
			body: 'La sonde spatiale Juice, en route vers Jupiter, et le télescope spatial Hubble ont observé avec succès la comète interstellaire 3I/Atlas. Juice a utilisé cinq instruments, dont sa NavCam, pour capturer les queues de plasma et de poussière de la comète quelques jours seulement avant son périhélie. Hubble a fourni des images supplémentaires le 30 novembre. La comète, le troisième visiteur interstellaire confirmé après \'Oumuamua et Borisov, effectuera son approche la plus proche de la Terre le 19 décembre, passant à 273 millions de kilomètres, devenant visible avec des télescopes amateurs.'
		}
	},
    // Tunisian Local News
    {
    id: 'news-003',
    type: 'news',
    category: 'local',
    image: 'assets2/images/news/tunisia-conference.jpg',
    date: '2025-12-05',
    en: {
        title: 'Tunisian Association of Young Astronomers Hosted Dr. Mayssa El Yazidi on Planetary Geology',
        subtitle: 'Conference on Mercury exploration and remote sensing applications successfully held in Tunis',
        body: 'On December 4, 2025, the Tunisian Association of Young Astronomers organized a significant conference presented by Dr. Mayssa El Yazidi, a postdoctoral researcher at the Institute of Radioastronomy (IRA), National Institute of Astrophysics (INAF) - Italy. The conference covered two main topics: "The exploration of Mercury, from Mariner 10 to BepiColombo" and "Remote sensing data and ArcGis application: From Earth to the planets". The event took place at the Khawarizmi conference hall (Mathematics Department), Faculty of Sciences of Tunis, University of Tunis El Manar, and was conducted in English. The conference was moderated by Feyda Srarfi and provided valuable insights into planetary geology and space technology applications for students and astronomy enthusiasts.'
    },
    ar: {
        title: 'الجمعية التونسية للشباب الفلكيين استضافت الدكتورة ميساء اليزيدي في ندوة حول جيولوجيا الكواكب',
        subtitle: 'عقدت ندوة ناجحة حول استكشاف عطارد وتطبيقات الاستشعار عن بعد في تونس',
        body: 'في 4 ديسمبر 2025، نظمت الجمعية التونسية للشباب الفلكيين ندوة هامة قدمتها الدكتورة ميساء اليزيدي، باحثة ما بعد الدكتوراه في معهد الراديو الفلكي (IRA)، المعهد الوطني للفيزياء الفلكية (INAF) - إيطاليا. تناولت الندوة موضوعين رئيسيين: "استكشاف كوكب عطارد، من مسبار مارينر 10 إلى بيبيكولومبو" و"بيانات الاستشعار عن بعد وتطبيق ArcGis: من الأرض إلى الكواكب". عقدت الندوة في قاعة مؤتمرات الخوارزمي (قسم الرياضيات)، كلية العلوم بتونس، جامعة تونس المنار، وقد قدمت باللغة الإنجليزية. أدارت الندوة فايدة الصرافي وقدمت رؤى قيمة حول جيولوجيا الكواكب وتطبيقات تكنولوجيا الفضاء للطلاب وهواة الفلك.'
    },
    fr: {
        title: 'L\'Association Tunisienne des Jeunes Astronomes a accueilli le Dr Mayssa El Yazidi pour une conférence sur la géologie planétaire',
        subtitle: 'Conférence sur l\'exploration de Mercure et les applications de télédétection tenue avec succès à Tunis',
        body: 'Le 4 décembre 2025, l\'Association Tunisienne des Jeunes Astronomes a organisé une conférence importante présentée par le Dr Mayssa El Yazidi, chercheuse postdoctorale à l\'Institut de Radioastronomie (IRA), Institut National d\'Astrophysique (INAF) - Italie. La conférence a porté sur deux sujets principaux : "L\'exploration de Mercure, de Mariner 10 à BepiColombo" et "Les données de télédétection et l\'application ArcGis : de la Terre aux planètes". L\'événement s\'est tenu à la salle de conférences Khawarizmi (Département de Mathématiques), Faculté des Sciences de Tunis, Université de Tunis El Manar, et a été présenté en anglais. La conférence a été modérée par Feyda Srarfi et a fourni des perspectives précieuses sur la géologie planétaire et les applications de la technologie spatiale pour les étudiants et les passionnés d\'astronomie.'
    }
},
    {
    id: 'news-004',
    type: 'news',
    category: 'local',
    image: 'assets2/images/news/comet-lemmon-tail.jpg',
    date: '2025-11-10',
    en: {
        title: 'Astrophotographers Capture Comet Lemmon\'s Ion Tail in Stunning Detail',
        subtitle: 'Hafedh Driss and Makrem Akrout reveal chaotic beauty of comet\'s plasma structures',
        body: 'Astrophotographers Hafedh Driss and Makrem Akrout successfully captured Comet Lemmon\'s magnificent ion tail during its approach to perihelion. Using Twin RASA 8 systems equipped with ZWO ASI2600MM Duo cameras and Antlia RGB Pro filters at f/2, they documented the comet under favorable conditions as it entered the inner solar system. The resulting image reveals intense interactions between solar radiation, solar wind, and the comet\'s ionized gases, creating a spectacular ion tail rich in filaments and dynamic plasma waves shaped by the solar magnetic field. The green coma primarily originated from diatomic carbon (C₂) emissions, while the bluish tail traced carbon monoxide ions (CO⁺). As the comet approached its perihelion on November 8, 2025, the ion tail displayed strong brightness variations and turbulent structures driven by solar activity and outgassing from the nucleus. The image represents a significant achievement in comet photography, showcasing both technical expertise and artistic vision in capturing solar system phenomena.'
    },
    ar: {
        title: 'مصورو الفلك يوثقون ذيل المذنب ليمون الأيوني بتفاصيل مذهلة',
        subtitle: 'حافظ دريس ومكرم عكروت يكشفان الجمال الفوضوي للهياكل البلازمية في المذنب',
        body: 'تمكن مصورا الفلك حافظ دريس ومكرم عكروت من التقاط ذيل المذنب ليمون الأيوني المذهل خلال اقترابه من الحضيض الشمسي. باستخدام نظامي RASA 8 المزدوجة المجهزة بكاميرات ZWO ASI2600MM Duo ومرشحات Antlia RGB Pro عند فتحة f/2، وثقوا المذنب في ظروف مواتية بينما دخل النظام الشمسي الداخلي. تظهر الصورة الناتجة تفاعلات مكثفة بين الإشعاع الشمسي والرياح الشمسية والغازات المؤينة للمذنب، مما خلق ذيلاً أيونياً رائعاً غنياً بالخيوط وموجات البلازما الديناميكية المشكلة بواسطة المجال المغناطيسي الشمسي. نشأت الغيبوبة الخضراء بشكل أساسي من انبعاثات الكربون ثنائي الذرة (C₂)، بينما تتبع الذيل المزرق أيونات أول أكسيد الكربون (CO⁺). مع اقتراب المذنب من حضيضه في 8 نوفمبر 2025، أظهر الذيل الأيوني اختلافات قوية في السطوع وهياكل مضطربة مدفوعة بالنشاط الشمسي وانبعاثات الغازات من النواة. تمثل الصورة إنجازاً كبيراً في تصوير المذنبات، حيث تظهر الخبرة التقنية والرؤية الفنية في توثيق ظواهر النظام الشمسي.'
    },
    fr: {
        title: 'Des astrophotographes capturent la queue ionique de la comète Lemmon avec des détails époustouflants',
        subtitle: 'Hafedh Driss et Makrem Akrout révèlent la beauté chaotique des structures plasmatiques de la comète',
        body: 'Les astrophotographes Hafedh Driss et Makrem Akrout ont réussi à capturer la magnifique queue ionique de la comète Lemmon lors de son approche du périhélie. Utilisant des systèmes jumeaux RASA 8 équipés de caméras ZWO ASI2600MM Duo et de filtres Antlia RGB Pro à f/2, ils ont documenté la comète dans des conditions favorables alors qu\'elle entrait dans le système solaire interne. L\'image résultante révèle des interactions intenses entre le rayonnement solaire, le vent solaire et les gaz ionisés de la comète, créant une queue ionique spectaculaire riche en filaments et en ondes de plasma dynamiques façonnées par le champ magnétique solaire. La coma verte provenait principalement des émissions de carbone diatomique (C₂), tandis que la queue bleutée traçait les ions monoxyde de carbone (CO⁺). Alors que la comète approchait de son périhélie le 8 novembre 2025, la queue ionique a affiché de fortes variations de luminosité et des structures turbulentes entraînées par l\'activité solaire et les dégazages du noyau. L\'image représente une réalisation significative en photographie cométaire, montrant à la fois une expertise technique et une vision artistique dans la capture des phénomènes du système solaire.'
    }
},
    {
    id: 'news-005',
    type: 'news',
    category: 'global',
    image: 'assets2/images/news/cosmic-filament.jpg',
    date: '2025-12-05',
    en: {
        title: 'Never seen before: Astronomers discover the largest rotating structure in the Universe and it defies our models',
        subtitle: 'Cosmic filament of galaxies rotating together challenges understanding of galaxy formation',
        body: 'An international team of astronomers led by the University of Oxford has discovered a chain of 14 galaxies within a cosmic filament rotating together, located 140 million light-years away. The filament, which is 50 million light-years long and contains over 280 galaxies, rotates at a speed of 110 km/s. This discovery, published in the Monthly Notices of the Royal Astronomical Society, challenges current models of galaxy formation and rotation in the early universe.'
    },
    ar: {
        title: 'شيء غير مسبوق: علماء الفلك يكتشفون أكبر بنية دوارة في الكون وهي تتحدى نماذجنا',
        subtitle: 'خيط كوني من المجرات يدور معاً يتحدى فهمنا لتشكل المجرات',
        body: 'اكتشف فريق دولي من علماء الفلك بقيادة جامعة أكسفورد سلسلة من 14 مجرة داخل خيط كوني تدور معاً، على بعد 140 مليون سنة ضوئية. يبلغ طول الخيط الكوني 50 مليون سنة ضوئية ويحتوي على أكثر من 280 مجرة، ويدور بسرعة 110 كم/ثانية. هذا الاكتشاف، الذي نُشر في مجلة Monthly Notices of the Royal Astronomical Society، يتحدى النماذج الحالية لتشكل ودوران المجرات في الكون المبكر.'
    },
    fr: {
        title: 'C\'est du jamais vu : des astronomes ont découvert la plus grande structure en rotation de l\'Univers et elle défie nos modèles',
        subtitle: 'Un filament cosmique de galaxies tournant ensemble remet en question notre compréhension de la formation des galaxies',
        body: 'Une équipe internationale d\'astronomes dirigée par l\'université d\'Oxford a découvert une chaîne de 14 galaxies au sein d\'un filament cosmique en rotation, situé à 140 millions d\'années-lumière. Le filament, qui s\'étend sur 50 millions d\'années-lumière et contient plus de 280 galaxies, tourne à une vitesse de 110 km/s. Cette découverte, publiée dans les Monthly Notices of the Royal Astronomical Society, remet en question les modèles actuels de formation et de rotation des galaxies dans l\'Univers primitif.'
    }
},
    {
    id: 'news-006',
    type: 'news',
    category: 'local',
    image: 'assets2/images/news/astronomy-IAU.jpg',
    date: '2025-12-01',
    en: {
        title: 'Launch of First Astronomical Project for People with Disabilities in the Arab World',
        subtitle: 'Iraq, Syria, and Tunisia Coordinators under IAU supervision announced the "Astronomy for All" project',
        body: 'The astronomical coordinators of Iraq, Syria, and Tunisia, under the supervision of the Office of Astronomy for Development of the International Astronomical Union, announced the launch of the project: "Astronomy for All: Supporting and Empowering People with Disabilities in the Arab World." This was the first project of its kind in the Arab world, aiming to enhance astronomical inclusion and enable people with disabilities to access and effectively participate in space and astronomical sciences. The project worked on developing educational and guidance programs suitable for different groups, in addition to building a dedicated website for the project as a platform for communication, providing training materials, and announcing joint activities and events. The coordinators of Iraq, Syria, and Tunisia also collaborated in conducting workshops, launching supporting initiatives, and providing a suitable educational environment that contributed to integrating people with disabilities into the Arab and international astronomical community.'
    },
    ar: {
        title: 'انطلاق أول مشروع فلكي لخدمة ذوي الهمم في الوطن العربي',
        subtitle: 'منسقيات العراق وسوريا وتونس للفلك وبإشراف مكتب التوعية الفلكية في الاتحاد الفلكي الدولي أعلنت عن مشروع "الفلك للجميع"',
        body: 'سرّت منسقيات العراق وسوريا وتونس للفلك وبإشراف مكتب التوعية الفلكية في الاتحاد الفلكي الدولي، بالإعلان عن إطلاق مشروع: "الفلك للجميع: دعم وتمكين الأشخاص من ذوي الهمم في العالم العربي". كان هذا المشروع الأول من نوعه على مستوى الوطن العربي وهدف إلى تعزيز الشمول الفلكي وتمكين الأشخاص من ذوي الهمم من الوصول إلى علوم الفضاء والفلك والمشاركة فيها بفاعلية. عمل المشروع على تطوير برامج تعليمية وتوجيهية تتناسب مع مختلف الفئات، بالإضافة إلى بناء موقع إلكتروني مخصص للمشروع يكون منصة للتواصل، وتقديم المواد التدريبية، وإعلان الأنشطة والفعاليات المشتركة. كما تعاونت منسقيات العراق وسوريا وتونس في تنفيذ ورش العمل، وإطلاق المبادرات الداعمة، وتوفير بيئة تعليمية ملائمة ساهمت في دمج ذوي الهمم في المجتمع الفلكي العربي والدولي.'
    },
    fr: {
        title: 'Lancement du premier projet astronomique au service des personnes en situation de handicap dans le monde arabe',
        subtitle: 'Les coordinateurs astronomiques d\'Irak, de Syrie et de Tunisie sous la supervision de l\'Union astronomique internationale ont annoncé le projet "L\'astronomie pour tous"',
        body: 'Les coordinateurs astronomiques d\'Irak, de Syrie et de Tunisie, sous la supervision du Bureau de l\'astronomie pour le développement de l\'Union astronomique internationale, ont annoncé le lancement du projet : "L\'astronomie pour tous : soutien et autonomisation des personnes en situation de handicap dans le monde arabe". Ce projet a été le premier du genre dans le monde arabe et visait à renforcer l\'inclusion astronomique et à permettre aux personnes en situation de handicap d\'accéder et de participer efficacement aux sciences spatiales et astronomiques. Le projet a travaillé au développement de programmes éducatifs et d\'orientation adaptés à différents groupes, en plus de la construction d\'un site web dédié au projet comme plateforme de communication, fournissant du matériel de formation et annonçant les activités et événements conjoints. Les coordinateurs d\'Irak, de Syrie et de Tunisie ont également collaboré à la conduite d\'ateliers, au lancement d\'initiatives de soutien et à la fourniture d\'un environnement éducatif adapté qui a contribué à l\'intégration des personnes en situation de handicap dans la communauté astronomique arabe et internationale.'
    }
},
    // Events (updated with Tunisian dates)
    {
    id: 'event-001',
    type: 'event',
    category: 'global',
    image: 'assets2/images/events/december-solstice.jpg',
    date: '2025-12-21',
    en: {
        title: '2025 December Solstice',
        subtitle: 'The sun reaches its southernmost point, marking the shortest day in the Northern Hemisphere',
        body: 'The 2025 December solstice occurs on December 21 at 15:03 UTC. This astronomical event marks the sun\'s southernmost point in the sky, bringing the shortest day and longest night in the Northern Hemisphere (winter solstice) and the longest day in the Southern Hemisphere (summer solstice). At Stonehenge, thousands gather to witness the sunrise alignment with the Heel Stone, celebrating the symbolic "rebirth of the sun."'
    },
    ar: {
        title: 'الانقلاب الشتوي ديسمبر 2025',
        subtitle: 'الشمس تصل إلى أقصى نقطة جنوبية، معلنةً أقصر يوم في نصف الكرة الشمالي',
        body: 'يحدث الانقلاب الشتوي ديسمبر 2025 في 21 ديسمبر الساعة 15:03 بالتوقيت العالمي. يحدد هذا الحدث الفلكي وصول الشمس إلى أقصى نقطة جنوبية في السماء، مما يجلب أقصر يوم وأطول ليلة في نصف الكرة الشمالي (الانقلاب الشتوي) وأطول يوم في نصف الكرة الجنوبي (الانقلاب الصيفي). في ستونهنج، يتجمع الآلاف لمشاهدة محاذاة شروق الشمس مع حجر الكعب، للاحتفال بـ"ولادة الشمس" الرمزية.'
    },
    fr: {
        title: 'Solstice de décembre 2025',
        subtitle: 'Le Soleil atteint son point le plus méridional, marquant le jour le plus court dans l\'hémisphère Nord',
        body: 'Le solstice de décembre 2025 se produit le 21 décembre à 15:03 UTC. Cet événement astronomique marque le point le plus méridional du Soleil dans le ciel, apportant le jour le plus court et la nuit la plus longue dans l\'hémisphère Nord (solstice d\'hiver) et le jour le plus long dans l\'hémisphère Sud (solstice d\'été). À Stonehenge, des milliers de personnes se rassemblent pour observer l\'alignement du lever du soleil avec la Heel Stone, célébrant la "renaissance symbolique du soleil".'
    }
},
    {
    id: 'event-002',
    type: 'event',
    category: 'local',
    image: 'assets2/images/events/tunisia-winter-sky.jpg',
    date: '2025-12-27',
    en: {
        title: 'Astronomy Activities: Stargazing Evening to Explore the Wonders of the Winter Sky',
        subtitle: 'Astronomy evening at the City of Science in Tunis',
        body: 'The City of Science in Tunis is organizing a stargazing evening dedicated to exploring the wonders of the winter sky, on Saturday, December 27, 2025, starting at 6:00 PM at the Ibn Khaldun Hall, City of Science, Tunis. Program content: Lecture: "Wonders of the Winter Sky", Astronomical observation workshops: Deepen your knowledge of the most beautiful targets that can be observed and monitored during the winter season. Astronomy enthusiasts, through telescopes set up on site, will be able to observe and monitor: The Moon, Saturn and its moons, Jupiter, the Orion Nebula. It is an astronomical evening that combines science and is open to all lovers of the beauty of the dark sky and the magic of the universe! Admission is free and open to all.'
    },
    ar: {
        title: 'أنشطة في علم الفلك: سهرة فلكية لاستكشاف عجائب سماء الشتاء',
        subtitle: 'سهرة فلكية في مدينة العلوم بتونس',
        body: 'تنظّم مدينة العلوم سهرة فلكيّة مخصّصة لاستكشاف عجائب سماء الشتاء، وذلك يوم السبت 27 ديسمبر 2025، ابتداءً من الساعة السادسة مساءً بقاعة ابن خلدون، مدينة العلوم بتونس. محتوى البرنامج: محاضرة: "عجائب السماء الشتويّة"، ورشات الرصد الفلكي: تجعلك تعمّق في أجمل الأهداف التي يمكن رصدها ومراقبتها خلال موسم الشتاء. سيتمكن هواة علم الفلك، عبر التلسكوبات المثبتة في الموقع، من رصد ومراقبة: القمر، كوكب زحل وأقماره، كوكب المشتري، سديم الجبار (سديم أوريون الرائع). هي سهرة فلكيّة تجمع بين العلم مفتوحة لجميع عشاق جمال ظلمة السماء وسحر الكون! الدخول حرّ ومجّاني.'
    },
    fr: {
        title: 'Activités d\'astronomie : Soirée d\'observation des étoiles pour explorer les merveilles du ciel d\'hiver',
        subtitle: 'Soirée d\'astronomie à la Cité des Sciences de Tunis',
        body: 'La Cité des Sciences de Tunis organise une soirée d\'observation des étoiles dédiée à l\'exploration des merveilles du ciel d\'hiver, le samedi 27 décembre 2025, à partir de 18h00 à la salle Ibn Khaldoun, Cité des Sciences, Tunis. Contenu du programme : Conférence : "Les merveilles du ciel d\'hiver", Ateliers d\'observation astronomique : Vous approfondirez les plus beaux objets à observer et suivre pendant la saison hivernale. Les passionnés d\'astronomie, à travers les télescopes installés sur place, pourront observer et surveiller : La Lune, Saturne et ses lunes, Jupiter, la nébuleuse d\'Orion. C\'est une soirée astronomique qui allie science et est ouverte à tous les amoureux de la beauté du ciel nocturne et de la magie de l\'univers ! L\'entrée est libre et gratuite pour tous.'
    }
},
    {
    id: 'event-003',
    type: 'event',
    category: 'global',
    image: 'assets2/images/events/ursid-meteor.jpg',
    date: '2025-12-22',
    en: {
        title: 'Ursid Meteor Shower Peak',
        subtitle: 'Annual meteor shower from Comet 8P/Tuttle',
        body: 'The Ursid meteor shower peaks on December 22, 2025. Active from December 13-26, the Ursids produce about 5 meteors per hour under dark skies. This year, the new moon on December 20 will provide ideal viewing conditions.'
    },
    ar: {
        title: 'ذروة زخة شهب الدببة',
        subtitle: 'زخة شهب سنوية من المذنب 8P/Tuttle',
        body: 'تصل زخة شهب الدببة إلى ذروتها في 22 ديسمبر 2025. نشطة من 13 إلى 26 ديسمبر، تنتج شهب الدببة حوالي 5 شهب في الساعة تحت سماء مظلمة. هذا العام، سيقدم القمر الجديد في 20 ديسمبر ظروف مشاهدة مثالية.'
    },
    fr: {
        title: 'Pic de la pluie de météores des Ursides',
        subtitle: 'Pluie de météores annuelle de la comète 8P/Tuttle',
        body: 'La pluie de météores des Ursides atteint son pic le 22 décembre 2025. Active du 13 au 26 décembre, les Ursides produisent environ 5 météores par heure sous un ciel sombre. Cette année, la nouvelle lune du 20 décembre offrira des conditions d\'observation idéales.'
    }
}
];
