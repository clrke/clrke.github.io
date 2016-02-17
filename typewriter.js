
/**
 * VANILLA JS IS MASTURRACE!!!
 **/

Array.prototype.sum = function() {
    for (var i = 0, L = this.length, sum = 0; i < L; sum += this[i++]);
    return sum;
};

(function() {
    "use strict";

    var messages = [
            "Hi friends! I'm",
            "Clarke",
            "and this website is a",
            "work in progress",
            ".",
            "In the meantime, feel free to keep in touch with me via:",
            "LinkedIn:",
            "https://ph.linkedin.com/pub/clarke-benedict-plumo/a7/7ab/453",
            "Twitter:",
            "http://twitter.com/__arke",
            "Github:",
            "http://github.com/cl4rke",
            "Quora:",
            "http://quora.com/Clarke-Benedict-Plumo",
            "Email:",
            "clarke.plumo@gmail.com",
            'I hope you liked the "vi" feel of this website. ' +
                'However, I am very, very, very sorry; you can\'t ' +
                'vi here for realz yet. ' +
                'If you do know how to implement that, please contribute to this',
            'repo',
            '! Thanks!',
            '...And now for my favorite quote:',
            '"Whether you think you can, or you think you can\'t, you\'re right."',
            '- Henry Ford',
            '(Subject to change over time)',
        ],
        typingSpeedField = document.getElementById('typing-speed'),
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

            var message = messages[i];
            var spanIndex = i;

            return [message, I, spanIndex];
        },
        contentWriter = function() {
            var i;

            var messageDetails = getMessageDetails(messages, I);

            var message = messageDetails[0],
                i = messageDetails[1],
                spanIndex = messageDetails[2];

            I++;

            var messageNode = contentNode.getElementsByClassName('message')[spanIndex];

            if(startOfWord) {
                startOfWord = false;

                wordNode = document.createElement('span');

                messageNode.appendChild(wordNode);
                messageNode.appendChild(cursor);
            }

            if(i+1 >= message.length || message[i+1] == ' ') {
                wordNode.setAttribute('class', 'complete');
                startOfWord = true;
            }

            wordNode.textContent += message[i];

            if(I == messageLength) {
                I = 0;
                commandWriterInterval = setInterval(commandWriter, 200);
                messageLength = writeCommand.length;

                cursor.setAttribute('class', 'cursor blink');
            } else {
                contentWriterInterval = setTimeout(contentWriter, typingSpeedField.value);
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
            contentWriterInterval = setTimeout(contentWriter, typingSpeedField.value);
        }, 3000),
        commandWriterInterval;
})();

