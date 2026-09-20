"""
Skill Normalizer Module for VisionPath.
Provides robust, maintainable, and extensible skill normalization.
"""

import re
from typing import Dict, Optional, Set

# Base dictionary of skill aliases mapping to standardized canonical names
CANONICAL_SKILL_MAP: Dict[str, str] = {
    # Programming Languages
    "js": "JavaScript",
    "javascript": "JavaScript",
    "ts": "TypeScript",
    "typescript": "TypeScript",
    "py": "Python",
    "python": "Python",
    "python3": "Python",
    "java": "Java",
    "java8": "Java",
    "java11": "Java",
    "java17": "Java",
    "java21": "Java",
    "cpp": "C++",
    "c++": "C++",
    "c#": "C#",
    "csharp": "C#",
    "golang": "Go",
    "go": "Go",
    "ruby": "Ruby",
    "php": "PHP",
    "rust": "Rust",
    "r": "R",
    "kotlin": "Kotlin",
    "swift": "Swift",
    "dart": "Dart",
    "scala": "Scala",
    "html": "HTML5",
    "html5": "HTML5",
    "css": "CSS3",
    "css3": "CSS3",
    "sass": "Sass",
    "scss": "Sass",
    "sql": "SQL",

    # Frontend Frameworks & Libraries
    "react": "React",
    "reactjs": "React",
    "react.js": "React",
    "react native": "React Native",
    "reactnative": "React Native",
    "vue": "Vue.js",
    "vuejs": "Vue.js",
    "vue.js": "Vue.js",
    "angular": "Angular",
    "angularjs": "Angular",
    "angular.js": "Angular",
    "next": "Next.js",
    "nextjs": "Next.js",
    "next.js": "Next.js",
    "svelte": "Svelte",
    "redux": "Redux",
    "redux toolkit": "Redux Toolkit",
    "tailwind": "Tailwind CSS",
    "tailwindcss": "Tailwind CSS",
    "bootstrap": "Bootstrap",

    # Backend Frameworks & Systems
    "spring": "Spring Boot",
    "spring boot": "Spring Boot",
    "springboot": "Spring Boot",
    "spring framework": "Spring Framework",
    "spring security": "Spring Security",
    "spring cloud": "Spring Cloud",
    "express": "Express.js",
    "expressjs": "Express.js",
    "express.js": "Express.js",
    "node": "Node.js",
    "nodejs": "Node.js",
    "node.js": "Node.js",
    "nest": "NestJS",
    "nestjs": "NestJS",
    "django": "Django",
    "flask": "Flask",
    "fastapi": "FastAPI",
    "fast api": "FastAPI",
    ".net": ".NET",
    "dotnet": ".NET",
    ".net core": ".NET Core",
    "asp.net": "ASP.NET",
    "laravel": "Laravel",
    "microservices": "Microservices",
    "rest api": "REST APIs",
    "rest apis": "REST APIs",
    "restful": "REST APIs",
    "restful apis": "REST APIs",
    "graphql": "GraphQL",
    "grpc": "gRPC",

    # Databases & Storage
    "postgres": "PostgreSQL",
    "postgresql": "PostgreSQL",
    "psql": "PostgreSQL",
    "mysql": "MySQL",
    "mongo": "MongoDB",
    "mongodb": "MongoDB",
    "redis": "Redis",
    "cassandra": "Cassandra",
    "oracle": "Oracle DB",
    "oracle db": "Oracle DB",
    "sqlite": "SQLite",
    "sqlite3": "SQLite",
    "dynamodb": "DynamoDB",
    "elasticsearch": "Elasticsearch",

    # AI / Machine Learning / Data Science
    "ai": "Artificial Intelligence",
    "artificial intelligence": "Artificial Intelligence",
    "ml": "Machine Learning",
    "machine learning": "Machine Learning",
    "dl": "Deep Learning",
    "deep learning": "Deep Learning",
    "nlp": "Natural Language Processing",
    "natural language processing": "Natural Language Processing",
    "cv": "Computer Vision",
    "computer vision": "Computer Vision",
    "genai": "Generative AI",
    "gen ai": "Generative AI",
    "generative ai": "Generative AI",
    "llm": "Large Language Models",
    "llms": "Large Language Models",
    "large language models": "Large Language Models",
    "pandas": "Pandas",
    "numpy": "NumPy",
    "scikit-learn": "Scikit-Learn",
    "scikitlearn": "Scikit-Learn",
    "sklearn": "Scikit-Learn",
    "tensorflow": "TensorFlow",
    "tf": "TensorFlow",
    "pytorch": "PyTorch",
    "torch": "PyTorch",
    "keras": "Keras",
    "matplotlib": "Matplotlib",
    "seaborn": "Seaborn",
    "opencv": "OpenCV",
    "spacy": "spaCy",
    "nltk": "NLTK",
    "langchain": "LangChain",
    "huggingface": "Hugging Face",
    "hugging face": "Hugging Face",
    "rag": "RAG",
    "data science": "Data Science",
    "data analytics": "Data Analytics",
    "data analysis": "Data Analytics",
    "power bi": "Power BI",
    "powerbi": "Power BI",
    "tableau": "Tableau",
    "statistics": "Statistics",

    # Cloud & DevOps & Tools
    "aws": "AWS",
    "amazon web services": "AWS",
    "aws ec2": "AWS",
    "aws s3": "AWS",
    "aws lambda": "AWS Lambda",
    "azure": "Microsoft Azure",
    "ms azure": "Microsoft Azure",
    "microsoft azure": "Microsoft Azure",
    "gcp": "Google Cloud Platform",
    "google cloud": "Google Cloud Platform",
    "google cloud platform": "Google Cloud Platform",
    "docker": "Docker",
    "k8s": "Kubernetes",
    "kubernetes": "Kubernetes",
    "ci/cd": "CI/CD",
    "cicd": "CI/CD",
    "jenkins": "Jenkins",
    "github actions": "GitHub Actions",
    "git": "Git",
    "github": "Git",
    "gitlab": "GitLab",
    "terraform": "Terraform",
    "linux": "Linux",
    "unix": "Unix",
    "bash": "Bash/Shell",
    "shell": "Bash/Shell",
    "kafka": "Apache Kafka",
    "apache kafka": "Apache Kafka",
    "rabbitmq": "RabbitMQ",

    # Core CS & Methodologies
    "dsa": "Data Structures & Algorithms",
    "data structures": "Data Structures & Algorithms",
    "algorithms": "Data Structures & Algorithms",
    "data structures and algorithms": "Data Structures & Algorithms",
    "oop": "Object-Oriented Programming",
    "oops": "Object-Oriented Programming",
    "object oriented programming": "Object-Oriented Programming",
    "system design": "System Design",
    "agile": "Agile Methodology",
    "scrum": "Scrum",
    "unit testing": "Unit Testing",
    "junit": "JUnit",
    "pytest": "PyTest",
    "cybersecurity": "Cybersecurity",
    "ethical hacking": "Ethical Hacking",
    "networking": "Computer Networks",
    "computer networks": "Computer Networks",
    "figma": "Figma",
    "ui/ux": "UI/UX Design",
    "ui ux": "UI/UX Design",
    "ui/ux design": "UI/UX Design",
    "user research": "User Research",
    "prototyping": "Prototyping",
}


class SkillNormalizer:
    """Normalizes raw skill strings to their canonical, standardized representation."""

    def __init__(self, custom_mapping: Optional[Dict[str, str]] = None):
        self.mapping = CANONICAL_SKILL_MAP.copy()
        if custom_mapping:
            for k, v in custom_mapping.items():
                self.mapping[k.strip().lower()] = v.strip()

    def normalize(self, skill: str) -> str:
        """
        Normalize an individual skill string.
        
        Examples:
            'js' -> 'JavaScript'
            'react.js' -> 'React'
            'PostgreSQL ' -> 'PostgreSQL'
        """
        if not skill:
            return ""

        clean = skill.strip()
        lower_key = clean.lower()

        # 1. Direct dictionary match
        if lower_key in self.mapping:
            return self.mapping[lower_key]

        # 2. Stripping punctuation/version variations (e.g. "React (v18)" -> "React")
        sanitized = re.sub(r"\s*\(.*?\)", "", lower_key).strip()
        sanitized = re.sub(r"[\s\-_]+", " ", sanitized)

        if sanitized in self.mapping:
            return self.mapping[sanitized]

        # 3. Capitalization fallback
        words = clean.split()
        title_cased = " ".join(w.capitalize() if not w.isupper() else w for w in words)
        return title_cased

    def normalize_list(self, skills: list) -> list:
        """Normalize a list of skills and remove duplicate canonical entries preserving order."""
        seen: Set[str] = set()
        result = []
        for s in skills:
            norm = self.normalize(s)
            if norm and norm.lower() not in seen:
                seen.add(norm.lower())
                result.append(norm)
        return result


# Global default instance
normalizer = SkillNormalizer()
