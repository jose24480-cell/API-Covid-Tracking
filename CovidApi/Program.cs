var builder = WebApplication.CreateBuilder(args);

// Agregar servicios
builder.Services.AddControllers();

// Permitir peticiones desde Angular
builder.Services.AddCors(options =>
{
    options.AddPolicy("Angular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Permitir HttpClient
builder.Services.AddHttpClient();

// OpenAPI
builder.Services.AddOpenApi();

var app = builder.Build();

// OpenAPI
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Permitir conexión con Angular
app.UseCors("Angular");

app.UseAuthorization();

app.MapControllers();

app.Run();