sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("zrealignreport.zrealignreport.controller.Sucess", {
            onInit: function () {
                this.getOwnerComponent().getRouter().attachRoutePatternMatched(this.fnRouteData,this)
                    
            },
            fnRouteData: function(oEvent){
                var vName = oEvent.getParameter("name");
                if(vName === "Sucess"){
                    var oReportView = this.getOwnerComponent().getRouter().getView("zrealignreport.zrealignreport.view.Report")
                    var vSucessData = {
                        Data : oReportView.getModel("Success").getData().Data
                    };
                    var oSucJsonModel = new sap.ui.model.json.JSONModel(vSucessData);
                    this.getView().setModel(oSucJsonModel,"SuccessData")
                }      
            },
            // onDialogManualUpdate:function(oEvent){
                
            // }


            

           
        });
    });
