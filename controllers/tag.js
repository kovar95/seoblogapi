const Tag = require('../models/tag');
const Blog = require('../models/blog');
const slugify = require('slugify');
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {
  const { name, color } = req.body;
  let slug = slugify(name).toLowerCase();

  let tag = new Tag({ name, slug, color });

  tag.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.listAll = (req, res) => {

  Tag.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json(data);
  })
}

exports.list = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.find({slug : new RegExp(slug, "i")}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json(data);
  })
}

exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOne({slug}).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    // res.json(tag);
    Blog.find({tags: tag})
    .populate('categories', '_id name slug color')
    .populate('tags', '_id name slug color')
    .populate('postedBy', 'name _id')
    .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
    .exec((err,data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      } 
      res.json({tag: tag, blogs: data});
    })
  })
}


exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOneAndRemove({slug}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json({
      message: "Tag deleted successfully!"
    });
  })
}