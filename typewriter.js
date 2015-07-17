(function() {
    var message1 = "Hi, I'm ",
        authorName = "Clarke Benedict Tapay Plumo",
        message2 = " and this is a work in progress.",
        writeCommand = ":w",
        currentMessage = "",
        contentNode = document.getElementById('content'),
        command = "",
        I = 0,
        messageLength = message1.length + authorName.length + message2.length,
        contentWriter = function() {
            var i;

            if(I < message1.length) {
                message = message1;
                i = I;
                spanIndex = 0;
            }
            else if(I < message1.length + authorName.length) {
                message = authorName;
                i = I - message1.length;
                spanIndex = 1;
            }
            else {
                message = message2;
                i = I - message1.length - authorName.length;
                spanIndex = 2;
            }

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
