Array.prototype.sum = function() {
    for (var i = 0, L = this.length, sum = 0; i < L; sum += this[i++]);
    return sum;
};

(function() {
    var messages = [
            "Hi friends! I'm",
            "Clarke",
            "and this website is a",
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
            '...And for my favorite quote:',
            '"Whether you think you can, or you think you can\'t, you\'re right."',
            '- Henry Ford',
            '(Subject to change over time)',
            'Also, I am very, very sorry. Unfortunately you can\'t vim for realz here. But if you know how, please contribute to this',
            'repo',
            '! Thanks!',
        ],
        writeCommand = ":w",
        currentMessage = "",
        contentNode = document.getElementById('content'),
        exCmdNode = document.getElementsByClassName("ex-cmd")[0],
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
                messageNode.appendChild(cursor);
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

                cursor.setAttribute('class', 'cursor blink');
            }
        },
        commandWriter = function() {
            command += writeCommand[I++];
            exCmdNode.textContent = command;
            if(I == messageLength) {
                cursorBlinkInterval = setInterval(cursorBlink, 500);
                clearInterval(commandWriterInterval);
            }
        },
        cursor = document.getElementsByClassName('cursor')[0],
        cursorBlinked = false,
        cursorBlink = function (){
            cursorBlinked = !cursorBlinked;
            if(cursorBlinked) {
                cursor.setAttribute('class', 'cursor blink');
            } else {
                cursor.setAttribute('class', 'cursor');
            }
        },
        cursorBlinkInterval = setInterval(cursorBlink, 500),
        contentWriterInterval = setTimeout(function activateInsertMode(){
            cursor.setAttribute('class', 'cursor');
            exCmdNode.textContent = '-- INSERT --';
            clearInterval(cursorBlinkInterval);
            contentWriterInterval = setInterval(contentWriter, 50);
        }, 3000),
        commandWriterInterval;
})();

