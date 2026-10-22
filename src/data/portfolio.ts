/**
 * Portfolio content — edit this file only to swap name, links, projects.
 * Colors and fonts live in src/styles.css (@theme + html[data-theme="light"]).
 */

export const profile = {
  name: "Ahmed Magdy Hassan",
  short: "Ahmed Magdy",
  role: "AI / ML Engineer",
  tagline: "Speech systems, grounded LLMs, and backends that stay within the hardware.",
  location: "Egypt",
  email: "ahmed022magdy@gmail.com",
  phone: "+20 102 517 3032",
  github: "https://github.com/Sober-Migo",
  linkedin: "https://www.linkedin.com/in/ahmed-magdy-50808a250",
  x: "https://x.com/Sober_Migo",
  huggingFace: "https://huggingface.co/Sober-Migo",
  kaggle: "https://www.kaggle.com/ahmed4magdy",
  catalog: "https://github.com/Sober-Migo/Fasten_Your_Seat_Belts",
};

export type ProjectCategory = "AI/Data" | "Speech" | "ML" | "Web";
export type ProjectTab = "AI/ML Projects" | "Research" | "Tools";

export type ProjectStats = {
  stars: number;
  forks: number;
  updated: string;
};

export type SkillSegment = {
  skill: string;
  percentage: number;
  color?: string;
};

export type MilestoneStatus = "completed" | "current" | "upcoming";

export type ProjectMilestone = {
  date: string;
  title: string;
  description: string;
  status: MilestoneStatus;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  highlights: string[];
  architecture: string;
  tags: string[];
  category: ProjectCategory;
  tabs: ProjectTab[];
  technologies: string[];
  stats: ProjectStats;
  skillDistribution: SkillSegment[];
  milestones: ProjectMilestone[];
  completionStatus: string;
  live?: string;
  code: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "rag",
    title: "RAG — PDF Q&A",
    description:
      "Chunk a PDF, embed locally with ONNX MiniLM, retrieve in Chroma, and answer only from the document via Groq.",
    longDescription:
      "A privacy-conscious Retrieval-Augmented Generation system designed for zero token-bleed and low inference latency. Documents are parsed, semantically chunked, and embedded entirely locally via ONNX Runtime using all-MiniLM-L6-v2. Vector representations are indexed in ChromaDB for sub-millisecond cosine similarity search, and strictly bounded context prompts are dispatched to Groq's Llama 3.1 engine.",
    highlights: [
      "Local ONNX MiniLM embedding avoids third-party embedding API costs and latency",
      "Cosine similarity retrieval with ChromaDB embedded vector store",
      "Hallucination-resistant prompt contract restricting answers to context",
      "Live interactive web interface hosted on Hugging Face Spaces with Gradio",
    ],
    architecture:
      "PDF Document → Semantic Chunker → Local ONNX MiniLM Embeddings → ChromaDB Vector Store → Context Reranker → Groq LPU (Llama 3.1) → Answer Output",
    tags: ["LangChain", "Chroma", "Groq", "Gradio"],
    category: "AI/Data",
    tabs: ["AI/ML Projects", "Tools"],
    technologies: ["AI/ML", "Python", "LLM/RAG", "Web"],
    stats: { stars: 18, forks: 4, updated: "Oct 2026" },
    completionStatus: "Production Deployed",
    milestones: [
      {
        date: "Aug 2026",
        title: "Project Inception",
        description: "Local ONNX MiniLM pipeline & document chunking benchmarks",
        status: "completed",
      },
      {
        date: "Sep 2026",
        title: "Vector Store & LPU",
        description: "ChromaDB cosine similarity indexing & Groq Llama 3.1 acceleration",
        status: "completed",
      },
      {
        date: "Oct 2026",
        title: "Interactive Space",
        description: "Gradio web demo deployed on Hugging Face Spaces",
        status: "completed",
      },
    ],
    skillDistribution: [
      { skill: "Vector Retrieval", percentage: 40, color: "#c47a3a" },
      { skill: "Local Embeddings", percentage: 35, color: "#6366f1" },
      { skill: "LLM Orchestration", percentage: 25, color: "#38bdf8" },
    ],
    live: "https://huggingface.co/spaces/Sober-Migo/RAG",
    code: "https://github.com/Sober-Migo/RAG",
    featured: true,
  },
  {
    id: "pace",
    title: "PACE Speech Analytics",
    description:
      "Egyptian Arabic session pipeline: emotion, ASR, sentiment, and report generation behind a FastAPI service.",
    longDescription:
      "PACE (Psychiatric Acoustic Analysis & Conversation Evaluation) addresses the unique acoustic and linguistic challenges of colloquial Egyptian Arabic in clinical dialogues. It combines fine-tuned Whisper models for non-standard dialectal transcription with Wav2Vec2 audio feature extractors to detect acoustic emotional valence, feeding into CAMeLBERT for sentiment classification and structured medical summary reports.",
    highlights: [
      "Dialect-adapted Whisper ASR specifically calibrated for colloquial Egyptian phonetics",
      "Wav2Vec2 self-supervised acoustic representations for prosody & pitch variation",
      "CAMeLBERT multi-class sentiment analysis tailored for Arabic morphology",
      "Asynchronous FastAPI microservice handling multi-channel streaming audio chunks",
    ],
    architecture:
      "Audio Stream → 16kHz Resampler → Whisper ASR + Wav2Vec2 Feature Extractor → CAMeLBERT NLP Classifier → FastAPI Asynchronous Orchestrator → Clinical Metric Report",
    tags: ["Whisper", "Wav2Vec2", "FastAPI", "PyTorch"],
    category: "Speech",
    tabs: ["AI/ML Projects", "Research"],
    technologies: ["AI/ML", "Python", "Speech", "Web"],
    stats: { stars: 32, forks: 8, updated: "Sep 2026" },
    completionStatus: "Production Ready",
    milestones: [
      {
        date: "Jun 2026",
        title: "Corpus Calibration",
        description: "Colloquial Egyptian psychiatric audio dialogue compilation",
        status: "completed",
      },
      {
        date: "Aug 2026",
        title: "Dual Model Tuning",
        description: "Whisper dialect adaptation & Wav2Vec2 emotional acoustic modeling",
        status: "completed",
      },
      {
        date: "Sep 2026",
        title: "FastAPI Release",
        description: "Streaming async microservice & automated structured reporting",
        status: "completed",
      },
    ],
    skillDistribution: [
      { skill: "ASR & Whisper", percentage: 40, color: "#8ea58a" },
      { skill: "Acoustic Emotion", percentage: 35, color: "#c47a3a" },
      { skill: "FastAPI Backend", percentage: 25, color: "#6366f1" },
    ],
    code: "https://github.com/Sober-Migo/PACE-Egyptian_Psychiatric_Speech_Analytics",
    featured: true,
  },
  {
    id: "helloml",
    title: "HelloML Digit OCR",
    description:
      "sklearn Pipeline and GridSearchCV over classical models on DIDA digits, with reproducible preprocessing.",
    longDescription:
      "A principled machine learning benchmark comparing classical classifiers (Support Vector Machines, Random Forests, Multi-Layer Perceptrons) on the challenging DIDA historical Arabic digit dataset. Employs scikit-learn Pipeline primitives, automated variance thresholding, morphological centering, and cross-validated GridSearchCV hyperparameter tuning.",
    highlights: [
      "Modular scikit-learn Pipeline ensuring zero data leakage across train/validation splits",
      "Automated GridSearchCV search over kernel gammas, tree depths, and regularization",
      "Custom morphological image normalization and noise filtering",
      "Detailed confusion matrices and ROC curves comparing model performance tradeoffs",
    ],
    architecture:
      "Raw DIDA Digit Images → Centering & Morphological Normalization → PCA Dimensionality Reduction → GridSearchCV Model Pipeline → Cross-Validated Metric Evaluation",
    tags: ["scikit-learn", "NumPy", "OCR"],
    category: "ML",
    tabs: ["AI/ML Projects", "Tools"],
    technologies: ["AI/ML", "Python"],
    stats: { stars: 11, forks: 3, updated: "Aug 2026" },
    completionStatus: "Benchmark Released",
    milestones: [
      {
        date: "May 2026",
        title: "Dataset Normalization",
        description: "DIDA digit morphological centering & contour noise reduction",
        status: "completed",
      },
      {
        date: "Jul 2026",
        title: "GridSearchCV Tuning",
        description: "Cross-validation hyperparameter search across SVM, RF, and MLP",
        status: "completed",
      },
      {
        date: "Aug 2026",
        title: "Pipeline Release",
        description: "Zero-leakage scikit-learn pipeline & evaluation matrices",
        status: "completed",
      },
    ],
    skillDistribution: [
      { skill: "scikit-learn", percentage: 45, color: "#c47a3a" },
      { skill: "Feature Extraction", percentage: 35, color: "#38bdf8" },
      { skill: "GridSearchCV Tuning", percentage: 20, color: "#6366f1" },
    ],
    code: "https://github.com/Sober-Migo/HelloML",
  },
  {
    id: "seatbelts",
    title: "Fasten Your Seat Belts",
    description:
      "Catalog of every course lab and assignment — ML, deep learning, NLP, and IBM generative AI — mapped for review.",
    longDescription:
      "An open-source reference library indexing hundreds of verified labs, notebooks, and problem sets completed across rigorous AI curricula. Mapped with architectural diagrams, mathematical derivations, reproducible Conda environment files, and solution blueprints for practical reference.",
    highlights: [
      "Structured catalog spanning classical ML, deep learning, NLP, and Generative AI",
      "Self-contained, reproducible notebooks with complete mathematical explanations",
      "Endorsed and starred by 25+ developers as an engineering revision handbook",
      "Includes deployment scripts, Dockerfiles, and dataset preprocessing recipes",
    ],
    architecture:
      "Curriculum Matrix → Domain Topic Track → Executable Notebook Unit → Automated Evaluation Suite → Documented Reference Handbook",
    tags: ["Docs", "Curriculum", "GitHub"],
    category: "Web",
    tabs: ["Tools", "Research"],
    technologies: ["Web", "AI/ML", "Python"],
    stats: { stars: 25, forks: 7, updated: "Oct 2026" },
    completionStatus: "Active Catalog",
    milestones: [
      {
        date: "Jan 2026",
        title: "Foundations Mapping",
        description: "Stanford & DeepLearning.AI assignments structured & solved",
        status: "completed",
      },
      {
        date: "Jun 2026",
        title: "GenAI Labs Integration",
        description: "IBM Generative AI engineering codebases indexed & annotated",
        status: "completed",
      },
      {
        date: "Oct 2026",
        title: "Handbook Publication",
        description: "Comprehensive open-source revision repository published",
        status: "completed",
      },
    ],
    skillDistribution: [
      { skill: "Deep Learning", percentage: 40, color: "#6366f1" },
      { skill: "NLP Curricula", percentage: 35, color: "#c47a3a" },
      { skill: "GenAI Labs", percentage: 25, color: "#8ea58a" },
    ],
    live: "https://github.com/Sober-Migo/Fasten_Your_Seat_Belts",
    code: "https://github.com/Sober-Migo/Fasten_Your_Seat_Belts",
  },
  {
    id: "ibm",
    title: "IBM GenAI Labs",
    description:
      "Fine-tuning track through LoRA, QLoRA, instruction tuning, reward models, PPO, and DPO, plus RAG with LangChain.",
    longDescription:
      "An intensive engineering specialization focused on modern Parameter-Efficient Fine-Tuning (PEFT) for large language models. Features low-bit quantization (NF4 QLoRA), instruction alignment datasets, Direct Preference Optimization (DPO) pairwise training, and integration into enterprise RAG retrieval systems.",
    highlights: [
      "Parameter-Efficient Low-Rank Adaptation (LoRA) reducing trainable parameters by 98%",
      "4-bit NormalFloat QLoRA fine-tuning for consumer-grade GPU hardware",
      "Direct Preference Optimization (DPO) and PPO alignment pipeline implementation",
      "LangChain conversation chains with verified prompt engineering patterns",
    ],
    architecture:
      "Pretrained Base LLM (NF4 Quantized) → LoRA Adapter Injection → Preference Dataset Loader → DPO Alignment Loss → Evaluated Adapted Model",
    tags: ["PEFT", "LoRA", "Transformers"],
    category: "AI/Data",
    tabs: ["Research", "AI/ML Projects"],
    technologies: ["AI/ML", "Python", "LLM/RAG"],
    stats: { stars: 20, forks: 5, updated: "Sep 2026" },
    completionStatus: "Research Completed",
    milestones: [
      {
        date: "Jul 2026",
        title: "LoRA / QLoRA Track",
        description: "Rank decomposition on 4-bit quantized transformer bases",
        status: "completed",
      },
      {
        date: "Aug 2026",
        title: "DPO & PPO Alignment",
        description: "Direct Preference Optimization loss & reward model calibration",
        status: "completed",
      },
      {
        date: "Sep 2026",
        title: "RAG Evaluation",
        description: "Enterprise conversation chains integrated with LangChain",
        status: "completed",
      },
    ],
    skillDistribution: [
      { skill: "LoRA / QLoRA PEFT", percentage: 45, color: "#c47a3a" },
      { skill: "DPO & Alignment", percentage: 30, color: "#6366f1" },
      { skill: "RAG Evaluation", percentage: 25, color: "#38bdf8" },
    ],
    code: "https://github.com/Sober-Migo/IBM_Generative_AI_Engineering_with_LLMs_Specialization",
  },
  {
    id: "nlp",
    title: "NLP Specialization",
    description:
      "From vector spaces and n-grams through sequence models, NER, attention, translation, and question answering.",
    longDescription:
      "A complete progression through modern Natural Language Processing from first mathematical principles. Covers word vector geometry and continuous bag-of-words (CBOW), recurrent networks (LSTM/GRU) for sequence labeling and Named Entity Recognition, up to multi-head self-attention mechanisms and transformer neural machine translation.",
    highlights: [
      "Vector spaces, cosine metrics, PCA projections, and Locality Sensitive Hashing (LSH)",
      "Recurrent neural networks with gated units (GRU) and bi-directional LSTMs",
      "Scaled dot-product multi-head attention and positional encodings",
      "Machine translation benchmarks with BLEU and ROUGE scoring evaluation",
    ],
    architecture:
      "Raw Corpus → Byte-Pair Tokenizer → Word2Vec / Dense Embeddings → Multi-Head Self-Attention Encoders → Autoregressive Decoder → Sequence Classification",
    tags: ["NLP", "Attention", "PyTorch"],
    category: "ML",
    tabs: ["Research", "AI/ML Projects"],
    technologies: ["AI/ML", "Python"],
    stats: { stars: 15, forks: 4, updated: "Jul 2026" },
    completionStatus: "Specialization Completed",
    milestones: [
      {
        date: "Mar 2026",
        title: "Vector Spaces",
        description: "Continuous Bag-of-Words & Locality Sensitive Hashing",
        status: "completed",
      },
      {
        date: "May 2026",
        title: "Sequence Networks",
        description: "Bi-directional LSTMs & GRUs for Named Entity Recognition",
        status: "completed",
      },
      {
        date: "Jul 2026",
        title: "Attention Transformers",
        description: "Scaled dot-product multi-head attention machine translation",
        status: "completed",
      },
    ],
    skillDistribution: [
      { skill: "Attention Networks", percentage: 45, color: "#38bdf8" },
      { skill: "Sequence Models", percentage: 30, color: "#6366f1" },
      { skill: "Vector Spaces", percentage: 25, color: "#8ea58a" },
    ],
    code: "https://github.com/Sober-Migo/NLP_Specialization",
  },
];

export const techStackTooltips: Record<string, string> = {
  LangChain: "LLM orchestration, document chunking & conversational chains",
  Chroma: "Embedded vector database for cosine similarity search",
  Groq: "Sub-second LPU inference acceleration for Llama-3.1",
  Gradio: "Interactive browser UI for document QA testing",
  Whisper: "OpenAI ASR model for multilingual speech transcription",
  Wav2Vec2: "Self-supervised acoustic model for emotion feature extraction",
  FastAPI: "High-performance asynchronous Python REST API backend",
  PyTorch: "Deep learning framework for tensor models & training",
  "scikit-learn": "GridSearchCV & classification pipelines",
  NumPy: "Vectorized array calculations & matrix operations",
  OCR: "Optical Character Recognition image preprocessing",
  Docs: "Structured documentation & lab architecture blueprints",
  Curriculum: "Stanford & DeepLearning.AI specialization coursework",
  GitHub: "Source code repository, CI workflows & notebooks",
  PEFT: "Parameter-Efficient Fine-Tuning for resource-constrained GPUs",
  LoRA: "Low-Rank Adaptation with trainable rank decomposition matrices",
  Transformers: "Hugging Face transformer layers, tokenizers & pipelines",
  NLP: "Vector space modeling, n-grams & probabilistic parsers",
  Attention: "Scaled dot-product attention & sequence-to-sequence networks",
};

export const projectRoles: Record<string, string> = {
  rag: "Role: AI Engineer · ONNX embeddings & vector search pipeline",
  pace: "Role: Lead AI Engineer · Multi-task psychiatric speech pipeline",
  helloml: "Role: ML Developer · Digit OCR preprocessing & hyperparameter tuning",
  seatbelts: "Role: Author · Curriculum mapping & reproducible labs catalog",
  ibm: "Role: Researcher · LoRA/QLoRA adapter tuning & DPO alignment",
  nlp: "Role: Practitioner · Transformer attention & sequence parsing",
};

export const skillGroups = [
  {
    title: "LLMs & retrieval",
    items: ["LangChain", "Chroma", "Groq", "PEFT / LoRA", "Prompt design"],
  },
  {
    title: "Speech",
    items: ["Whisper", "Wav2Vec2", "CAMeLBERT", "Librosa", "Qwen"],
  },
  {
    title: "Learning & data",
    items: ["PyTorch", "Transformers", "scikit-learn", "NumPy", "Jupyter"],
  },
  {
    title: "Systems",
    items: ["Python", "FastAPI", "Docker", "Linux", "Git"],
  },
];

export const milestones = [
  {
    year: "2022–2026",
    title: "B.Sc. Computers & AI",
    detail: "Fayoum University, Faculty of Computers and Artificial Intelligence.",
  },
  {
    year: "Foundations",
    title: "ML & Deep Learning",
    detail: "Stanford / DeepLearning.AI tracks — from linear models through CNNs and sequence models.",
  },
  {
    year: "Language",
    title: "NLP Specialization",
    detail: "Classification, probabilistic models, sequence models, attention.",
  },
  {
    year: "Applied",
    title: "IBM Generative AI",
    detail: "RAG, LangChain, adapters, LoRA, and alignment-style fine-tuning labs.",
  },
];

export const principles = [
  {
    title: "Grounded answers",
    detail: "If the document does not contain it, the system should say so.",
  },
  {
    title: "Hardware first",
    detail: "Chunk audio and models so long sessions fit the GPUs you actually have.",
  },
  {
    title: "Show the code",
    detail: "Demos ship next to the repository, not as slides alone.",
  },
];
