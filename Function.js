        // Get references to HTML elements
        const chatLog = document.getElementById('chat-log');
        const userInput = document.getElementById('user-input');
        const sendButton = document.getElementById('send-button');

        // Function to add a message to the chat log
        function addMessage(sender, message) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('mb-2'); // Add margin for spacing

            const senderSpan = document.createElement('span');
            senderSpan.classList.add('font-semibold', sender === 'You' ? 'text-blue-500' : 'text-green-500'); // Style sender name
            senderSpan.textContent = sender + ': ';

            const messageSpan = document.createElement('span');
            messageSpan.textContent = message;
            messageDiv.appendChild(senderSpan);
            messageDiv.appendChild(messageSpan);
            chatLog.appendChild(messageDiv);

            // Scroll to the bottom of the chat log to show the latest message
            chatLog.scrollTop = chatLog.scrollHeight;
        }

        // Function to handle user input and generate a response
        function handleInput() {
            const userMessage = userInput.value.trim();

            if (userMessage === '') return; // Don't send empty messages

            addMessage('You', userMessage);
            userInput.value = ''; // Clear the input field

            // Simulate a response from the bot (replace with your actual logic)
            //  Replace this with actual data fetching.
            // let botResponse = getBotResponse(userMessage);
            // addMessage('StudyBot', botResponse);

            //  Fetch data instead of getBotResponse
             fetch('math_problems.json')  //  Make sure this path is correct
                .then(response => response.json())
                .then(data => {
                    //  In a real application, you'd filter the data based on the user's query.
                    //  For this example, we'll just send back the first problem.
                    if (data && data.length > 0) {
                        const firstProblem = data[0];  // Get the first problem
                        const botResponse = `Here's a math problem for you: ${firstProblem.Problem}  The solution is: ${firstProblem.Solution}`;
                        addMessage('StudyBot', botResponse);
                    } else {
                        addMessage('StudyBot', "I couldn't find any math problems right now.");
                    }
                })
                .catch(error => {
                    console.error("Error fetching math problems:", error);
                    addMessage('StudyBot', "Sorry, I'm having trouble accessing the math problems.");
                });
        }

        // Function to generate a bot response (replace with your logic)
        function getBotResponse(userMessage) {
            userMessage = userMessage.toLowerCase(); // Convert to lowercase for easier matching

            if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
                return "Hello there!";
            }
            else if (userMessage.includes('how are you')) {
                return "I'm doing well,What about you!";
            }
            else if (userMessage.includes('help')) {
                return "I can help you with study resources and answer questions.  Try asking me about a specific topic!";
            }
            else if (userMessage.includes('math problem')) {
                return "Okay, I will fetch you a math problem";
            }
            else if (userMessage.includes('nice')) {
                return "That sounds good!";
            }
            else {
                return "I'm sorry, I don't understand that yet.  Could you please rephrase your question?";
            }
        }

        // Event Listeners
        sendButton.addEventListener('click', handleInput);
        userInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                handleInput();
            }
        });