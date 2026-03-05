import { promises as fsp } from 'fs';

export async function extractTextFromImage(imagePath, options = {}) {
  const minimumBytes = options.minimumBytes ?? 1024;

  try {
    const stat = await fsp.stat(imagePath);
    if (stat.size < minimumBytes) {
      return {
        text: '',
        confidence: 0,
        engine: 'tesseract.js',
        skipped: true,
        reason: 'Image too small for OCR',
      };
    }
  } catch (error) {
    return {
      text: '',
      confidence: 0,
      engine: 'tesseract.js',
      error: `Failed to access image: ${error.message}`,
    };
  }

  try {
    const { createWorker } = await import('tesseract.js');
    const worker = await createWorker('eng');

    try {
      const result = await worker.recognize(imagePath);
      const rawConfidence = Number(result?.data?.confidence || 0);
      return {
        text: (result?.data?.text || '').trim(),
        confidence: Number((rawConfidence / 100).toFixed(2)),
        engine: 'tesseract.js',
      };
    } finally {
      await worker.terminate();
    }
  } catch (error) {
    return {
      text: '',
      confidence: 0,
      engine: 'tesseract.js',
      error: `OCR failed: ${error.message}`,
    };
  }
}
