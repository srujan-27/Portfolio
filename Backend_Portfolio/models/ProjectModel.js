const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  Vidoe: String, // ← match your field name exactly (yes, typo preserved)
  techStack: [String],
  description: String,
  demolink: String,
  codelink: String
}, {
  collection: 'Projects' // lowercase 'collection' key (not 'Collection')
});

const Project = mongoose.model('Projects', ProjectSchema);
module.exports = Project;
