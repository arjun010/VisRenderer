/**
 * Created by a.srinivasan on 7/19/16.
 */
(function () {
    tester = {};

    //histogramTest();
    // twoAxisBarChartTest();
    //twoAttributeScatterplotTest1();
    //twoAttributeScatterplotTest2();
    //twoAttributeScatterplotTest3();
    twoAttributeScatterplotTest4();

    function histogramTest() {
        d3.csv("data/cars.csv",function (data) {
            dataProcessor.processList(data)
            var histogramObject = new VisObject("Histogram");
            histogramObject.setXAttr('Retail Price');
            visRenderer.renderChart(data,histogramObject,"#vis")
        });
    }

    function twoAxisBarChartTest() {
        d3.csv("data/cars.csv",function (data) {
            dataProcessor.processList(data)
            var barChartObject = new VisObject("Bar");
            barChartObject.setXAttr('Cyl');
            barChartObject.setYAttr('Retail Price');
            barChartObject.setYTransform('COUNT');
            visRenderer.renderChart(data,barChartObject,"#vis")
        });
    }

    function twoAttributeScatterplotTest1(){
        d3.csv("data/cars.csv",function (data) {
            dataProcessor.processList(data)
            var scatterplotObject = new VisObject("Scatterplot");
            scatterplotObject.setXAttr('Retail Price');
            scatterplotObject.setYAttr('Cyl');
            scatterplotObject.setLabelAttr('Name')
            visRenderer.renderChart(data,scatterplotObject,"#vis")
        });
    }

    function twoAttributeScatterplotTest2(){
        d3.csv("data/cars.csv",function (data) {
            dataProcessor.processList(data)
            var scatterplotObject = new VisObject("Scatterplot");
            scatterplotObject.setXAttr('Cyl');
            scatterplotObject.setYAttr('Retail Price');
            scatterplotObject.setYTransform('MEAN');
            visRenderer.renderChart(data,scatterplotObject,"#vis")
        });
    }

    function twoAttributeScatterplotTest3(){
        d3.csv("data/cars.csv",function (data) {
            dataProcessor.processList(data)
            var scatterplotObject = new VisObject("Scatterplot");
            scatterplotObject.setXAttr('Cyl');
            scatterplotObject.setYAttr('Retail Price');
            scatterplotObject.setYTransform('MODE');
            visRenderer.renderChart(data,scatterplotObject,"#vis")
        });
    }

    function twoAttributeScatterplotTest4(){
        d3.csv("data/cars.csv",function (data) {
            dataProcessor.processList(data)
            var scatterplotObject = new VisObject("Scatterplot");
            scatterplotObject.setXAttr('Cyl');
            scatterplotObject.setYAttr('Retail Price');
            scatterplotObject.setYTransform('COUNT');
            visRenderer.renderChart(data,scatterplotObject,"#vis")
        });
    }
    
})();