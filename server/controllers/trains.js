const Promise = require('bluebird');

const Train = require('../models/trains');
const Booking = require('../models/bookings');
const User = require('../models/users');


function find(channelName) {
  return new Promise((resolve, reject) => {
    Train.find({ name: channelName }, (err, result) => {
      if (err) {
        reject({ status: 422, message: err.message });
        return false;
      }
      resolve(result);
    });
  });
}

function get(trainId) {
  return new Promise((resolve, reject) => {
    Train.findById(trainId, (err, result) => {
      if (err) {
        reject({ status: 422, message: err.message });
        return false;
      }
      resolve(result);
    });
  });
}

function addTrain(req) {
  return new Promise((resolve, reject) => {
    const train = new Train(req.body);
    console.log(train.validateSync());
    if (train.validateSync()) {
      reject({ status: 400, data: { message: 'Invalid Request' } });
      return false;
    }
    train.save((err) => {
      if (err) {
        reject({ status: 422, message: err.message });
        return false;
      }
    })
    .then(() => {
      resolve({ status: 200, data: { message: 'train added' } });
    })
    .catch((error) => {
      reject({ status: error.status, data: { message: error.message } });
    });
  });
}

function getTrain(req) {
  return new Promise((resolve, reject) => {
    if (!req.params.train_id) {
      reject({ status: 400, data: { message: 'Invalid Request' } });
      return false;
    }
    get(req.params.train_id)
      .then((result) => {
        if (!result) {
          reject({ status: 400, data: { message: 'train not found' } });
          return false;
        }
        resolve({ status: 200, data: result });
      })
      .catch((error) => {
        reject({ status: error.status, data: { message: error.message } });
      });
  });
}

function updateTrain(req) {
  return new Promise((resolve, reject) => {
    if (!req.params.train_id) {
      reject({ status: 400, data: { message: 'Invalid Request' } });
      return false;
    }
    Train.update({ _id: req.params.train_id }, req.body, (err, res) => {
      if (err) {
        reject({ status: 422, data: { message: err.message } });
        return false;
      }
      if (res.n !== 1) {
        reject({ status: 404, data: { message: 'train not found' } });
        return false;
      }
      resolve({ status: 200, data: { message: 'train Updated' } });
    });
  });
}

function deleteTrain(req) {
  return new Promise((resolve, reject) => {
    if (!req.params.train_id) {
      reject({ status: 400, data: { message: 'Invalid Request' } });
      return false;
    }
    Trains.findByIdAndRemove(req.params.train_id, (err) => {
      if (err) {
        reject({ status: 422, message: err.message });
        return false;
      }
      resolve({ status: 200, data: { message: 'Channel Deleted' } });
    })
  });
}


function list(query) {
  return new Promise((resolve, reject) => {
    if ((query.start) && (isNaN(query.start) || (parseInt(query.start, 10) < 0))) {
      reject({ status: 400, data: { message: 'Invalid Request' } });
      return false;
    }
    if ((query.limit) && (isNaN(query.limit) || (parseInt(query.limit, 10) < 0))) {
      reject({ status: 400, data: { message: 'Invalid Request' } });
      return false;
    }
    if ((query.type) && (!(allowedFilter.indexOf(query.filter) > -1))) {
      reject({ status: 400, data: { message: 'Invalid Request' } });
      return false;
    }

    const start = (parseInt(query.start, 10)) ? parseInt(query.start, 10) : 0;
    const limit = (parseInt(query.limit, 10)) ? parseInt(query.limit, 10) : 25;

    const search = {
      start: query.start,
      destination: query.destination,
      seats_available: { $gte: 1 }
    }
    Channel.find(search)
      .sort('-seats_available')
      .skip(start)
      .limit(limit)
      .exec((err, result) => {
        if (err) {
          reject({ status: 422, data: { message: err.message } });
          return false;
        }
        resolve({ status: 200, data: { count: result.length, resArr: result } });
      });
  });
}

const services = {};

services.addTrain = addTrain;
services.updateTrain = updateTrain;
services.getTrain = getTrain;
services.deleteTrain = deleteTrain;
services.list = list;

module.exports = services;
