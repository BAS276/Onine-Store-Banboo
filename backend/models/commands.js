const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema(
  {
    id_client: { type: String, required: true },
    produits: [
      {
        id_produit: { type: String ,required: true }, 
        qte: { type: Number, required: true },
      },
    ],
    statut: { type: String, default: "En attente" }, 
    tel: { type: String, required: true}, 
    adresse : { type: String, required: true}, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Commande", commandeSchema);
