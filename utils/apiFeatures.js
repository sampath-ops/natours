class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // lets  use method 1 for filtering
    //1A) FILTERING THE QUERY
    const queryObj = { ...this.queryString };
    const excludedFileds = ['page', 'sort', 'limit', 'fields'];
    excludedFileds.forEach((el) => delete queryObj[el]);
    // console.log(req.query, queryObj); queryObj is now filtered

    // 1B)ADVANCED FILTERING, we use the same queries as we did in mongoDB shell
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    //console.log(JSON.parse(queryStr)); //{ difficulty: 'easy', duration: { '$gte': '5' } }

    //BUILD QUERY
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    //2)SORTING
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      //sort('price ratingsAverage');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    //3) LIMITING FIELDS
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    //4) PAGINATION
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    // if (this.queryString.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw Error('Page not Exist');
    // }
    return this;
  }
}

module.exports = ApiFeatures;
