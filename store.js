const fortune = require('fortune');
const mongodbAdapter = require('fortune-mongodb');

// Fortune Store
const adapter = [mongodbAdapter, {
  url: process.env.MONGO_URI,
}];

const store = fortune({
  project: {
    projectArea: Object,
    developmentSite: Object,
    rezoningArea: Object,
    projectName: String,
    applicantName: String,
    zapProjectId: String,
    description: String,
    datePrepared: Number,
    areaMaps: [Array('areaMap')], // eslint-disable-line
    taxMaps: [Array('taxMap')], // eslint-disable-line
    zoningSectionMaps: [Array('zoningSectionMap')], // eslint-disable-line
    zoningChangeMaps: [Array('zoningChangeMap')], // eslint-disable-line
  },
  areaMap: {
    project: ['project'],
  },
  taxMap: {
    project: ['project'],
  },
  zoningSectionMap: {
    project: ['project'],
  },
  zoningChangeMap: {
    project: ['project'],
  },
}, { adapter });

module.exports = store;
