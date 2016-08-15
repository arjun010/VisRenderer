/**
 * Created by a.srinivasan on 7/19/16.
 */
(function () {
    dataTransformer = {};

    dataTransformer.getDataForTwoAttributeBarChart = function(dataList,labelAttr,valueAttr,transform){
        transform = typeof transform !== 'undefined' ? transform : "COUNT";

        var transformedList = [];
        var labelValueMap = {};
        for(var i in dataList){
            //console.log(i, dataList[i], labelAttr, valueAttr);
            var dataItem = dataList[i];
            var labelAttrVal = dataItem[labelAttr];
            var valueAttrVal = dataItem[valueAttr];

            if(labelAttrVal in labelValueMap){ // encountering label for first time
                labelValueMap[labelAttrVal]["valueSum"]+=parseFloat(valueAttrVal);
                labelValueMap[labelAttrVal]["count"]+=1;
            }else{
                labelValueMap[labelAttrVal] = {
                    "valueSum":parseFloat(valueAttrVal),
                    "count":1
                };
            }
        }

        if(transform=="AVERAGE"){
            for(var labelVal in labelValueMap){
                transformedList.push({
                    "label":labelVal,
                    "value":parseFloat(labelValueMap[labelVal]['valueSum']/labelValueMap[labelVal]['count'])
                });
            }
        }else if(transform=="SUM"){
            for(var labelVal in labelValueMap){
                transformedList.push({
                    "label":labelVal,
                    "value":parseFloat(labelValueMap[labelVal]['valueSum'])
                });
            }
        }else if(transform=="COUNT"){
            for(var labelVal in labelValueMap){
                transformedList.push({
                    "label":labelVal,
                    "value":parseFloat(labelValueMap[labelVal]['count'])
                });
            }
        }

        return transformedList;
    };

    dataTransformer.getDataForHistogram = function (dataList, attribute) {
        
        var transformedList = [];
        for(var dataObj of dataList){
            transformedList.push(parseFloat(dataObj[attribute]));
        }
        
        return transformedList;
        
    };

    dataTransformer.getDataForTwoAttributeScatterplot = function (dataList, xAttribute, yAttribute, tooltipLabelAttribute, xTransform, yTransform) {
        var transformedList = [];
        var labelValueMap = {};

        if((xTransform == undefined && yTransform == undefined) || (xTransform == '' && yTransform == '')){
            for(var i in dataList){
                var dataItem = dataList[i];
                transformedList.push(
                    {
                        "xVal": dataProcessor.getAttributeDetails(xAttribute)["isCategorical"] == "1" ? dataItem[xAttribute] : parseFloat(dataItem[xAttribute]),
                        "label": dataItem[tooltipLabelAttribute],
                        "yVal": dataProcessor.getAttributeDetails(yAttribute)["isCategorical"] == "1" ? dataItem[yAttribute] : parseFloat(dataItem[yAttribute])
                    });

            }
        }else if((yTransform !=undefined && xTransform==undefined) || (yTransform !='' && xTransform=='')){
            for(var dataItem of dataList){
                var xVal = dataProcessor.getAttributeDetails(xAttribute)["isCategorical"] == "1" ? dataItem[xAttribute] : parseFloat(dataItem[xAttribute]);
                var yVal = dataProcessor.getAttributeDetails(yAttribute)["isCategorical"] == "1" ? dataItem[yAttribute] : parseFloat(dataItem[yAttribute]);
                if(xVal in labelValueMap){
                    labelValueMap[xVal].push(yVal);
                }else{
                    labelValueMap[xVal] = [yVal];
                }
            }

            for(var xVal in labelValueMap){
                var yVals = labelValueMap[xVal];
                if(yTransform=="MEAN"){
                    transformedList.push({
                        "xVal" : xVal,
                        "yVal" : parseFloat(getSumOfList(yVals)/yVals.length),
                        "label": ""
                    })
                }else if(yTransform=="MODE"){
                    transformedList.push({
                        "xVal" : xVal,
                        "yVal" : getModeOfList(yVals),
                        "label": ""
                    })
                }else if(yTransform=="COUNT"){
                    transformedList.push({
                        "xVal" : xVal,
                        "yVal" : yVals.length,
                        "label": ""
                    })
                }
            }
        }else if((xTransform !=undefined && yTransform!= undefined) || (xTransform !='' && yTransform!= '')){
            var xValues = [], yValues = [];
            for(var dataItem of dataList){
                var xVal = dataProcessor.getAttributeDetails(xAttribute)["isCategorical"] == "1" ? dataItem[xAttribute] : parseFloat(dataItem[xAttribute]);
                var yVal = dataProcessor.getAttributeDetails(yAttribute)["isCategorical"] == "1" ? dataItem[yAttribute] : parseFloat(dataItem[yAttribute]);
                xValues.push(xVal);
                yValues.push(yVal);
            }

            if(yTransform=="MEAN"){
                transformedList.push({
                    "xVal" : parseFloat(getSumOfList(xValues)/xValues.length),
                    "yVal" : parseFloat(getSumOfList(yValues)/yValues.length),
                    "label": ""
                })
            }else if(yTransform=="MODE"){
                transformedList.push({
                    "xVal" : getModeOfList(xValues),
                    "yVal" : getModeOfList(yValues),
                    "label": ""
                })
            }else if(yTransform=="COUNT"){
                transformedList.push({
                    "xVal" : xValues.length,
                    "yVal" : yValues.length,
                    "label": ""
                })
            }
        }
        console.log(transformedList)
        return transformedList;
    };

    function getModeOfList(list){
        var frequency = {};  // array of frequency.
        var max = 0;  // holds the max frequency.
        var result;   // holds the max frequency element.
        for(var v in list) {
            frequency[list[v]]=(frequency[list[v]] || 0)+1; // increment frequency.
            if(frequency[list[v]] > max) { // is this frequency > max so far ?
                max = frequency[list[v]];  // update max.
                result = list[v];          // update result.
            }
        }
        return result;
    }

    function getSumOfList(list){
        var sum = 0.0;
        for(var dataObj of list){
            sum += dataObj;
        }
        return sum;
    }

})();