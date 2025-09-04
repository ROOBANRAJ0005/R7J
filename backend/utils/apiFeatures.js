class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // Keyword search
    search() {
        const keyword = this.queryStr.keyword
            ? {
                  name: {
                      $regex: this.queryStr.keyword,
                      $options: 'i'
                  }
              }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
    const queryObj = {};

    // Add keyword (search by name)
    if (this.queryStr.keyword) {
        queryObj.name = {
            $regex: this.queryStr.keyword,
            $options: 'i'
        };
    }

    // Copy original query string
    const queryStrCopy = { ...this.queryStr };

    // Remove unneeded fields
    const removeFields = ['keyword', 'limit', 'page', 'sort'];
    removeFields.forEach(field => delete queryStrCopy[field]);

    // Handle category filter
    if (queryStrCopy.category) {
        queryObj.category = {
            $regex: queryStrCopy.category,
            $options: 'i'
        };
    }

    // Handle rating filter (ensure products have at least the selected rating)
    if (queryStrCopy.rating) {
        queryObj.rating = { $gte: Number(queryStrCopy.rating) };
    }

    // Advanced filters (like price[gte])
    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    const advancedFilters = JSON.parse(queryStr);

    // Merge advanced filters into main query object
    Object.assign(queryObj, advancedFilters);

    // Apply final .find() once
    this.query = this.query.find(queryObj);
    return this;
}


   // Sorting (optional)
    sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    // Pagination
    paginate(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }

    // Execute query
    exec() {
        return this.query.exec();
    }
}

module.exports = APIFeatures;
