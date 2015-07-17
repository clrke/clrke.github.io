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
        ],
        writeCommand = ":w",
        currentMessage = "",
        contentNode = document.getElementById('content'),
        command = "",
        I = 0,
        messageLength = messages.map(function(message) {
            return message.length;
        }).sum(),
        getMessageDetails = function(messages, I) {
            var messagesLength = messages.length;
            for(var i = 0; i < messagesLength && messages[i].length <= I; i++) {
                I -= messages[i].length;
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

            messageNode = contentNode.getElementsByTagName('span')[spanIndex];
            messageNode.textContent += message[i];

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
