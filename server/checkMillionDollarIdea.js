const checkMillionDollarIdea = (numWeeks, weeklyRevenue) => {
    if(!numWeeks || !weeklyRevenue) return
    return numWeeks * weeklyRevenue
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
