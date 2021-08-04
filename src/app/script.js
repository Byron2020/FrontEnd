const { default: jsPDF } = require("jspdf");
const { $ } = require("protractor");

$(document).ready(function(){
    var especialElementHandlers={
        "#editor":function(element,renderer){
            return true;
        }
    };
    $("#cmd").click(function(){
        var doc=new jsPDF();
        doc.fromHTML($("#tabla").html(),10,10,{
            "width":170,
            "elmentHandlers":especialElementHandlers
        })
    });
    
    doc.save("ejemplo.pdf");
});