// const express = require('express');
// const router = express.Router();
// const port = 3000;

// const joblib = require('joblib');

// // Dynamic import instead of require for sklearn
// const sklearn = import('sklearn');
// const { RandomForestClassifier, VotingClassifier } = sklearn;

// const votingClassifier = joblib.load('voting_classifier.pkl');

// router.post('/placement-prediction', (req, res) => {
//     const { features } = req.body;
//     const prediction = votingClassifier.predict([features]);
//     res.json({ prediction });
// });

// module.exports = router;
