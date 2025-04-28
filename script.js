// Your API Key for authenticating requests. Get it from: https://stockimg.ai/api-dashboard

const apiKey = "YOUR_API_KEY"; // <-- Replace with your actual API key, otherwise the code won't work

// Function to show a small toast notification with a message
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

// Add an event listener to the 'Generate' button
document.getElementById('generateButton').addEventListener('click', async () => {

    // Get user inputs: prompt text, selected size and selected model
    const prompt = document.getElementById('promptInput').value;
    const selectedSize = document.getElementById('imageOptions').value;
    const selectedModel = document.getElementById('modelOptions').value;

    // Validate that the user entered a prompt
    if (!prompt) {
        showToast('Please enter a prompt.');
        return;
    }

    // Select UI elements we need to manipulate
    const button = document.getElementById('generateButton');
    const spinner = document.getElementById('spinner');
    const imageElement = document.getElementById('image');
    const promptInput = document.getElementById('promptInput');
    const imageOptions = document.getElementById('imageOptions');
    const modelOptions = document.getElementById('modelOptions');

    // Disable inputs and show spinner while generating image
    button.disabled = true;
    promptInput.disabled = true;
    imageOptions.disabled = true;
    modelOptions.disabled = true;
    spinner.style.display = 'block';
    imageElement.style.display = 'none'; // Hide previous image while loading new one

    // Default image dimensions (square)
    let width = 1024;
    let height = 1024;

    // Adjust image dimensions based on selected aspect ratio
    if (selectedSize === 'vertical') {
        width = 736;
        height = 1280;
    } else if (selectedSize === 'horizontal') {
        width = 1280;
        height = 736;
    } else if (selectedSize === 'square') {
        width = 1024;
        height = 1024;
    }

    // Prepare the request body
    let bodyContent = {
        prompt: prompt,
        image_size: {
            width: width,
            height: height
        },
        safety_checker: true
    };
    
    // Add additional parameters for specific models. You can find the full list of models and their parameters in the API documentation.
    // For example, if the selected model is a stock image model, you can add specific parameters for it.
    // BE CAREFUL: Some models may not support certain parameters, so make sure to check the API documentation for each model.
    // For more information about models, visit: https://stockimg.ai/api-docs/get-started
    
    // tip: You can also set these parameters to be dynamic
    
    if (selectedModel.includes("/stock-image/")) {
        // Uncomment if you want to send colors
        // bodyContent.colors = ["#05f124", "#55357f"];
    }

    // same for the other models
    // Uncomment if you want to send parameters
    if (selectedModel.includes("/flux/")){
        // bodyContent.seed = 42; // Example seed value for reproducibility
        // bodyContent.guide_scale = 7; // Example guide scale value for image generation
        // bodyContent.num_inference_steps = 50; // Example number of inference steps
        // bodyContent.enable_safety_checker = false; // Disable safety checker for this model
    }


    try {
        // Make the POST request to the Stockimg API
        const response = await fetch(`https://api.stockimg.app${selectedModel}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}` // Attach the API Key
            },
            body: JSON.stringify(bodyContent) // Send the request body as JSON
        });

        const data = await response.json(); // Parse the JSON response

        // If the image URL exists, display it
        if (data.data && data.data.images && data.data.images[0].url) {
            const imageUrl = data.data.images[0].url;
            imageElement.src = imageUrl;
            imageElement.style.display = 'block';
            showToast('Image generated successfully!');
        } else {
            showToast('Failed to generate image.');
        }

    } catch (error) {
        // Catch any error that happens during the request
        console.error('Error:', error);
        showToast('An error occurred.');
    } finally {
        // Re-enable all inputs and hide the spinner
        button.disabled = false;
        promptInput.disabled = false;
        imageOptions.disabled = false;
        modelOptions.disabled = false;
        spinner.style.display = 'none';
    }
});
