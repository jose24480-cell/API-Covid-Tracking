using Microsoft.AspNetCore.Mvc;

namespace CovidApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CovidController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public CovidController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            // Primera modificación realizada por Lozada
            // Correo: emmanuel24498@cbtis75.edu.mx

            // URL de la API de COVID
            var url = "https://api.covidtracking.com/v1/us/daily.json";

            // Solicitar los datos
            var response = await _httpClient.GetAsync(url);

            // Comprobar si hubo un error
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode(
                    (int)response.StatusCode,
                    "No se pudieron obtener los datos."
                );
            }

            // Leer los datos
            var json = await response.Content.ReadAsStringAsync();

            // Devolver los datos en formato JSON
            return Content(json, "application/json");
        }
    }
}