"use strict";

var q                       = require("q"),
    constants               = require('../helper/constants')


function getData (model, query, isSingle, selectParams, populateParams, sortParams, limit, selectPopulate){
    var deferred = q.defer();

    if(isSingle){
        model.findOne(query)
            .select(selectParams || "")
            .populate(populateParams || "", selectPopulate || "")
            .exec(function(error, data){
                if(error){
                    console.log("Error in getting Data");
                    console.log(error);
                    deferred.reject(error);
                }
                else {
                    console.log("Success in Find!");
                    deferred.resolve(data);
                }
            });
    }else{
        model.find(query)
            .select(selectParams || "")
            .populate(populateParams || "", selectPopulate || "")
            .sort(sortParams || "")
            .limit(limit)
            .exec(function(error, data){
                if(error){
                    console.log("Error in getting Data");
                    console.log(error);
                    deferred.reject(error);
                }
                else {
                    console.log("Success in Find!");
                    deferred.resolve(data);
                }
            });
    }
    return deferred.promise;
}

function saveData (model, saveObj){
    var defer = q.defer();

    var obj = new model(saveObj);
    obj.save(function(error, doc){
        if(error)
        {
            console.log("Error");
            console.log(error);
            defer.reject(error);
        }
        else
        {
            defer.resolve(doc);
        }
    });
    return defer.promise;
}

function bulkInsert (model, saveArray){
    var defer = q.defer();

    model.collection.insert(saveArray,function(error, doc){
        if(error)
        {
            console.log("Error");
            console.log(error);
            defer.reject(error);
        }
        else
        {
            defer.resolve(doc);
        }
    });
    return defer.promise;
}

function updateData (model, query, updateData){
    var defer = q.defer();

    model.update(query, updateData, function(error, doc){
        if(error)
        {
            console.log("Error");
            console.log(error);
            defer.reject({status:false, message:error});
        }
        else
        {
            defer.resolve({status:true,data : doc , message:"Successfully Update"});
        }
    });
    return defer.promise;
}

exports.getData                 = getData;
exports.saveData                = saveData;
exports.bulkInsert              = bulkInsert;
exports.updateData              = updateData;
