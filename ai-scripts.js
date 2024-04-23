document.getElementById('send-button').addEventListener('click', function() {
    // Get user input message
    const userInput = document.getElementById('user-input').value;

    // Clear input field
    document.getElementById('user-input').value = '';

    // Log user input to check if it's retrieved correctly
    console.log('User Input:', userInput);

    // API integration code
    const options = {
        method: "POST",
        url: "https://api.edenai.run/v2/text/chat",
        headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMGZkNzIxMTQtNTUyZS00MDExLWJjZDgtOTgxYTVmYzQ1OTExIiwidHlwZSI6ImFwaV90b2tlbiJ9.1Pa7p-NGRCXO-CDXSC9lagy2EDRtE3sNIFOiwejrb_0",
        },
        data: {
            providers: "openai",
            text: userInput,
            chatbot_global_action: "Act as an professional experienced physical trainer",
            previous_history: [],
            temperature: 0.0,
            max_tokens: 1000,
            fallback_providers: "",
        },
    };

    // Log options to check if they are constructed correctly
    console.log('API Request Options:', options);

    axios
        .post(options.url, options.data, { headers: options.headers })
        .then((response) => {
            // Log the response data to check if it's what you expect
            console.log('API Response Data:', response.data);

            // Display the generated workout plan
            displayAIResponse(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
});

function displayAIResponse(response) {
    const chatContainer = document.getElementById('chat-container');

    // Display AI response in chat-like format
    const message = document.createElement('div');
    message.classList.add('message');

    // Check if the response contains data in the openai field
    if (response && response.openai && response.openai.generated_text) {
        // Append the assistant's message to the message element
        const assistantMessage = document.createElement('p');
        assistantMessage.textContent = response.openai.generated_text;
  
        message.appendChild(assistantMessage);
    } else {
        // If no valid response is found, display a default message
        const defaultMessage = document.createElement('p');
        defaultMessage.textContent = "Sorry, I couldn't generate a response at the moment. Please try again later.";
        message.appendChild(defaultMessage);
    }

    // Append the message element to the chat container
    chatContainer.appendChild(message);
}

