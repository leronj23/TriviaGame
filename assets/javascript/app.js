$(document).ready(function () {

    // Hide Question Div
    $("#questions").hide();

    // Start button click
    $("#startBtn").click(function () {

        // Hide Start Button
        $("#startBtn").hide();

        // Load Trivia Questions
        loadTrivia();
    });

    // Timer
    var count = 30;
    var counter = 0;

    // Load Trivia Questions
    function loadTrivia() {

        // Show Question Div
        $("#questions").show();

        counter = setInterval(timer, 1000);

        var queryURL = "https://opentdb.com/api.php?amount=10&category=12&type=multiple";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // Loop through all questions
            for (var i = 0; i < response.results.length; i++) {

                // Add questions to the div
                var questionDiv = $("<div id='question'>" + response.results[i].question + "</div>").css('paddingTop', '40px');;
                $("#questions").append(questionDiv);

                // Answers Array
                var answers = [];

                // Add the incorrect answer to the answer array
                for (arr in response.results[i].incorrect_answers) {

                    answers.push(response.results[i].incorrect_answers[arr]);
                }
                //console.log("incorrect " + answers);

                // Add the correct answer to the answer array 
                answers.push(response.results[i].correct_answer);
                //console.log("correct " + answers);

                // Shuffle the answers array
                answers = shuffle(answers);
                //console.log("shuffle " + answers);

                // Add multiple choice answers to Div
                for (var j = 0; j < answers.length; j++) {

                    if (response.results[i].correct_answer == answers[j]) {
                        // Correct Answer
                        answer = "correct_answer";
                    } else {
                        // Incorrect Answer
                        answer = "incorrect_answer";
                    }
                    $("#questions").append($("<label id='answer'><input type='radio' name=q" + i + "value=" + answer + "/>" + answers[j] + "</label>"));
                }
            }

            $("#triviaBox").height("1000px").css({ 'margin-top': '220px' });
            //$("#triviaBox").css({ 'margin-top': '220px' });
            //     // $("#triviaBox").css({ 'margin-bottom': '100px' });


        });
    }

    /**
     * Shuffles array in place. ES6 version
     * @param {Array} a items An array containing the items.
     */
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // TImer
    function timer() {
        count = count - 1;
        if (count <= 0) {
            clearInterval(counter);
            //counter ended, do something here
            return;
        }
        //Do code for showing the number of seconds here
        $("#timer span").html(count);
    }
});