/**
 * Created by a.srinivasan on 7/19/16.
 */
(function () {
    tester = {};

    // histogramTest();
    twoAxisBarChartTest();

    function histogramTest() {
        d3.csv("data/cars.csv",function (data) {
            var histogramObject = new VisObject("Histogram");
            histogramObject.setXAttr('Retail Price');
            visRenderer.renderChart(data,histogramObject,"#vis")
        });
    }

    function twoAxisBarChartTest() {
        d3.csv("data/cars.csv",function (data) {
            var barChartObject = new VisObject("Bar");
            barChartObject.setXAttr('Cyl');
            barChartObject.setYAttr('Retail Price');
            barChartObject.setYTransform('COUNT');
            visRenderer.renderChart(data,barChartObject,"#vis")
        });
    }
    
})();