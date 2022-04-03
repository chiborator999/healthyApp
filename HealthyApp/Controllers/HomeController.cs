namespace HealthyApp.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;

    public class HomeController : ApiController
    {
        [HttpGet]
        // [Authorize]
        public ActionResult Get()
        {
            return Ok("Ieaaahhhh");
        }
    }
}