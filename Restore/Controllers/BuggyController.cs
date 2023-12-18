using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : Controller
    {
        [HttpGet("not-found")]
        public ActionResult Get404NotFound()
        {
            return NotFound();
        }
        [HttpGet("bad-request")]
        public ActionResult Get400BadRequest()
        {
            return BadRequest(new ProblemDetails { Title = "This is a bad request" });
        }
        [HttpGet("unauthorized")]
        public ActionResult Get401UnAuthorized()
        {
            return Unauthorized();
        }
        [HttpGet("validation-error")]
        public ActionResult Get400ValidationError()
        {
            ModelState.AddModelError("Error1", "This is validation error1");
            ModelState.AddModelError("Error2", "This is validation error2");
            return ValidationProblem();
        }
        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("THis is server error");
        }
    }
}
