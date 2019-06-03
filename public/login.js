'use strict'

function createDOM()
{
    return React.createElement(
        "div", 
        {className : "container"},
        React.createElement(
            "div", 
            {className: "left"},
            React.createElement(
                "div",
                {className: "title-container"},
            
                React.createElement(
                    "div",
                    {className: "title"}, 
                    "Welcome to"
                ),
                React.createElement(
                    "div",
                    {className: "title"},
                    "Lango"
                ),
                React.createElement(
                    "div",
                    {className: "lowerTitle"},
                    "Customize your Vocabulary"
                )
            )
        ),
        
        React.createElement(
            "div",
            {className : "right"},
            React.createElement(
                "div", 
                {className: "buttonWrap"},     
                React.createElement(
                    "button",
                    {className: "login-ref"},
                    React.createElement(
                        "a", 
                        {href: "auth/google"},
                        "Login with Google"
                        
                    )
                )
            )
        )
        
    );
}
function createDiv()
{
    return React.createElement("div", {}, "hello");
}

ReactDOM.render(createDOM(), document.getElementById('root'));