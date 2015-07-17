Array.prototype.sum = function() {
    for (var i = 0, L = this.length, sum = 0; i < L; sum += this[i++]);
    return sum;
};

(function() {
    var messages = [
            "Hi, I'm",
            "Clarke Benedict Tapay Plumo",
            "and this is a",
            "work in progress",
            ".",
            "In the meantime, please feel free to keep in touch with me via:",
            "Email address:",
            "clarke.plumo@gmail.com",
            "LinkedIn:",
            "https://www.linkedin.com/profile/view?id=381188799",
            "Twitter:",
            "http://twitter.com/arkeidolon",
            "Github:",
            "http://github.com/arkeidolon",
            "Quora:",
            "http://quora.com/Clarke-Benedict-Plumo",
        ],
        writeCommand = ":w",
        currentMessage = "",
        contentNode = document.getElementById('content'),
        command = "",
        I = 0,
        startOfWord = true,
        wordNode = null,
        messageLength = messages.map(function(message) {
            return message.length;
        }).sum(),
        getMessageDetails = function(messages, I) {
            var messagesLength = messages.length;
            for(var i = 0; i < messagesLength && messages[i].length <= I; i++) {
                I -= messages[i].length;
            }

            if(I == 0 && wordNode) {
                wordNode.setAttribute('class', 'complete');
                startOfWord = true;
            }

            message = messages[i];
            spanIndex = i;

            return [message, I, spanIndex];
        },
        contentWriter = function() {
            var i;

            messageDetails = getMessageDetails(messages, I);

            var message = messageDetails[0],
                i = messageDetails[1],
                spanIndex = messageDetails[2];

            I++;

            messageNode = contentNode.getElementsByClassName('message')[spanIndex];

            if(startOfWord) {
                startOfWord = false;

                wordNode = document.createElement('span');

                messageNode.appendChild(wordNode);
            }

            else if(message[i] == ' ' || message[i] == '.') {
                wordNode.setAttribute('class', 'complete');
                startOfWord = true;
            }

            wordNode.textContent += message[i];

            if(I == messageLength) {
                I = 0;
                clearInterval(contentWriterInterval);
                commandWriterInterval = setInterval(commandWriter, 200);
                messageLength = writeCommand.length;
            }
        },
        commandWriter = function() {
            command += writeCommand[I++];
            document.getElementsByClassName("ex-cmd")[0].textContent = command;
            if(I == messageLength) {
                clearInterval(commandWriterInterval);
            }
        },
        contentWriterInterval = setInterval(contentWriter, 50),
        commandWriterInterval;
})();
