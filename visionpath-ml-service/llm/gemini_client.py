"""
Google Gemini LLM Client Module for VisionPath.
Handles secure API communication with Google Gemini API using server-side configuration.
"""

import os
import json
import logging
from typing import Any, Dict, Optional

logger = logging.getLogger("visionpath.llm.gemini")

# Try importing google-generativeai
try:
    import google.generativeai as genai
    GENAI_AVAILABLE = True
except ImportError:
    GENAI_AVAILABLE = False
    logger.warning("google-generativeai is not installed yet; running in fallback mode.")


class GeminiClient:
    """Wrapper for Google Gemini Generative AI API."""

    def __init__(self, api_key: Optional[str] = None, model_name: Optional[str] = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY", "").strip()
        # Supported models with fallback
        self.model_name = model_name or os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
        self._model = None
        self._initialized = False
        self._init_client()

    def _init_client(self):
        if not GENAI_AVAILABLE or not self.api_key:
            logger.warning("Gemini Client: GEMINI_API_KEY not set or library missing. Will use intelligent fallback responses.")
            return

        try:
            genai.configure(api_key=self.api_key)
            self._model = genai.GenerativeModel(self.model_name)
            self._initialized = True
            logger.info(f"Gemini Client successfully initialized with model: {self.model_name}")
        except Exception as e:
            logger.error(f"Failed to initialize Gemini Model: {e}")
            self._initialized = False

    def is_available(self) -> bool:
        """Check if live Gemini API is configured and ready."""
        return self._initialized and self._model is not None

    def generate_text(self, prompt: str, system_instruction: Optional[str] = None) -> str:
        """Generate text from Gemini with robust error handling and fallback."""
        if not prompt or not prompt.strip():
            return ""

        if not self.is_available():
            raise RuntimeError("Gemini API key is not configured or client is unavailable.")

        try:
            # If system instruction provided, configure generation
            if system_instruction and hasattr(genai, "GenerativeModel"):
                model = genai.GenerativeModel(
                    self.model_name,
                    system_instruction=system_instruction
                )
                response = model.generate_content(prompt)
            else:
                response = self._model.generate_content(prompt)

            if response and response.text:
                return response.text.strip()
            return ""
        except Exception as e:
            logger.error(f"Gemini API generation error: {e}")
            raise RuntimeError(f"Gemini API error: {str(e)}")

    def generate_json(self, prompt: str, system_instruction: Optional[str] = None) -> Dict[str, Any]:
        """Generate structured JSON response from Gemini with markdown code fence stripping."""
        raw_text = self.generate_text(prompt, system_instruction)
        if not raw_text:
            return {}

        # Strip markdown ```json ... ``` wrappers if present
        cleaned = raw_text.strip()
        if cleaned.startswith("```"):
            lines = cleaned.splitlines()
            if lines[0].startswith("```"):
                lines = lines[1:]
            if lines and lines[-1].startswith("```"):
                lines = lines[:-1]
            cleaned = "\n".join(lines).strip()

        try:
            return json.loads(cleaned)
        except json.JSONDecodeError as e:
            logger.warning(f"Failed to parse Gemini JSON response: {e}. Raw: {raw_text[:200]}")
            # Try finding first { or [ and last } or ]
            start_brace = min(cleaned.find("{") if "{" in cleaned else 999999, cleaned.find("[") if "[" in cleaned else 999999)
            end_brace = max(cleaned.rfind("}"), cleaned.rfind("]"))
            if start_brace < end_brace and start_brace != 999999:
                sub = cleaned[start_brace:end_brace + 1]
                return json.loads(sub)
            raise ValueError(f"Invalid JSON returned by Gemini: {str(e)}")


# Global client instance
gemini_client = GeminiClient()
