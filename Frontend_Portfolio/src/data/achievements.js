// src/data/achievements.js
// Everything here should be verifiable. No filler entries.

export const achievements = [
  {
    id: 'thesis',
    category: 'Research',
    title: 'Context-Aware Security Requirements Analysis Using Large Language Models',
    context: "Master's thesis, Quinnipiac University",
    date: '2025',
    featured: true,
    detail:
      'I compared GPT-4o, Gemini 2.5 Flash, and DeepSeek on generating security abuse cases from SRS documents. Nine use cases across healthcare, finance, and e-commerce, 27 outputs, scored blind by two professors on five weighted criteria. DeepSeek came out on top at 83.3/100 with a 64K context window, ahead of Gemini at 81.6 with 900K. The reason is a keyword-based extraction step that filters the document down to security-relevant lines before the model sees it.',
    tags: ['LLM Evaluation', 'STRIDE', 'HIPAA', 'PCI-DSS'],
    link: '/project/llm-security-analyzer',
    linkText: 'See the tool and the full results',
    internal: true,
  },

  {
    id: 'hackathon',
    category: 'Award',
    title: 'Winner, Ransomware Response Hackathon',
    context: 'Quinnipiac University and Hartford HealthCare',
    date: 'March 2025',
    featured: false,
    detail:
      'I played the CISO on the winning team. The scenario was a live ransomware incident, and the work was triaging what to shut down, writing the response plan, and defending those calls to industry judges.',
    tags: ['Incident Response'],
    image: 'hackathon',
    link: null,
  },

  {
    id: 'ms-quinnipiac',
    category: 'Education',
    title: 'M.S. Computer Science',
    context: 'Quinnipiac University, Hamden, CT',
    date: 'December 2025',
    featured: false,
    detail: 'Graduated with a 3.77 GPA. Thesis written up in IEEE format.',
    tags: [],
    link: null,
  },

  {
    id: 'btech-lpu',
    category: 'Education',
    title: 'B.Tech Computer Science and Engineering',
    context: 'Lovely Professional University, Punjab, India',
    date: null,
    featured: false,
    detail: null,
    tags: [],
    link: null,
  },

  {
    id: 'gcp-mle',
    category: 'Certification',
    title: 'Professional Machine Learning Engineer',
    context: 'Google Cloud',
    date: null,
    featured: false,
    detail: null,
    tags: ['GCP', 'Vertex AI'],
    link: null, // TODO: credential URL
  },

  {
    id: 'aws-mla',
    category: 'Certification',
    title: 'Certified Machine Learning Engineer Associate',
    context: 'Amazon Web Services, MLA-C01',
    date: null,
    featured: false,
    detail: null,
    tags: ['AWS', 'SageMaker'],
    link: null, 
  },

  {
    id: 'databricks-mlp',
    category: 'Certification',
    title: 'Certified Machine Learning Professional',
    context: 'Databricks',
    date: null,
    featured: false,
    detail: null,
    tags: ['Databricks', 'MLflow'],
    link: null, 
  },

  {
    id: 'ibm-genai',
    category: 'Certification',
    title: 'Generative AI Engineering Professional Certificate',
    context: 'IBM',
    date: null,
    featured: false,
    detail: null,
    tags: ['Generative AI', 'RAG'],
    link: null, 
  },

  {
    id: 'azure-ai-engineer',
    category: 'Certification',
    title: 'Microsoft Certified: Azure AI Engineer Associate (AI-102)',
    context: 'Microsoft',
    date: null,
    featured: false,
    detail: null,
    tags: ['Azure', 'AI'],
    link: null, 
  },

  {
    id: 'github-foundations',
    category: 'Certification',
    title: 'GitHub Foundations',
    context: 'GitHub',
    date: null,
    featured: false,
    detail: null,
    tags: ['Git', 'Actions'],
    link: null, 
  },

  {
    id: 'medium',
    category: 'Writing',
    title: 'Writing on Medium',
    context: 'Medium',
    date: 'Ongoing',
    featured: false,
    detail:
      'I write up things I have had to figure out, usually with a worked example. The XSS piece walks through how an attacker actually finds the vulnerability using dev tools rather than just defining it.',
    tags: [],
    link: 'https://medium.com/@srujanvemula275',
    linkText: 'Read the articles',
  },
];
