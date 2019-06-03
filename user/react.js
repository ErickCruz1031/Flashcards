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

ReactDOM.render(createDOM(), document.getElementById('root'));
document.addEventListener('keypress', makeCorsRequestTranslate);
document.getElementById("save-button").addEventListener('click', makeCorsRequestSave);
//ReactDOM.render(BoxContr(), document.getElementById('root'));
//ReactDOM.render(LowButton(), document.getElementById('root'));
//ReactDOM.render(FooterCreation(), document.getElementById('root'));
