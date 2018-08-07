

var app = angular.module('OpenPO', ['ngRoute', 'ngAnimate', 'long2know', 'ui.grid', 'ui.grid.exporter', 'ui.grid.pagination', 'ui.grid.resizeColumns', 'ngMaterial', 'cgBusy', 'ui.bootstrap']);

app.controller('HomeController', function ($scope, $http, $rootScope,$filter, $mdDialog, $mdMedia, $timeout, uiGridExporterConstants, uiGridConstants, $q, $mdSidenav) {

    //$scope.envurl = ''; //local
   // $scope.envurl = '/OpenPO_dev'; //dev
    $scope.envurl = '/OpenPO'; // prod

    $scope.refreshdate = '';
    $scope.nonsupplier = true;
    $scope.controlsshow = true;
    $scope.dropdownloader = true;
    $scope.showgrid = false;
    $scope.downloadTableDataBtn = true;
    window.onbeforeunload = function () { window.scrollTo(0, 0); }
    $scope.openLeftMenu = function () {
        $mdSidenav('left').toggle();
    };

    $scope.openRightMenu = function () {
        $mdSidenav('right').toggle();
    };


    $scope.OpenPOgridOptions = {
        enableSelectAll: false,
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableGridMenu: true,
        enableSorting: false,
        exporterCsvFilename: 'OpenPOReport.csv',
        exporterExcelFilename: 'OpenPOReport.xlsx',
        exporterExcelSheetName: 'OpenPO',
        exporterMenuPdf: false,
        enableFiltering: false,
        showGridFooter: true,
        paginationPageSizes: [10, 25, 50, 75],
        paginationPageSize: 10,
        // useExternalPagination: true,
        enableExpandable: true,

        onRegisterApi: function (gridApi) {

            $scope.OpenPOgridApi = gridApi;
        }

    };

    $scope.OpenPOgridOptions.columnDefs = [
        { field: 'plantcd', displayName: 'Plant Code', width: '70' },
        { field: 'pocd', displayName: 'PO Code', width: '100' },
        { field: 'polcd', displayName: 'POL Code', width: '100' },
        { field: 'poschedulelncd', displayName: 'PO Schedule Line Code', width: '100' },
        { field: 'postatus', displayName: 'PO Status', width: '100' },
        { field: 'po_type', displayName: 'PO Type', width: '100' },
        { field: 'polnitemcatgcd', displayName: 'PO Line item Category Code', width: '100' },
        { field: 'materialnum', displayName: 'Material Number', width: '100' },
        { field: 'materialdesc', displayName: 'Material Description', width: '200' },
        { field: 'shortdesc', displayName: 'Short Description', width: '200' },
        { field: 'materialstatus', displayName: 'Material Status', width: '70' },
        { field: 'Materialgrpcd', displayName: 'Material Group Code', width: '100' },
        { field: 'storageloccd', displayName: 'Storage Location', width: '100' },
        { field: 'crtclpartind', displayName: ' Critical Part', width: '70' },
        { field: 'prcrmnttype', displayName: 'Procurement Type', width: '100' },
        { field: 'prchsgdoctypecd', displayName: 'Purchasing Document Type Code', width: '100' },
        { field: 'prchsggrpcd', displayName: 'Purchasing Group Code', width: '95' },
        { field: 'prchsgrpmngr', displayName: 'Purchasing Group Manager', width: '100' },
        { field: 'prchsgrpdirector', displayName: 'Purchasing Group Director', width: '100' },
        { field: 'PrchsgGrpName', displayName: 'Purchasing Group Name', width: '100' },
        { field: 'PrchsgGrpDesc', displayName: 'Purchasing Group Description', width: '100' },
        { field: 'planneddlvrydays', displayName: 'Planned Delivery Days', width: '100' },
        { field: 'ss', displayName: 'Safety Stock', width: '70' },
        { field: 'pripbg', displayName: 'Max PBG', width: '100' },


        { field: 'vendorcd', displayName: 'Vendor Code', width: '100' },
        { field: 'vendorname1', displayName: 'Vendor Name', width: '200' },
        //{ field: 'vendorname2', displayName: 'Vendor Name2', width: '100' },
        { field: 'parentsuppliername', displayName: 'Parent Supplier Name', width: '150' },
        { field: 'suppliersitename', displayName: 'Supplier Site Name', width: '200' },
        { field: 'orddate', displayName: 'Order Date', width: '100', cellFilter: 'date:\'MM-dd-yyyy\'' },
        { field: 'cmmitdate', displayName: 'Commit Date', width: '100', cellFilter: 'date:\'MM-dd-yyyy\'' },
        { field: 'orgnlcmmitdate', displayName: 'Original Commit Date', width: '100', cellFilter: 'date:\'MM-dd-yyyy\'' },
        { field: 'needbydate', displayName: 'Needby Date', width: '100', cellFilter: 'date:\'MM-dd-yyyy\'' },
        { field: 'dlvrydate', displayName: 'Delivery Date', width: '100', cellFilter: 'date:\'MM-dd-yyyy\'' },
        { field: 'orgnldlvrydate', displayName: 'Original Delivery Date', width: '100', cellFilter: 'date:\'MM-dd-yyyy\'' },
        { field: 'openqty', displayName: 'Open Quantity', width: '100' },
        { field: 'schldqty', displayName: 'Scheduled Quantity', width: '100' },
        { field: 'goodsrcvdqty', displayName: 'Goods Received Quantity', width: '100' },
        { field: 'dueqty', displayName: 'Due Quantity', width: '100' },
        { field: 'Unit_Price', displayName: 'Unit Price', width: '100' },
        { field: 'Extended_Cost', displayName: 'Extended Cost', width: '100' },
        { field: 'dlvrdqty', displayName: 'Delivered Quantity', width: '100' },
        { field: 'prevqty', displayName: 'Previous Quantity', width: '100' },
       // { field: 'materialcost', displayName: 'Material Cost', width: '100' },
        //{ field: 'currcd', displayName: 'Currency Code', width: '100' },
        { field: 'mrpqtyrdcd', displayName: 'MRP Quantity Reduced', width: '100' },
        { field: 'blkmaterialind', displayName: 'Bulk Material Indicator', width: '100' },
        { field: 'spclprcrmnttype', displayName: 'Special Procurement Type', width: '100' },
        { field: 'PACE', displayName: 'PACE', width: '100' },
        { field: 'dcvdpct', displayName: 'DCVD', width: '100' },
        { field: 'aldpct', displayName: 'ALD', width: '100' },
        { field: 'etchpct', displayName: 'ETCH', width: '100' },
        { field: 'srppct', displayName: 'SRP', width: '100' },
        { field: 'cmppct', displayName: 'CMP', width: '100' },
        { field: 'feppct', displayName: 'FEP', width: '100' },
        { field: 'mdppct', displayName: 'MDC', width: '100' },
        { field: 'ppcpct', displayName: 'PPC', width: '100' },
        { field: 'varianpct', displayName: 'VARIAN', width: '100' },
        { field: 'pdcpct', displayName: 'PDC', width: '100' },
        { field: 'epgsilcnpct', displayName: 'EPG Silicon', width: '100' },
        { field: 'epgpdcpct', displayName: 'EPG PDC', width: '100' },
        { field: 'epgfespct', displayName: 'EPG FES', width: '100' },
        { field: 'epgmpsmaskpct', displayName: 'EPG MPS Mask', width: '100' },
        { field: 'epgmmipct', displayName: 'EPG MMI', width: '100' },
        { field: 'smgpct', displayName: 'SMG', width: '100' },
        { field: 'agspct', displayName: 'AGS', width: '100' },
        { field: 'implantpct', displayName: 'IMPLANT', width: '100' },
        { field: 'sesrvcspct', displayName: 'SESRCVS', width: '100' },

        { field: 'unknownpct', displayName: 'UNKNOWN', width: '100' },
        { field: 'dwhcdate', displayName: 'DWH CreatedDate', width: '100', cellFilter: 'date:\'MM-dd-yyyy\'' },
        { field: 'dwhudate', displayName: 'DWH UpdatedDate', width: '100', cellFilter: 'date:\'MM-dd-yyyy\'' },
        //{ field: 'rflg', displayName: '', width: '30' },
        //{ field: 'delflg', displayName: '', width: '100' },

        //{ field: 'netprice', displayName: 'Net Price', width: '100' },
        { field: 'planneddlvrytimeindays', displayName: 'Planned Delivery Time in Days', width: '100' },
        { field: 'invcatgcd', displayName: 'Inventory Category Code', width: '100' },
        { field: 'materialtypecd', displayName: 'Material Type Code', width: '100' },
        { field: 'useritemtype', displayName: 'User Item Type', width: '100' },

        { field: 'excptnmsgnum', displayName: 'Exception Message Number', width: '100' },

        { field: 'rvnlvl', displayName: 'Revision Level', width: '100' },
        { field: 'ppvcd', displayName: 'PPV Code', width: '100' },

        { field: 'splyactn', displayName: 'Supply Action', width: '100' },

        { field: 'accassgnmtcatgmm', displayName: 'Account Assignment Category MM', width: '100' },

        { field: 'days_past_due', displayName: 'Days Past Due', width: '100' }, 
        { field: 'current_sng_status', displayName: 'Current SNG Status', width: '100' },
        { field: 'extractdate', displayName: 'Extract Date', width: '100', cellFilter: 'date:\'MM-dd-yyyy\'' },

    ];


    $scope.dropdownsettings = { checkBoxes: true, enableSearch: true };
   

    $scope.Getdropdownvalues = function () {
        $scope.dropdownloader = true;
        $http({
            method: 'get',
            url: $scope.envurl + '/api/values',
            //url: '/OpenPO_dev/api/values',

            headers: { 'Access-Control-Allow-Origin': '*' }
        }).then(function (response) {
            console.log(angular.fromJson(response.data));

            $scope.OpenPOgridOptions.data = [];
            $scope.dropdowndata = response.data;
            $scope.pripbgoptions = angular.fromJson($scope.dropdowndata.pripbg);
            $scope.plantcdoptions = angular.fromJson(response.data.plantcd);
            $scope.potypeoptions = angular.fromJson(response.data.potype);
            $scope.plannernameoptions = angular.fromJson(response.data.plannername);
            $scope.plannermanageroptions = angular.fromJson(response.data.plannermanager);
            $scope.plannerdirectoroptions = angular.fromJson(response.data.plannerdirector);
            $scope.suppliersitenameoptions = angular.fromJson(response.data.suppliersitename);
            $scope.ParentSupplierNameoptions = angular.fromJson(response.data.ParentSupplierName);
            $scope.dropdownloader = false;
        }, function (error) {
            console.log(error, 'can not get dropdown values.');
            $scope.dropdownloader = false;
            alert('Error in loading dropdwon content please reload')
        });

    };
    $scope.Getdropdownvalues();
    $scope.togglecontrols = function () {
        if ($scope.controlsshow) {
            $scope.controlsshow = false;
        }
        else { $scope.controlsshow = true; }
    };
    $scope.GetReport = function () {
        $scope.norecords = false;
        $scope.downloadTableDataBtn = true;

        $scope.showgrid = false;
        var pbg = [$scope.pripbgselection];
        var pripbg = '';
        for (i = 0; i < pbg[0].length; i++) {
            pripbg += pbg[0][i].pripbg + '#';
        }
        pripbg = pripbg.replace(/#\s*$/, "");
        console.log('pripbg', pripbg.length);
        var plantcd = [$scope.plantcdselection];
        var plantcdselect = '';
        for (i = 0; i < plantcd[0].length; i++) {

            plantcdselect += plantcd[0][i].plantcd + '#';
        }
        plantcdselect = plantcdselect.replace(/#\s*$/, "");

        var potype = [$scope.potypeselection];
        var potypeselect = '';
        for (i = 0; i < potype[0].length; i++) {

            potypeselect += potype[0][i].potype + '#';
        }
        potypeselect = potypeselect.replace(/#\s*$/, "");

        var plannername = [$scope.plannernameselection];
        var plannernameselect = '';
        for (i = 0; i < plannername[0].length; i++) {

            plannernameselect += plannername[0][i].plannername.replace("'", "''''") + '#';

        }
        plannernameselect = plannernameselect.replace(/#\s*$/, "");
        var plannermanager = [$scope.plannermanagerselection];
        var plannermanagerselect = '';
        for (i = 0; i < plannermanager[0].length; i++) {

            plannermanagerselect += plannermanager[0][i].plannermanager.replace("'", "''''") + '#';

        }
        plannermanagerselect = plannermanagerselect.replace(/#\s*$/, "");
        var plannerdirector = [$scope.plannerdirectorselection];
        var plannerdirectorselect = '';
        for (i = 0; i < plannerdirector[0].length; i++) {

            plannerdirectorselect += plannerdirector[0][i].plannerdirector.replace("'", "''''") + '#';

        }
        plannerdirectorselect = plannerdirectorselect.replace(/#\s*$/, "");

        var suppliersitename = [$scope.suppliersitenameselection];
        var suppliersitenameselect = '';
        for (i = 0; i < suppliersitename[0].length; i++) {

            suppliersitenameselect += suppliersitename[0][i].suppliersitename.replace("'", "''''") + '#';

        }
        suppliersitenameselect = suppliersitenameselect.replace(/#\s*$/, "");

        var ParentSupplierName = [$scope.ParentSupplierNameselection];
        var ParentSupplierNameselect = '';
        for (i = 0; i < ParentSupplierName[0].length; i++) {

            ParentSupplierNameselect += ParentSupplierName[0][i].ParentSupplierName.replace("'", "''''") + '#';

        }
        ParentSupplierNameselect = ParentSupplierNameselect.replace(/#\s*$/, "");

        var materialnumselect = $scope.materialnum;
        if (typeof (materialnumselect) === "undefined") { materialnumselect = '' }
        var ponumselect = $scope.ponum;
        if (typeof (ponumselect) === "undefined") { ponumselect = '' }

        if (materialnumselect.length === 0
            && ponumselect.length === 0 && pripbg.length === 0
            && plantcdselect.length === 0 && potypeselect.length === 0
            && plannernameselect.length === 0 && plannermanagerselect.length === 0 && plannerdirectorselect.length === 0
            && ParentSupplierNameselect.length === 0 && suppliersitenameselect.length === 0

        ) {
            alert('Please select atleast one filter');
        }
        else if (
            ($scope.plantcdoptions.length === plantcdselect.split("#").length || plantcdselect.length === 0)
            && ($scope.pripbgoptions.length === pripbg.split("#").length || pripbg.length === 0)
            && ($scope.potypeoptions.length === potypeselect.split("#").length || potypeselect.length === 0)
            && ($scope.plannernameoptions.length === plannernameselect.split("#").length || plannernameselect.length === 0)
            && materialnumselect.length === 0
            && ($scope.plannermanageroptions.length === plannermanagerselect.split("#").length || plannermanagerselect.length === 0)
            && ponumselect.length === 0
            && ($scope.plannerdirectoroptions.length === plannerdirectorselect.split("#").length || plannerdirectorselect.length === 0)
            && ($scope.suppliersitenameoptions.length === suppliersitenameselect.split("#").length || suppliersitenameselect.length === 0)
            && ($scope.ParentSupplierNameoptions.length === ParentSupplierNameselect.split("#").length || ParentSupplierNameselect.length === 0)
        ) {
            alert('Please change filter selection, selecting all in all filters is not allowed')
        }

        else {
            console.log($scope.plantcdoptions.length);
            console.log(pripbg.split("#").length);
            $scope.loadingstatus = true;
            var data = { materialnum: materialnumselect, ponum: ponumselect, pripbg: pripbg, plantcd: plantcdselect, potype: potypeselect, plannername: plannernameselect, plannermanager: plannermanagerselect, plannerdirector: plannerdirectorselect, suppliersitename: suppliersitenameselect, parentsuppliername: ParentSupplierNameselect }
            console.log(data);
            $http({
                method: 'Post',
                url: $scope.envurl + '/api/values',
                data: data,
                //url: '/OpenPO_dev/api/values',

                headers: { 'Access-Control-Allow-Origin': '*' }
            }).then(function (response) {
                console.log(angular.fromJson(response.data));

                $scope.OpenPOgridOptions.data = [];
                $scope.OpenPOgridOptions.data = angular.fromJson(response.data.OutputData);
                $scope.loadingstatus = false;
                //$scope.controlsshow = false;
                if (angular.fromJson(response.data.OutputData).length === 0
                ) {
                    $scope.norecords = true;
                    $scope.downloadTableDataBtn = true;
                    $scope.showgrid = false;
                    $scope.controlsshow = true;
                }
                else {
                    $scope.norecords = false;

                    $scope.showgrid = true;
                    $scope.downloadTableDataBtn = false;

                }

            }, function (error) {
                console.log(error, 'can not get report data.');
            });
        }



    };
    $scope.downloadExcel = function () {

        $scope.dropdownloader = true;
        var datatodownload = $scope.OpenPOgridOptions.data;

        var datatodownloaddateformatted = datatodownload.map(function (object) {
            var dt = $filter('date')(new Date(object.extractdate.substring(0, 10)), 'MM/dd/yyyy');
            console.log(dt);
            object.extractdate = $filter('date')(new Date(object.extractdate.substring(0, 10)), 'MM/dd/yyyy');
            object.orddate = object.orddate.substring(0, 10);
            object.cmmitdate = object.cmmitdate.substring(0, 10);
            object.orgnlcmmitdate = object.orgnlcmmitdate.substring(0, 10);
            object.needbydate = object.needbydate.substring(0, 10);
            object.dlvrydate = object.dlvrydate.substring(0, 10);
            object.orgnldlvrydate = object.orgnldlvrydate.substring(0, 10);
            object.dwhcdate = object.dwhcdate.substring(0, 10);
            object.dwhudate = object.dwhudate.substring(0, 10);
            return object;
        });
        var datatodownloadwithordering = datatodownloaddateformatted.map(function (elm, key) {
            return {
                'Plant Code': elm['plantcd'],
                'PO Code': elm['pocd'],
                'POL Code': elm['polcd'],
                'PO Schedule Line Code': elm['poschedulelncd'],
                'PO Status': elm['postatus'],
                'PO Type' : elm['po_type'],
                'PO Line item Category Code': elm['polnitemcatgcd'],
                'Material Number': elm['materialnum'],
                'Material Description' : elm['materialdesc'],
                'Short Description': elm['shortdesc'],
                'Material Status': elm['materialstatus'],
                'Material Group Code': elm['Materialgrpcd'],
                'Storage Location': elm['storageloccd'],
                'Critical Part': elm['crtclpartind'],
                'Procurement Type': elm['prcrmnttype'],
                'Purchasing Document Type Code': elm['prchsgdoctypecd'],
                'Purchasing Group Code': elm['prchsggrpcd'],
                'Purchasing Group Manager': elm['prchsgrpmngr'],
                'Purchasing Group Director': elm['prchsgrpdirector'],
                'Purchasing Group Name': elm['PrchsgGrpName'],
                'Purchasing Group Description': elm['PrchsgGrpDesc'],
                'Planned Delivery Days': elm['planneddlvrydays'],
                'Safety Stock': elm['ss'],
                'Max PBG': elm['pripbg'],
                'Vendor Code': elm['vendorcd'],
                'Vendor Name': elm['vendorname1'],

                'Parent Supplier Name': elm['parentsuppliername'],
                'Supplier Site Name': elm['suppliersitename'],
                'Order Date': elm['orddate'],
                'Commit Date': elm['cmmitdate'],
                'Original Commit Date': elm['orgnlcmmitdate'],
                'Needby Date': elm['needbydate'],
                'Delivery Date': elm['dlvrydate'],
                'Original Delivery Date': elm['orgnldlvrydate'],
                'Open Quantity': elm['openqty'],
                'Scheduled Quantity': elm['schldqty'],
                'Goods Received Quantity': elm['goodsrcvdqty'],
                'Due Quantity': elm['dueqty'],
                'Unit Price': elm['Unit_Price'],
                'Extended Cost': elm['Extended_Cost'],
                'Delivered Quantity': elm['dlvrdqty'],
                'Previous Quantity': elm['prevqty'],
                //'Material Cost': elm['materialcost'],
                //'Currency Code': elm['currcd'],
                'MRP Quantity Reduced': elm['mrpqtyrdcd'],
                'Bulk Material Indicator': elm['blkmaterialind'],
                'Special Procurement Type': elm['spclprcrmnttype'],
                'PACE': elm['PACE'],
                'DCVD': elm['dcvdpct'],
                'ALD': elm['aldpct'],
                'ETCH': elm['etchpct'],
                'SRP': elm['srppct'],
                'CMP': elm['cmppct'],
                'FEP': elm['feppct'],
                'MDC': elm['mdppct'],
                'PPC': elm['ppcpct'],
                'VARIAN': elm['varianpct'],
                'PDC': elm['pdcpct'],
                'EPG Silicon': elm['epgsilcnpct'],
                'EPG PDC': elm['epgpdcpct'],
                'EPG FES': elm['epgfespct'],
                'EPG MPS Mask': elm['epgmpsmaskpct'],
                'EPG MMI': elm['epgmmipct'],
                'SMG': elm['smgpct'],
                'AGS': elm['agspct'],
                'IMPLANT': elm['implantpct'],
                'SESRCVS': elm['sesrvcspct'],
                'UNKNOWN': elm['unknownpct'],
                'DWH CreatedDate': elm['dwhcdate'],
                'DWH UpdatedDate': elm['dwhudate'],
                //'Net Price': elm['netprice'],
                'Planned Delivery Time in Days': elm['planneddlvrytimeindays'],
                'Inventory Category Code ': elm['invcatgcd'],
                'Material Type Code': elm['materialtypecd'],
                'User Item Type': elm['useritemtype'],
                'Exception Message Number': elm['excptnmsgnum'],
                'Revision Level': elm['rvnlvl'],
                'PPV Code': elm['ppvcd'],
                'Supply Action': elm['splyactn'],
                'Account Assignment Category MM': elm['accassgnmtcatgmm'],
                'Days Past Due': elm['days_past_due'],
                'Current SNG Status': elm['current_sng_status'],
                'Extract Date': elm['extractdate'],

            };
        });




        var ws = XLSX.utils.json_to_sheet(JSON.parse(angular.toJson(datatodownloadwithordering), 1));
      

        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Open POs');

        XLSX.writeFile(wb, 'Open_PO_Report.xlsx');
        $scope.dropdownloader = false;

    };

    $scope.exportalldata = function () {
        $scope.dropdownloader = true;
        var data = { materialnum: '', ponum: '', pripbg: '', plantcd: '', potype: '', plannername: '', plannermanager: '', plannerdirector: '', suppliersitename: '', parentsuppliername: '' }

        $http({
            method: 'post',
            url: $scope.envurl + '/api/values',
            data: data,
           

            headers: { 'Access-Control-Allow-Origin': '*' }
        }).then(function (response) {
            console.log(angular.fromJson(response.data.OutputData));
            var ws = XLSX.utils.json_to_sheet(JSON.parse(angular.toJson(angular.fromJson(response.data.OutputData)), 1));

            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Open PO');

            XLSX.writeFile(wb, 'Open_PO_Data.xlsx');


            $scope.dropdownloader = false;
        }, function (error) {
            console.log(error, 'can not get data to export');
            $scope.dropdownloader = false;
            alert("can not get data to export, please refresh or issues persist reach gsca_team_india@amat.com")
        });

    };
    $scope.resetDetails = function () {
        $scope.dropdownloader = true;
        $scope.loadingstatus = false;
        $scope.showgrid = false;
        $scope.norecords = false;
        $scope.downloadTableDataBtn = true;

        $scope.ponum = '';
        $scope.materialnum = '';
        $scope.plantcdselection = [];
        $scope.pripbgselection = [];
        $scope.potypeselection = [];
        $scope.suppliersitenameoptions = [];
        $scope.plannernameoptions = [];
        $scope.plannermanageroptions = [];
        $scope.plannerdirectoroptions = [];
        $scope.ParentSupplierNameoptions = [];
        $scope.dropdownloader = false;

    };

    function getUsername() {

        $http({
            method: 'get',
            url: $scope.envurl + '/api/values/1',


            headers: { 'Access-Control-Allow-Origin': '*' }
        }).then(function (response) {
            console.log(angular.fromJson(response.data));
            var result = angular.fromJson(response.data);
            console.log(result[0].nt_name);
            $scope.loggedinuser = result[0].nt_name;
            if (result.length > 0) {
                console.log(result[0].nt_name);

                $scope.loggedinuser = result[0].nt_name;
                $scope.nonsupplier = true;
            }
            else { $scope.nonsupplier = false; }

        }, function (error) {
            console.log(error, 'can not get username.');
        });


    };
    getUsername();

    function getrefreshdate() {

        $http({
            method: 'get',
            url: $scope.envurl + '/api/values/4',


            headers: { 'Access-Control-Allow-Origin': '*' }
        }).then(function (response) {
            console.log(angular.fromJson(response));
            var result = angular.fromJson(response.data);
            console.log(result[0].refreshdate);
            if (result[0].refreshdate.length > 0) {
                $scope.refreshdate = result[0].refreshdate.substring(0, 10);

            }

        }, function (error) {
            console.log(error, 'can not get refreshdate.');
        });


    };
    getrefreshdate();
    function logaccess() {
        $http({
            method: 'get',
            url: $scope.envurl + '/api/values/2',


            headers: { 'Access-Control-Allow-Origin': '*' }
        }).then(function (response) {
            console.log(angular.fromJson(response.data));



        }, function (error) {
            console.log(error, 'can not log access .');
        });
    };
    logaccess();
}
);







