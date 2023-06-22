/* ===============================================================================================================================================
   roundLocationOfGradientStop

   Description
   This script rounds the location of the gradient color stops and midpoints.
   Both fill and stroke colors are supported.

   Usage
   Select the objects, run this script from File > Scripts > Other Script...

   Notes
   In rare cases, you may not be able to create it.
   In that case, restart Illustrator and run this script again.

   Requirements
   Illustrator CS or higher

   Version
   1.0.0

   Homepage
   github.com/sky-chaser-high/adobe-illustrator-scripts

   License
   Released under the MIT license.
   https://opensource.org/licenses/mit-license.php
   =============================================================================================================================================== */

(function() {
    if (app.documents.length > 0) main();
})();


function main() {
    var items = app.activeDocument.selection;
    for (var i = 0; i < items.length; i++) {
        roundOff(items[i]);
    }
}


function roundOff(item) {
    switch (item.typename) {
        case 'PathItem':
            if (item.filled) roundGradientStops(item.fillColor);
            if (item.stroked) roundGradientStops(item.strokeColor);
            return;
        case 'CompoundPathItem':
            var items = item.pathItems;
            for (var i = 0; i < items.length; i++) {
                roundOff(items[i]);
            }
            return;
        case 'GroupItem':
            var items = item.pageItems;
            for (var i = 0; i < items.length; i++) {
                roundOff(items[i]);
            }
            return;
        case 'TextFrame':
            var ranges = item.textRanges;
            for (var i = 0; i < ranges.length; i++) {
                var text = ranges[i].characterAttributes;
                if (text.fillColor.typename != 'NoColor') roundGradientStops(text.fillColor);
                if (text.strokeColor.typename != 'NoColor') roundGradientStops(text.strokeColor);
            }
            return;
    }
}


function roundGradientStops(color) {
    if (color.typename == 'GradientColor') {
        var gradients = color.gradient.gradientStops;
        for (var i = 0; i < gradients.length; i++) {
            var gradient = gradients[i];
            gradient.midPoint = Math.round(gradient.midPoint);
            gradient.rampPoint = Math.round(gradient.rampPoint);
        }
    }
}
