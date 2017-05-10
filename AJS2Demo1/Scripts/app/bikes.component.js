(function (app) {
    app.BikesComponent =
        ng.core.Component({
            selector: 'bikes',
            Providers: [ng.http.HTTP_PROVIDERS],
            templateUrl: '/Scripts/app/bikes.component.html'
        })
            .Class({
                constructor: [ng.http.Http, function (http) {
                    this.http = http;

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
                RemoveSpaces: function (value) {
                    alert(value);
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
                PageUpdate(Length) {
                    this.Pages = [];
                    var nCount = 1;
                    var nTotal = Length / 4;
                    for (var i = 0; i < nTotal; i++) {
                        this.Pages.push(nCount);
                        nCount++;
                    }
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
                    //console.log(sortcol + " " + sortorder);
                    
                    if (items && items.length)
                    {
                        //Build return
                        var v = items.filter(item => {
                            if (name && item.Name.toLowerCase().indexOf(name.toLowerCase()) === -1) {
                                return false;
                            }
                            if (make && item.Make.toLowerCase().indexOf(make.toLowerCase()) === -1) {
                                return false;
                            }

                            return true;
                        });

                        if (!page) {
                            page = 0;
                        }

                        page = page * 4;
                        var nStart = page;
                        var sEnd = page + 4;

                        com.PageUpdate(v.length);
  
                        //Sort
                        if (!sortcol) {
                            return v.sort(v => v.Name).slice(nStart, sEnd);
                        }                        

                        if (sortcol == "Name" && sortorder == "ASC")
                            return v.sort(v => v.Name).slice(nStart, sEnd);
                        else if (sortcol == "Name" && sortorder == "DESC")
                        return v.sort(v => v.Name).reverse().slice(nStart, sEnd);
                        else if (sortcol == "Make" && sortorder == "ASC")
                            return v.sort(v => v.Make).slice(nStart, sEnd);
                        else if (sortcol == "Make" && sortorder == "DESC")
                            return v.sort(v => v.Make).reverse().slice(nStart, sEnd);
                    }
                    else
                    {
                        return items;
                    }
                }
            });

})(window.app || (window.app = {}));

