    const express = require('express')
    const bcrypt=require('bcryptjs')
    const jwt=require("jsonwebtoken")
    const user = require('../models/user');
    const router=express.Router();
    require('dotenv').config();
    const authMiddleware = require("../middlewares/authMiddleware");


    router.get('/', async(req ,res )=>{
        try{
            const usser = await user.find()
            if(!usser) return res.status(401).json({message:"ne trouve user pas"})
                res.status(201).json(usser)
        }catch (err) {
            res.status(500).json({error:err.message})
        }
    })

    router.get('/:id', async (req, res) => {
        try {
            const usser = await user.findById(req.params.id);
            if (!usser) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json(usser);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    router.put('/:id', async (req, res) => {
        try {
            const updatedUer = await user.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!updatedUer) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUer);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
            const deleteduser = await user.findByIdAndDelete(req.params.id);
            if (!deleteduser) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    router.post('/register' ,async(req , res)=>{
        try{
            const {nom_user , email , password, role}=req.body
            const hashedPassword=await bcrypt.hash(password ,10)
            const newuser= new user({nom_user,email,password:hashedPassword,role})
            const saveduser = await newuser.save()
            res.status(201).json(saveduser)
        }
        catch(err){
            res.status(500).json({error:err.message})
        }
    })


    router.post('/Login',async(req ,res)=>{
        try{
            const {email , password}=req.body
            const usser=await user.findOne({email})
            if(!usser)return res.status(400).json({error:"Utilisateur ne trouvé pas"})

            const isMatch = await bcrypt.compare(password , usser.password)
            if(!isMatch) return res.status(400).json({error:"Mot de passe incorrect"})
                
            const token = jwt.sign({id:usser._id},process.env.JWT_SECRET , {expiresIn:"1h"})
            res.json({token, usser});
        }
        catch(err){
            res.status(500).json({error:err.message})
        }
    })

    router.post('/forgot-password', async (req, res) => {
        const { email } = req.body;
    
        try {
            const foundUser = await user.findOne({ email });
            if (!foundUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
            const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const resetLink = `http://localhost:3000/reset-password/${token}`;
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Réinitialisation du mot de passe",
                text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetLink}`
            });
    
            res.json({ message: "Email de réinitialisation envoyé" });
    
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    });

    router.post('/reset-password/:token', async (req, res) => {
        const { token } = req.params;
        const { newPassword } = req.body;
    
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const foundUser = await user.findById(decoded.id);
            if (!foundUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
    

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            foundUser.password = hashedPassword;
            await foundUser.save();
    
            res.json({ message: "Mot de passe mis à jour avec succès" });
    
        } catch (error) {
            res.status(400).json({ message: "Lien invalide ou expiré", error });
        }
    });



    module.exports = router 

