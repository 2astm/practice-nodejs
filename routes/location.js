const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const models = require('../models');
const config = require ('../config/config')
const app = require('../app');

router.post('/addlocation/', (req, res) => {
    console.log(req.body);
    jwt.verify(req.body.token,config.secret,(err,decoded)=>{

        if (err) res.sendStatus(498)
        else{
            const {name,type,lat,lng} = req.body;
            userid = decoded.userid;
            console.log(userid);
            models.Location
                .create({UserId: userid, name: name, lat:lat, lng: lng})
                .then((location)=>{
                    res.json({
                        token: jwt.sign({userid},config.secret,{
                            expiresIn: "1h"
                        }),
                        location: {
                            id: location.id,
                            name: location.name,
                            lat: location.lat,
                            lng: location.lng
                        }
                    })
                })
                .catch(err=> console.log(err));
        }
    })
});
router.post('/deletelocation/',(req,res)=>{
    jwt.verify(req.body.token,config.secret,(err,decoded)=>{
        const {lat,lng} = req.body;
        if (err) res.sendStatus(498);
        else{
            userid=decoded.userid;
            models.Location
                .destroy({where: {id:req.body.id, UserId: userid}})
                .then((location)=>{
                    res.json({
                        token: jwt.sign({userid},config.secret,{
                            expiresIn: "1h"
                        })
                    })
                })
        }
    })
});
router.post('/updatelocation/',(req,res)=>{
    jwt.verify(req.body.token,config.secret,(err,decoded)=>{
        const {locationid,name} = req.body;
        if (err) res.sendStatus(498);
        else{
            userid = decoded.userid;
            models.Location
                .update({name}, {where:{id:locationid, UserId: userid}})
                .then((location)=>{
                    res.json({
                        token: jwt.sign({userid},config.secret,{
                            expiresIn: "1h"
                        })
                    })
                });

        }
    })
});
router.get('/getlocation/:id',(req,res)=> {
    id = req.params.id;
    models.Location
        .findAll({attributes: ['id','name','lat','lng'], where: {userId: req.params.id}})
        .then((location)=>{
            res.json({
                locations: location
            })
        })
});

module.exports = router;
