const express = require('express');

const TrainController = require('../controllers/trains');
const Auth = require('../modules/auth');

const router = express.Router();

router.get('/', (req, res) => {
  Auth.authorize(req.session)
    .then(() => {
      return TrainController.list(req.query);
    })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((error) => {
      res.status(error.status).send(error.data);
    });
});

// router.post('/add_like/:channel_id', (req, res) => {
//   Auth.authorize(req.session)
//     .then(() => {
//       return TrainController.addLike(req);
//     })
//     .then((result) => {
//       res.status(200).send(result.data);
//     })
//     .catch((error) => {
//       res.status(error.status).send(error.data);
//     });
// });

router.get('/:train_id', (req, res) => {
  Auth.authorize(req.session)
    .then(() => {
      return TrainController.getTrain(req);
    })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((error) => {
      res.status(error.status).send(error.data);
    });
});

router.post('/create', (req, res) => {
  Auth.authorize(req.session)
    .then(() => {
      return TrainController.addTrain(req);
    })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(error.status).send(error.data);
    });
});

router.put('/:train_id', (req, res) => {
  Auth.authorize(req.session)
    .then(() => {
      return TrainController.updateTrain(req);
    })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((error) => {
      res.status(error.status).send(error.data);
    });
});

router.delete('/:train_id', (req, res) => {
  Auth.authorize(req.session)
    .then(() => {
      return TrainController.deleteTrain(req);
    })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((error) => {
      res.status(error.status).send(error.data);
    });
});



module.exports = router;
