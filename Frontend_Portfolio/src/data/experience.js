// src/data/experience.js
// Keep in sync with the resume.

export const experience = [
  {
    slug: 'mt-bank',
    company: 'M&T Bank',
    role: 'AI/ML Engineer',
    location: 'Bridgeport, CT',
    start: 'Mar 2025',
    end: 'Present',
    current: true,

    summary:
      'I own the multi-agent RAG platform here. Most of the work is retrieval quality, and getting agents through Model Risk Management without watering down what they can do.',

    highlights: [
      'Built the multi-agent RAG platform on LangGraph and AWS Bedrock AgentCore: planner, retriever, executor, and validator agents, MCP tool-calling contracts, and hybrid BM25 plus dense retrieval. Retrieval precision went from 72% to 91% across 400+ internal users, with sub-second latency.',
      'Worked with Model Risk Management and Compliance to define how agentic AI gets shipped here: MCP server contracts, Bedrock Guardrails, OAuth2/JWT least-privilege access, and human approval before any high-risk action. Other internal LLM teams build against it now.',
      'Put RAGAS and TruLens evaluation gates into the Jenkins pipeline with tool-call trace debugging, so a retrieval or agent change has to pass regression before it ships. Guardrail failures in production dropped 40%.',
      'Runs on AWS EKS with Docker, Terraform, and ArgoCD, agents on the Bedrock AgentCore serverless runtime, against a 99.9% availability SLA.',
      'Trained fraud and credit risk models on 15M+ transactions with XGBoost and PyTorch, with SHAP attribution on every prediction. Detection accuracy went up 12%, and risk reviewers can trace any decision.',
      'Built the monitoring dashboard in React and TypeScript on OpenTelemetry traces and ELK logs. Agent metrics, tool-call traces, and eval scores in one place, so on-call stops guessing.',
    ],

    stack: [
      'LangGraph',
      'Bedrock AgentCore',
      'MCP',
      'RAGAS',
      'TruLens',
      'XGBoost',
      'PyTorch',
      'SHAP',
      'EKS',
      'Terraform',
      'ArgoCD',
      'OpenTelemetry',
    ],
  },

  {
    slug: 'charter',
    company: 'Charter Communications',
    role: 'Machine Learning Engineer',
    location: 'Stamford, CT',
    start: 'May 2024',
    end: 'Feb 2025',
    current: false,

    summary:
      'Support automation and churn modeling, plus the serving layer underneath. This is where I first worked on LLM evaluation seriously.',

    highlights: [
      'Built an agentic support assistant with LangChain, Pinecone-backed RAG, and intent classification that routes into ServiceNow. It deflects 28% of inbound tickets.',
      'Built churn and segmentation models on 8M+ subscriber records using XGBoost, TensorFlow, and uplift modeling, validated through A/B tests. Output feeds retention targeting.',
      'Wrote streaming pipelines on Kafka, Spark, and Prefect for network equipment telemetry at 95% reconciliation accuracy, with LSTM and Autoencoder anomaly models that catch failures 24 to 72 hours early.',
      'Kept 8+ production pipelines running behind an MLflow registry with drift monitoring and automatic retraining triggers.',
      'Built LLM-as-Judge evaluation harnesses with ground-truth sets and failure-mode analysis, used to gate fine-tuning rollouts.',
      'Served Llama, Mistral, and Qwen on vLLM and Triton with KV-cache tuning, holding sub-200ms p99 time-to-first-token at peak.',
    ],

    stack: [
      'LangChain',
      'Pinecone',
      'XGBoost',
      'TensorFlow',
      'Kafka',
      'Spark',
      'Prefect',
      'MLflow',
      'vLLM',
      'Triton',
    ],
  },

  {
    slug: 'm2p-fintech',
    company: 'M2P Fintech',
    role: 'Machine Learning Engineer',
    location: 'Chennai, India',
    start: 'Feb 2022',
    end: 'Dec 2023',
    current: false,

    summary:
      'Real-time fraud detection on payment infrastructure. Everything shipped here had to survive regulatory review, which is where I learned to care about explainability.',

    highlights: [
      'Built account takeover detection on 2M+ daily financial events, combining sliding-window behavioral features with supervised scoring. Served TensorRT and ONNX compiled models over gRPC at sub-50ms p99.',
      'Shipped XGBoost and LightGBM payment risk scoring into Java and C#/.NET microservices over gRPC. Annual fraud losses dropped 8%, with SHAP output on every decision for regulators.',
      'Automated KYC and AML document processing with Hugging Face Transformers and spaCy for entity extraction, emitting Pydantic-validated JSON with PII encryption. Cut manual processing time 45%.',
      'Packaged FastAPI prediction services in Docker on Kubernetes with an MLflow registry, drift monitoring, and automatic rollback, so releases could go out during regulatory review cycles without downtime.',
      'Built streaming ETL on Spark, Airflow, and Hadoop feeding fraud-screening feature stores, with point-in-time correct reconciliation on every batch.',
      'Standardized REST and gRPC contracts across payment services, replacing point-to-point integrations. Integration setup time dropped 40%.',
    ],

    stack: [
      'TensorRT',
      'ONNX',
      'gRPC',
      'XGBoost',
      'LightGBM',
      'Hugging Face',
      'spaCy',
      'FastAPI',
      'Kubernetes',
      'Airflow',
    ],
  },
];

export const currentRole = () => experience.find((role) => role.current);
