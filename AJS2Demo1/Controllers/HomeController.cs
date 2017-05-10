using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

/* 
Microsoft provides programming examples for illustration only, without 
warranty either expressed or implied, including, but not limited to, the 
implied warranties of merchantability and/or fitness for a particular 
purpose. 
　
This sample assumes that you are familiar with the programming language 
being demonstrated and the tools used to create and debug procedures. 
Microsoft support professionals can help explain the functionality of a 
particular procedure, but they will not modify these examples to provide 
added functionality or construct procedures to meet your specific needs. 
If you have limited programming experience, you may want to contact a 
Microsoft Certified Partner or the Microsoft fee-based consulting line 
at (800) 936-5200. 
*/

namespace AJS2Demo1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public void Save(Model m)
        {

        }

        public ActionResult GetBikes()
        {
            Model mReturn                                               = new Model();
            try
            {             
                List<Bike> ab                                           = new List<Bike>();
                ab.Add(new Bike { Name = "FSR", Make = "a", Price = 1M, Quantity = 10 });
                ab.Add(new Bike { Name = "FSR", Make = "a", Price = 2M, Quantity = 10 });
                ab.Add(new Bike { Name = "FSR", Make = "b", Price = 3M, Quantity = 10 });
                ab.Add(new Bike { Name = "FSR", Make = "b", Price = 4M, Quantity = 10 });
                ab.Add(new Bike { Name = "FSR", Make = "c", Price = 5M, Quantity = 10 });
                ab.Add(new Bike { Name = "FSR", Make = "c", Price = 6M, Quantity = 10 });
                ab.Add(new Bike { Name = "Sink'r Pro", Make = "c", Price = 2300M, Quantity = 5 });
                mReturn.Bikes                                           = ab.ToArray();              
            }
            catch (Exception)
            {
                
            }

            return Json(mReturn, JsonRequestBehavior.AllowGet);            
        }
    }

    public class Model
    {
        public Bike[] Bikes { get; set; }
    }

    public class Bike
    {
        public string Name { get; set; }
        public string Make { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }                       
    }
}