const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{
      model: Product,
      attributes: [
        "id",
        "product_name",
        "price",
        "stock",
        "category_id"
      ],
      through: {         // Exclude associated table from query results
        attributes: []
      }
    }]
  }).then(dbTag => {
    if (!dbTag) {
      res.status(404).json({ message: 'No tags found!' });
      return;
    }
    res.json(dbTag)
  }).catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    include: [{
      model: Product,
      attributes: [
        "id",
        "product_name",
        "price",
        "stock",
        "category_id"
      ],
      through: {            // Exclude associated table from query results
        attributes: []
      }
    }],
    where: {
      id: req.params.id
    }
  }).then(dbTag => {
    if (!dbTag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.json(dbTag)
  }).catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then(dbTag => {
    res.json(dbTag)
  }).catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(dbTag => {
    if (!dbTag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.json(dbTag)
  }).catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbTag => {
    if (!dbTag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.json(dbTag)
  }).catch(err => res.status(500).json(err));
});

module.exports = router;
