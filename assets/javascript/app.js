$(document).ready(function () {

    // Start button click
    $("#startBtn").click(function () {

        // Hide Start Button
        $("#startBtn").hide();

        // Load Trivia Questions
        loadTrivia();
    });

    // Load Trivia Questions
    function loadTrivia() {

        var queryURL = "https://opentdb.com/api.php?amount=20&category=12&type=multiple";

        var question = $("<table><tr>");

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response.results.length);

            // Loop through all questions
            for (var i = 0; i < response.results.length; i++) {

                var questionDiv = $("<div>");
                questionDiv = $("<div id='question'>" + response.results[i].question + "</div>");

                //console.log(response.results[i].incorrect_answers);

                var answers = [];
                answers.push(response.results[i].incorrect_answers);
                answers.push(response.results[i].correct_answer);
                //console.log("xxx " + answers);
                shuffle(answers);
                //console.log("yyy " + answers);


                var answerDiv = $("<div>");

                for (var j=0; j < answers.length; j++) {

                    if(response.results[i].correct_answer == answers[j]){
                        // Correct Answer
                        answer = "correct_answer";
                    }
                    else{
                        // Incorrect Answer
                        answer = "incorrect_answer";
                    }
                    answerDiv = $("<label><input type='radio' name=q" + i + "value=" + answer + "/>"+ response.results[j].question +"</label>");
                }

                //question = $()
                $("#questions").append(questionDiv);
            }
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


});