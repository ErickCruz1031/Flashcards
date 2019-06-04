'use strict';

function TopCreation() {

    return React.createElement(
            "div",
            { className: "top" },

            React.createElement(
                "div",
                { className: "buttonWrap" },

                React.createElement(
                    "button",
                    { id: "startButton" },
                    "Start Review "
                ),
            ),

            React.createElement(
                "div",
                {id: "title"},
                "Lango!"
            )
        );
}

function TopCreationReview() {

    return React.createElement(
            "div",
            { className: "top" },

            React.createElement(
                "div",
                { className: "buttonWrap" },

                React.createElement(
                    "button",
                    { id: "addButton"},
                    " Add "
                ),
            ),

            React.createElement(
                "div",
                {id: "title"},
                "Lango!"
            )
        );
}

function BoxContr() {
    return React.createElement(
            "div",
            { className: "input-boxes" },

            React.createElement(
                "textarea",
                { id: "box-one", placeholder: "English", className: "box" },

            ),
            React.createElement(
                "textarea",
                { id: "box-two", placeholder: "Translation", className: "box" },

            )
        );

}

function LowButton() {
    return React.createElement(
            "div",
            { className: "lower-button" },

            React.createElement(
                "div",
                { className: "lower-button-class" },

                React.createElement(
                    "button",
                    { id: "save-button" },
                    " Save "
                )
            )
        );

}


function LowButtonNext() {
    return React.createElement(
            "div",
            { className: "lower-button" },

            React.createElement(
                "div",
                { className: "lower-button-class" },

                React.createElement(
                    "button",
                    { id: "save-button" },
                    " Next "
                )
            )
        );

}


function BoxContrReview() {
    return React.createElement(
            "div",
            { className: "input-boxes-review" },

            React.createElement(
                "textarea",
                { id: "box-one-review", placeholder: "English", className: "box-r" },

            ),
            React.createElement(
                "textarea",
                { id: "box-two-review", placeholder: "Answer", className: "box-r" },

            )
        );

}

function FooterCreation() {
    return React.createElement(
        "div",
        { className: "footer" },

        React.createElement(
            "div",
            { className: "footer-item" },
            " Username"
        )
    );
}

function createDOM()
{
    return React.createElement("div", {className: "DOM"},

        TopCreation(),
        BoxContr(),
        LowButton(),
        FooterCreation()
    ); //Return the whole DOM
}

function createReviewDOM()
{
    return React.createElement("div", {className: "DOM-R"},
        TopCreationReview(),
        BoxContrReview(),
        LowButtonNext(),
        FooterCreation()
    );
}

function makeReviewDOM()
{
    ReactDOM.render(createReviewDOM(), document.getElementById('root'));
    document.getElementById("addButton").addEventListener('click', makeRegDOM);
    console.log("It was called");
    return;
}

function makeRegDOM()
{
    ReactDOM.render(createDOM(), document.getElementById('root'));
    //document.getElementById("startButton").addEventListener('click', makeReviewDOM);
    console.log("YEA the other one");
    return;

}


ReactDOM.render(createDOM(), document.getElementById('root'));
document.addEventListener('keypress', makeCorsRequestTranslate);
document.getElementById("save-button").addEventListener('click', makeCorsRequestSave);
document.getElementById("startButton").addEventListener('click', makeReviewDOM);

//ReactDOM.render(BoxContr(), document.getElementById('root'));
//ReactDOM.render(LowButton(), document.getElementById('root'));
//ReactDOM.render(FooterCreation(), document.getElementById('root'));
