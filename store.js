const fortune = require('fortune');
const mongodbAdapter = require('fortune-mongodb');

const { Adapter } = fortune;
const MongodbAdapter = mongodbAdapter(Adapter);

class ApplicationAdapter extends MongodbAdapter {
  // override find to ignore all index requests
  async find(...args) {
    const [type, ids] = args;

    // if requesting a project and no ids (all)
    if (type === 'project' && !ids) return [];

    return super.find(...args);
  }
}

const adapter = [ApplicationAdapter, {
  url: process.env.MONGO_URI,
}];

const store = fortune({
  project: {
    projectName: String,
    applicantName: String,
    zapProjectId: String,
    description: String,
    datePrepared: Number,

    needProjectArea: Boolean,
    needRezoning: Boolean,
    needUnderlyingZoning: Boolean,
    needCommercialOverlay: Boolean,
    needSpecialDistrict: Boolean,

    developmentSite: Object,
    projectArea: Object,
    rezoningArea: Object,

    underlyingZoning: Object,
    commercialOverlays: Object,
    specialPurposeDistricts: Object,
    
    // deprecated: these were renamed to the previous 3 attrs
    proposedZoning: Object,
    proposedCommercialOverlays: Object,
    proposedSpecialDistricts: Object,

    currentStep: Object,

    areaMaps: [Array('areaMap'), 'project'], // eslint-disable-line
    taxMaps: [Array('taxMap')], // eslint-disable-line
    zoningSectionMaps: [Array('zoningSectionMap')], // eslint-disable-line
    zoningChangeMaps: [Array('zoningChangeMap')], // eslint-disable-line
  },
  areaMap: {
    title: String,
    mapTypeLabel: String,
    project: ['project', 'areaMaps'],
    paperOrientation: String,
    paperSize: String,
    mapBearing: Number,
    boundsPolygon: Object,
    mapCenter: Object,
    mapZoom: Number,
    bufferSize: String,
  },
  taxMap: {
    project: 'project',
    paperOrientation: String,
    paperSize: String,
    mapBearing: Number,
    boundsPolygon: Object,
    mapCenter: Object,
    mapZoom: Number,
  },
  zoningSectionMap: {
    project: 'project',
    paperOrientation: String,
    paperSize: String,
    mapBearing: Number,
    boundsPolygon: Object,
    mapCenter: Object,
    mapZoom: Number,
  },
  zoningChangeMap: {
    project: 'project',
    paperOrientation: String,
    paperSize: String,
    mapBearing: Number,
    boundsPolygon: Object,
    mapCenter: Object,
    mapZoom: Number,
  },
}, { adapter });

module.exports = store;
