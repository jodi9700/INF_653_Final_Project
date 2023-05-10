/*
If you are going to need the same function to verify data for more than one route, you should create that function as middleware. This will allow you to create it only once and place it in any route that needs it.
There was an assigned video tutorial on middleware. 
The middleware I suggest you need for your final project is verifyStates. 
You need to verify the URL parameter :state matches one of the 50 possible state abbreviations. 
Start by breaking down any problem like this into smaller steps:
1) You will need to pull in the state codes from the statesData.json file.
2) Instead of all of the states data, just make a states code array - I recommend using the array map() method to do this.
3) Search your newly created states code array to see if the state parameter received is in there.
4) If it isn't, return the appropriate response
5) If it is, attach the verified code to the request object: req.code = stateCode and call next() to move on.
You should see examples of the request object as referenced above and calling next() in middleware from the assigned middleware tutorial video.
P.S. - Notice all of the state codes in the statesData.json file are capitalized. You want to be able to receive lowercase and mixed-case parameters. I suggest using the .toUpperCase() string method when receiving the parameter value.
*/

const data = {
    states: require('../model/statesData.json'),
    setStates: function (data) { this.states = data }
}

const verifyState = () => {
    return (req, res, next) => {
        const code = req.params.state.toUpperCase();
        const state = data.states.find( st => st.code === code);

        if(!state){
            return res.status(404).json({ 'message': 'Invalid state abbreviation parameter' });
        }
        next();
    }
}

module.exports = verifyState
