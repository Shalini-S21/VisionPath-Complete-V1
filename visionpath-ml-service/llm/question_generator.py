"""
AI Question Generation and NLP Validation Orchestrator for VisionPath.
Uses Google Gemini for Generative Question Synthesis, followed immediately by
rigorous NLP validation and semantic duplicate elimination.
"""

from typing import Any, Dict, List, Optional
from llm.gemini_client import gemini_client
from nlp.question_validator import question_validator

CURATED_FALLBACK_BANK: Dict[str, List[Dict[str, Any]]] = {
    "java": [
        {
            "question": "Which principle in Object-Oriented Programming allows a subclass to provide a specific implementation of a method already defined in its parent class?",
            "options": ["Method Overriding", "Method Overloading", "Encapsulation", "Data Abstraction"],
            "correct_answer": "Method Overriding",
            "explanation": "Method overriding occurs when a child class provides its own specific implementation of a method defined in its superclass.",
            "difficulty": "Easy",
            "topic": "Java OOP"
        },
        {
            "question": "What is the primary difference between a JVM (Java Virtual Machine) and a JRE (Java Runtime Environment)?",
            "options": ["JVM is the runtime engine executing bytecode; JRE bundles JVM plus standard libraries", "JVM compiles source code; JRE executes binary", "JVM is platform independent; JRE is hardware specific", "There is no difference; they are identical"],
            "correct_answer": "JVM is the runtime engine executing bytecode; JRE bundles JVM plus standard libraries",
            "explanation": "JVM provides the execution environment for Java bytecode, whereas JRE includes the JVM plus runtime libraries.",
            "difficulty": "Medium",
            "topic": "Java Core"
        },
        {
            "question": "Which Java Collection class implements a dynamically resizable array with synchronized access?",
            "options": ["Vector", "ArrayList", "LinkedList", "HashSet"],
            "correct_answer": "Vector",
            "explanation": "Vector is a synchronized, resizable array implementation in java.util package.",
            "difficulty": "Medium",
            "topic": "Java Collections"
        },
        {
            "question": "In Java 21 and modern Spring applications, what is the primary benefit of Virtual Threads (Project Loom)?",
            "options": ["High-throughput lightweight concurrency without pinning OS threads", "Faster GPU processing", "Automatic database indexing", "Elimination of garbage collection"],
            "correct_answer": "High-throughput lightweight concurrency without pinning OS threads",
            "explanation": "Virtual threads are lightweight user-mode threads managed by the JVM rather than the operating system.",
            "difficulty": "Hard",
            "topic": "Java Concurrency"
        },
        {
            "question": "Which keyword is used in Java to declare that a variable's value cannot be modified after initialization?",
            "options": ["final", "static", "const", "immutable"],
            "correct_answer": "final",
            "explanation": "The 'final' keyword prevents modification of primitive variables or reassignment of reference handles.",
            "difficulty": "Easy",
            "topic": "Java Core"
        }
    ],
    "python": [
        {
            "question": "In Python, which built-in data type is immutable and ordered?",
            "options": ["Tuple", "List", "Dictionary", "Set"],
            "correct_answer": "Tuple",
            "explanation": "Tuples are immutable ordered sequences of elements in Python.",
            "difficulty": "Easy",
            "topic": "Python Fundamentals"
        },
        {
            "question": "What does a Python decorator fundamentally do?",
            "options": ["Modifies or enhances the behavior of a function or method without altering its source code", "Creates graphical UI buttons", "Compiles code to native C binary", "Deletes unused variables"],
            "correct_answer": "Modifies or enhances the behavior of a function or method without altering its source code",
            "explanation": "Decorators are higher-order functions that take a function as input and return a modified callable.",
            "difficulty": "Medium",
            "topic": "Python Advanced"
        },
        {
            "question": "Which Python library is primarily utilized for tensor computations and deep neural network model development with dynamic computation graphs?",
            "options": ["PyTorch", "Pandas", "Matplotlib", "BeautifulSoup"],
            "correct_answer": "PyTorch",
            "explanation": "PyTorch provides automatic differentiation and dynamic computation graphs for machine learning.",
            "difficulty": "Medium",
            "topic": "Machine Learning"
        },
        {
            "question": "How does Python handle memory management for objects that are no longer referenced?",
            "options": ["Reference counting combined with a generational cyclic garbage collector", "Manual pointer deallocation using free()", "Stack destruction only", "Operating system swap space"],
            "correct_answer": "Reference counting combined with a generational cyclic garbage collector",
            "explanation": "CPython uses reference counting as its primary mechanism, complemented by a generational cyclic GC.",
            "difficulty": "Hard",
            "topic": "Python Internals"
        },
        {
            "question": "Which statement correctly creates a list comprehension that filters even numbers from a range 0 to 9?",
            "options": ["[x for x in range(10) if x % 2 == 0]", "[x if x % 2 == 0 in range(10)]", "[for x in range(10): x % 2 == 0]", "[x.filter(even) for x in range(10)]"],
            "correct_answer": "[x for x in range(10) if x % 2 == 0]",
            "explanation": "The standard list comprehension syntax with an if-filter clause is [expression for item in iterable if condition].",
            "difficulty": "Easy",
            "topic": "Python Fundamentals"
        }
    ]
}


class QuestionGenerator:
    """Generates MCQs using Gemini with mandatory NLP validation and duplicate detection."""

    def __init__(self):
        self.client = gemini_client
        self.validator = question_validator

    def generate_questions(
        self,
        topic: str,
        subject: Optional[str] = None,
        difficulty: str = "Medium",
        count: int = 5,
        context: Optional[str] = None
    ) -> Dict[str, Any]:
        effective_topic = topic or subject or "General Technology & Aptitude"
        target_count = max(1, min(20, count))

        prompt = f"""
You are an expert academic curriculum designer.
Generate exactly {target_count} Multiple Choice Questions (MCQs) for the topic: "{effective_topic}".
Subject/Domain: "{subject or effective_topic}"
Difficulty Level: "{difficulty}"
Additional Context: "{context or 'Standard university & professional curriculum'}"

Return ONLY a valid JSON Array of objects matching this exact schema:
[
  {{
    "question": "Clear, precise question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct_answer": "Option A (must exactly match one item in options)",
    "explanation": "Brief step-by-step reasoning explaining why this answer is correct.",
    "difficulty": "{difficulty}",
    "topic": "{effective_topic}"
  }}
]

CRITICAL RULES:
1. Every question must have EXACTLY 4 distinct, non-empty options.
2. "correct_answer" MUST be an exact string match to one of the 4 options.
3. No duplicate questions or trivial variations.
4. Output raw JSON only. Do not include markdown code block quotes.
"""

        generated_raw = []
        source = "Google Gemini LLM"

        try:
            if self.client.is_available():
                parsed_json = self.client.generate_json(prompt)
                if isinstance(parsed_json, list):
                    generated_raw = parsed_json
                elif isinstance(parsed_json, dict) and "questions" in parsed_json:
                    generated_raw = parsed_json["questions"]
        except Exception:
            generated_raw = []

        if not generated_raw or len(generated_raw) < target_count:
            source = "VisionPath Curated NLP Question Bank"
            key = "python" if "python" in effective_topic.lower() else "java"
            bank_items = CURATED_FALLBACK_BANK.get(key, CURATED_FALLBACK_BANK["java"])
            generated_raw.extend(bank_items)

        validation_result = self.validator.validate_question_batch(
            questions=generated_raw,
            expected_count=target_count,
            topic=effective_topic
        )

        final_questions = validation_result["validated_questions"][:target_count]

        return {
            "topic": effective_topic,
            "difficulty": difficulty,
            "requested_count": target_count,
            "generated_count": len(final_questions),
            "questions": final_questions,
            "validation": {
                "is_valid": validation_result["is_valid"],
                "duplicates_filtered": validation_result["duplicates_removed"],
                "duplicate_details": validation_result["duplicate_details"]
            },
            "source": source
        }


# Global question generator instance
question_generator = QuestionGenerator()
