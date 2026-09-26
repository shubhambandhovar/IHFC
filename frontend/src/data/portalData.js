// Centralized data for the IHFC Portal
export const courseData = {
    title: "Professional Certificate Program in Generative AI, Machine Learning, and Intelligent Automation",
    provider: "Simplilearn",
    collaboration: "Microsoft",
    duration: "11 Months",
    startDate: "01/09/2026",
    completionDate: "01/08/2027",
    mode: "Online / Live Learning",
    certification: "IHFC, TIH of IIT Delhi Certified Program",
    modules: [
        { id: '1', number: '01', title: "Program Induction", status: "completed" },
        { id: '2', number: '02', title: "Python Refresher With AI", status: "completed" },
        { id: '3', number: '03', title: "Applied Data Science With Python", status: "current", description: "Building on a strong Python foundation, this module introduces core data science principles.", skills: ["Python", "NumPy", "Pandas", "Matplotlib"] },
        { id: '4', number: '04', title: "Machine Learning", status: "upcoming", description: "ML fundamentals and frameworks" },
        { id: '5', number: '05', title: "Deep Learning Specialization", status: "upcoming", description: "Neural networks and deep learning" },
        { id: '6', number: '06', title: "GenAI Literacy", status: "upcoming", description: "Foundational GenAI applications" },
        { id: '7', number: '07', title: "Advanced Generative AI", status: "upcoming", description: "Advanced generative models and architectures" },
        { id: '8', number: '08', title: "Capstone Project", status: "upcoming", description: "Final end-to-end program project" }
    ]
};

export const progressData = {
    completedModules: 2,
    totalModules: 8,
    percentage: 25,
    certificatesEarned: 0
};

export const paymentData = {
    totalPaid: 100000,
    amountDue: 53000,
    installments: [
        { id: 1, type: "Registration Fee", amount: 25000, status: "Paid", date: "March 01, 2026" },
        { id: 2, type: "Installment 1", amount: 25000, status: "Paid", date: "April 01, 2026" },
        { id: 3, type: "Installment 2", amount: 25000, status: "Paid", date: "May 01, 2026" },
        { id: 4, type: "Installment 3", amount: 25000, status: "Paid", date: "June 01, 2026" },
        { id: 5, type: "Final Installment", amount: 53000, status: "Pending", date: "Upon Completion" }
    ]
};

export const notificationData = [
    { id: 1, title: "Installment 3 Payment Received", message: "Thank you for your payment of ₹25,000 on June 01, 2026.", type: "payment", date: "June 01, 2026" },
    { id: 2, title: "New Module Unlocked", message: "Applied Data Science With Python is now available.", type: "course", date: "May 28, 2026" }
];

export const activityData = [
    { id: 1, title: "Installment 3 payment received", date: "June 01, 2026", type: "success" },
    { id: 2, title: "Applied Data Science With Python unlocked", date: "May 28, 2026", type: "success" }
];

export const resourceData = [
    { id: '1', title: "Machine Learning", author: "Krish Naik", url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe", moduleId: 'machine-learning' },
    { id: '2', title: "Deep Learning", author: "Krish Naik", url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVPGU70ZGsckrMdr0FteeRUi", moduleId: 'deep-learning' },
    { id: '3', title: "Generative AI Roadmap", author: "CampusX", url: "https://www.youtube.com/watch?v=pSVk-5WemQ0", moduleId: 'generative-ai-roadmap' },
    { id: '4', title: "Generative AI using LangChain", author: "CampusX", url: "https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0", moduleId: 'generative-ai-langchain' },
    { id: '5', title: "NLP", author: "Krish Naik", url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVNNrHSKv36Lr3_156yCo6Nn", moduleId: 'nlp' }
];
