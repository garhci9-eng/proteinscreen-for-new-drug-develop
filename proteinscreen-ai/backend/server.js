/**
 * ProteinScreen AI — Backend Server
 * Express + Anthropic SDK proxy
 * Keeps API key server-side (safe for production)
 */

const express    = require('express');
const cors       = require('cors');
const Anthropic  = require('@anthropic-ai/sdk');
const path       = require('path');
require('dotenv').config();

const app    = express();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/* ── Middleware ── */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

/* ── System Prompt ── */
const SYSTEM_PROMPT = `You are ProteinScreen AI, an expert drug discovery and protein screening AI agent built for open science and public benefit.

Your expertise covers:
- Virtual screening of compound libraries against protein targets
- Molecular docking analysis and binding affinity prediction
- ADMET property evaluation (absorption, distribution, metabolism, excretion, toxicity)
- Structure-Activity Relationship (SAR) analysis and lead optimization
- Drug-likeness assessment (Lipinski, Veber, QED)
- Binding pocket analysis and key residue interactions
- Selectivity profiling and off-target risk assessment

Guidelines:
- Always respond in Korean (한국어) with scientific precision
- Provide specific, actionable insights with relevant numbers and thresholds
- When discussing compounds, include binding mechanisms, key residues, and interaction types
- Support researchers with accurate, helpful guidance for drug discovery
- This platform is for public benefit and open science`;

/* ── Routes ── */

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', model: 'claude-sonnet-4-20250514', version: '1.0.0' });
});

// Main chat endpoint
app.post('/api/chat', async (req, res) => {
  const { messages, target } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  try {
    const systemWithTarget = target
      ? `${SYSTEM_PROMPT}\n\n현재 선택된 타겟 단백질: ${target}`
      : SYSTEM_PROMPT;

    const response = await client.messages.create({
      model:      'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system:     systemWithTarget,
      messages:   messages,
    });

    const text = response.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');

    res.json({
      reply:        text,
      inputTokens:  response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    });

  } catch (err) {
    console.error('Anthropic API error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Streaming endpoint
app.post('/api/chat/stream', async (req, res) => {
  const { messages, target } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const systemWithTarget = target
    ? `${SYSTEM_PROMPT}\n\n현재 선택된 타겟 단백질: ${target}`
    : SYSTEM_PROMPT;

  try {
    const stream = await client.messages.create({
      model:      'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system:     systemWithTarget,
      messages:   messages,
      stream:     true,
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
      }
      if (event.type === 'message_stop') {
        res.write('data: [DONE]\n\n');
        res.end();
      }
    }
  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
});

// Compound property mock endpoint (extend with real cheminformatics libs)
app.post('/api/compound/properties', async (req, res) => {
  const { smiles, compoundId } = req.body;

  // In production: integrate RDKit.js, ChEMBL API, or SwissADME
  res.json({
    compoundId,
    smiles,
    lipinski: {
      mw:        393.4,
      logP:      2.8,
      hDonors:   2,
      hAcceptors: 7,
      rotBonds:  8,
      compliant: true,
    },
    admet: {
      solubility:   74,
      permeability: 68,
      metabolicStability: 82,
      hergSafety:   88,
      bbbPermeability: 55,
      oralBioavailability: 79,
    },
    docking: {
      score:     -9.2,
      rmsd:       1.3,
      keyResidues: ['Lys745', 'Thr790', 'Cys797', 'Gly719'],
    }
  });
});

/* ── Start ── */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🧬 ProteinScreen AI running on http://localhost:${PORT}`);
  console.log(`   Model : claude-sonnet-4-20250514`);
  console.log(`   Env   : ${process.env.NODE_ENV || 'development'}\n`);
});
