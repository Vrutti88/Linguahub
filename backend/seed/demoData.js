import mongoose from "mongoose";

export const users = [
    {
        _id: "65f000000000000000000001",
        name: "Alice Johnson",
        email: "alice@student.com",
        password: "hashed_password",
        age: 21,
        gender: "Female",
        country: "India",
        role: "student",
        xp: 100,

        // Use Map format
        lessonXp: new Map([
            ["spanish_greetings", 20],
            ["spanish_common_words", 20],
        ]),

        quizXp: new Map([
            ["quiz_spanish_greetings", 50],
            ["quiz_spanish_common_words", 10],
        ]),

        accuracy: 62,
        totalQuestions: 8,
        correctAnswers: 5,

        quizScores: new Map([
            ["65f100000000000000000001", 4],
            ["65f100000000000000000002", 1],
        ]),

        streak: 5,
        lastActiveDate: "2025-02-14",

        onboardingCompleted: true,
        onboarding: {
            language: "Spanish",
            reason: "Travel",
            knowledge: "Beginner",
            dailyGoal: "20",
        },

        progress: {
            completedLessons: [
                "65f100000000000000000001",
                "65f100000000000000000002",
            ],
            completedQuizzes: [
                "65f100000000000000000001",
                "65f100000000000000000001",
            ]
        },
    },

    {
        _id: "65f000000000000000000002",
        name: "John Smith",
        email: "john@student.com",
        password: "hashed_password",
        age: 24,
        gender: "Male",
        country: "USA",
        role: "student",
        xp:70,

        lessonXp: new Map([
            ["french_greetings", 20],
            ["french_travel", 20],
        ]),

        quizXp: new Map([
            ["quiz_french_greetings", 30],
        ]),

        accuracy: 75,
        totalQuestions: 4,
        correctAnswers: 3,

        quizScores: new Map([
            ["65f100000000000000000004", 3],
        ]),

        streak: 2,
        lastActiveDate: "2025-02-13",

        onboardingCompleted: true,
        onboarding: {
            language: "French",
            reason: "Career",
            knowledge: "Intermediate",
            dailyGoal: "30",
        },

        progress: {
            completedLessons: [
                "65f100000000000000000004",
                "65f100000000000000000005",
            ],
            completedQuizzes: [
                "65f100000000000000000001",
            ]
        }
    },

    {
        _id: "65f000000000000000000003",
        name: "Meera Patel",
        email: "meera@student.com",
        password: "hashed_password",
        country: "India",
        role: "student",
        xp: 50,

        lessonXp: new Map([
            ["hindi_greetings", 20],
        ]),

        quizXp: new Map([
            ["quiz_hindi_greetings", 30],
        ]),

        accuracy: 50,
        totalQuestions: 4,
        correctAnswers: 2,

        streak: 7,
        lastActiveDate: "2025-02-10",

        quizScores: new Map([
            ["65f100000000000000000007", 2],
        ]),

        onboardingCompleted: true,
        onboarding: {
            language: "French",
            reason: "Career",
            knowledge: "Intermediate",
            dailyGoal: "30",
        },

        progress: {
            completedLessons: [
                "65f100000000000000000007",
            ],
            completedQuizzes: [
                "65f100000000000000000001",
            ]
        }
    },

    {
        _id: "65f000000000000000000004",
        name: "Alex Brown",
        email: "alex@student.com",
        password: "hashed_password",
        country: "Canada",
        role: "student",
        xp: 70,

        lessonXp: new Map([
            ["english_greetings", 20],
        ]),

        quizXp: new Map([
            ["quiz_english_greetings", 50],
        ]),

        accuracy: 100,
        totalQuestions: 4,
        correctAnswers: 4,

        streak: 1,
        lastActiveDate: "2025-02-12",

        quizScores: new Map([
            ["65f100000000000000000010", 4],
        ]),

        onboardingCompleted: true,
        onboarding: {
            language: "French",
            reason: "Career",
            knowledge: "Intermediate",
            dailyGoal: "30",
        },

        progress: {
            completedLessons: [
                "65f100000000000000000010",
            ],
            completedQuizzes: [
                "65f100000000000000000001",
            ]
        }
    },

    {
        _id: "65f000000000000000000005",
        name: "Ravi Kumar",
        email: "ravi@student.com",
        password: "hashed_password",
        country: "India",
        role: "student",
        xp: 30,

        lessonXp: new Map([
            ["german_basics", 20],
        ]),

        quizXp: new Map([
            ["quiz_german_basics", 10],
        ]),

        accuracy: 25,
        totalQuestions: 4,
        correctAnswers: 1,

        streak: 4,
        lastActiveDate: "2025-02-11",

        quizScores: new Map([
            ["65f100000000000000000014", 2],
        ]),

        onboardingCompleted: true,
        onboarding: {
            language: "French",
            reason: "Career",
            knowledge: "Intermediate",
            dailyGoal: "30",
        },

        progress: {
            completedLessons: [
                "65f100000000000000000014",
            ],
            completedQuizzes: [
                "65f100000000000000000001",
            ]
        }
    },

    // 👩‍🏫 Teachers (NO XP needed)
    {
        _id: "65f000000000000000000006",
        name: "Bob Martinez",
        email: "bob@teacher.com",
        password: "hashed_password",
        country: "Spain",
        role: "teacher"
    },
    {
        _id: "65f000000000000000000007",
        name: "Emma Laurent",
        email: "emma@teacher.com",
        password: "hashed_password",
        country: "France",
        role: "teacher"
    }
];

export const lessons = [
    /* 🇪🇸 Spanish */
    {
        _id: "65f100000000000000000001", title: "Spanish Greetings", description: "Basic greetings in Spanish", language: "Spanish", level: "beginner", estimatedTime: "10 mins", order: 1, createdBy: "65f000000000000000000006",
        contents: [
            { src: "Hola", target: "Hello", pronunciation: "oh-la", imageUrl: "/img/hola.png", audioUrl: "/audio/hola.mp3", videoUrl: "/video/hola.mp4" },
            { src: "Buenos días", target: "Good morning", pronunciation: "bweh-nos dee-as", imageUrl: "/img/buenos.png", audioUrl: "/audio/buenos.mp3", videoUrl: "/video/buenos.mp4" }
        ]
    },
    {
        _id: "65f100000000000000000002", title: "Spanish Common Words", description: "Common Spanish words", language: "Spanish", level: "beginner", estimatedTime: "10 mins", order: 2, createdBy: "65f000000000000000000006",
        contents: [
            { src: "Gracias", target: "Thank you", pronunciation: "gra-thee-as", imageUrl: "/img/gracias.png", audioUrl: "/audio/gracias.mp3", videoUrl: "/video/gracias.mp4" },
            { src: "Por favor", target: "Please", pronunciation: "por fah-vor", imageUrl: "/img/porfavor.png", audioUrl: "/audio/porfavor.mp3", videoUrl: "/video/porfavor.mp4" }
        ]
    },
    {
        _id: "65f100000000000000000003", title: "Spanish Numbers", description: "Spanish numbers", language: "Spanish", level: "beginner", estimatedTime: "8 mins", order: 3, createdBy: "65f000000000000000000006",
        contents: [
            { src: "Uno", target: "One", pronunciation: "oo-no", imageUrl: "/img/uno.png", audioUrl: "/audio/uno.mp3", videoUrl: "/video/uno.mp4" },
            { src: "Dos", target: "Two", pronunciation: "dos", imageUrl: "/img/dos.png", audioUrl: "/audio/dos.mp3", videoUrl: "/video/dos.mp4" }
        ]
    },

    /* 🇫🇷 French */
    {
        _id: "65f100000000000000000004", title: "French Greetings", description: "French greetings", language: "French", level: "beginner", estimatedTime: "10 mins", order: 1, createdBy: "65f000000000000000000007",
        contents: [
            { src: "Bonjour", target: "Hello", pronunciation: "bon-zhoor", imageUrl: "/img/bonjour.png", audioUrl: "/audio/bonjour.mp3", videoUrl: "/video/bonjour.mp4" },
            { src: "Bonsoir", target: "Good evening", pronunciation: "bon-swaar", imageUrl: "/img/bonsoir.png", audioUrl: "/audio/bonsoir.mp3", videoUrl: "/video/bonsoir.mp4" }
        ]
    },
    {
        _id: "65f100000000000000000005", title: "French Travel Phrases", description: "Travel phrases", language: "French", level: "intermediate", estimatedTime: "15 mins", order: 2, createdBy: "65f000000000000000000007",
        contents: [
            { src: "Où est la gare ?", target: "Where is the station?", pronunciation: "oo eh la gar", imageUrl: "/img/gare.png", audioUrl: "/audio/gare.mp3", videoUrl: "/video/gare.mp4" }
        ]
    },
    {
        _id: "65f100000000000000000006", title: "Advanced French Expressions", description: "Formal French", language: "French", level: "advanced", estimatedTime: "20 mins", order: 3, createdBy: "65f000000000000000000006",
        contents: [
            { src: "Je suis ravi de vous rencontrer", target: "Nice to meet you", pronunciation: "zhe swee ra-vee", imageUrl: "/img/rencontrer.png", audioUrl: "/audio/rencontrer.mp3", videoUrl: "/video/rencontrer.mp4" }
        ]
    },

    /* 🇮🇳 Hindi */
    {
        _id: "65f100000000000000000007", title: "Hindi Greetings", description: "Hindi greetings", language: "Hindi", level: "beginner", estimatedTime: "10 mins", order: 1, createdBy: "65f000000000000000000006",
        contents: [
            { src: "नमस्ते", target: "Hello", pronunciation: "na-mas-te", imageUrl: "/img/namaste.png", audioUrl: "/audio/namaste.mp3", videoUrl: "/video/namaste.mp4" },
            { src: "शुभ प्रभात", target: "Good morning", pronunciation: "shubh pra-bhaat", imageUrl: "/img/prabhat.png", audioUrl: "/audio/prabhat.mp3", videoUrl: "/video/prabhat.mp4" }
        ]
    },
    {
        _id: "65f100000000000000000008", title: "Hindi Daily Words", description: "Daily Hindi words", language: "Hindi", level: "beginner", estimatedTime: "10 mins", order: 2, createdBy: "65f000000000000000000006",
        contents: [
            { src: "धन्यवाद", target: "Thank you", pronunciation: "dhanyavaad", imageUrl: "/img/dhanyavaad.png", audioUrl: "/audio/dhanyavaad.mp3", videoUrl: "/video/dhanyavaad.mp4" },
            { src: "कृपया", target: "Please", pronunciation: "kripya", imageUrl: "/img/kripya.png", audioUrl: "/audio/kripya.mp3", videoUrl: "/video/kripya.mp4" }
        ]
    },
    {
        _id: "65f100000000000000000009", title: "Hindi Travel Phrases", description: "Travel Hindi", language: "Hindi", level: "intermediate", estimatedTime: "15 mins", order: 3, createdBy: "65f000000000000000000006",
        contents: [
            { src: "स्टेशन कहाँ है?", target: "Where is the station?", pronunciation: "station kahan hai", imageUrl: "/img/station.png", audioUrl: "/audio/station.mp3", videoUrl: "/video/station.mp4" }
        ]
    },

    /* 🇬🇧 English */
    {
        _id: "65f100000000000000000010", title: "English Greetings", description: "English greetings", language: "English", level: "beginner", estimatedTime: "8 mins", order: 1, createdBy: "65f000000000000000000007",
        contents: [
            { src: "Hello", target: "Hello", pronunciation: "heh-lo", imageUrl: "/img/hello.png", audioUrl: "/audio/hello.mp3", videoUrl: "/video/hello.mp4" }
        ]
    },
    {
        _id: "65f100000000000000000011", title: "English Daily Conversations", description: "Daily conversations", language: "English", level: "intermediate", estimatedTime: "12 mins", order: 2, createdBy: "65f000000000000000000007",
        contents: [
            { src: "How are you?", target: "How are you?", pronunciation: "how ar yoo", imageUrl: "/img/howareyou.png", audioUrl: "/audio/howareyou.mp3", videoUrl: "/video/howareyou.mp4" }
        ]
    },
    {
        _id: "65f100000000000000000012", title: "English Professional Phrases", description: "Professional English", language: "English", level: "advanced", estimatedTime: "15 mins", order: 3, createdBy: "65f000000000000000000007",
        contents: [
            { src: "Nice to meet you", target: "Nice to meet you", pronunciation: "nice to meet you", imageUrl: "/img/nicetomeet.png", audioUrl: "/audio/nicetomeet.mp3", videoUrl: "/video/nicetomeet.mp4" }
        ]
    },

    /* 🇯🇵 Japanese */
    {
        _id: "65f100000000000000000013", title: "Japanese Greetings", description: "Japanese greetings", language: "Japanese", level: "beginner", estimatedTime: "12 mins", order: 1, createdBy: "65f000000000000000000007",
        contents: [
            { src: "こんにちは", target: "Hello", pronunciation: "kon-ni-chi-wa", imageUrl: "/img/konnichiwa.png", audioUrl: "/audio/konnichiwa.mp3", videoUrl: "/video/konnichiwa.mp4" }
        ]
    },
    {
        _id: "65f100000000000000000014", title: "Japanese Daily Words", description: "Daily Japanese", language: "Japanese", level: "beginner", estimatedTime: "12 mins", order: 2, createdBy: "65f000000000000000000007",
        contents: [
            { src: "ありがとう", target: "Thank you", pronunciation: "a-ri-ga-to", imageUrl: "/img/arigato.png", audioUrl: "/audio/arigato.mp3", videoUrl: "/video/arigato.mp4" }
        ]
    },

    /* 🇩🇪 German */
    {
        _id: "65f100000000000000000015", title: "German Basics", description: "German basics", language: "German", level: "beginner", estimatedTime: "10 mins", order: 1, createdBy: "65f000000000000000000006",
        contents: [
            { src: "Hallo", target: "Hello", pronunciation: "hah-lo", imageUrl: "/img/hallo.png", audioUrl: "/audio/hallo.mp3", videoUrl: "/video/hallo.mp4" }
        ]
    },
    {
        _id: "65f100000000000000000016", title: "German Travel Words", description: "German travel", language: "German", level: "beginner", estimatedTime: "12 mins", order: 2, createdBy: "65f000000000000000000006",
        contents: [
            { src: "Bahnhof", target: "Station", pronunciation: "bahn-hof", imageUrl: "/img/bahnhof.png", audioUrl: "/audio/bahnhof.mp3", videoUrl: "/video/bahnhof.mp4" }
        ]
    },

    /* 🇰🇷 Korean */
    {
        _id: "65f100000000000000000017", title: "Korean Greetings", description: "Korean greetings", language: "Korean", level: "beginner", estimatedTime: "10 mins", order: 1, createdBy: "65f000000000000000000007",
        contents: [
            { src: "안녕하세요", target: "Hello", pronunciation: "ann-yeong", imageUrl: "/img/annyeong.png", audioUrl: "/audio/annyeong.mp3", videoUrl: "/video/annyeong.mp4" }
        ]
    },
    {
        _id: "65f100000000000000000018", title: "Korean Daily Words", description: "Daily Korean", language: "Korean", level: "beginner", estimatedTime: "10 mins", order: 2, createdBy: "65f000000000000000000007",
        contents: [
            { src: "감사합니다", target: "Thank you", pronunciation: "gam-sa-ham-ni-da", imageUrl: "/img/gamsa.png", audioUrl: "/audio/gamsa.mp3", videoUrl: "/video/gamsa.mp4" }
        ]
    },

    /* 🇮🇹 Italian */
    {
        _id: "65f100000000000000000019", title: "Italian Food Words", description: "Italian food", language: "Italian", level: "beginner", estimatedTime: "8 mins", order: 1, createdBy: "65f000000000000000000006",
        contents: [
            { src: "Pizza", target: "Pizza", pronunciation: "peet-sa", imageUrl: "/img/pizza.png", audioUrl: "/audio/pizza.mp3", videoUrl: "/video/pizza.mp4" }
        ]
    },
    {
        _id: "65f100000000000000000020", title: "Italian Cafe Phrases", description: "Cafe phrases", language: "Italian", level: "beginner", estimatedTime: "10 mins", order: 2, createdBy: "65f000000000000000000006",
        contents: [
            { src: "Caffè", target: "Coffee", pronunciation: "ka-fe", imageUrl: "/img/caffe.png", audioUrl: "/audio/caffe.mp3", videoUrl: "/video/caffe.mp4" }
        ]
    },

    /* 🇨🇳 Chinese */
    {
        _id: "65f100000000000000000021", title: "Chinese Greetings", description: "Chinese greetings", language: "Chinese", level: "beginner", estimatedTime: "10 mins", order: 1, createdBy: "65f000000000000000000007",
        contents: [
            { src: "你好", target: "Hello", pronunciation: "ni-hao", imageUrl: "/img/nihao.png", audioUrl: "/audio/nihao.mp3", videoUrl: "/video/nihao.mp4" }
        ]
    },
    {
        _id: "65f100000000000000000022", title: "Chinese Common Characters", description: "Chinese basics", language: "Chinese", level: "beginner", estimatedTime: "12 mins", order: 2, createdBy: "65f000000000000000000007",
        contents: [
            { src: "谢谢", target: "Thank you", pronunciation: "xie-xie", imageUrl: "/img/xiexie.png", audioUrl: "/audio/xiexie.mp3", videoUrl: "/video/xiexie.mp4" }
        ]
    },

    /* 🇷🇺 Russian */
    {
        _id: "65f100000000000000000023", title: "Russian Greetings", description: "Russian greetings", language: "Russian", level: "beginner", estimatedTime: "10 mins", order: 1, createdBy: "65f000000000000000000007",
        contents: [
            { src: "Здравствуйте", target: "Hello", pronunciation: "zdrast-vuy-tye", imageUrl: "/img/zdrav.png", audioUrl: "/audio/zdrav.mp3", videoUrl: "/video/zdrav.mp4" }
        ]
    },
    {
        _id: "65f100000000000000000024", title: "Russian Common Words", description: "Russian basics", language: "Russian", level: "beginner", estimatedTime: "10 mins", order: 2, createdBy: "65f000000000000000000007",
        contents: [
            { src: "Спасибо", target: "Thank you", pronunciation: "spa-si-ba", imageUrl: "/img/spasibo.png", audioUrl: "/audio/spasibo.mp3", videoUrl: "/video/spasibo.mp4" }
        ]
    },

    /* 🇸🇦 Arabic */
    {
        _id: "65f100000000000000000025", title: "Arabic Greetings", description: "Arabic greetings", language: "Arabic", level: "beginner", estimatedTime: "10 mins", order: 1, createdBy: "65f000000000000000000007",
        contents: [
            { src: "مرحبا", target: "Hello", pronunciation: "mar-ha-ba", imageUrl: "/img/marhaba.png", audioUrl: "/audio/marhaba.mp3", videoUrl: "/video/marhaba.mp4" }
        ]
    },
    {
        _id: "65f1000000000000000000026", title: "Arabic Daily Words", description: "Daily Arabic", language: "Arabic", level: "beginner", estimatedTime: "10 mins", order: 2, createdBy: "65f000000000000000000007",
        contents: [
            { src: "شكرا", target: "Thank you", pronunciation: "shuk-ran", imageUrl: "/img/shukran.png", audioUrl: "/audio/shukran.mp3", videoUrl: "/video/shukran.mp4" }
        ]
    },

    /* 🇵🇹 Portuguese */
    {
        _id: "65f100000000000000000027", title: "Portuguese Greetings", description: "Portuguese greetings", language: "Portuguese", level: "beginner", estimatedTime: "10 mins", order: 1, createdBy: "65f000000000000000000006",
        contents: [
            { src: "Olá", target: "Hello", pronunciation: "oh-la", imageUrl: "/img/ola.png", audioUrl: "/audio/ola.mp3", videoUrl: "/video/ola.mp4" }
        ]
    },
    {
        _id: "65f100000000000000000028", title: "Portuguese Travel Phrases", description: "Portuguese travel", language: "Portuguese", level: "beginner", estimatedTime: "12 mins", order: 2, createdBy: "65f000000000000000000006",
        contents: [
            { src: "Onde fica a estação?", target: "Where is the station?", pronunciation: "on-je fi-ka", imageUrl: "/img/estacao.png", audioUrl: "/audio/estacao.mp3", videoUrl: "/video/estacao.mp4" }
        ]
    }
];

export const quizzes = lessons.map((lesson) => ({
    _id: new mongoose.Types.ObjectId(),
    lessonId: lesson._id,
    questions: [
        { type: "mcq", question: `What does "${lesson.contents[0].src}" mean?`, options: [lesson.contents[0].target, "Goodbye", "Sorry", "Please"], answer: 0 },
        { type: "mcq", question: "Which language is this?", options: [lesson.language, "English", "French", "Spanish"], answer: 0 },
        { type: "mcq", question: "This word is used as?", options: ["Greeting", "Food", "Place", "Verb"], answer: 0 },
        { type: "fib", question: `Translate "${lesson.contents[0].src}"`, answerText: lesson.contents[0].target }
    ]
}));

