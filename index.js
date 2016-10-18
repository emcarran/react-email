var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;

var EMAILS ={
    inbox: {
        0: {
            id: 0,
            from: "billg@microsoft.com",
            to: "TeamWoz@Woz.org",
            title: "Possible work opportunity",
            content: "Dear Woz.  Fancy a job at Mister Softee?  Bill x"
        },
        1: {
            id: 1,
            from: "zuck@facebook.com",
            to: "TeamWoz@Woz.org",
            title: "Do you know PHP?",
            content: "Dear Woz.  We are in need of a PHP expert.  Fast.  Zuck x"
        }
    },
    spam: {
        0: {
            id: 0,
            from: "ChEaPFl1ghTZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "WaNt CHEEp FlitZ",
            content: "Theyre CheEp"
        },
        1: {
            id: 1,
            from: "NiKEAIRJordanZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "JorDanz For SAle",
            content: "Theyre REELY CheEp"
        }
    }
}

var Inbox = function(props) {
    return (
        <div>
            <strong>
                <Link to={'/inbox/'}>
                    Inbox
                </Link>
            </strong>

        </div>
    );
};

var Spam = function(props) {
    return (
        <div>
            <strong>
                <Link to={'/spam/'}>
                    Spam
                </Link>
            </strong>

        </div>
    );
};

var ShowEmail = function(props) {
    var email = EMAILS.inbox[props.params.emailID];
    return (
        <div>
        <p><strong>From: {email.from}</strong></p>
        <p><strong>To: {email.to}</strong></p>
        <p><strong>Subject: {email.title}</strong></p>
        <p><strong>Content: {email.content}</strong></p>        
        </div>
    );  
};

var ShowSpam = function(props) {
    var spam = EMAILS.spam[props.params.emailID];
    return (
        <div>
        <p><strong>From:</strong> {spam.from}</p>
        <p><strong>To:</strong> {spam.to}</p>
        <p><strong>Subject:</strong> {spam.title}</p>
        <p><strong>Content: {spam.content}</strong></p>
        </div>
        );  
};

var EmailList = function(props) {
    var emails = Object.keys(props.emails.inbox).map(function(emailID,index) {
        var email = props.emails.inbox[emailID];
        return (
                <li key={index}>
                <Link to={'/inbox/' + email.id}>
                From: {email.from}
                To: {email.to}
                Subject: {email.title}
                </Link>
                </li>
            );
    });
    return (
        <ul>
            {emails}
        </ul>
    );
};

var SpamList = function(props) {
    var spams = Object.keys(props.emails.spam).map(function(emailID,index){
        var spam = props.emails.spam[emailID];
            return (
            <li key={index}>
            <Link to={'/spam/' + spam.id}>
            From: {spam.from}
            To: {spam.to}
            Subject: {spam.title}
            </Link>
            </li>
        );
    });
    return (
        <ul>
            {spams}
        </ul>
    );
};

var SidebarContainer = function(props) {
    return (
        <div>
        <p>Click on a mailbox below:</p>
        <Inbox />
        <Spam />
        </div>
    );
};

var EmailContainer = function(props) {
    return (
        <div>
        <h2>Inbox:</h2>
        <EmailList emails={EMAILS} />
        </div>
    );
    
};

var SpamContainer = function(props) {
    return (
        <div>
        <h2>Spam:</h2>
        <SpamList emails={EMAILS} />
        </div>
    );
};

const App = React.createClass ({
    render() {
        return (
            <div className="container">

                <h1>React Simple Email App</h1>
                <div className="sidebar">
                    <SidebarContainer />
                </div>

                <div className="email">
                    {this.props.children}
                </div>
            </div>
        );  
    }
});

var routes = (
    <Router history={hashHistory}>
    
        <Route path="/" component={App} />

        <Route path="/inbox" component={App}>
            <IndexRoute component={EmailContainer} />
            <Route path=":emailID" component={ShowEmail} />
        </Route>
        
        <Route path="/spam" component={App}>
            <IndexRoute component={SpamContainer} />
            <Route path=":emailID" component={ShowSpam} />
        </Route>

    </Router>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});