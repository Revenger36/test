const { Router } = require("express");
const controller = require('./controller');

const router = Router();

router.get("/rateio", controller.getRateio);
router.get("/rateio/:id", controller.getRateioById);
router.post("/rateio/", controller.addRateio);
router.post("/rateio/:id", controller.addProrateById);
router.delete("/rateio/:id", controller.deleteProrateById);


router.get("/produto", controller.getProd);
router.get("/produto/:id", controller.getProdById);
router.post("/produto/", controller.addProd);
router.put("/produto/:id", controller.updateProd);

router.get("/centrocusto", controller.getCostCenter);
router.get("/gruposervico/:id", controller.getServiceGroup);
router.get("/grupoorcamento/:id", controller.getBudgetById)

router.post("/transacao/atualizar", controller.updateTransaction)
router.delete("/transacao/:id", controller.deleteTransactionById);
router.put("/rateio", controller.updateProrate)

router.get("/transacao", controller.getTransaction);
// router.get("/transacao/:id", controller.getTransactionById);
router.post("/transacao", controller.addTransaction);
// router.put("/transacao/:id", controller.updateTransaction);


module.exports = router;