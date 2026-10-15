# Lite AI

A responsive browser-based chat interface starter.

## Current status

The interface is committed at `lite-ai/index.html`. It is a front-end demo and does not yet generate real AI answers.

## Why the AI engine is not connected yet

Tripo's API is for 3D asset generation, not general-purpose chat. To enable conversational answers, configure a chat-model provider and a server-side endpoint. Keep API keys in the backend provider's secret environment variables—never in HTML or browser JavaScript.

## Publish

If GitHub Pages is enabled for the repository and publishes from the `main` branch root, this folder should be available at:

`https://liteempire.github.io/my-website./lite-ai/`

If that URL does not load, check the repository's **Settings → Pages** and wait for the deployment to finish.

## Next step

Add a secure backend (for example, a serverless function on a backend hosting service), configure a chat provider API key as a secret, and have the page call that backend. Tripo can be added later as a separate 3D-generation feature.
