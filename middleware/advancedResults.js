/*
    Middleware for advanced mongoose queryies and results
    Will be used for findAll inventory since we want that to be trunkated
    to fields we actually want to see (i.e: name, location)
*/

const advancedResults = (model) => async (req, res, next) => {

    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    // Select isn't part of the query, only what you want shown
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Replaces the items in / gt gte lt etc / to have a dollar sign in front of the matches
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource and setting query = ...
    query = model.find(JSON.parse(queryStr));

    // SELECT FIELDS to be shown
    // Adding onto query
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // Sort By
    // Adding onto query
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }else{
        query = query.sort('name');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();


    query = query.skip(startIndex).limit(limit);

    // if(populate){
    //     query = query.populate(populate);
    // }

    // Executing query
    const results = await query;

    // Pagination result
    const pagination = {};

    // seeing if the endIndex is less than the total
    if(endIndex < total){
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    // Seeing if the startIndex is greater than 0
    if(startIndex > 0){
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    res.advancedResults = {
        success: true,
        count: results.length,
        pagination: pagination,
        data: results
    }

    next();
}

module.exports = advancedResults;