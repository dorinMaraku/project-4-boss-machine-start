const checkMillionDollarIdea = (req, res, next) => {
    if(!numWeeks || !weeklyRevenue) return
    if((numWeeks * weeklyRevenue) < 1000000) {
        return "Not a million $ idea!!!"
    }
    req.body.ideaValue = numWeeks * weeklyRevenue  
    next()
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
