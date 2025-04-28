<p align="center">
  <img src="https://media.stockimg.ai/static/solid/sai-logo-wb.png" alt="Stockimg.ai Logo" width="500">
</p>

# Stockimg.ai Demo API App

This is a minimal demo application that shows how to use the [Stockimg.ai API](https://stockimg.ai/api-docs) to generate images from text prompts.

## Features
- Select a text prompt, image size, and AI model.
- Send a POST request to Stockimg.ai API.
- Display the generated image in the browser.
- User feedback with toast notifications for success or error.

## Requirements
- Modern browser (Chrome, Edge, Firefox)
- A valid [Stockimg.ai API Key](https://stockimg.ai/api-dashboard)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/ygzsimsek/Stockimg-API-Demo/
   cd stockimg-api-demo
   ```

2. Open `index.html` in your browser.

3. Replace `YOUR_API_KEY` in `script.js` with your actual Stockimg.ai API Key:
   ```javascript
   const apiKey = "YOUR_API_KEY"; // Replace with your real API Key
   ```

4. Start generating images!

## How It Works

- Enter a prompt describing the image you want.

- Select an image size:
  - Horizontal (1280x736)
  - Vertical (736x1280)
  - Square (1024x1024)

- Select an AI model such as:
  - Flux (Pro, Dev, Schnell)
  - Stockimg
  - Cinematic
  - Knolling
  - Polaroid
  - Wallpaper
  - Art

- The app sends a POST request to Stockimg.ai API with your inputs.
- Displays the generated image on the page.

Example Request:

```bash
POST https://api.stockimg.app/v1/text-to-image/stock-image/stockimg
Headers:
  Content-Type: application/json
  Authorization: Bearer YOUR_API_KEY

Body:
{
  "prompt": "sunset over the mountains",
  "image_size": {
    "width": 1024,
    "height": 1024
  },
  "safety_checker": true
}
```

## Project Structure

```
index.html    // Main HTML page
style.css     // Basic styles (optional, not shared here)
script.js     // Core logic: sending API requests and UI handling
```

## Customization Tips
- You can easily add new models from Stockimg.ai.
- You can tweak the request body to adjust model-specific parameters (seed, colors, guide_scale, etc.)
- Check the [full API documentation](https://stockimg.ai/api-docs) for more options.

## License

Licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
