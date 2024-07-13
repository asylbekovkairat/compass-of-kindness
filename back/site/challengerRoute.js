const express = require("express");
const router = express.Router();
const ChallengerController = require("./challengerController");
const CheckService = require("../services/CheckService");

router.get("/info", CheckService.is_challenger, ChallengerController.info);
// router.post("/info", CheckService.is_challenger, ChallengerController.infoSave);
// router.get("/detail", CheckService.is_challenger, ChallengerController.detail);
router.get("/doc", CheckService.is_challenger, ChallengerController.doc);
router.put("/doc", CheckService.is_challenger, ChallengerController.docSave);
router.put("/lang", CheckService.is_challenger, ChallengerController.langSave);
router.get(
  "/university",
  CheckService.is_challenger,
  ChallengerController.university
);
router.put(
  "/university",
  CheckService.is_challenger,
  ChallengerController.universitySave
);
//  router.post("/detail", CheckService.is_challenger, ChallengerController.detailSave);
// router.post(
//   "/password",
//   CheckService.is_challenger,
//   ChallengerController.password
// ); // ???
// router.post("/photo", CheckService.is_challenger, ChallengerController.photo);
// router.get("/photo/:size/:fileName", ChallengerController.photoShow);

module.exports = router;
