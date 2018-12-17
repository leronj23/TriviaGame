$(document).ready(function () {

    // Hide Timer
    $("#timer").hide();

    // Hide Question Div
    $("#questions").hide();

    // Hide Done Button
    $("#doneBtn").hide();

    // Hide Results Div
    $("#results").hide();

    // Start button click
    $("#startBtn").click(function () {

        // Hide Start Button
        $("#startBtn").hide();

        // Show Timer
        $("#timer").show();

        // Load Trivia Questions
        loadTrivia();
    });

    // Timer vars
    var count = 30;
    var counter = 0;

    // Load Trivia Questions
    function loadTrivia() {

        // Show Question div
        $("#questions").show();

        // Start Timer
        counter = setInterval(timer, 1000);

        // API call to Music Trivia
        var queryURL = "https://opentdb.com/api.php?amount=10&category=12&type=multiple";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // Loop through all questions
            for (var i = 0; i < response.results.length; i++) {

                // Add questions to the div
                var questionDiv = $("<div id='question'>" + response.results[i].question + "</div>").css("paddingTop", "40px");;
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

                    // Add Radio buttons
                    $("#questions").append($("<label id='answer'><input type='radio' name=q" + i + " value=" + answer + ">" + answers[j] + "</label>").css('paddingRight', '20px'));
                }
            }

            // Show Done button
            $("#doneBtn").show();
        });
    }

    // Done button click
    $("#doneBtn").click(function () {

        // Show Result page
        showResults();
    });

    // Show Result page
    function showResults() {

        var correct = 0;
        var incorrect = 0;
        var unanswered = 0;

        for (var i = 0; i < 10; i++) {

            if ($("input[name=q" + i + "]:checked").val() === "correct_answer") {

                correct++;
            }
            else if ($("input[name=q" + i + "]:checked").val() === "incorrect_answer") {

                incorrect++;
            }
            else {

                unanswered++;
            }
        }

        // Hide Timer
        $("#timer").hide();
        clearInterval(counter);

        // Hide Question div
        $("#questions").hide();

        // Hide Done button
        $("#doneBtn").hide();

        // Hide Results div
        $("#results").show();

        // Update Result div
        $("#correct span").html(correct);
        $("#incorrect span").html(incorrect);
        $("#unanswered span").html(unanswered);
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

    // Timer
    function timer() {
        count = count - 1;
        if (count <= 0) {
            clearInterval(counter);

            // Counter is over. Show results page
            showResults();
            return;
        }
        // Update counter
        $("#timer span").html(count);
    }
});