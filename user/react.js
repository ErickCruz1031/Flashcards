'use strict';

//makeRegDOM();
let review = false;


function TopCreation() {

    return React.createElement(
            "div",
            { className: "top" },

            React.createElement(
                "div",
                { className: "buttonWrap" },

                React.createElement(
                    "button",
                    { id: "startButton" ,  onClick: makeReviewDOM},
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
                    { id: "addButton",onClick: makeRegDOM},
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
                    { id: "save-button", onClick: makeCorsRequestSave},
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
                    { id: "next-button" , onClick: renderNextCard},
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
            { className: "footer-item" , id:"footer-name"},
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
    if (firstTime)
    {
        firstTime = false;
        ReactDOM.render(createReviewDOM(), document.getElementById('root'));
        makeCorsRequestGetCards();
        document.addEventListener('keypress', renderCard);
        //document.body.addEventListener('click', renderCard);

    }
    else
    {
        firstTime = false;
        document.getElementById("box-one").value = "";
        document.getElementById("box-two").value = "";
    
        document.removeEventListener('keypress', makeCorsRequestTranslate);
        ReactDOM.render(createReviewDOM(), document.getElementById('root'));
        document.addEventListener('keypress', renderCard);
        makeCorsRequestGetCards();


    }
    return;
}

function makeRegDOM()
{
    if (firstTime)
    {
        firstTime = false;
        ReactDOM.render(createDOM(), document.getElementById('root'));
        document.addEventListener('keypress', makeCorsRequestTranslate);

    }
    else{
        firstTime = false;
        document.getElementById("box-one-review").placeholder = "English";
        document.getElementById("box-one-review").style.background = "white";
        document.getElementById("box-two-review").placeholder = "Translation";

        document.removeEventListener('keypress', renderCard);
        //document.removeEventListener('click', renderCard);

        ReactDOM.render(createDOM(), document.getElementById('root'));
        document.addEventListener('keypress', makeCorsRequestTranslate);
    }

    return;

}

function renderNextCard()
{
    document.getElementById("box-one-review").value = "";
    document.getElementById("box-two-review").value = "";

    ReactDOM.render(createReviewDOM(), document.getElementById('root'));
    nextCard();
    return;
}



makeCorsRequestGetCards();


