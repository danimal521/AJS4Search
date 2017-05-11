(function (app) {
    var m_vPages = 4;

    app.BikesComponent =
        ng.core.Component({
            selector: 'bikes',
            Providers: [ng.http.HTTP_PROVIDERS],
            templateUrl: '/Scripts/app/bikes.component.html'
        })
            .Class({
                constructor: [ng.http.Http, function (http) {
                    this.http = http;
                    this.SortCol = "Name";
                    this.SortOrder = "ASC";

                    this.Pages = [1,2,3,4];

                    this.m_Model =
                        {
                            "Bikes": []
                        };

                    this.mapBikes().subscribe(function (result) {
                        this.m_Model = result;
                    }.bind(this));
                }],
                mapBikes: function () {
                    return this.http.get('home/GetBikes').map(function (res) {
                        return res.json();
                    });
                },               
                AddBike: function () {
                    this.m_Model.Bikes.push({
                        "Name": "",
                        "Make": "",
                        "Price": "0.00",
                        "Quantity": 0
                    });
                },
                DeleteBike: function (Bike) {
                    var i = this.m_Model.Bikes.indexOf(Bike);
                    this.m_Model.Bikes.splice(i, 1);
                },
                Save: function () {                   
                    this.http.post('home/Save', this.m_Model, new Headers({ 'Content-Type': 'application/json' })).subscribe();
                },
                NameClick: function () {
                    this.SortCol = "Name";

                    if (this.SortOrder == "ASC")
                        this.SortOrder = "DESC";
                    else
                        this.SortOrder = "ASC";                    
                },
                MakeClick: function () {
                    this.SortCol = "Make";

                    if (this.SortOrder == "ASC")
                        this.SortOrder = "DESC";
                    else
                        this.SortOrder = "ASC";
                },
                PageClick: function (Page) {
                    this.CurrentPage = Page;
                },
                PageUpdate: function (Length) {
                    this.Pages = [];
                    var nCount = 1;
                    var nTotal = Length / 4;
                    for (var i = 0; i < nTotal; i++) {
                        this.Pages.push(nCount);
                        nCount++;
                    }
                },
                FilterChange: function () {
                    this.CurrentPage = 0;
                }
            });

    app.Pipe =
        ng.core.Pipe({
        name: 'mainpipe',
        pure: false
        })
            .Class({
                constructor: [function () {
                    
                }],
                transform: function (items, name, make, price, sortcol, sortorder, page, com) {
                    //console.log(name + " " + sortorder);

                    if (items && items.length)
                    {
                        //Build return
                        var vReturn = [];
                        var bAdd = true;

                        for (var i = 0; i < items.length; i++) {

                            if (name && items[i].Name.toLowerCase().indexOf(name.toLowerCase()) === -1) {
                                bAdd = false;
                            }
                            if (make && items[i].Make.toLowerCase().indexOf(make.toLowerCase()) === -1) {
                                bAdd =  false;
                            }
                            
                            if (bAdd)
                                vReturn.push(items[i]);

                            bAdd = true;
                        }
                        
                        if (!page) {
                            page = 0;
                        }

                        page = page * m_vPages;
                        var nStart = page;
                        var sEnd = page + m_vPages;

                        com.PageUpdate(vReturn.length);

                        //Sort
                        if (sortcol == "Name" && sortorder == "ASC")
                            return vReturn.sort(function (a, b) { if (a.Name < b.Name) return -1; if (a.Name > b.Name) return 1; return 0; }).slice(nStart, sEnd);
                        else if (sortcol == "Name" && sortorder == "DESC")
                            return vReturn.sort(function (a, b) { if (a.Name < b.Name) return -1; if (a.Name > b.Name) return 1; return 0; }).reverse().slice(nStart, sEnd);
                        else if (sortcol == "Make" && sortorder == "ASC")
                            return vReturn.sort(function (a, b) { if (a.Make < b.Make) return -1; if (a.Make > b.Make) return 1; return 0; }).slice(nStart, sEnd);
                        else if (sortcol == "Make" && sortorder == "DESC")
                            return vReturn.sort(function (a, b) { if (a.Make < b.Make) return -1; if (a.Make > b.Make) return 1; return 0; }).reverse().slice(nStart, sEnd);
                    }
                }
            });


})(window.app || (window.app = {}));

