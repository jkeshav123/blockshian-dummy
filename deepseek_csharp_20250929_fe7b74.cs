// azure-function/Function1.cs
public static async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequest req)
{
    return new OkObjectResult("Hello Azure!");
}