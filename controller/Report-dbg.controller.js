sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/m/ColumnListItem',
	'sap/m/Label',
	'sap/m/SearchField',
	'sap/m/Token',
    'sap/ui/model/odata/v2/ODataModel',
    'sap/ui/model/type/String',
    'sap/ui/table/Column',
	'sap/m/Column',
	'sap/m/Text',
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, Filter, FilterOperator,ColumnListItem, Label, SearchField, Token, ODataModel,TypeString,  UIColumn, MColumn, Text, JSONModel) {
        "use strict";
        return Controller.extend("zrealignreport.zrealignreport.controller.Report", {
            onInit: function () {
                var vComboboxText = this.getView().byId("idSelectionChange").getSelectedKey();
                if (vComboboxText === "BusinessPartnerRB") {
                    this.getView().byId("idSalesOrg").setVisible(true);
                    this.getView().byId("idDisChnl").setVisible(true);
                    this.getView().byId("idDivision").setVisible(true);
                    this.getView().byId("idCreatedOnDate").setVisible(false);
                    this.getView().byId("idSalesOffice").setVisible(true);
                    this.getView().byId("idSalesGrp").setVisible(true);
                    this.getView().byId("idSalesDis").setVisible(true);
                    this.getView().byId("idPersnlNo").setVisible(true);
                    this.getView().byId("idNewPerNo").setVisible(true);
                    this.getView().byId("idValidityDate").setVisible(true);
                    this.getView().byId("idCategory").setVisible(true);

                    var oMultiInput = this.byId("IdNewPernoInpRel");
                    this._oMultiInput = oMultiInput;
       
                    var oMultiInputsale = this.byId("idNewSalesOfcInpRel");
                    this._oMultiInputsales = oMultiInputsale;
       
                    var oMultiInputsaleGrp = this.byId("idNewSalesGroupInpRel");
                    this._oMultiInputsalesGrp = oMultiInputsaleGrp;
       
                    var oMultiInputsaleDis = this.byId("idNewSalesDistInpRel");
                    this._oMultiInputsalesDis = oMultiInputsaleDis;
       

                } else {
                    this.getView().byId("idSalesOrg").setVisible(true);
                    this.getView().byId("idDisChnl").setVisible(true);
                    this.getView().byId("idDivision").setVisible(true);
                    this.getView().byId("idCreatedOnDate").setVisible(true);
                    this.getView().byId("idSalesOffice").setVisible(true);
                    this.getView().byId("idSalesGrp").setVisible(true);
                    this.getView().byId("idSalesDis").setVisible(true);
                    this.getView().byId("idPersnlNo").setVisible(true);
                    this.getView().byId("idNewPerNo").setVisible(false);
                    this.getView().byId("idValidityDate").setVisible(false);
                    //   this.getView().byId("idPersnlNo").setVisible(false);
                    
                    var oMultiInput = this.byId("IdNewPernoInp");
                    this._oMultiInput = oMultiInput;
       
                    var oMultiInputsale = this.byId("idNewSalesOfcInp");
                    this._oMultiInputsales = oMultiInputsale;
       
                    var oMultiInputsaleGrp = this.byId("idNewSalesGroupInp");
                    this._oMultiInputsalesGrp = oMultiInputsaleGrp;
       
                    var oMultiInputsaleDis = this.byId("idNewSalesDistInp");
                    this._oMultiInputsalesDis = oMultiInputsaleDis;
                }
                var MassData = {
                    "NewPersonalNo" : "",
                    "NewSalesOfc" : "",
                    "NewSalesGroup" : "", 
                    "NewSalesDist" : ""
                    

                };
            var mod = new sap.ui.model.json.JSONModel(MassData);
            this.getView().setModel(mod, "MassDataModel");
            // this.getOwnerComponent().getRouter().getRoute("Report").attachMatched(this.onRouteMatched, this);
            this.localModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(this.localModel, "localModel");

           

            var startDate = new Date();
            this.byId("DP6").setMinDate(startDate);
            // this.byId("DP5").setMinDate(startDate);
            
           
            var tdate = new Date();
             var dateModel = new JSONModel();
             dateModel.setData({"tdate":tdate});
             this.getView().setModel(dateModel, "dateModel");

            //  var tdate = new Date();
            //  var dateModel1 = new JSONModel();
            //  dateModel1.setData({"tdate":"1999-12-31"});
            //  this.getView().setModel(dateModel1, "dateModel1");

            //  var oModel = new JSONModel();
			// oModel.setData({
			// 	dateValue: new Date()
			// });
			// this.getView().setModel(oModel,"oModel");

            //  this.handleChange();

            

        //    var oMultiInput = this.byId("IdNewPernoInpRel");
        //      this._oMultiInput = oMultiInput;

        //      var oMultiInputsale = this.byId("idNewSalesOfcInpRel");
        //      this._oMultiInputsales = oMultiInputsale;

        //      var oMultiInputsaleGrp = this.byId("idNewSalesGroupInpRel");
        //      this._oMultiInputsalesGrp = oMultiInputsaleGrp;

        //      var oMultiInputsaleDis = this.byId("idNewSalesDistInpRel");
        //      this._oMultiInputsalesDis = oMultiInputsaleDis;

            



            },
            onNavigateDate : function(oEvent) {
                oEvent.getSource().setValue(new Date())
            },
            onRouteMatched:function(){
                const that = this;
            that.oDataModel= this.getView().getModel();
            const oList = that.oDataModel.bindList("/RealignmentDataSet");
            oList.requestContexts(0, Infinity).then(function (aContexts) {
                const oAssignments = [];
                let oModel = sap.ui.getCore().getModel("cdd");
                if (!oModel) {
                    oModel = new JSONModel();
                    sap.ui.getCore().setModel(oModel, "cdd");
                }
                aContexts.forEach(function (oContext) {
                    const obj = oContext.getObject();
                    oAssignments.push(obj);
                });
                oModel.setProperty("/RealignmentDataSet", oAssignments);
            }.bind(this));

            },

            onGoBtnPress: function () {
                var vComboboxText = this.getView().byId("idSelectionChange").getSelectedKey();
                if (vComboboxText === "BusinessPartnerRB") {
                    this.getView().byId("idRelCategory").setVisible(true);
                    this.getView().byId("idSalesOrder").setVisible(false);
                } else {
                    this.getView().byId("idRelCategory").setVisible(false);
                    this.getView().byId("idSalesOrder").setVisible(true);

                }

            },
            SelectedFilter: function () {
                var vComboboxText = this.getView().byId("idSelectionChange").getSelectedKey();
                if (vComboboxText === "BusinessPartnerRB") {
                    this.getView().byId("idSalesOrg").setVisible(true);
                    this.getView().byId("idDisChnl").setVisible(true);
                    this.getView().byId("idDivision").setVisible(true);
                    this.getView().byId("idCreatedOnDate").setVisible(false);
                    this.getView().byId("idSalesOffice").setVisible(true);
                    this.getView().byId("idSalesGrp").setVisible(true);
                    this.getView().byId("idSalesDis").setVisible(true);
                    this.getView().byId("idPersnlNo").setVisible(true);
                    this.getView().byId("idNewPerNo").setVisible(true);
                    this.getView().byId("idValidityDate").setVisible(true);

                } else {
                    this.getView().byId("idSalesOrg").setVisible(true);
                    this.getView().byId("idDisChnl").setVisible(true);
                    this.getView().byId("idDivision").setVisible(true);
                    this.getView().byId("idCreatedOnDate").setVisible(true);
                    this.getView().byId("idSalesOffice").setVisible(true);
                    this.getView().byId("idSalesGrp").setVisible(true);
                    this.getView().byId("idSalesDis").setVisible(true);
                    this.getView().byId("idPersnlNo").setVisible(true);
                    this.getView().byId("idNewPerNo").setVisible(false);
                    this.getView().byId("idValidityDate").setVisible(false);
                    //   this.getView().byId("idPersnlNo").setVisible(false);


                }
            },
            onBeforeRebindTable: function (oEvent) {
                // this.getView().byId("idRelCategory").rebindTable();
                var oBindingParams = oEvent.getParameter("bindingParams");
                oBindingParams.parameters = oBindingParams.parameters || {};
                var oSmartTable = oEvent.getSource();
                // 
                var oSmartFilterBar = this.byId(oSmartTable.getSmartFilterId());
                if (oSmartFilterBar instanceof sap.ui.comp.smartfilterbar.SmartFilterBar) {
                    var oCustomControl = oSmartFilterBar.getControlByKey("BusinessPartnerRB");
                    var oCustomControlDate = oSmartFilterBar.getControlByKey("ValidityDate");
                    var oCustomControlDateSel = oSmartFilterBar.getControlByKey("CreatedOnDate");
                    var vValidityDate = this.getView().byId("DP6").getValue();
                    var vCreatedOnDateFirst = this.getView().byId("DP5").getDateValue();
                    var fvCreatedOnDateFirst=this.getView().byId("DP5").getFrom();
                    fvCreatedOnDateFirst=this.getOriginalDateTime(fvCreatedOnDateFirst);
                    var vCreatedOnDateSec = this.getView().byId("DP5").getSecondDateValue();
                    if (oCustomControl instanceof sap.m.ComboBox) {
                        var vDropDownvalue = oCustomControl.getSelectedKey();
                        // for (var i = 0; i < vplantvalue.length; i++) {
                        if (vDropDownvalue === "BusinessPartnerRB") {
                            oBindingParams.filters.push(new sap.ui.model.Filter("BusinessPartnerRB", "EQ", "R"));
                            oBindingParams.filters.push(new sap.ui.model.Filter("ValidityDate", "EQ", vValidityDate));
                            this.getView().byId("FileUploaderRel").setValue("");
                            // this.onNavigate();
                           
                        } else {
                            oBindingParams.filters.push(new sap.ui.model.Filter("OpenSalesOrderRB", "EQ", "O"));
                            oBindingParams.filters.push(new sap.ui.model.Filter("CreatedOnDate", "BT", fvCreatedOnDateFirst, vCreatedOnDateSec));
                            this.getView().byId("FileUploader").setValue("");
                            
                            
                        }
                        // }
                    } 
                }
            },
            getOriginalDateTime: function (dateTime) {
                if (dateTime!== undefined && dateTime!== null && dateTime!== "") {
                    var dateFormat= sap.ui.core.format.DateFormat.getDateInstance({
                        path: 'fvCreatedOnDateFirst',
                       type: 'sap.ui.model.type.DateTime',
                        formatOptions: {UTC:true},
                        pattern: "yyyy-MM-dd"
                    });
                    var originalDate = dateFormat.format(new Date(dateTime));
                    return originalDate ;
                }
                return null;
            },
            getOriginalDateTime2: function (dateTime) {
                if (dateTime!== undefined && dateTime!== null && dateTime!== "") {
                    var dateFormat= sap.ui.core.format.DateFormat.getDateInstance({
                        path: 'NewValidToDate',
                       type: 'sap.ui.model.type.DateTime',
                        formatOptions: {UTC:true},
                        pattern: "MM-dd-yyyy"
                    });
                    var originalDate = dateFormat.format(new Date(dateTime));
                    originalDate= new Date(originalDate);
                    return originalDate ;
                }
                return null;
            },
            fnSaveDeep: function (action) {
                var that = this;
                var oSelectedIndices,oTabRows;
                var vComboboxText = this.getView().byId("idSelectionChange").getSelectedKey();
                if(vComboboxText==="BusinessPartnerRB"){
                    oTabRows = this.getView().byId("idRelCategory").getTable().getRows();
                    oSelectedIndices = this.getView().byId("idRelCategory").getTable().getSelectedIndices();
                    if (oSelectedIndices.length == -1 || oSelectedIndices.length == 0) {
                                    sap.m.MessageBox.warning("Select at least one record");
                                    return;
                                }
                  }else{
                    oTabRows = this.getView().byId("idSalesOrder").getTable().getRows();
                    oSelectedIndices = this.getView().byId("idSalesOrder").getTable().getSelectedIndices();
                    var vUploadData = this.getView().byId("FileUploader").getValue();
                  }
                  if(vUploadData !== ""){
                    if (oSelectedIndices.length > 0) {
                        sap.m.MessageBox.warning("Please select either file or table record");
                        return;
                    }
                    var oEntity = {
                        OpenSalesOrderRB:"",
                        BusinessPartnerRB:"",
                        RealignmentDataToStatusMsg:[]
                      };
                      if(vComboboxText==="BusinessPartnerRB"){
                        oEntity.BusinessPartnerRB = "R";
                      }else{
                        oEntity.OpenSalesOrderRB = "O";
                      }
                      var vSuccessJson = {
                        Data :[]
                    };
                   var oSelectedIndices = this.getView().getModel("localModel").getData().items;
                    for(var i=0;i<oSelectedIndices.length;i++){
                        var obj = oSelectedIndices[i];
                        oEntity.RealignmentDataToStatusMsg.push({
                            "DistributionChannel" : obj["Distribution Channel"],
                            "Division" : obj.Division,
                            "ExistPersonalNo":obj["Exist Personal No"],
                            "ExstSalesGroup" : obj["Exst Sales Group"],
                            "ExstSalesOfc" : obj["Exst Sales Ofc"],
                            "ExstSalesDist" : obj["Exst Sales Dist"],
                            "NewPersonalNo":obj.NewPersonalNo, 
                            "NewSalesOfc":obj.NewSalesOfc, 
                            "NewSalesGroup":obj.NewSalesGroup,
                            "NewSalesDist":obj.NewSalesDist,                                                       
                            "PartnerFunction" : obj["Partner Function"],
                            "SalesDocNo":obj["Sales Doc No"],
                            "SalesOrganization":obj["Sales Organization"], 
                            "Status":""

                        })
                  }
                  var oDataModel = this.getView().getModel();
                  oDataModel.create("/RealignmentDataSet",oEntity,{
                    success: function(oData,oResponse){
                        vSuccessJson.Data = oData.RealignmentDataToStatusMsg.results;
                        var oSuccessJsonModel = new sap.ui.model.json.JSONModel(vSuccessJson);
                        that.getView().setModel(oSuccessJsonModel,"Success");
                        that.getOwnerComponent().getRouter().navTo("Sucess");
                        that.getView().byId("FileUploader").setValue("");                  
                    },
                    error: function(err){
                        // some error occuerd 
                    },
                    async: true,  // execute async request to not stuck the main thread
                    urlParameters: {}  // send URL parameters if required 
                }); 
                      

                  }else if(oSelectedIndices.length>0){
                      if (vUploadData !== "") {
                        sap.m.MessageBox.warning("Please select either file or table record");
                        return;
                    }
                      var oEntity = {
                        OpenSalesOrderRB:"",
                        BusinessPartnerRB:"",
                        RealignmentDataToStatusMsg:[]
                      };
                      if(vComboboxText==="BusinessPartnerRB"){
                        oEntity.BusinessPartnerRB = "R";
                      }else{
                        oEntity.OpenSalesOrderRB = "O";
                      }
                      var vSuccessJson = {
                          Data :[]
                      };
                      for(var i=0;i<oSelectedIndices.length;i++){
                            // var obj = oTabRows[oSelectedIndices[i]].getBindingContext().getObject();
                            var obj = this.getView().byId("idSalesOrder").getTable().getContextByIndex(oSelectedIndices[i]).getObject();
                            oEntity.RealignmentDataToStatusMsg.push({
                                "SalesDocNo":obj.SalesDocNo,
                                "SalesOrganization":obj.SalesOrganization, 
                                "BPNumber":obj.BPNumber, 
                                "NewPersonalNo":obj.NewPersonalNo, 
                                "NewSalesOfc":obj.NewSalesOfc, 
                                "NewSalesGroup":obj.NewSalesGroup,
                                "NewSalesDist":obj.NewSalesDist, 
                                "DistributionChannel" : obj.DistributionChannel,
                                "Category" : obj.Category,
                                "Division" : obj.Division,
                                "ExistPersonalNo" : obj.ExistPersonalNo,
                                "ExstSalesDist" : obj.ExstSalesDist,
                                "ExstSalesGroup" : obj.ExstSalesGroup,
                                "ExstSalesOfc" : obj.ExstSalesOfc,
                                "PartnerFunction": obj.PartnerFunction,
                                // "ValidityDate" : obj.ValidityDate,
                                // "Status":"" 

                            })
                      }
                      var oDataModel = this.getView().getModel();
                      oDataModel.create("/RealignmentDataSet",oEntity,{
                        success: function(oData,oResponse){
                            vSuccessJson.Data = oData.RealignmentDataToStatusMsg.results;
                            var oSuccessJsonModel = new sap.ui.model.json.JSONModel(vSuccessJson);
                            that.getView().setModel(oSuccessJsonModel,"Success");
                            that.getOwnerComponent().getRouter().navTo("Sucess");
                            var oTabObject = that.getView().byId("idSalesOrder").getTable();
                           oSelectedIndices = that.getView().byId("idSalesOrder").getTable().getSelectedIndices();
                        //    for(var i=0;i<oSelectedIndices.length;i++){
                        //     oTabObject.getRows()[oSelectedIndices[i]].getCells().forEach((data,index)=>{
                        //         try {
                        //             var id = data.sId.split("Report--")[1].split("-")[0];
                        //         } catch (error) {
                                    
                        //         }
                        //         if (id){
                        //             if (id === "IdNewPernoInp"){
                        //                 data.setValue("");
                        //             }
                        //             if (id === "idNewSalesOfcInp"){
                        //                 data.setValue("");
                        //             }
                        //             if (id === "idNewSalesGroupInp"){
                        //                 data.setValue("");
                        //             }
                        //             if (id === "idNewSalesDistInp"){
                        //                 data.setValue("");
                        //             }
                        //         }
                                
                        //     });
                        // } 
                    that.getView().byId("idSalesOrder").rebindTable();
                        },
                        error: function(err){
                            // some error occuerd 
                        },
                        async: true,  // execute async request to not stuck the main thread
                        urlParameters: {}  // send URL parameters if required 
                    }); 
                   
                }else{
                     if (oSelectedIndices.length == -1 || oSelectedIndices.length == 0) {
                        sap.m.MessageBox.warning("Select at least one record");
                        return;
                    }

                }
            },
            fnSaveDeepRel: function (action) {
                var that = this;
                var oSelectedIndices,oTabRows;
                var vComboboxText = this.getView().byId("idSelectionChange").getSelectedKey();
                if(vComboboxText==="BusinessPartnerRB"){
                    oTabRows = this.getView().byId("idRelCategory").getTable().getRows();
                    oSelectedIndices = this.getView().byId("idRelCategory").getTable().getSelectedIndices();
                    var vUploadData = this.getView().byId("FileUploaderRel").getValue();
                    
                  }else{
                    oTabRows = this.getView().byId("idSalesOrder").getTable().getRows();
                    oSelectedIndices = this.getView().byId("idSalesOrder").getTable().getSelectedIndices();
                    var vUploadData = this.getView().byId("FileUploader").getValue();
                  }
                  if(vUploadData !== ""){
                    if (oSelectedIndices.length > 0) {
                        sap.m.MessageBox.warning("Please select either file or table record");
                        return;
                    }
                    var oEntity = {
                        OpenSalesOrderRB:"",
                        BusinessPartnerRB:"",
                        RealignmentDataToStatusMsg:[]
                      };
                      if(vComboboxText==="BusinessPartnerRB"){
                        oEntity.BusinessPartnerRB = "R";
                      }else{
                        oEntity.OpenSalesOrderRB = "O";
                      }
                      var vSuccessJson = {
                        Data :[]
                    };
                   var oSelectedIndices = this.getView().getModel("localModel").getData().items;
                    for(var i=0;i<oSelectedIndices.length;i++){
                        var obj = oSelectedIndices[i];
                        var vDate = obj.NewValidToDate;
                        var NewValidToDate = new Date(vDate );
                        // NewValidToDate=this.getOriginalDateTime2(NewValidToDate);
                        NewValidToDate.setDate(NewValidToDate.getDate() + 1);
                        var vDateVal = obj["Valid On Date"];
                        var ValidToDate = new Date(vDateVal);
                        ValidToDate.setDate(ValidToDate.getDate() + 1);
                        oEntity.RealignmentDataToStatusMsg.push({
                            "BPNumber":obj["BP Number"],
                            "Category":obj.Category,
                            "DistributionChannel" : obj["Distribution Channel"],
                            "Division" : obj.Division,
                            "ExistPersonalNo":obj["Exist Personal No"],
                            "ExstSalesGroup" : obj["Exst Sales Group"],
                            "ExstSalesOfc" : obj["Exst Sales Ofc"],
                            "ExstSalesDist" : obj["Exst Sales Dist"],
                            "NewPersonalNo":obj.NewPersonalNo, 
                            "NewSalesOfc":obj.NewSalesOfc, 
                            "NewSalesGroup":obj.NewSalesGroup,
                            "NewSalesDist":obj.NewSalesDist, 
                            "NewValidToDate":NewValidToDate,                                                       
                            "PartnerFunction" : obj["Partner Function"],
                            "SalesDocNo":obj["Sales Doc No"],
                            "SalesOrganization":obj["Sales Organization"], 
                            "BPNumber":obj["BP Numbe"], 
                            "Status":"",
                            "ValidityDate":ValidToDate, 

                        })
                  }
                  var oDataModel = this.getView().getModel();
                  oDataModel.create("/RealignmentDataSet",oEntity,{
                    success: function(oData,oResponse){
                        vSuccessJson.Data = oData.RealignmentDataToStatusMsg.results;
                        var oSuccessJsonModel = new sap.ui.model.json.JSONModel(vSuccessJson);
                        that.getView().setModel(oSuccessJsonModel,"Success");
                        that.getOwnerComponent().getRouter().navTo("Sucess");
                        that.getView().byId("FileUploaderRel").setValue("");                  
                    },
                    error: function(err){
                        // some error occuerd 
                    },
                    async: true,  // execute async request to not stuck the main thread
                    urlParameters: {}  // send URL parameters if required 
                }); 
                      

                  }else if(oSelectedIndices.length>0){
                      if (vUploadData !== "") {
                        sap.m.MessageBox.warning("Please select either file or table record");
                        return;
                    }
                      var oEntity = {
                        OpenSalesOrderRB:"",
                        BusinessPartnerRB:"",
                        RealignmentDataToStatusMsg:[]
                      };
                      if(vComboboxText==="BusinessPartnerRB"){
                        oEntity.BusinessPartnerRB = "R";
                      }else{
                        oEntity.OpenSalesOrderRB = "O";
                      }
                      var vSuccessJson = {
                          Data :[]
                      };
                      for(var i=0;i<oSelectedIndices.length;i++){
                            // var obj = oTabRows[oSelectedIndices[i]].getBindingContext().getObject();
                            var obj = this.getView().byId("idRelCategory").getTable().getContextByIndex(oSelectedIndices[i]).getObject();
                            var vDate = obj.NewValidToDate;
                            var NewValidToDate = new Date(vDate)

                            oEntity.RealignmentDataToStatusMsg.push({
                                "SalesDocNo":obj.SalesDocNo,
                                "SalesOrganization":obj.SalesOrganization, 
                                "BPNumber":obj.BPNumber, 
                                "NewPersonalNo":obj.NewPersonalNo, 
                                "NewSalesOfc":obj.NewSalesOfc, 
                                "NewSalesGroup":obj.NewSalesGroup,
                                "NewSalesDist":obj.NewSalesDist, 
                                "DistributionChannel" : obj.DistributionChannel,
                                "Category" : obj.Category,
                                "Division" : obj.Division,
                                "ExistPersonalNo" : obj.ExistPersonalNo,
                                "ExstSalesDist" : obj.ExstSalesDist,
                                "ExstSalesGroup" : obj.ExstSalesGroup,
                                "ExstSalesOfc" : obj.ExstSalesOfc,
                                "PartnerFunction": obj.PartnerFunction,
                                "ValidityDate" : obj.ValidityDate,
                                "NewValidToDate":NewValidToDate,
                                "Status":"" 

                            })
                      }
                      var oDataModel = this.getView().getModel();
                      oDataModel.create("/RealignmentDataSet",oEntity,{
                        success: function(oData,oResponse){
                            vSuccessJson.Data = oData.RealignmentDataToStatusMsg.results;
                            var oSuccessJsonModel = new sap.ui.model.json.JSONModel(vSuccessJson);
                            that.getView().setModel(oSuccessJsonModel,"Success");
                            that.getOwnerComponent().getRouter().navTo("Sucess");
                            var oTabObject = that.getView().byId("idRelCategory").getTable();
                           oSelectedIndices = that.getView().byId("idRelCategory").getTable().getSelectedIndices();
                        //    for(var i=0;i<oSelectedIndices.length;i++){
                        //        var oTotal= [oSelectedIndices[i]];
                        //     oTabObject.getRows()[oTotal].getCells().forEach((data,index)=>{
                        //         try {
                        //             var id = data.sId.split("Report--")[1].split("-")[0];
                        //         } catch (error) {
                                    
                        //         }
                        //         if (id){
                        //             if (id === "IdNewPernoInpRel"){
                        //                 data.setValue("");
                        //             }
                        //             if (id === "idNewSalesOfcInpRel"){
                        //                 data.setValue("");
                        //             }
                        //             if (id === "idNewSalesGroupInpRel"){
                        //                 data.setValue("");
                        //             }
                        //             if (id === "idNewSalesDistInpRel"){
                        //                 data.setValue("");
                        //             }
                        //         }
                                
                        //     });
                        // } 
                    that.getView().byId("idRelCategory").rebindTable();
                        },
                        error: function(err){
                            // some error occuerd 
                        },
                        async: true,  // execute async request to not stuck the main thread
                        urlParameters: {}  // send URL parameters if required 
                    }); 
                   
                }else{
                     if (oSelectedIndices.length == -1 || oSelectedIndices.length == 0) {
                        sap.m.MessageBox.warning("Select at least one record");
                        return;
                    }

                }
            },
            onMassSave:function(oEvent){
                if (!this.byId("_IdDialogManual")) {
                    Fragment.load({
                        id: this.getView().getId(),
                        name: "zrealignreport.zrealignreport.fragment.MassSave",
                        controller: this
                    }).then(function (oDialog) {
                        this.getView().addDependent(oDialog);
                        this.oManualDialog = oDialog;
                       var oSelectedIndices = this.getView().byId("idSalesOrder").getTable().getSelectedIndices();
                        if (oSelectedIndices.length == -1 || oSelectedIndices.length == 0) {
                            sap.m.MessageBox.warning("Select at least one record");
                            return;
                        }
                        this.getView().byId("idNewPersonalNo").setValue("");
                        this.getView().byId("idNewSalesOfc").setValue("");
                        this.getView().byId("idNewSalesGroup").setValue("");
                        this.getView().byId("idNewSalesDist").setValue("");
                        oDialog.open();
                    }.bind(this));
                } else {
                    var oSelectedIndices = this.getView().byId("idSalesOrder").getTable().getSelectedIndices();
                        if (oSelectedIndices.length == -1 || oSelectedIndices.length == 0) {
                            sap.m.MessageBox.warning("Select at least one record");
                            return;
                        }
                        this.getView().byId("idNewPersonalNo").setValue("");
                        this.getView().byId("idNewSalesOfc").setValue("");
                        this.getView().byId("idNewSalesGroup").setValue("");
                        this.getView().byId("idNewSalesDist").setValue("");
                    this.oManualDialog.open();
                }
                
            },
            onMassSaveRel:function(oEvent){
                if (!this.byId("_IdDialogManual")) {
                    Fragment.load({
                        id: this.getView().getId(),
                        name: "zrealignreport.zrealignreport.fragment.MassSave",
                        controller: this
                    }).then(function (oDialog) {
                        this.getView().addDependent(oDialog);
                        this.oManualDialog = oDialog;
                       var oSelectedIndices = this.getView().byId("idRelCategory").getTable().getSelectedIndices();
                        if (oSelectedIndices.length == -1 || oSelectedIndices.length == 0) {
                            sap.m.MessageBox.warning("Select at least one record");
                            return;
                        }
                        this.getView().byId("idNewPersonalNo").setValue("");
                        this.getView().byId("idNewSalesOfc").setValue("");
                        this.getView().byId("idNewSalesGroup").setValue("");
                        this.getView().byId("idNewSalesDist").setValue("");
                        oDialog.open();
                    }.bind(this));
                } else {
                    var oSelectedIndices = this.getView().byId("idRelCategory").getTable().getSelectedIndices();
                        if (oSelectedIndices.length == -1 || oSelectedIndices.length == 0) {
                            sap.m.MessageBox.warning("Select at least one record");
                            return;
                        }
                        this.getView().byId("idNewPersonalNo").setValue("");
                        this.getView().byId("idNewSalesOfc").setValue("");
                        this.getView().byId("idNewSalesGroup").setValue("");
                        this.getView().byId("idNewSalesDist").setValue("");
                    this.oManualDialog.open();
                }
                
            },
            onDialogManualClose: function () {
                this.oManualDialog.close();
            },
            onDialogManualUpdate: function (oEvent) {
                var that = this;
                var oSelectedIndices,oTabRows;
                var updatedMassdata = this.getView().getModel("MassDataModel").getData();
                var vComboboxText = this.getView().byId("idSelectionChange").getSelectedKey();
                if(vComboboxText==="BusinessPartnerRB"){
                    oTabRows = this.getView().byId("idRelCategory").getTable().getRows();
                    var oTabObject = this.getView().byId("idRelCategory").getTable();
                    oSelectedIndices = this.getView().byId("idRelCategory").getTable().getSelectedIndices();
                    for(var i=0;i<oSelectedIndices.length;i++){
                        oTabObject.getRows()[oSelectedIndices[i]].getCells().forEach((data,index)=>{
                            try {
                                var id = data.sId.split("Report--")[1].split("-")[0];
                            } catch (error) {
                                
                            }
                            if (id){
                                if (id === "IdNewPernoInpRel"){
                                    data.setValue(updatedMassdata.NewPersonalNo);
                                }
                                if (id === "idNewSalesOfcInpRel"){
                                    data.setValue(updatedMassdata.NewSalesOfc);
                                }
                                if (id === "idNewSalesGroupInpRel"){
                                    data.setValue(updatedMassdata.NewSalesGroup);
                                }
                                if (id === "idNewSalesDistInpRel"){
                                    data.setValue(updatedMassdata.NewSalesDist);
                                }
                            }
                            
                        });
                    }          
                  }else{
                  var oTabObject = this.getView().byId("idSalesOrder").getTable();
                    oSelectedIndices = this.getView().byId("idSalesOrder").getTable().getSelectedIndices();
                    for(var i=0;i<oSelectedIndices.length;i++){
                        oTabObject.getRows()[oSelectedIndices[i]].getCells().forEach((data,index)=>{
                            try {
                                var id = data.sId.split("Report--")[1].split("-")[0];
                            } catch (error) {
                                
                            }
                            if (id){
                                if (id === "IdNewPernoInp"){
                                    data.setValue(updatedMassdata.NewPersonalNo);
                                }
                                if (id === "idNewSalesOfcInp"){
                                    data.setValue(updatedMassdata.NewSalesOfc);
                                }
                                if (id === "idNewSalesGroupInp"){
                                    data.setValue(updatedMassdata.NewSalesGroup);
                                }
                                if (id === "idNewSalesDistInp"){
                                    data.setValue(updatedMassdata.NewSalesDist);
                                }
                            }
                            
                        });
                    }          
                  }
                //   if(oSelectedIndices.length>0){
                //     var oEntity = {
                //       OpenSalesOrderRB:"",
                //       BusinessPartnerRB:""
                //     };                 
                              
                this.oManualDialog.close();
                  


                
            },
            handleFileChange: function (e) {
                this._import(e.getParameter("files") && e.getParameter("files")[0]);
                if (!this.byId("_IdDialogManualUpload")) {
                    Fragment.load({
                        id: this.getView().getId(),
                        name: "zrealignreport.zrealignreport.fragment.UploadFile",
                        controller: this
                    }).then(function (oDialog) {
                        this.getView().addDependent(oDialog);
                        this.oManualDialog = oDialog;
                        oDialog.open();
                    }.bind(this));
                } else {
                    this.oManualDialog.open();
                }
            },
            onDialogUploadClose: function () {
                this.oManualDialog.close();
                sap.m.MessageBox.information("Please Click on Save");

            },
            handleFileChange2: function (e) {
                this._import(e.getParameter("files") && e.getParameter("files")[0]);
                if (!this.byId("_IdDialogManualUpload2")) {
                    Fragment.load({
                        id: this.getView().getId(),
                        name: "zrealignreport.zrealignreport.fragment.UploadFile2",
                        controller: this
                    }).then(function (oDialog1) {
                        this.getView().addDependent(oDialog1);
                        this.oManualDialog1 = oDialog1;
                        oDialog1.open();
                    }.bind(this));
                } else {
                    this.oManualDialog1.open();
                }
            },
            onDialogUploadClose2: function () {
                this.oManualDialog1.close();
                sap.m.MessageBox.information("Please Click on Save");

            },
    
            _import: function (file) {
                var that = this;
                var excelData = {};
                if (file && window.FileReader) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var wb = XLSX.read(data, { type: 'binary', cellDates: true, dateNF: 'mm/dd/yyyy' });
                        var excelData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { range: 0 });
                        console.log(excelData);
                        // var xlData = XLSX.read(data, {
                        //     type: 'binary'
                        // });
                        // xlData.SheetNames.forEach(function (sheetName) {
                        //     // Here is your object for every sheet in xlData
                        //     excelData = XLSX.utils.sheet_to_row_object_array(xlData.Sheets[sheetName]);
    
                        // });
                        // Setting the data to the local model 
                        that.localModel.setData({
                            items: excelData
                        });
                        that.localModel.refresh(true);
                    };
                    reader.onerror = function (ex) {
                        console.log(ex);
                    };
                    reader.readAsBinaryString(file);
                }
            },
            onValueHelpRequest: function (oEvent) {
                this._oInput = oEvent.getSource();
                var sInputValue = oEvent.getSource().getValue(),
                    oView = this.getView();
    
                if (!this._pValueHelpDialog) {
                    this._pValueHelpDialog = Fragment.load({
                        id: oView.getId(),
                        name: "zrealignreport.zrealignreport.fragment.ValueHelpDialogPerNo",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this._pValueHelpDialog.then(function(oDialog) {
                    // Create a filter for the binding
                    oDialog.getBinding("items").filter([new Filter("PERSONNELNUMBER", FilterOperator.Contains, sInputValue)]);
                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open(sInputValue);
                });
            },
            onValueHelpClose: function (oEvent) {
                var oSelectedItem = oEvent.getParameter('selectedItem').getBindingContext().getObject();
                oEvent.getSource().getBinding("items").filter([]);
    
                if (!oSelectedItem) {
                    return;
                }
    
                this._oInput.setValue(oSelectedItem.PERSONNELNUMBER);
            },
                      
            onValueHelpRequested2: function(oEvent){
                this._oMultiInput= oEvent.getSource();
                this._oBasicSearchField = new SearchField();
                var that= this;
                var oView = this.getView(); 
                Fragment.load({
                    name: "zrealignreport.zrealignreport.fragment.ValueHelpDialogPerNo",
                    controller: this
                }).then(function name(oFragment) {

                    that._oVHD = oFragment;
                    that.getView().addDependent(that._oVHD);
                    that._oVHD.getFilterBar().setBasicSearch(that._oBasicSearchField);
                    that._oVHD.setEscapeHandler(function (oFrag){
                        //
                    });
                    that._oBasicSearchField.attachSearch(function() {
                        that._oVHD.getFilterBar().search();
                    });
                    
                    that._oVHD.getTableAsync().then(function (oTable) {
                        
                        var oDataModel = that.getOwnerComponent().getModel();
                        oTable.setModel(oDataModel);
                        if (oTable.bindRows) {
                            oTable.bindAggregation("rows", {
                                path: "/PersonalNoVHSet",
                                events: {
                                    dataReceived: function() {
                                        that._oVHD.update();
                                    }
                                }
                            });
                            oTable.addColumn(new UIColumn({label: "Personal Number", template: "PERSONNELNUMBER"}));
                            oTable.addColumn(new UIColumn({label: "Employee's Name", template: "DFSOBJECTSHORTNAME"}));
                            oTable.addColumn(new UIColumn({label: "Formatted Name of Employee or Applicant", template: "EMPLOYEENAME"}));
                        }
                       that._oVHD.update();
                    }.bind(that));

                    that._oVHD.open();
                }.bind(that));
            },
            onValueHelpOkPress: function (oEvent) {
                var aTokens = oEvent.getParameter("tokens")[0].mProperties.key
                this._oMultiInput.setValue(aTokens)
                this._oVHD.close();
            },
    
            onValueHelpCancelPress: function () {
                this._oVHD.destroy();
            },
            onFilterBarSearchPer: function (oEvent) {
                var sSearchQuery = this._oBasicSearchField.getValue(),
                    aSelectionSet = oEvent.getParameter("selectionSet");
    
                var aFilters = aSelectionSet.reduce(function (aResult, oControl) {
                    if (oControl.getValue()) {
                        aResult.push(new Filter({
                            path: oControl.getName(),
                            operator: FilterOperator.Contains,
                            value1: oControl.getValue()
                        }));
                    }
    
                    return aResult;
                }, []);
    
                aFilters.push(new Filter({
                    filters: [
                        new Filter({ path: "PERSONNELNUMBER", operator: FilterOperator.Contains, value1: sSearchQuery }),
                        new Filter({ path: "DFSOBJECTSHORTNAME", operator: FilterOperator.Contains, value1: sSearchQuery }),
                        new Filter({ path: "EMPLOYEENAME", operator: FilterOperator.Contains, value1: sSearchQuery })
                    ],
                    and: false
                }));
    
                this._filterTable(new Filter({
                    filters: aFilters,
                    and: true
                }));
            },          
                       
            _filterTable: function (oFilter) {
                var oVHD = this._oVHD;
    
                oVHD.getTableAsync().then(function (oTable) {
                    if (oTable.bindRows) {
                        oTable.getBinding("rows").filter(oFilter);
                    }
                    if (oTable.bindItems) {
                        oTable.getBinding("items").filter(oFilter);
                    }
    
                    // This method must be called after binding update of the table.
                    oVHD.update();
                });
            },

            onValueHelpRequestedSalesOfc: function(oEvent){
                this._oMultiInputsales= oEvent.getSource();
                this._oBasicSearchFieldSalesOffc = new SearchField();
                var that= this;
                var oView = this.getView(); 
                Fragment.load({
                    name: "zrealignreport.zrealignreport.fragment.ValueHelpDialogSalesOfc",
                    controller: this
                }).then(function name(oFragmentSales) {

                    that._oVHDSalesOfc = oFragmentSales;
                    that.getView().addDependent(that._oVHDSalesOfc);

                    // that._oVHDSalesOfc.setRangeKeyFields([{
                    //     label: "Sales",
                    //     key: "VKBUR",
                    //     type: "string",
                    //     typeInstance: new TypeString({}, {
                    //         maxLength: 7
                    //     })
                    // }]);


                    that._oVHDSalesOfc.getFilterBar().setBasicSearch(that._oBasicSearchFieldSalesOffc);
                    that._oVHDSalesOfc.setEscapeHandler(function (oFrag){
                        //
                    });
                    that._oBasicSearchFieldSalesOffc.attachSearch(function() {
                        that._oVHDSalesOfc.getFilterBar().search();
                    });
                    
                    that._oVHDSalesOfc.getTableAsync().then(function (oTable) {
                        
                        var oDataModel = that.getOwnerComponent().getModel();
                        oTable.setModel(oDataModel);
                        if (oTable.bindRows) {
                            oTable.bindAggregation("rows", {
                                path: "/SalesOfcVHSet",
                                events: {
                                    dataReceived: function() {
                                        that._oVHDSalesOfc.update();
                                    }
                                }
                            });
                            oTable.addColumn(new UIColumn({label: "Sales Office", template: "VKBUR"}));
                            oTable.addColumn(new UIColumn({label: "Description", template: "BEZEI"}));
                        }
                       that._oVHDSalesOfc.update();
                    }.bind(that));

                    that._oVHDSalesOfc.open();
                }.bind(that));
            },
            onValueHelpSalesOfcOkPress: function (oEvent) {
                var aTokens = oEvent.getParameter("tokens")[0].mProperties.key
                this._oMultiInputsales.setValue(aTokens)
                this._oVHDSalesOfc.close();
            },
    
            onValueHelpSalesOfcCancelPress: function () {
                this._oVHDSalesOfc.destroy();
            },
            onFilterBarSearchSalesOfc: function (oEvent) {
                var sSearchQuery = this._oBasicSearchFieldSalesOffc.getValue(),
                    aSelectionSet = oEvent.getParameter("selectionSet");
    
                var aFiltersSalesGrp = aSelectionSet.reduce(function (aResult, oControl) {
                    if (oControl.getValue()) {
                        aResult.push(new Filter({
                            path: oControl.getName(),
                            operator: FilterOperator.Contains,
                            value1: oControl.getValue()
                        }));
                    }
    
                    return aResult;
                }, []);
    
                aFiltersSalesGrp.push(new Filter({
                    filters: [
                        new Filter({ path: "VKBUR", operator: FilterOperator.Contains, value1: sSearchQuery }),
                        new Filter({ path: "BEZEI", operator: FilterOperator.Contains, value1: sSearchQuery })
                    ],
                    and: false
                }));
    
                this._filterTableSalesOfc(new Filter({
                    filters: aFiltersSalesGrp,
                    and: true
                }));
            },
            _filterTableSalesOfc: function (oFilter) {
                var oVHD = this._oVHDSalesOfc;
    
                oVHD.getTableAsync().then(function (oTable) {
                    if (oTable.bindRows) {
                        oTable.getBinding("rows").filter(oFilter);
                    }
                    if (oTable.bindItems) {
                        oTable.getBinding("items").filter(oFilter);
                    }
    
                    // This method must be called after binding update of the table.
                    oVHD.update();
                });
            },
            onValueHelpRequestedSalesGrp: function(oEvent){
                this._oMultiInputsalesGrp= oEvent.getSource();
                this._oBasicSearchField = new SearchField();
                var that= this;
                var oView = this.getView(); 
                Fragment.load({
                    name: "zrealignreport.zrealignreport.fragment.ValueHelpDialogSalesGrp",
                    controller: this
                }).then(function name(oFragment) {

                    that._oVHD = oFragment;
                    that.getView().addDependent(that._oVHD);
                    that._oVHD.getFilterBar().setBasicSearch(that._oBasicSearchField);
                    that._oVHD.setEscapeHandler(function (oFrag){
                        //
                    });
                    that._oBasicSearchField.attachSearch(function() {
                        that._oVHD.getFilterBar().search();
                    });
                    
                    that._oVHD.getTableAsync().then(function (oTable) {
                        
                        var oDataModel = that.getOwnerComponent().getModel();
                        oTable.setModel(oDataModel);
                        if (oTable.bindRows) {
                            oTable.bindAggregation("rows", {
                                path: "/SalesGrpVHSet",
                                events: {
                                    dataReceived: function() {
                                        that._oVHD.update();
                                    }
                                }
                            });
                            oTable.addColumn(new UIColumn({label: "Sales Group", template: "VKGRP"}));
                            oTable.addColumn(new UIColumn({label: "Description", template: "BEZEI"}));
                        }
                       that._oVHD.update();
                    }.bind(that));

                    that._oVHD.open();
                }.bind(that));
            },
            onValueHelpSalesGrpOkPress: function (oEvent) {
                var aTokens = oEvent.getParameter("tokens")[0].mProperties.key
                this._oMultiInputsalesGrp.setValue(aTokens)
                this._oVHD.close();
            },
    
            onValueHelpSalesGrpCancelPress: function () {
                this._oVHD.destroy();
            },
            onFilterBarSearchSalesGrp: function (oEvent) {
                var sSearchQuery = this._oBasicSearchField.getValue(),
                    aSelectionSet = oEvent.getParameter("selectionSet");
    
                var aFilters = aSelectionSet.reduce(function (aResult, oControl) {
                    if (oControl.getValue()) {
                        aResult.push(new Filter({
                            path: oControl.getName(),
                            operator: FilterOperator.Contains,
                            value1: oControl.getValue()
                        }));
                    }
    
                    return aResult;
                }, []);
    
                aFilters.push(new Filter({
                    filters: [
                        new Filter({ path: "VKGRP", operator: FilterOperator.Contains, value1: sSearchQuery }),
                        new Filter({ path: "BEZEI", operator: FilterOperator.Contains, value1: sSearchQuery })
                    ],
                    and: false
                }));
    
                this._filterTableGrp(new Filter({
                    filters: aFilters,
                    and: true
                }));
            },          
                       
            _filterTableGrp: function (oFilter) {
                var oVHD = this._oVHD;
    
                oVHD.getTableAsync().then(function (oTable) {
                    if (oTable.bindRows) {
                        oTable.getBinding("rows").filter(oFilter);
                    }
                    if (oTable.bindItems) {
                        oTable.getBinding("items").filter(oFilter);
                    }
    
                    // This method must be called after binding update of the table.
                    oVHD.update();
                });
            },
            onValueHelpRequestedSalesDis: function(oEvent){
                this._oMultiInputsalesDis= oEvent.getSource();
                this._oBasicSearchField = new SearchField();
                var that= this;
                var oView = this.getView(); 
                Fragment.load({
                    name: "zrealignreport.zrealignreport.fragment.ValueHelpDialogSalesDis",
                    controller: this
                }).then(function name(oFragment) {

                    that._oVHD = oFragment;
                    that.getView().addDependent(that._oVHD);
                    that._oVHD.getFilterBar().setBasicSearch(that._oBasicSearchField);
                    that._oVHD.setEscapeHandler(function (oFrag){
                        //
                    });
                    that._oBasicSearchField.attachSearch(function() {
                        that._oVHD.getFilterBar().search();
                    });
                    
                    that._oVHD.getTableAsync().then(function (oTable) {
                        
                        var oDataModel = that.getOwnerComponent().getModel();
                        oTable.setModel(oDataModel);
                        if (oTable.bindRows) {
                            oTable.bindAggregation("rows", {
                                path: "/SalesDistVHSet",
                                events: {
                                    dataReceived: function() {
                                        that._oVHD.update();
                                    }
                                }
                            });
                            oTable.addColumn(new UIColumn({label: "Sales District", template: "BZIRK"}));
                            oTable.addColumn(new UIColumn({label: "District Name", template: "BZTXT"}));
                        }
                       that._oVHD.update();
                    }.bind(that));

                    that._oVHD.open();
                }.bind(that));
            },
            onValueHelpSalesDisOkPress: function (oEvent) {
                var aTokens = oEvent.getParameter("tokens")[0].mProperties.key
                this._oMultiInputsalesDis.setValue(aTokens)
                this._oVHD.close();
            },
    
            onValueHelpSalesDisCancelPress: function () {
                this._oVHD.destroy();
            },
            onFilterBarSearchSalesDist: function (oEvent) {
                var sSearchQuery = this._oBasicSearchField.getValue(),
                    aSelectionSet = oEvent.getParameter("selectionSet");
    
                var aFilters = aSelectionSet.reduce(function (aResult, oControl) {
                    if (oControl.getValue()) {
                        aResult.push(new Filter({
                            path: oControl.getName(),
                            operator: FilterOperator.Contains,
                            value1: oControl.getValue()
                        }));
                    }
    
                    return aResult;
                }, []);
    
                aFilters.push(new Filter({
                    filters: [
                        new Filter({ path: "BZIRK", operator: FilterOperator.Contains, value1: sSearchQuery }),
                        new Filter({ path: "BZTXT", operator: FilterOperator.Contains, value1: sSearchQuery })
                    ],
                    and: false
                }));
    
                this._filterTableDist(new Filter({
                    filters: aFilters,
                    and: true
                }));
            },          
                       
            _filterTableDist: function (oFilter) {
                var oVHD = this._oVHD;
    
                oVHD.getTableAsync().then(function (oTable) {
                    if (oTable.bindRows) {
                        oTable.getBinding("rows").filter(oFilter);
                    }
                    if (oTable.bindItems) {
                        oTable.getBinding("items").filter(oFilter);
                    }
    
                    // This method must be called after binding update of the table.
                    oVHD.update();
                });
            },
            handleChange: function (dateTime) {
               if (dateTime!== undefined && dateTime!== null && dateTime!== "") {
                    var dateFormat= sap.ui.core.format.DateFormat.getDateInstance({
                        path: 'NewValidToDate',
                        type: 'sap.ui.model.type.Date',
                        formatOptions: {UTC:true},
                        strictParsing: true,
                        pattern: "yyyy/MM/dd"
                    });
                    var originalDate = dateFormat.format(new Date(dateTime));
                    return originalDate ;
                }
                return null;
                
            },
        //     onBeforeExport: function (oEvt) {
        //         var mExcelSettings = oEvt.getParameter("exportSettings");
        //         mExcelSettings.workbook.columns[2].type= sap.ui.export.EdmType.Date;
        //         mExcelSettings.workbook.columns[2].width= 10;
        //         mExcelSettings.workbook.columns[2].inputFormat= "yyyy/MM/dd";
        //         // GW export
        //         if (mExcelSettings.url) {
        //             return;
        //         }
        // }
            
        });
    });
