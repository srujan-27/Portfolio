// src/data/projects.js
// No backend. Edit and push.

export const projects = [
  {
    slug: 'llm-security-analyzer',
    title: 'LLM Security Analyzer',
    tagline: 'Comparing GPT-4o, Gemini, and DeepSeek on security abuse case generation.',
    category: 'LLM / Security',
    year: 2025,
    status: 'research',
    featured: true,

    links: {
      live: null,
      code: 'https://github.com/srujan-27/llm-security-analyzer',
      video: null,
    },

    summary:
      'This was my Master\u2019s thesis. Security usually gets handled late in the SDLC, and by then fixing it is expensive. I wanted to see if an LLM could read an SRS document during requirements gathering and generate security abuse cases that point at specific requirements. I built the tool, ran 9 use cases across healthcare, finance, and e-commerce through three models, and had two professors blind-score all 27 outputs.',

    architecture: [
      {
        step: 'Document ingestion',
        detail: 'pdf-parse for PDFs, mammoth.js for DOCX. You can also paste the SRS text directly.',
      },
      {
        step: 'Context extraction',
        detail: 'SRS documents run 150 to 200 pages, which blows past a 64K context window. So I score each line by security keyword density (HIPAA, PCI-DSS, authentication, encryption, audit, access control) and keep the top 100 lines.',
      },
      {
        step: 'Domain detection',
        detail: 'The model classifies the document as healthcare, finance, or e-commerce. All three models got this right every time.',
      },
      {
        step: 'Completeness check',
        detail: 'Incomplete use cases get rewritten before analysis, adding missing actors, preconditions, and alternative flows.',
      },
      {
        step: 'Abuse case generation',
        detail: 'One prompt for all three models so the comparison stays fair. Returns 3 to 5 abuse cases under STRIDE, each citing an SRS section.',
      },
      {
        step: 'Response handling',
        detail: 'Structured JSON out, with retry logic and Bottleneck rate limiting. When Claude ran out of credits mid-testing, the fallback caught it.',
      },
    ],

    // Real numbers from the paper. Two professors, blind, 27 outputs.
    metrics: {
      caption: 'Weighted score out of 100. Blind evaluation, 9 use cases, 27 outputs.',
      columns: ['Model', 'Context', 'Overall', 'Healthcare', 'Finance', 'E-commerce'],
      rows: [
        ['DeepSeek', '64K', '83.3', '80.0', '90.7', '79.2'],
        ['Gemini 2.5 Flash', '900K', '81.6', '66.2', '93.3', '85.3'],
        ['GPT-4o', '120K', '71.1', '61.3', '77.3', '74.5'],
      ],
      highlightRow: 0,
    },

    criteria: {
      caption: 'Per-criterion averages out of 5.',
      columns: ['Criterion', 'Weight', 'DeepSeek', 'Gemini', 'GPT-4o'],
      rows: [
        ['SRS reference quality', '25%', '4.28', '4.22', '3.89'],
        ['Completeness', '20%', '3.78', '3.83', '3.28'],
        ['Domain relevance', '20%', '4.44', '4.11', '3.22'],
        ['Actionability', '20%', '4.00', '4.06', '3.78'],
        ['Overall quality', '15%', '4.33', '4.17', '3.50'],
      ],
    },

    techStack: {
      Models: ['GPT-4o', 'Gemini 2.5 Flash', 'DeepSeek'],
      Frontend: ['React 19', 'TypeScript', 'Vite', 'Tailwind', 'Zustand'],
      Backend: ['Node.js', 'Express 5', 'TypeScript'],
      Parsing: ['pdf-parse', 'mammoth.js', 'Zod', 'Bottleneck'],
    },

    features: [
      'Reads the whole SRS instead of looking at use cases in isolation',
      'Detects domain and pulls in the right compliance context (HIPAA, PCI-DSS, SOX)',
      'Abuse cases classified under STRIDE, each citing a specific requirement ID',
      'Rewrites incomplete use cases before analyzing them',
      'Same prompt across all three providers so outputs are comparable',
      'Sample SRS documents for all three domains in docs/',
    ],

    tradeoffs: [
      {
        title: 'Keyword extraction instead of semantic retrieval',
        detail:
          'I scored lines by keyword density rather than embedding the document and retrieving by similarity. Keyword scoring is cheap and needs no vector store, but it misses semantic relationships. A requirement that describes an access control rule without using any of my keywords gets dropped. Comparing the two approaches is the main thing I would do next.',
      },
      {
        title: 'Why the small model won',
        detail:
          'DeepSeek at 64K beat Gemini at 900K. Gemini got the entire document, including administrative sections with nothing to do with security, and that noise diluted its focus. DeepSeek got roughly 48K tokens of filtered security content. In healthcare, the most regulation-heavy domain, the gap was widest: 80.0 against 66.2.',
      },
      {
        title: 'GPT-4o failed in a specific way',
        detail:
          'It came last in all three domains and scored 3.22/5 on domain relevance against DeepSeek\u2019s 4.44. On one healthcare use case it scored 2.0/5, the lowest in the study, and a professor wrote that it produced a generic use case that missed sensitive info exposure. It defaults to generic STRIDE instead of reaching for HIPAA specifics.',
      },
      {
        title: 'What the evaluation cannot tell you',
        detail:
          'Two evaluators is not enough to compute inter-rater reliability. 9 use cases across 3 domains is a small sample. The results are tied to these model versions and will drift as the models change. I would want 5 to 10 evaluators and a wider domain set before treating any of this as settled.',
      },
    ],

    takeaway:
      'The result I did not expect: context relevance beat context size. A 64K open-source model scored higher than a 900K proprietary one, which means investing in extraction is worth more than waiting for bigger context windows.',
  },

  {
    slug: 'rag-chat',
    title: 'Chat with your PDFs',
    tagline: 'A RAG app that answers from your documents and cites the page.',
    category: 'LLM / RAG',
    year: 2025,
    status: 'live',
    featured: false,

    links: {
      live: 'https://srujanragchat.streamlit.app',
      code: 'https://github.com/srujan-27/rag-chat',
      video: null,
    },

    summary:
      'I built this to work through a RAG pipeline myself instead of reading about one. You upload PDFs, ask a question, and get an answer that cites the file and page it came from, so you can check it.',

    architecture: [
      {
        step: 'PDF ingestion',
        detail: 'PyPDF pulls text page by page. Page numbers get carried through so citations point somewhere real.',
      },
      {
        step: 'Chunking',
        detail: 'RecursiveCharacterTextSplitter at 1000 characters with 200 overlap. The overlap is there because without it a chunk boundary cuts a sentence in half and retrieval quality drops.',
      },
      {
        step: 'Embedding',
        detail: 'text-embedding-ada-002, 1536 dimensions per chunk.',
      },
      {
        step: 'Storage',
        detail: 'ChromaDB, in memory, one collection per session so uploads do not leak between users.',
      },
      {
        step: 'Retrieval',
        detail: 'The question goes through the same embedding model, then cosine similarity returns the top 4 chunks.',
      },
      {
        step: 'Generation',
        detail: 'Those chunks plus the question go into a prompt template, and GPT-4o-mini writes the answer with the sources attached.',
      },
    ],

    metrics: null, // nothing measured yet

    techStack: {
      'LLM & Embeddings': ['GPT-4o-mini', 'text-embedding-ada-002'],
      'Vector Store': ['ChromaDB'],
      Orchestration: ['LangChain'],
      Interface: ['Streamlit'],
      Deployment: ['Streamlit Community Cloud'],
    },

    features: [
      'Upload several PDFs and search across all of them',
      'Answers cite the source file and page number',
      'Source passages expand so you can read what the answer came from',
      'Chat history holds for the session',
      'Separate Chroma collection per session',
    ],

    tradeoffs: [
      {
        title: 'In-memory vector store',
        detail:
          'Chroma runs in memory on Streamlit Cloud, so when the app sleeps the uploads are gone. Persisting would mean a hosted vector store and a bill. For something built to learn RAG, losing state on restart was an acceptable trade.',
      },
      {
        title: 'Fixed top-4 retrieval',
        detail:
          'Every query pulls 4 chunks regardless of the question. A question spanning several sections gets under-retrieved, and a narrow question wastes context on chunks it does not need. A re-ranker or a dynamic k would fix this.',
      },
      {
        title: 'No evaluation',
        detail:
          'I have not run RAGAS or anything else against this, so I cannot tell you its retrieval precision. That is the honest gap and the next thing I would add.',
      },
    ],

    takeaway:
      'Chunk size and overlap mattered more than I expected. Most of the difference in answer quality came from those two numbers, not from the model doing the generating.',
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const featuredProjects = () => projects.filter((p) => p.featured);
