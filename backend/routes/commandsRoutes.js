const express = require("express");
const Commande = require("../models/commands");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const commandes = await Commande.find();
    res.json(commandes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id).populate({path:"produits.id_produit",model:"Produits"}).populate({path:"id_client",model:"User"});
    if (!commande) return res.status(404).json({ message: "Commande non trouvée" });
    res.json(commande);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/commandes/user/:userId", async (req, res) => {
  try {
      const commandes = await Commande.find({ id_client: req.params.userId });
      res.json(commandes);
  } catch (err) {
      res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post("/", async (req, res) => {
  const { id_client, produits, tel, adresse} = req.body;

  if (!id_client || !Array.isArray(produits) || produits.length === 0) {
    return res.status(400).json({ message: "Données invalides" });
  }

  const nouvelleCommande = new Commande({ id_client, produits, tel, adresse });

  try {
    const savedCommande = await nouvelleCommande.save();
    res.status(201).json(savedCommande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { statut  } = req.body;
    try {
        const updatedCommande = await Commande.findByIdAndUpdate(
            id,
            { statut },
            { new: true }
        );
        res.json(updatedCommande);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// DELETE a commande by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedCommande = await Commande.findByIdAndDelete(req.params.id);
    if (!deletedCommande) return res.status(404).json({ message: "Commande non trouvée" });
    res.status(200).json({ message: "Commande supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
